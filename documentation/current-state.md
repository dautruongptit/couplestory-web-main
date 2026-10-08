# Trạng thái hiện tại

Cập nhật: 2026-10-08. Sở hữu: tiến độ, việc dở, vấn đề đã biết, câu hỏi mở. File này thay đổi thường xuyên; mọi tài liệu khác chỉ **tham chiếu** tới đây, không lặp lại.

## Tiến độ
Kế hoạch gốc: `reference/plans/update-10082026.md` (13 hạng mục) và `reference/plans/update-10082026-phan-2-ke-hoach-trien-khai.md` (chi tiết; ghi "V1–V33" là cũ, hiện đã đến V35).

| Pha | Nội dung | Trạng thái |
|---|---|---|
| 0 | Phiên Google, cấu hình production, nginx headers/CSP, smoke test | Xong, đã push. **Chưa deploy** |
| 1 (phạm vi hiện tại) | `api_logs` (V34), `user_activity` (V35), rate limit chung, `ClientIpResolver` | Xong; commit local ở `API_V2` (`0d796ee`, `e2fb5f7`, `1cb42b4`, `44e9a91`), **chưa push, chưa deploy** |
| 1 (chưa làm) | Khóa chỉnh sửa, chống spam Story, ma trận IDOR, bảo mật upload | Chưa làm (D10) |
| 2 | Cookie consent, footer, 4 trang pháp lý, ghi nhận đồng ý | Chưa làm |
| 3 | Thanh toán VNPay | Chưa làm |
| Hoãn | Template hệ mặt trời, template game, OTP, cập nhật email, quên mật khẩu | D9 |

Lưu ý khi deploy: backend cần deploy lại để áp sửa lỗi giới hạn upload (1MB do lỗi lồng YAML) và `SecurityStartupCheck`; sau đó chạy smoke test (`deployment.md`). V34/V35 sẽ được Flyway áp khi backend khởi động (V34 đã áp lên DB thật từ máy dev).

## Đang chặn / việc tiếp theo
- **Chặn:** không có gì chặn kỹ thuật.
- **Tiếp theo (đề xuất):** (1) push 4 commit Pha 1 ở `API_V2` nếu người dùng đồng ý; (2) triển khai D3 (tự kéo dài hạn khi nâng gói) và D12 (về FREE khi hết hạn) khi người dùng yêu cầu — cần chốt cách tính trước; (3) Pha 1 còn lại / Pha 2 / Pha 3 theo thứ tự người dùng chọn.

## Việc dở của người dùng (không đụng)
Chưa commit, không phải của Claude: `WEB/docker-compose.yml` (đang sửa cổng host thành `90:8091`, **CONFLICT** với D15 = `8091`; chờ người dùng hoàn tác hoặc xác nhận) và `WEB/src/pages/AdminUsers.tsx` (viết lại lớn, nhiều khả năng là màn hình khóa tài khoản). Trong `API_V2`, tính năng khóa tài khoản chưa commit: `AdminUserController`, `UserRepository`, `UserDetailsImpl`, một phần `AuthController`. Xem `git status` trước khi commit; chỉ stage phần của mình.

## Vấn đề đã biết (chưa xử lý, chưa là task)
| Vấn đề | Chi tiết ở |
|---|---|
| Backend local nối DB thật; chạy local ghi lên DB thật (người dùng chấp nhận, D13) | `CLAUDE.md`, `database.md` |
| `FlywayMigrationValidationTest` lỗi thời, đỏ; `API_V2/README.md` mô tả sai (dev dùng H2, compose có Postgres) | `database.md` |
| Partner: chưa dùng được (khi làm: chỉ xem, D11); API mời trả `inviteTokenHash` | `business-rules.md` §5 |
| Mô tả gói quảng cáo "mật khẩu cho trang"/"riêng tư" nhưng chưa có code (chưa làm, D14) | `business-rules.md` §1 |
| Backend không gửi email; trang Quên mật khẩu chỉ là giao diện | `architecture.md` §1 |
| Giá gia hạn nằm cứng trong code | `business-rules.md` §3 |
| Dữ liệu mẫu cứng trên giao diện (`DashboardUpgrade`, và có thể `Checkout`, `CheckoutSuccess`, `ShareModal`; chưa kiểm hết) trái quy tắc "dữ liệu thật" | `design-system.md` |
| Mã chết: entity `Subscription`/`Payment`/`AuthToken`; trang `Pricing`, `PricingMobile`, `MyStories`, `PhotoGallery`; `data/mockScenarios.ts` (chỉ còn là kiểu) | `database.md`, `project-context.md` |
| `GET /api/auth/sessions` luôn rỗng (không ai ghi `refresh_tokens`); có thể lỗi 500 khi chưa đăng nhập (`/api/auth/**` là `permitAll`) | `architecture.md` §2 |
| `RuntimeException` chưa bắt riêng trả 400 kèm thông điệp gốc | `api.md` |
| `PackageRank` khai báo hai nơi (backend, frontend) | `template-system.md` |
| CORS mặc định trong `API_V2/docker-compose.yml` thiếu tên miền gốc và wildcard | `deployment.md` |

## Câu hỏi mở / UNKNOWN cần người dùng quyết
- Cách tính khi tự kéo dài `expires_at` lúc nâng gói (D3).
- Cơ chế đưa user về FREE khi hết hạn và xử lý Story vượt hạn mức FREE (D12).
- Hoàn tiền; hủy đơn đã `PAID`.
- Thời hạn giữ `user_activity` (dự kiến 12 tháng); thời gian khóa tài khoản.
- Có sửa mô tả gói (mật khẩu cho trang, riêng tư) hay giữ nguyên.
- Nội dung pháp lý, thời hạn lưu dữ liệu (chưa cần làm, D14).
- Tài liệu "BA V1.2/V1.3" mà migration V23–V25 nhắc tới: chưa tìm thấy; người dùng đồng ý coi như được thay bằng D1–D3.
