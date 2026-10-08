# Checkpoint 2026-10-08 — Pha 0 và Pha 1 (phạm vi hiện tại)

Workstream: nền bảo mật và quan sát theo `reference/plans/`. Trạng thái tiến độ: `../../current-state.md`.

## Đã làm
- **Pha 0** (đã push): sửa token_version cho đăng nhập Google (`SessionPolicy`); sửa lồng YAML làm giới hạn upload production chỉ 1MB; swagger và log SQL-bind chỉ ở dev; `SecurityStartupCheck` từ chối khởi động nếu `COOKIE_SECURE=false` ngoài dev/test; nginx security headers + CSP Report-Only + `scripts/check-nginx-conf.mjs`; `scripts/smoke-test.sh`.
- **Pha 1** (commit local ở `API_V2`): `ClientIpResolver` (`0d796ee`); `api_logs` V34 (`e2fb5f7`); `user_activity` V35 (`1cb42b4`); rate limit chung (`44e9a91`).

## Quyết định thực thi (rulings) đáng nhớ
- Làm trực tiếp trên `main`, không worktree; chỉ commit phần của mình (API_V2 có việc dở khóa tài khoản của người dùng).
- Test cho lớp hoàn toàn mới dùng lỗi biên dịch làm bước RED.
- `ApiLogFilter` bỏ qua cả `OPTIONS` (preflight CORS) ngoài `/actuator/health` và `/uploads/`.
- `ClientIpResolver` làm trước vì cả `api_logs` lẫn rate limit cần IP thật sau Cloudflare.
- `LoginRateLimiter` **giữ nguyên** (đếm đăng nhập sai); `RateLimiter` mới đếm mọi request; 429 đổi sang body `{status, code:"RATE_LIMITED", message, retryAfterSeconds}`.
- Hoạt động đăng nhập ghi trong `DeviceService.recordLogin` (không sửa `AuthController` để khỏi đụng việc dở của người dùng). Cập nhật Story/kỷ niệm, tải/xóa ảnh, tạo đơn được gộp trong 10 phút.
- Banner frontend cho `SESSION_REPLACED` hoãn.

## Nợ đã biết (chưa xử lý)
- Tăng `token_version` là đọc-ghi: hai đăng nhập đồng thời có thể cùng một version.
- CSP Report-Only chưa có `report-uri`; `img-src` cho mọi host `https:`.
- V35 mới kiểm trên H2, chưa chạy trên Postgres thật (Hibernate `validate` sẽ kiểm khi khởi động); chưa kiểm ghi `user_id` vào `api_logs` bằng tài khoản thật.
- `user_activity` chưa có job xóa (dự kiến 12 tháng).
- `FlywayMigrationValidationTest` lỗi thời.
