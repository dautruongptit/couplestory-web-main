# Quy tắc nghiệp vụ

Sở hữu: mọi quy tắc nghiệp vụ. Mỗi dòng ghi độ tin cậy. Quy tắc nằm trong DB (giá, hạn mức) có DB là nguồn thật; tài liệu này ghi giá trị đã xác minh. **Không thêm quy tắc mới ở đây nếu người dùng chưa quyết.**

Quyết định đã chốt và lý do: `decisions.md` (D1–D3).

## 1. Gói và hạn mức
Xác minh với DB thật ngày 2026-10-08, người dùng xác nhận là bản chính thức (CONFIRMED). Nguồn thật: bảng `plans` (admin sửa được qua `PUT /api/admin/plans/{id}`).

| | FREE | PLUS | COUPLE | PREMIUM |
|---|---|---|---|---|
| Giá (đồng) | 0 | 49.000 | 69.000 | 119.000 |
| Website đồng thời (không tính đã xóa) | 3 | 10 | không giới hạn | không giới hạn |
| Tổng website cả đời (tính cả đã xóa) | 10 | 50 | không giới hạn | không giới hạn |
| Ảnh mỗi website | 10 | 100 | 500 | 1000 |
| Ảnh mỗi kỷ niệm | 1 | 5 | 5 | 5 |
| Bài nhạc | 1 | 5 | 10 | 20 |
| Thời hạn website | 30 ngày | 180 ngày | 365 ngày | vĩnh viễn |
| Watermark | có | không | không | không |
| Mời Partner | không | không | có | có |
| Mật khẩu cho trang | không | có | có | có |
| Tên miền riêng | không | không | không | không |

Thứ tự `FREE < PLUS < COUPLE < PREMIUM`. Gói gắn với **user**. Template dùng được khi gói user ≥ gói của template.

### Hạn mức nào đang được code áp dụng (CONFIRMED)
| Hạn mức | Áp dụng | Nơi trong code |
|---|---|---|
| Website đồng thời, tổng cả đời | Có | `StoryService.createStory` |
| Ảnh mỗi website | Có | `PhotoService.uploadPhoto` |
| Bài nhạc | Có | `MusicService` |
| Thời hạn website | Có | `StoryService.publishStory`, `TrialExpiryJob` |
| Watermark | Chỉ là cờ trả cho trang công khai | `PublicStoryController` |
| Mời Partner | Chỉ chặn ở bước mời | `CollaboratorService` |
| Mật khẩu cho trang, tên miền riêng, ảnh mỗi kỷ niệm | **Không có code** | — |

**CONFLICT (chờ người dùng):** mô tả gói (`plans.features`) quảng cáo "Đặt mật khẩu cho trang" và "Chế độ riêng tư" cho PLUS/COUPLE/PREMIUM nhưng tính năng chưa tồn tại. Người dùng: **chưa làm** (D14); có sửa mô tả gói hay không: UNKNOWN.

## 2. Vòng đời Story (CONFIRMED)
Trạng thái: `DRAFT` (mới tạo) → `PUBLISHED` → `HIDDEN` (hết hạn) ; `DELETED` (xóa mềm, có `deleted_at`). `unpublish` đưa `PUBLISHED` về `DRAFT`.
- **Tạo:** kiểm hạn mức (mục 1) và template (mục 5 của `template-system.md`). Link (slug) mặc định sinh từ tên hai người; người dùng có thể chọn link riêng.
- **Link:** hợp lệ theo `SlugUtil`. Link đã xuất bản **không đổi được** (người khác có thể đã lưu).
- **Xuất bản:** cần tối thiểu `min_events_for_publish` kỷ niệm đang hiển thị (theo template; mặc định 2). Story đã hết hạn không xuất bản lại được.
- **Hạn website:** đặt ở lần xuất bản đầu tiên (`expires_at = bây giờ + website_duration_days` của gói; gói vĩnh viễn thì không có hạn). Đặt một lần. Quyết định D3.
- **Hết hạn:** `TrialExpiryJob` chạy mỗi giờ, đổi `PUBLISHED` quá hạn thành `HIDDEN`. Khách xem thấy 404. Chủ vẫn sửa được.
- **Xem công khai:** chỉ `PUBLISHED` và còn hạn; mọi trường hợp khác trả 404 chung.
- **Xóa:** xóa mềm; vẫn tính vào "tổng website cả đời".
- **Kỷ niệm (Event):** tiêu đề ≤ 100 ký tự, nội dung ≤ 500, ngày không bắt buộc. Kỷ niệm mới chỉ hiển thị nếu template còn chỗ (`max_display_events`); thừa thì lưu ở trạng thái ẩn. Người dùng chọn tập hiển thị bằng "visibility"; vượt tối đa của template thì bị từ chối.
- **Đổi template:** không mất dữ liệu; `template_config` bị đặt lại `{}`.

