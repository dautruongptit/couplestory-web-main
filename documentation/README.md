# Bản đồ tài liệu

Nạp tối thiểu ở đầu mỗi session: `../CLAUDE.md` (có bảng "đọc gì khi làm gì"). File này chỉ định **ai sở hữu thông tin gì** và cách viết tài liệu.

## Sở hữu thông tin (mỗi loại có một nơi duy nhất)
| Loại thông tin | Nguồn thật | Tài liệu giải thích |
|---|---|---|
| Quy tắc nghiệp vụ, gói, vòng đời, đơn hàng, quyền | `business-rules.md` (giá/hạn mức: bảng `plans`) | — |
| Quyết định đã chốt và lý do | `decisions.md` | — |
| Tiến độ, việc dở, vấn đề đã biết, câu hỏi mở | `current-state.md` | — |
| Kiến trúc, xác thực, an ninh, quan sát, cấu trúc frontend | mã nguồn | `architecture.md` |
| Cấu trúc bảng | migration + entity | `database.md` (quy ước, bản đồ bảng) |
| Endpoint, DTO | controller | `api.md` (quy ước, định dạng lỗi, bản đồ) |
| Danh mục template | bảng `templates` | `template-system.md` |
| Token giao diện | `WEB/src/index.css` | `design-system.md` |
| Cấu hình triển khai | file compose/nginx/Dockerfile/`.env.example` | `deployment.md` |
| Sản phẩm, thuật ngữ, module | `project-context.md` | — |
| Lịch sử (kế hoạch, BA cũ, checkpoint) | `reference/` | tham khảo, không phải chuẩn |

Thông tin xuất hiện ở nơi khác chỉ được **trỏ tới** nơi sở hữu, không chép lại.

## Quy ước viết
- Mỗi khẳng định chưa chắc phải gắn nhãn: **CONFIRMED** (đã đọc code/DB hoặc người dùng xác nhận), **INFERRED** (suy ra), **UNKNOWN** (chưa biết), **CONFLICT** (tài liệu và code lệch, chờ người dùng quyết). Không nhãn = CONFIRMED.
- Không chép mã nguồn, cột bảng, danh sách endpoint, giá trị bí mật.
- Mỗi file ≤ ~150 dòng; tách khi vượt.
- Đổi hành vi nghiệp vụ hoặc quyết định kiến trúc → cập nhật tài liệu sở hữu **trong cùng commit** (và thêm dòng vào `decisions.md` nếu là quyết định).
- Checkpoint: khi nào tạo và định dạng — xem mục "Định dạng checkpoint" bên dưới và `../CLAUDE.md`.
- Tài liệu cũ trong `reference/archive/` đã lỗi thời; không sửa, không dựa vào.

## Phân loại context
- **Luôn nạp:** `../CLAUDE.md`, `project-context.md` (lõi ngắn).
- **Nạp khi liên quan:** `business-rules`, `architecture`, `database`, `api`, `template-system`, `design-system`, `deployment`, `decisions`, `current-state` (bảng định tuyến ở `../CLAUDE.md`).
- **Tra cứu:** `reference/` (kế hoạch, BA cũ LỖI THỜI, checkpoint).
- **Không viết vào tài liệu — đọc mã nguồn:** cột bảng, endpoint, DTO, danh sách trang/component, phiên bản thư viện.

## Quy ước session
- Mỗi session một workstream (ví dụ: DB, xác thực, API Story, template, frontend, deploy). Không trộn nhiều workstream không liên quan.
- **Mở session mới khi:** đổi workstream; hội thoại đã dài; Claude bắt đầu nhầm quyết định cũ; task mới không phụ thuộc task trước. **Giữ session khi:** đang debug cùng một lỗi, hoặc làm một tính năng liên tục.
- Mở session mới: không dán lịch sử chat. Đưa **tên task, mục tiêu, ràng buộc đặc biệt, file/checkpoint liên quan**. Mẫu:

```
Task: <một việc chính>
Mục tiêu / tiêu chí nghiệm thu: ...
Ràng buộc: ...
File / checkpoint liên quan: ...
Test cần chạy: ...
```

## Định dạng checkpoint
`reference/checkpoints/YYYY-MM-DD-<chủ-đề>.md`, ngắn. Các mục: **Workstream**, **Ngày**, **Mục tiêu**, **Đã làm**, **Trạng thái hiện tại**, **File/module quan trọng**, **Quyết định** (kèm ID trong `decisions.md`), **Vấn đề đã biết**, **Chưa làm**, **Bước tiếp theo**. Mục nào không có nội dung thì bỏ.
