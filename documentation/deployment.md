# Triển khai

Sở hữu: môi trường, cấu hình runtime, quy trình deploy. Nguồn thật của cấu hình là các file trong repo (`WEB/docker-compose.yml`, `WEB/nginx.conf`, `WEB/Dockerfile`, `API_V2/docker-compose.yml`, `API_V2/Dockerfile`, `API_V2/.env.example`); tài liệu này giải thích, không thay thế. **Giá trị bí mật không bao giờ ghi vào đây.**

Độ tin cậy: các mục chỉ có trong kế hoạch Pha 2 (§6) hoặc từ phiên làm việc trước (đọc Cloudflare) được ghi rõ "theo kế hoạch" / "phiên trước", vì không kiểm lại được từ file trong repo.

## Topology (CONFIRMED từ file; tunnel theo phiên trước)
```
Khách → Cloudflare → Tunnel "ssh-tunnel" → nginx (container couplestory-web :8091) ─ /api, /uploads ─► couplestory-api :8087 → PostgreSQL
```
- Hai container nằm trên mạng Docker ngoài `shared-network`; nginx proxy tới `couplestory-api:8087`. PostgreSQL (`postgres-main`) và email-service nằm ngoài compose của repo.
- Frontend: cổng host **8091** (D15; `8091:8091` trong bản đã commit). Bản đang sửa dở chưa commit của người dùng ghi `90:8091` — CONFLICT, chờ hoàn tác. Backend `8087:8087` (`API_V2/docker-compose.yml`).
- **Tunnel (phiên trước, đã được người dùng sửa 2026-10-03):** `couplestory.site`, `*.couplestory.site` và `main.couplestory.site` phải cùng trỏ `http://localhost:8091`; `api.couplestory.site` trỏ `localhost:8087`. `cloudflared` chạy bằng root, cấu hình `/etc/cloudflared/config.yml`. Không sửa hostname `thongtinchinhhieu.site` (dùng chung với dự án khác).
- **Theo kế hoạch Pha 2, chưa làm (UNKNOWN trạng thái thật):** gắn cổng vào `127.0.0.1` để chỉ cloudflared truy cập; tường lửa UFW chỉ mở SSH.

## Biến môi trường (tên, không giá trị)
| Biến | Dùng cho | Ghi chú |
|---|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` | Postgres | `DB_PASSWORD` bắt buộc, không có mặc định |
| `JWT_SECRET` | ký JWT | bắt buộc ngoài dev; sinh bằng `openssl rand -base64 48` |
| `COOKIE_SECURE` | cookie đăng nhập | **phải `true`** ở production (backend từ chối khởi động nếu sai) |
| `CORS_ALLOWED_ORIGINS` | CORS | **phải gồm cả** `https://couplestory.site` **và** `https://*.couplestory.site`; mặc định trong compose chỉ có `https://main.couplestory.site` (CONFLICT, xem `current-state.md`) |
| `GOOGLE_CLIENT_ID` (backend), `VITE_GOOGLE_CLIENT_ID` (build frontend) | đăng nhập Google | |
| `UPLOADS_DIR` | thư mục ảnh | trong compose cố định `/app/uploads` (volume `uploads_data`) |
| `PAYMENT_BANK_NAME`, `PAYMENT_ACCOUNT_NUMBER`, `PAYMENT_ACCOUNT_NAME` | thông tin chuyển khoản | để trống tới khi cấu hình |
| `REDIS_HOST`, `REDIS_PORT`, `MAIL_*` | — | có cấu hình nhưng **không dùng** |
| `SPRING_PROFILES_ACTIVE` | profile | để trống ở production; `dev` chỉ cho máy dev |
| Kế hoạch (chưa làm) | | `VNPAY_*`, `EMAIL_SERVICE_URL`, `EMAIL_SERVICE_API_KEY`, `APP_PUBLIC_BASE_URL`, `FEATURE_EDIT_LOCK`, `FEATURE_VNPAY` |

## nginx (CONFIRMED, `WEB/nginx.conf`)
`client_max_body_size 20m`; gzip; security headers (xem `architecture.md` mục 3); CSP đang **Report-Only** (theo dõi một tuần rồi chuyển sang enforce); `/api/` và `/uploads/` proxy sang backend; SPA fallback `index.html`; tài nguyên tĩnh cache 30 ngày. Kiểm tra cấu hình: `node scripts/check-nginx-conf.mjs`.

## Quy trình deploy (theo kế hoạch Pha 2 §6.5 — chưa được áp dụng chính thức)
1. Test backend (`mvn test`) và `npx tsc --noEmit` ở máy dev.
2. Sao lưu DB (`pg_dump`, file có ngày, kiểm không rỗng).
3. Deploy backend trước (migration chỉ thêm, tương thích ngược), kiểm `GET /actuator/health`.
4. Deploy frontend (`docker compose up -d --build couplestory-web` **trên server**; không chạy trên máy Windows dev).
5. Chạy `SLUG=<story đã publish> bash scripts/smoke-test.sh`; lỗi thì quay lại bản trước.
6. Theo dõi 5xx trong `api_logs` 30 phút đầu.

## Chưa có / UNKNOWN
- Sao lưu tự động và thử khôi phục: UNKNOWN (kế hoạch đề xuất `pg_dump` hằng ngày, giữ 14 ngày; sao lưu thư mục `uploads`).
- CI: **chưa có** (CONFIRMED: không có workflow trong repo).
- Môi trường staging: chưa có.
- Giám sát uptime/cảnh báo: UNKNOWN.
- Deploy hiện tại của các thay đổi Pha 0 và Pha 1: **chưa deploy** (`current-state.md`).