## 3. Đơn hàng và thanh toán (CONFIRMED)
Hiện chỉ có **chuyển khoản thủ công**; VNPay chưa làm (Pha 3). Quyết định D5.
- Loại đơn: `UPGRADE` (nâng gói) và `RENEW` (gia hạn một Story). Trạng thái: `PENDING`, `PAID`, `CANCELLED`.
- Người dùng tạo đơn, nhận **mã chuyển khoản** (`transfer_code`) và thông tin ngân hàng (cấu hình bằng biến môi trường `PAYMENT_*`), chuyển tiền; **admin xác nhận** đơn thì hiệu lực.
- **Nâng gói:** chỉ lên gói cao hơn; số tiền = giá gói đích − giá gói hiện tại. Xác nhận đơn thì `users.plan_type` đổi. Admin cũng đổi gói trực tiếp được.
- **Gia hạn:** 3 tháng = 19.000đ, 1 năm = 29.000đ (hằng số trong code, **không** nằm trong DB). Xác nhận thì `expires_at` cộng từ mốc muộn hơn giữa hạn hiện tại và hiện tại; Story `HIDDEN` về `PUBLISHED`. Gói PREMIUM không gia hạn. Story đã xóa không gia hạn.
- Đơn `PENDING` trùng (cùng gói, hoặc cùng Story và kỳ hạn) được dùng lại.
- Khi nâng gói, `expires_at` của Story đang xuất bản **phải được kéo dài** (D3). **CONFLICT:** code hiện không làm (`expires_at` chỉ đặt một lần). Cách tính (ví dụ tính lại theo thời hạn gói mới): UNKNOWN.
- Khi gói hết hạn, user **về FREE** (D12). UNKNOWN: cơ chế (user hiện không có ngày hết hạn gói, chỉ Story có `expires_at`) và điều gì xảy ra với Story vượt hạn mức FREE. Hoàn tiền và hủy đơn đã `PAID`: UNKNOWN (chưa có luồng).

## 4. Quyền
| Việc | Khách | User | Admin |
|---|:---:|:---:|:---:|
| Xem Story đã xuất bản | có | có | có |
| Sửa, xóa, xuất bản Story | không | **chỉ của mình** | quyền admin hiện không bao gồm sửa Story của người khác (CONFIRMED: kiểm tra `ownerId` mọi nơi) |
| Màn hình `/api/admin/**` | không | không | có |

- Mọi thao tác trên Story/Event/Photo/Message/Music đều qua `StoryAccessService.requireOwnedStory` (chỉ chủ sở hữu).
- Vai trò lưu ở bảng `roles` / `user_roles`.
- Khóa/mở tài khoản (`users.status`): **UNKNOWN** – đang là việc dở chưa commit của người dùng.

## 5. Partner (gói COUPLE) — tạm ngưng triển khai
Quyết định D9. Code chỉ có: chủ Story mời bằng email, lời mời hết hạn sau 7 ngày, chấp nhận khi email khớp. **Không có** quyền sửa Story cho Partner, **không** gửi email mời, frontend không có màn hình. Không dùng được end-to-end. Phạm vi mong muốn khi triển khai: **chỉ xem** (D11); chưa làm. Vấn đề bảo mật: API mời đang trả `inviteTokenHash`.

## 6. Thông báo (CONFIRMED)
- Lưu sửa Story: tối đa một thông báo cho mỗi Story mỗi 30 phút (chống ngập danh sách). Xuất bản: gộp trong 2 phút.
- Thông báo ngắn gọn, không chứa User-Agent hay IP (quy ước `AGENTS.md`).
- Lịch sử hoạt động của người dùng: `user_activity`, chỉ ghi sự kiện nghiệp vụ; xem `architecture.md` mục Quan sát.

## 7. Pháp lý (chưa làm, D14)
Chưa có cookie consent, điều khoản, chính sách riêng tư, footer pháp lý; người dùng xác nhận **chưa cần làm** (D14). Kế hoạch ở `reference/plans/` (Pha 2). Chưa quyết: nội dung, thời hạn lưu dữ liệu, thời gian khóa tài khoản.
