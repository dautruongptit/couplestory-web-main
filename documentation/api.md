# API

Sở hữu: quy ước hợp đồng API và bản đồ "domain → controller". **Danh sách endpoint, tham số, DTO: đọc controller** trong `API_V2/src/main/java/com/couplestory/controller` (tra bằng grep `Mapping`). Swagger chỉ bật ở profile dev (`/swagger-ui.html`).

## Quy ước chung (CONFIRMED)
- Tiền tố `/api`. JSON. Xác thực bằng cookie `access_token` (chi tiết ở `architecture.md` mục 2); header `Authorization: Bearer` cũng được chấp nhận (dùng cho Swagger/test). Frontend luôn gọi với `credentials: 'include'`.
- Truy cập không cần đăng nhập (`permitAll`): `/api/auth/**`, `/api/public/**`, `GET /api/plans`, `GET /api/templates` (chỉ đường dẫn đúng `/api/templates`, **không** gồm `/api/templates/explore`), `/uploads/**`, `/actuator/**`, Swagger. `/api/admin/**` yêu cầu `ROLE_ADMIN`. Còn lại yêu cầu đăng nhập.
- Quyền sở hữu Story kiểm trong service, không bằng annotation (`business-rules.md` mục 4).

## Định dạng lỗi (CONFIRMED)
| Tình huống | HTTP | Body |
|---|---|---|
| Chưa đăng nhập | 401 | `{status, code, message}`; `code` ∈ `UNAUTHENTICATED`, `SESSION_REPLACED`, `TOKEN_INVALID` |
| Không đủ quyền (Spring Security) | 403 | `{status:403, message:"Access denied"}` |
| Vi phạm quyền sở hữu / gói | 403 | `{status, message}` |
| Không tìm thấy; route không tồn tại | 404 | `{status, message}` |
| Xung đột (link đã dùng; sửa đồng thời) | 409 | `{status, message}` |
| Vượt giới hạn tốc độ | 429 | `{status:429, code:"RATE_LIMITED", message, retryAfterSeconds}` + header `Retry-After` |
| Dữ liệu sai; **mọi `RuntimeException` chưa bắt riêng** (kể cả vi phạm quy tắc nghiệp vụ như hết hạn mức) | 400 | `{status, message}` |
| Lỗi không lường trước | 500 | `{status:500, message:"Internal server error"}` |

Lưu ý: `RuntimeException` bất kỳ cũng trả 400 kèm `ex.getMessage()` (**INFERRED:** có thể lộ thông điệp nội bộ; chưa xử lý).

## Phiên bản và tương thích (CONFIRMED / INFERRED)
Không có tiền tố phiên bản (`/api/...`, không `/v1`). Frontend và backend deploy riêng, nên khi đổi hợp đồng phải giữ tương thích ngược (deploy backend trước, migration chỉ thêm). Hiện không có tài liệu hợp đồng chính thức ngoài mã nguồn (INFERRED: Swagger chỉ bật ở dev).

## Bản đồ domain → controller
| Domain | Controller |
|---|---|
| Đăng ký, đăng nhập, Google, đăng xuất, `me` | `AuthController` |
| Phiên (liệt kê, thu hồi) | `SessionController` |
| Hồ sơ, thiết bị | `UserController` |
| Lịch sử hoạt động | `ActivityController` |
| Story (CRUD, publish, unpublish, template, kiểm link) | `StoryController` |
| Story công khai (theo slug) | `PublicStoryController` |
| Kỷ niệm / thư / khoảnh khắc | `StoryEventController`, `StoryMessageController`, `FavoriteMomentController` |
| Ảnh | `PhotoController` |
| Nhạc | `MusicController` |
| Template (danh sách, khám phá có phân trang) | `TemplateController` |
| Gói | `PlanController` |
| Đơn hàng (user và admin) | `OrderController` |
| Mời Partner | `CollaboratorController` (chưa dùng được) |
| Thông báo (kể cả SSE) | `NotificationController` |
| Admin user | `AdminUserController` (**việc dở của người dùng, chưa commit**) |
| Dữ liệu mẫu | `SeedController` — **chỉ profile dev**, và ghi vào DB đang nối (xem cảnh báo ở `CLAUDE.md`) |

## Phân trang và ràng buộc (CONFIRMED)
- `GET /api/users/activity?page&size`: `size` tối đa 50; trả `{items, page, size, total, last}`.
- `GET /api/templates/explore?type&q&sort&page&size`: trả `{items, page, hasMore, total}`.
- Quy tắc thông báo cho người dùng: ngắn gọn, không chứa IP/User-Agent (`AGENTS.md`).
