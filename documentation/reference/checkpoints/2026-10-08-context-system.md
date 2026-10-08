# Checkpoint 2026-10-08 — Hệ thống context cho AI

Workstream: xây `CLAUDE.md` + `documentation/` làm nguồn thật; không đổi mã ứng dụng.

## Kết quả
- `CLAUDE.md` ở gốc WEB (luôn nạp) + 10 tài liệu chủ đề + `README.md` (bản đồ sở hữu) + `reference/` (kế hoạch, lưu trữ, checkpoint).
- Tài liệu `.md` cũ trong `DOC/` được chuyển vào `reference/` và gắn banner; phần còn lại của `DOC/` (zip, ảnh, `Template/`, `migration/`) giữ nguyên.
- Quyết định D1–D10 ghi ở `decisions.md`.

## Đối chiếu template
Đã đối chiếu với bộ template `ai-development-context-system` (ngoài repo; không phải tài liệu dự án). Lấy: project-context là lõi luôn nạp, câu hỏi trước task, mẫu báo cáo khi xong, ba điều kiện tạo checkpoint, quy tắc xoay session, mẫu session, cột "phương án đã loại"/trạng thái trong decisions, mục dữ liệu nhạy cảm và tương thích API. Không lấy: thư mục đánh số (`00-project/`...) vì chỉ có ~10 file, thêm thư mục chỉ tăng độ dài đường dẫn; `checkpoints/` giữ trong `reference/`. Định dạng checkpoint lấy từ `CHECKPOINT_TEMPLATE.md` của template (đã đọc từ bản copy trên máy này).

## Khảo sát đáng nhớ (kết quả ghi vào tài liệu chủ quản)
Tài liệu cũ lệch code ở tên gói, quota, kiến trúc (Next.js/BFF), thanh toán, gắn gói với website. DB thật khớp bảng gói người dùng xác nhận. Partner mới là khung. Backend không gửi email.

## Việc tiếp theo gợi ý
Xem `../../current-state.md` (phần câu hỏi mở).
