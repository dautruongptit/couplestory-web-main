# Kiến trúc

Sở hữu: cấu trúc kỹ thuật, xác thực và phiên, kiểm soát an ninh, quan sát, cấu trúc frontend. Không chứa quy tắc nghiệp vụ (`business-rules.md`), cấu trúc bảng (`database.md`), hợp đồng API (`api.md`), hạ tầng triển khai (`deployment.md`).

## 1. Tổng quan (CONFIRMED)
Monolith Spring Boot (một instance) + PostgreSQL; SPA React phục vụ qua nginx; ảnh lưu đĩa cục bộ. Không dùng Redis, mail, message queue (cấu hình Redis/mail tồn tại nhưng không có code dùng). Quyết định D4.

```
Trình duyệt ── nginx (SPA + proxy /api, /uploads) ──► Spring Boot :8087 ──► PostgreSQL
                                                            └─► đĩa (UPLOADS_DIR)
```
- `email-service` (Node) là dịch vụ riêng, **backend chưa gọi** (CONFIRMED: không có code client).
- Tác vụ định kỳ: `TrialExpiryJob` (mỗi giờ), `ApiLogRetentionJob` (3:30 hằng ngày), `ApiLogWriter.flush` (mỗi giây).

## 2. Xác thực và phiên (CONFIRMED)
- Đăng ký (`/api/auth/register`, mật khẩu 8–100 ký tự), đăng nhập mật khẩu (`/login`), đăng nhập Google (`/google`, kiểm bằng `GOOGLE_CLIENT_ID`).
- Thành công: JWT đặt vào cookie `access_token` — `HttpOnly`, `SameSite=Strict`, `Secure` theo `COOKIE_SECURE`, sống 4 giờ (`jwt.expiration` = 14.400.000 ms). Không có refresh token. Frontend lưu thêm hồ sơ rút gọn ở `localStorage.cs_user` (không chứa token).
- **Một phiên hiệu lực:** mỗi lần đăng nhập (mật khẩu hoặc Google) tăng `users.token_version`; JWT mang claim `token_version`, `AuthTokenFilter` so với giá trị hiện tại (`SessionPolicy`). Token cũ nhận 401 với `code` = `SESSION_REPLACED`. Quyết định D6.
- Tài khoản bị khóa không xác thực được (`isAccountNonLocked`); cơ chế khóa là việc dở của người dùng (UNKNOWN).
- Phân quyền: `/api/admin/**` yêu cầu `ROLE_ADMIN` (`WebSecurityConfig`); nơi khác kiểm quyền sở hữu trong service.
- `DELETE /api/auth/sessions` thu hồi refresh token và tăng `token_version` (đăng xuất mọi thiết bị).
- **INFERRED:** `GET /api/auth/sessions` đọc `refresh_tokens`, nhưng không có code nào tạo bản ghi đó, nên danh sách luôn rỗng.
- **INFERRED, cần test:** `/api/auth/**` là `permitAll` nên `GET/DELETE /api/auth/sessions` có thể tới controller khi chưa đăng nhập (principal null → 500 thay vì 401).
- Lịch sử đăng nhập: `devices` (một dòng mỗi lần đăng nhập, ghi qua `DeviceService.recordLogin`).

