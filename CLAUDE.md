# CoupleStory — hướng dẫn cho Claude Code

@AGENTS.md

`AGENTS.md` (nhập ở trên) giữ quy ước cổng, encoding, dữ liệu thật. File này giữ phần còn lại. Người dùng nói tiếng Việt: trả lời tiếng Việt, ngắn gọn.

## Nạp context tối thiểu
1. **Luôn đọc** `documentation/project-context.md` (lõi, ngắn) trước khi làm task có thay đổi. Câu hỏi nhanh hoặc sửa một chỗ nhỏ: có thể bỏ qua, và **không** đọc cả repo hay cả `documentation/`.
2. **Chỉ đọc file liên quan** theo bảng dưới, và chỉ phần cần thiết. Cấu trúc bảng, endpoint, DTO: đọc **mã nguồn** (migration, entity, controller); tài liệu không chép chúng.
3. Đọc `documentation/current-state.md` khi bắt đầu workstream, hỏi "đang làm tới đâu", hoặc trước commit/push/deploy.
4. `documentation/reference/` là lịch sử (kế hoạch, BA cũ LỖI THỜI, checkpoint): chỉ đọc khi được yêu cầu hoặc khi tiếp tục một workstream đã có checkpoint.

| Chủ đề của task | Đọc |
|---|---|
| Gói, hạn mức, hạn website, gia hạn, đơn hàng, quyền, vòng đời Story | `business-rules.md` |
| Quyết định đã chốt và lý do | `decisions.md` |
| Xác thực, phiên, rate limit, log, activity, cấu trúc frontend | `architecture.md` |
| Bảng, migration, Flyway | `database.md` |
| Định dạng lỗi, quy ước API, tìm controller | `api.md` |
| Template Story | `template-system.md` |
| Màu, chữ, thành phần giao diện | `design-system.md` |
| Env, nginx, Cloudflare, deploy | `deployment.md` |

(Tất cả nằm trong `documentation/`. `documentation/README.md` cho biết file nào sở hữu thông tin gì.)

## Trước khi bắt đầu một task
Xác định: task thuộc module nào; quy tắc nghiệp vụ nào liên quan; quyết định kiến trúc nào liên quan; file/mã nào thực sự cần đọc. Đọc đúng những thứ đó.

## Quy tắc làm việc
- **Không đổi quy tắc nghiệp vụ**; không tự tạo quy tắc mới. `business-rules.md` và `decisions.md` là chuẩn.
- **Phát hiện mâu thuẫn** giữa tài liệu, mã, DB hoặc yêu cầu: nêu hai phía, xác định cái nào hệ thống thực tế đang dùng, **không tự sửa cả hai phía**, hỏi người dùng. Đánh dấu `CONFLICT` trong tài liệu.
- **Không refactor ngoài phạm vi.** Không thêm dependency/framework mới khi chưa được chấp thuận. Không đổi hợp đồng công khai (API, DB) khi task không yêu cầu. Không tạo abstraction "để dùng sau". Không xóa mã cũ khi chưa xác định ai còn dùng. Vấn đề khác phát hiện được thì ghi vào `current-state.md`, không tự sửa.
- Tài liệu chưa chắc phải gắn nhãn `INFERRED` / `UNKNOWN` / `CONFLICT` (xem `documentation/README.md`).
- Thêm hành vi mới: viết test trước (TDD), test phần bị ảnh hưởng, mỗi task một commit. Migration Flyway chỉ thêm mới, số kế tiếp **V36**.

## Khi xong task
Báo: đã làm gì; file thay đổi; test đã chạy; còn gì chưa làm; có quyết định mới không. Rồi cập nhật tài liệu **cùng commit**: file sở hữu thông tin đã đổi, `decisions.md` nếu có quyết định mới, `current-state.md` nếu trạng thái đổi. Không chép cùng thông tin vào nhiều file; chỉ trỏ tới nơi sở hữu.

**Tạo checkpoint** (`documentation/reference/checkpoints/YYYY-MM-DD-<chủ-đề>.md`) khi: hoàn thành một workstream lớn; chốt một quyết định kiến trúc quan trọng; hoặc task còn dở nhưng cần đóng session. Mở session mới theo workstream, không dán lại lịch sử chat; xem quy ước session ở `documentation/README.md`.

## Kho mã và lệnh
| Phần | Đường dẫn | Repo git | Cổng |
|---|---|---|---|
| Frontend (React 19, TS, Vite, Tailwind v4) | `D:\My Project\Couplestory\WEB` | `couplestory-web-main` | 8091 |
| Backend (Spring Boot 3.2.5, Java 17, PostgreSQL, Flyway) | `D:\My Project\Couplestory\API_V2` | `couplestory-api-main` | 8087 |
| email-service (Node) | `D:\My Project\email-service` | — | backend chưa gọi |

- Làm việc trực tiếp trên `main`. **Bỏ qua** `API` và `source_code` (dự án cũ; `source_code` có `CLAUDE.md` riêng sẽ gây hiểu sai), `Design`, `MCP`, `DOC`.
- Backend test: `cd API_V2 && /c/tools/apache-maven-3.9.16/bin/mvn test` (đỏ đã biết: `FlywayMigrationValidationTest`). Dev: `mvn spring-boot:run -Dspring-boot.run.profiles=dev`. Frontend: `npm run dev` · `npm run build` · `npm run lint`. Sau deploy: `SLUG=<story đã publish> bash scripts/smoke-test.sh`.

## An toàn (quan trọng)
- **Backend local nối Postgres THẬT của server** (`API_V2/.env`): chạy local là áp migration và ghi lên DB thật. Không gọi `/api/public/seed`, không chạy test/script ghi hàng loạt, không tạo tài khoản mẫu.
- Không in giá trị bí mật (`JWT_SECRET`, `DB_PASSWORD`, token). Không chạy `docker build`/`docker compose up` trên máy Windows dev. Không sửa hostname `thongtinchinhhieu.site` trong Cloudflare Tunnel dùng chung.
- Production cần `COOKIE_SECURE=true` và CORS đầy đủ (chi tiết `deployment.md`).

## Git
- `API_V2` và `WEB` có thể có **việc dở chưa commit của người dùng** (danh sách ở `current-state.md`). Xem `git status` trước khi commit; chỉ stage phần của mình.
- Commit kết thúc bằng `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` và `Claude-Session: <url session>`. **Hỏi trước khi push.**
