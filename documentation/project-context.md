# Bối cảnh dự án (lõi, luôn nạp)

Sở hữu: sản phẩm là gì, thuật ngữ, ràng buộc cốt lõi. Giữ ngắn và ổn định; chi tiết nằm ở file chủ quản. Tiến độ: `current-state.md`.

## Sản phẩm (CONFIRMED)
CoupleStory là nền tảng tạo website kỷ niệm tình yêu: mỗi cặp đôi tạo một **Story** (ảnh, các kỷ niệm, lời nhắn, nhạc), chọn **template**, rồi xuất bản tại `https://<slug>.couplestory.site`. Người dùng nói tiếng Việt; giao diện bằng tiếng Việt. Nguyên tắc: dữ liệu câu chuyện nằm trong DB, template chỉ quyết định cách hiển thị; đổi template không mất dữ liệu.

Tác nhân: **Khách** (xem Story đã xuất bản), **User** (quản lý Story của mình theo gói), **Admin** (`ROLE_ADMIN`: user, gói, đơn hàng, nhạc, doanh thu).

## Công nghệ (CONFIRMED)
Backend Spring Boot 3.2.5 / Java 17 / PostgreSQL / Flyway (monolith, một instance). Frontend React 19 + TypeScript + Vite + Tailwind v4 (SPA sau nginx). Hạ tầng: Docker, Cloudflare Tunnel. Ảnh lưu đĩa cục bộ. Đường dẫn, repo, cổng, lệnh: `CLAUDE.md`.

## Thuật ngữ
- **Story** = "website" trong BA cũ. Loại `LOVE_STORY` hoặc `LOVE_CARD`. Trạng thái `DRAFT`, `PUBLISHED`, `HIDDEN` (hết hạn), `DELETED`.
- **Gói**: `FREE < PLUS < COUPLE < PREMIUM`, gắn với **user**. Giá và hạn mức trong bảng `plans`.
- **Event** = một kỷ niệm; mỗi template hiển thị 4–6 Event.
- **Slug** = phần `<slug>` của địa chỉ công khai.
- **Order** = đơn nâng gói (`UPGRADE`) hoặc gia hạn (`RENEW`); trạng thái `PENDING`, `PAID`, `CANCELLED`.

## Quy tắc cốt lõi phải biết (chi tiết ở `business-rules.md`)
- Gói gắn với user; hạn mức đọc từ DB, không từ hằng số trong code (D1, D2).
- Hạn website tính từ lần xuất bản đầu; hết hạn thì ẩn, chủ vẫn sửa/gia hạn được (D3).
- Chỉ chủ sở hữu sửa Story; khách chỉ xem Story đã xuất bản và còn hạn.
- Thanh toán hiện tại là chuyển khoản thủ công, admin xác nhận (D5).
- Partner chưa dùng được, tạm ngưng; khi làm: chỉ xem (D9, D11). Hết hạn gói thì về FREE (D12).

## Ràng buộc quan trọng
- Chỉ thêm migration Flyway mới; tương thích ngược với frontend cũ khi deploy backend trước.
- Production: `COOKIE_SECURE=true`, CORS gồm tên miền gốc và wildcard (`deployment.md`).
- Dữ liệu thật trên giao diện, không dữ liệu mẫu cứng (`AGENTS.md`).
- Rủi ro đã chấp nhận: backend local nối **DB thật** (D13; xem `CLAUDE.md`).

## Tập trung hiện tại
Xem `current-state.md`.

## Source of truth
Bản đồ đầy đủ ở `README.md` (file này không lặp lại).

## Thư mục không phải mã sống
`API`, `source_code`, `Design`, `MCP`, `DOC` — bỏ qua (lý do: `CLAUDE.md`). Tài liệu BA/kiến trúc cũ ở `reference/archive/` đã LỖI THỜI.
