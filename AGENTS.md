# Quy ước làm việc với dự án CoupleStory

## Cổng chạy (port)
- Chỉ chạy dịch vụ ở cổng đã cấu hình sẵn trong project, không tự chuyển sang cổng khác:
  - Backend (`API_V2`): `8087` (`application*.yml`, `server.port`)
  - Frontend (`WEB`, Vite): `8091` (`vite.config.ts`)
- Nếu cổng đang bị chiếm, tìm tiến trình giữ cổng đó và kill nó, rồi chạy lại ở đúng cổng cũ.
  - Windows: `Get-NetTCPConnection -LocalPort <port> -State Listen` lấy `OwningProcess`, rồi `Stop-Process -Id <pid> -Force`.
- Trước khi chạy, nên kiểm tra cổng có đang được dùng không. Không giả định backend "đang chạy sẵn" là bản mới nhất: sau khi sửa code backend hoặc migration, phải khởi động lại.

## Mã hóa file (encoding)
- Mọi file mã nguồn dùng UTF-8 **không BOM**. File Java có BOM sẽ lỗi biên dịch (`illegal character: '\ufeff'`).
- Không sửa hoặc tạo file bằng PowerShell `Get-Content -Raw` / `Set-Content` / `>` / `Out-File`, vì làm hỏng tiếng Việt hoặc thêm BOM.
- Ưu tiên công cụ sửa file có sẵn (`write_to_file`, `replace_file_content`). Nếu cần script, dùng Node (`fs.readFileSync(p, 'utf8')` / `fs.writeFileSync(p, s, 'utf8')`).
- Khi viết script phức tạp, tạo file `.js` bằng `write_to_file` rồi chạy `node file.js`. Không nhồi chuỗi nhiều dòng, backtick hay dấu ngoặc vào `node -e` hoặc here-string của PowerShell.

## Dữ liệu thật, không giả lập
- Các màn hình hiển thị thông tin người dùng (hồ sơ, thiết bị, phiên đăng nhập, thông báo) phải lấy dữ liệu thật từ API/DB, không để dữ liệu cứng.
- Nếu thiếu API hoặc cột: thêm migration Flyway mới (không sửa migration đã áp dụng), cập nhật Entity/Repository/Controller.
- Thông báo hiển thị cho người dùng phải ngắn gọn, không chứa User-Agent thô hoặc địa chỉ IP. Thông tin kỹ thuật lưu vào DB và hiển thị ở màn hình chuyên biệt (ví dụ Login history).