## 3. Kiểm soát an ninh (CONFIRMED trừ khi ghi khác)
| Biện pháp | Chi tiết | Nơi |
|---|---|---|
| IP thật của khách | Ưu tiên `CF-Connecting-IP`, rồi phần tử đầu `X-Forwarded-For`, rồi `remoteAddr`; kiểm hợp lệ IPv4/IPv6 | `ClientIpResolver` |
| Giới hạn đăng nhập sai | 5 lần sai / 15 phút / IP, trong bộ nhớ | `LoginRateLimiter` |
| Giới hạn tốc độ chung | Đăng ký 5/giờ/IP; tải ảnh 30/10 phút/user; tạo đơn 5/10 phút/user. Vượt → 429 | `RateLimiter`, `RateLimitInterceptor`, `RatePolicies` |
| CORS | Danh sách từ `CORS_ALLOWED_ORIGINS`; header cho phép chỉ `authorization`, `content-type`, `x-auth-token` (thêm header tùy chỉnh phải sửa ở đây) | `WebSecurityConfig` |
| Khởi động an toàn | Từ chối khởi động ngoài profile dev/test nếu `COOKIE_SECURE=false` hoặc thiếu bí mật | `SecurityStartupCheck` |
| Production dọn dẹp | Swagger/SQL-bind logging chỉ bật ở dev | `application.yml`, `application-dev.yml` |
| Security headers | nginx: `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; CSP đang ở **Report-Only** | `nginx.conf` |
| Upload | Giới hạn 10MB/file (12MB/request); thư mục `/uploads/` công khai | `application.yml`, `LocalDiskStorageService` |
| SQL injection | Không có native query tự ghép; JPQL dùng tham số; `JdbcTemplate` dùng tham số | (rà soát trong Pha 0) |

**Chưa làm (kế hoạch Pha 1 còn lại):** khóa chỉnh sửa đồng thời, chống spam tạo Story, ma trận test IDOR, rà soát bảo mật upload. Xem `current-state.md`.

## 4. Quan sát (CONFIRMED)
- **`api_logs`** (log kỹ thuật): `request_id`, `user_id`, method, **route dạng mẫu** (id đổi thành `{id}`), status, thời lượng, IP, user-agent. Không lưu query string, body, header, token. Ghi bất đồng bộ qua hàng đợi 5000 phần tử (đầy thì bỏ và đếm `dropped`). Giữ 30 ngày. Bỏ qua `OPTIONS`, `/actuator/health`, `/uploads/`. Mỗi request có `X-Request-Id` (nhận từ client nếu hợp lệ, không thì sinh), có trong dòng log ứng dụng.
- **`user_activity`** (lịch sử nghiệp vụ): ghi **sau khi giao dịch chính commit**, trong giao dịch riêng; lỗi ghi không làm hỏng thao tác chính. Sự kiện cập nhật Story/Kỷ niệm, tải/xóa ảnh, tạo đơn được gộp trong 10 phút. Không chứa IP/UA. API: `GET /api/users/activity`.
- **Không** ghi password, OTP, token, JWT, header `Authorization`/`Cookie`, body vào log hay bảng nào (quy tắc cứng).

## 5. Lưu trữ ảnh (CONFIRMED)
Đĩa cục bộ (`LocalDiskStorageService`) dưới `UPLOADS_DIR`, phục vụ qua `/uploads/**`; có thumbnail `thumb_*`. Không có object storage, không dự phòng — phải sao lưu thư mục này.

## 6. Thông báo thời gian thực (CONFIRMED)
`GET /api/notifications/stream` (SSE) cùng các API đọc/đánh dấu đã đọc.

## 7. Frontend (CONFIRMED)
- React 19 + TypeScript, Vite 8, Tailwind v4, `react-router-dom` 7 (`createBrowserRouter` trong `src/routes/index.tsx`), `framer-motion`, `lucide-react`, `qrcode.react`.
- Lớp mạng: `src/services/api.ts` (`apiClient` get/post/put/delete/postFormData, `credentials: 'include'`, đường dẫn gốc `/api`). Dev: Vite proxy `/api`, `/uploads` sang `localhost:8087`.
- Trạng thái đăng nhập: `src/context/AuthContext.tsx` (gọi `/api/auth/me`). Bảo vệ route: `components/guards/RouteGuards.tsx` (`ProtectedRoute`, `AdminRoute`, `GuestOnlyRoute`).
- Bố cục: `layouts/MainLayout` (trang công khai, Navbar/Footer), `layouts/DashboardLayout` (khu vực đăng nhập, admin).
- **Truy cập công khai:** `App.tsx` kiểm `getTenantSlug()` (`utils/publicStory.ts`); nếu đang ở `<slug>.couplestory.site` thì hiển thị thẳng Story, không bọc Router/đăng nhập. Ở dev dùng `/s/<slug>`. Quyết định D7.
- Cấu trúc thư mục: `pages/` (màn hình), `components/`, `templates/` (giao diện Story, xem `template-system.md`), `data/`, `hooks/` (`usePlans`, `useTemplates`, `useGoogleLogin`), `utils/`, `types/`.
- Đăng nhập Google: `VITE_GOOGLE_CLIENT_ID` (biến build).
