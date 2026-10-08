> **Tài liệu kế hoạch — không phải mô tả hiện trạng.** Kế hoạch chi tiết 4 vai trò (Backend/DB/System/Frontend). Một số chỗ đã cũ (ví dụ "V1–V33"; hiện đã đến V35). Các hạng mục OTP, cập nhật email, quên mật khẩu và template mới đang HOÃN theo quyết định D9. Trạng thái thật: `documentation/current-state.md`. Chuyển từ `DOC/` ngày 2026-10-08, nội dung giữ nguyên bên dưới.

---

# CoupleStory — Kế hoạch triển khai giai đoạn Beta/Public (phần tiếp theo của `update 10082026.md`)

> **Dành cho người thực thi (agent hoặc dev):** dùng `superpowers:subagent-driven-development` (khuyến nghị) hoặc `superpowers:executing-plans` để làm từng task. Các bước dùng checkbox `- [ ]` để theo dõi.

**Mục tiêu:** đưa CoupleStory từ "project đang phát triển" sang "sản phẩm cho người thật dùng và trả tiền", theo đúng thứ tự trong `update 10082026.md`: Security và phiên làm việc trước, Tài khoản và pháp lý sau, rồi thanh toán, cuối cùng mới là template mới.

**Kiến trúc:** giữ nguyên monolith Spring Boot 3.2.5 + PostgreSQL + Flyway, SPA React/Vite sau nginx, ra Internet qua Cloudflare Tunnel. Không thêm Redis ở giai đoạn này (chạy một instance). Mỗi tính năng mới là một lớp mỏng cắm vào code đã có (`StoryAccessService`, `LoginRateLimiter`, `auth_tokens`, `Order`, `email-service`), không viết lại.

**Tech Stack:** Java 17 / Spring Boot 3.2.5 / PostgreSQL / Flyway (V1–V33 đã áp dụng) · React 19 + TypeScript + Vite + Tailwind v4 · `email-service` (Node/Express, Brevo + Resend) · Cloudflare Tunnel `ssh-tunnel` · Docker (mạng `shared-network`).

**Spec:** `DOC/update 10082026.md` (13 hạng mục + đề xuất 3 pha). Tài liệu này là phần triển khai của spec đó. Bối cảnh kiến trúc: `DOC/CoupleStory_Architecture_Review.md`.

## Global Constraints

Lấy từ `WEB/AGENTS.md` và hiện trạng đã kiểm tra, mọi task bên dưới đều phải tuân thủ:

- Cổng cố định: backend `8087`, frontend `8091`. Cổng bị chiếm thì tìm và dừng tiến trình giữ cổng, không đổi cổng.
- Mọi file mã nguồn là UTF-8 **không BOM**. Sửa file bằng công cụ sửa file hoặc Node, không dùng `Get-Content`/`Set-Content`/`>` của PowerShell.
- Thay đổi DB chỉ bằng migration Flyway **mới** (bắt đầu từ `V34`). Không bao giờ sửa migration đã áp dụng. Bộ test `FlywayMigrationValidationTest` phải xanh.
- Màn hình hiển thị thông tin người dùng (hồ sơ, thiết bị, phiên, thông báo, hoạt động) phải lấy **dữ liệu thật** từ API/DB, không để dữ liệu cứng.
- Thông báo cho người dùng ngắn gọn, **không** chứa User-Agent thô hay địa chỉ IP. Thông tin kỹ thuật lưu DB và hiện ở màn hình chuyên biệt.
- Không ghi password, OTP, token, JWT, `Authorization`/`Cookie` header, body request vào log hay bảng audit.
- Không in giá trị bí mật (`JWT_SECRET`, `DB_PASSWORD`, `VNPAY_HASH_SECRET`, `EMAIL_SERVICE_API_KEY`) ra chat, log hay tài liệu. Bí mật chỉ nằm trong `.env` trên server.
- `SeedController` chỉ chạy ở profile `dev`. Không chạy `docker build`/`docker compose up` trên máy Windows dev.
- Production bắt buộc `COOKIE_SECURE=true` và `CORS_ALLOWED_ORIGINS` gồm cả `https://couplestory.site` lẫn `https://*.couplestory.site` (mẫu `*.` không khớp tên miền gốc).
- Không đụng thư mục `API` (dự án cũ khác). Không sửa các hostname `thongtinchinhhieu.site` trong tunnel dùng chung.

## Review Focus

Năm tình huống mà spec không nói rõ nhưng dễ gây sự cố nhất với người dùng thật (mỗi dòng đều có test gắn vào task sở hữu code, xem cột "Task"):

| # | Tình huống | Hành vi người dùng mong đợi | Task |
|---|---|---|---|
| 1 | Đóng tab đột ngột khi đang giữ khóa chỉnh sửa (tắt máy, mất mạng), tab khác mở cùng Story | Khóa tự hết hạn sau tối đa 60 giây, tab mới lấy được khóa mà không cần ai bấm "Tiếp quản" | 1.4 |
| 2 | Đang soạn dở thì mất khóa (bị tiếp quản hoặc hết hạn), bấm Lưu | Báo rõ lý do bằng tiếng Việt, **không mất nội dung đang gõ**, các ô nhập chuyển sang chỉ đọc | 1.4, F-1.4 |
| 3 | Cổng thanh toán gọi IPN trùng, đến muộn, sai số tiền hoặc sai chữ ký | Đơn chỉ lên `PAID` đúng một lần, gói chỉ được nâng một lần, IPN sai bị từ chối và ghi nhận | 3.3 |
| 4 | Quên mật khẩu với email không tồn tại, hoặc `email-service` đang lỗi | Luôn trả cùng một thông báo trung tính (không lộ email có tồn tại hay không), lỗi gửi mail không làm API trả 500 | 2.4 (hoãn) |
| 5 | Nhiều người dùng chung một IP (Wi‑Fi, 4G NAT) và mọi request đi qua Cloudflare nên IP kết nối là IP nội bộ | Giới hạn tốc độ tính theo **người dùng + IP thật của khách** (`CF-Connecting-IP`), không khóa oan cả nhóm; chặn tài khoản chỉ dựa trên hành vi của chính tài khoản đó | 1.0, 1.3, 1.5 |

---

## Phạm vi hiện tại (cập nhật 2026-10-08)

Theo quyết định của bạn, **chưa làm** các hạng mục sau. Nội dung kỹ thuật vẫn giữ trong tài liệu (đánh dấu **HOÃN**) để làm sau, nhưng không nằm trong lịch và ước lượng hiện tại:

| # (spec gốc) | Hạng mục | Gói bị hoãn | Phần đi kèm cũng hoãn |
|---|---|---|---|
| 4 | Template Hệ mặt trời | Pha 4 | migration V41 (chỉ chèn dòng `templates`) |
| 5 | Template cho người chơi game | Pha 4 | migration V41 |
| 10 | Gửi OTP | WP-2.5 | migration V39, `OtpService` |
| 11 | Cập nhật lại email | WP-2.5, F-2.5 | template `otp-code` ở email-service |
| 12 | Quên mật khẩu | WP-2.4, F-2.4 | template `reset-password`, `EmailServiceClient` |

Hệ quả: Pha 2 chỉ còn cookie consent, footer, bốn trang pháp lý và ghi nhận đồng ý; Pha 4 hoãn toàn bộ; backend chưa cần tích hợp `email-service` (các biến `EMAIL_SERVICE_*` và hai chính sách giới hạn tốc độ `AUTH_FORGOT`, `OTP_SEND` chưa dùng). **Rủi ro vận hành cần biết:** khi chưa có quên mật khẩu và đổi email, người dùng quên mật khẩu chỉ có đường liên hệ hỗ trợ hoặc đăng nhập bằng Google.

---

## 0. Cách đọc tài liệu và phân vai

Bốn vai trò cùng chịu trách nhiệm một tài liệu. Mỗi mục lớn ghi rõ vai chủ trì.

| Vai | Chịu trách nhiệm | Mục |
|---|---|---|
| **Backend Tech Lead** | API, nghiệp vụ, bảo mật ứng dụng, tích hợp email và cổng thanh toán | §5 |
| **Database Architect** | Migration V34+, chỉ mục, vòng đời dữ liệu (retention), tính toàn vẹn | §4 |
| **System Architect** | Topology, Cloudflare/nginx/Docker, biến môi trường, rollout, giám sát, sao lưu | §6 |
| **Frontend Tech Lead** | Trang, component, hook, xử lý lỗi API, hiệu năng, khả năng truy cập | §7 |

Quy ước: `WP-x.y` là gói công việc, `F-x.y` là phần frontend của gói đó. Ước lượng tính bằng **ngày công** cho 1 người, chỉ để xếp lịch, không phải cam kết.

---

## 1. Hiện trạng đã kiểm tra trong code

Đã đọc code thật trước khi lập kế hoạch. Cột "Phát hiện" quyết định phạm vi từng hạng mục.

| # | Hạng mục (spec) | Hiện trạng | Bằng chứng |
|---|---|---|---|
| 1 | Cookie consent | **Chưa có.** Chỉ dùng cookie cần thiết `access_token` (HttpOnly, SameSite=Strict) và `localStorage.cs_user`. Đăng nhập Google nạp script bên thứ ba. | `AuthController.java` (ResponseCookie), không có `cookie` trong `WEB/src` |
| 2 | Footer | **Có nhưng thiếu pháp lý.** Footer ở trang public; link "Điều khoản", "Chính sách" trỏ `/#terms`, `/#privacy` là anchor không tồn tại. Khu vực đăng nhập (DashboardLayout) không có footer. | `layouts/MainLayout.tsx:13-79`, `pages/Login.tsx:279-281` |
| 3 | Terms & điều kiện | **Chưa có** trang, route, hay bản ghi chấp nhận. | `routes/index.tsx` không có `/terms` |
| 4–5 | Template Hệ mặt trời, Game | Chưa có. Cơ chế template đã rõ: bảng `templates` + `DynamicStoryTemplate` + `TEMPLATE_THUMBNAILS`. | `V24`, `templates/DynamicStoryTemplate.tsx` |
| 6 | SQL Injection / bảo mật | **Rủi ro SQLi thấp:** không có native query, `JdbcTemplate`; JPQL dùng tham số. **Nhưng:** không có security headers; `swagger-ui` và `/v3/api-docs` đang `permitAll` ở mọi profile; không có sanitization văn bản; upload chỉ chặn theo đuôi file (không kiểm tra magic bytes, không giới hạn số điểm ảnh); CSRF tắt (chấp nhận được nhờ cookie `SameSite=Strict`). | `WebSecurityConfig.java:100-115`, `PhotoService.java:24,56-70` |
| 6 | IDOR | Các controller đều gọi `StoryAccessService.requireOwnedStory(...)` nhưng **chưa có test tự động** chứng minh người dùng B không đọc/sửa được dữ liệu của A. | `StoryAccessService.java:19` |
| 7 | Một phiên hoạt động | **Hai lỗ hổng thật.** (a) Đăng nhập email tăng `token_version` nên "người đăng nhập sau thắng" — đúng ý. (b) **Đăng nhập Google phát JWT không có claim `token_version`** (`generateTokenFromEmail`), và bộ lọc coi token thiếu claim là hợp lệ. Hệ quả: phiên Google không bao giờ bị đá, và "Đăng xuất mọi thiết bị" không thu hồi được. **Chưa có khóa chỉnh sửa** theo Story; mới có khóa lạc quan (`version`, V15) chỉ báo 409 khi ghi đè. | `JwtUtils.java:35-42`, `AuthTokenFilter.java:35-44`, `V15` |
| 8 | Log API, lịch sử người dùng | **Chưa có.** Chỉ có bảng `devices` và thông báo `SYSTEM` khi đăng nhập. **Rủi ro:** `application.yml` (dùng cho cả production) bật `org.hibernate.SQL: DEBUG` và `BasicBinder: TRACE`, tức ghi **giá trị tham số SQL** (email, hash…) vào `logs/couplestory.log`. | `application.yml:22-32` |
| 9 | Chống spam tạo Story | Có giới hạn **tổng số** Story theo gói; **không** giới hạn tốc độ. `LoginRateLimiter` chỉ cho `/auth/login`, tính theo IP trong bộ nhớ (5 lần/15 phút). | `StoryService.createStory`, `security/LoginRateLimiter.java` |
| 10 | OTP | **Hạ tầng gửi mail đã có:** `email-service` có template `otp-code` và `security-notice`, `idempotencyKey`, rate limit theo client, dự phòng 2 nhà cung cấp. **Backend chưa gọi.** | `email-service/src/emails/`, `server.ts` |
| 11 | Cập nhật Gmail | Cột `users.email_verified` có; chưa có luồng đổi email. | `entity/User.java` |
| 12 | Quên mật khẩu | Frontend có trang `ForgotPassword` và route. **Backend chưa có endpoint** (chỉ `login/logout/me/google/register`). Bảng `auth_tokens` (V12) sẵn cho `RESET_PASSWORD` (lưu hash SHA‑256). | `pages/ForgotPassword.tsx`, `V12` |
| 13 | Thanh toán | Hiện là **chuyển khoản thủ công**: `Order` (có `transferCode`) và admin xác nhận thủ công qua `/api/admin/orders/{id}/confirm`. Kiểm soát gói phía server đã đúng (`TemplateAccessService.requireUsable`, `PlanLimitService`). **VNPay chưa tích hợp**; entity `Payment` (provider `vnpay`) và `V6` chưa được dùng. | `OrderService.java`, `OrderController.java` |

**Hạ tầng (đã xử lý trong phiên làm việc trước):** wildcard `*.couplestory.site` trước đó trỏ nhầm sang cổng 3000 (gây 502), `CORS_ALLOWED_ORIGINS` thiếu tên miền gốc, template Story sập khi chạy ở tên miền con (không có Router). Cả ba đã sửa nhưng **chưa có smoke test sau deploy** để phát hiện sớm, xem Task 0.6.

---

## 2. Quyết định kiến trúc (ADR)

| ADR | Quyết định | Lý do | Đánh đổi |
|---|---|---|---|
| ADR‑1 | Giữ monolith, PostgreSQL, Flyway. **Không thêm Redis.** Giới hạn tốc độ và khóa chỉnh sửa lưu trong bộ nhớ hoặc DB. Đặt sau interface để đổi sang Redis khi chạy nhiều instance. | Một instance, lượng người dùng beta nhỏ; Redis thêm một thứ phải vận hành. | Bộ nhớ mất khi restart (chấp nhận được cho rate limit); khóa chỉnh sửa lưu DB nên bền. |
| ADR‑2 | Ba lớp phiên: **phiên đăng nhập** (JWT cookie + `token_version`), **khóa chỉnh sửa** theo Story (lease trong DB), **danh sách thiết bị** (có sẵn). Giữ luật "đăng nhập sau thắng", **sửa cho Google giống email**. | Khớp ý spec: "1 phiên chỉnh sửa", không phải "1 tab". Các tab cùng trình duyệt dùng chung phiên đăng nhập. | Khóa theo Story (không theo user) để chủ và người cộng tác không sửa đồng thời. |
| ADR‑3 | Log hai tầng: `api_logs` (kỹ thuật, giữ 30 ngày) và `user_activity` (nghiệp vụ, giữ 12 tháng). Ghi **bất đồng bộ qua hàng đợi có giới hạn**, mất log còn hơn làm chậm request. | Debug cần log kỹ thuật; người dùng cần lịch sử có nghĩa. | Có thể mất log khi quá tải (đếm số bản bị bỏ). |
| ADR‑4 | Email/OTP gọi `email-service` qua HTTP nội bộ (`http://email-service:3000`, API key riêng, `idempotencyKey`). Gọi đồng bộ, timeout 3 giây, lỗi không làm hỏng luồng chính. | Đã có sẵn, đã có rate limit và dự phòng nhà cung cấp. | Chưa có outbox; chấp nhận cho OTP/đặt lại mật khẩu (người dùng bấm gửi lại được). |
| ADR‑5 | Thanh toán: trừu tượng `PaymentProvider`; **VNPay trước (sandbox rồi thật)**, giữ chuyển khoản thủ công làm dự phòng. **IPN là nguồn sự thật**, trang return chỉ để hiển thị. Số tiền lấy từ DB, không tin client. Idempotent theo `provider + txn_ref`. | Đúng luồng spec ("không unlock dựa vào frontend"). | Cần tài khoản merchant VNPay (xem §10). |
| ADR‑6 | Pháp lý: tài liệu **có phiên bản** trong frontend (`/terms`, `/privacy`, `/cookies`, `/refund`) + bảng `user_consents` ghi phiên bản người dùng đã chấp nhận. | Chứng minh đã chấp nhận, bắt buộc đồng ý lại khi đổi điều khoản. | Nội dung cần luật sư rà soát, ngoài phạm vi code. |
| ADR‑7 | Template mới (Hệ mặt trời, Game) **sau** P0 và payment. Mỗi template là một chunk tải lười và một dòng trong `templates`. | Đúng khuyến nghị của spec: không kéo thêm template khi nền chưa chắc. | — |
| ADR‑8 | IP thật của khách lấy từ `CF-Connecting-IP` qua một `ClientIpResolver` duy nhất; mọi nơi cần IP (rate limit, log, audit) dùng nó. | Sau Cloudflare, `getRemoteAddr()` là IP nội bộ, sẽ giới hạn cả hệ thống như một người. | Chỉ tin header khi cổng backend không mở ra ngoài (xem §6.4). |

---

## 3. Lộ trình và phụ thuộc

```
Pha 0  Hotfix nền  ──►  Pha 1  Security + Phiên + Log  ──►  Pha 2  Tài khoản + Pháp lý  ──►  Pha 3  Thanh toán  ──►  Pha 4  Template mới
 (≈2 ngày)               (≈18 ngày)                           (≈5 ngày)                       (≈10 ngày)             (hoãn)
```

| Pha | Nội dung | Điều kiện hoàn thành (Exit) |
|---|---|---|
| **0** | Sửa lỗ hổng Google session, tắt swagger và log tham số SQL ở production, security headers, smoke test | `scripts/smoke-test.sh` xanh trên production; hai tab Google/email cùng một người không cùng sống |
| **1** | `ClientIpResolver`, api_logs, user_activity, rate limit tổng quát, khóa chỉnh sửa, chống spam, ma trận IDOR, siết upload | Có test IDOR cho 100% endpoint ghi/đọc dữ liệu riêng; 2 tab sửa cùng Story được phát hiện; spam tạo Story bị 429 |
| **2** | Cookie consent, footer, 4 trang pháp lý, ghi nhận đồng ý (quên mật khẩu, OTP, đổi email: **hoãn**) | Đăng ký bắt buộc đồng ý điều khoản có ghi DB; footer và 4 trang pháp lý công khai, không còn link `/#terms` |
| **3** | VNPay, IPN, lịch sử thanh toán, hết hạn gói | Thanh toán sandbox end-to-end; IPN trùng không nâng gói hai lần; mở template theo gói đúng |
| **4** | Template Hệ mặt trời, Game: **hoãn** | (chưa áp dụng) |

**Khác với đề xuất gốc:** thêm **Pha 0** (có lỗ hổng đang tồn tại, sửa trước khi làm gì thêm). Đưa "đặt lại mật khẩu, OTP, đổi email" vào Pha 2 cùng "tài khoản" (cùng dùng một hạ tầng email); **các mục này hiện đã hoãn**. Giữ nguyên nguyên tắc của bạn: **Terms/Refund trước Payment**.

---

## 4. Database Architect — migration và vòng đời dữ liệu

Quy tắc chung: migration mới bắt đầu từ `V34`; mỗi file một mục đích; chỉ thêm (additive) để rollback bằng "sửa tiến" (forward-fix); mọi cột thời gian dùng `TIMESTAMPTZ`; mọi cột chứa văn bản do người dùng nhập có giới hạn độ dài. Thêm test ở `FlywayMigrationValidationTest` nếu cần. **V39 và V41 thuộc hạng mục hoãn: bỏ qua khi triển khai.** Flyway không đòi số phiên bản liên tục, nên bỏ trống hai số này không sao; khi làm sau thì dùng số trống kế tiếp, không cần giữ đúng V39/V41.

### V34 — `api_logs` (log kỹ thuật)

```sql
CREATE TABLE api_logs (
    id          BIGSERIAL PRIMARY KEY,
    request_id  VARCHAR(36) NOT NULL,
    user_id     UUID,
    method      VARCHAR(10) NOT NULL,
    route       VARCHAR(200) NOT NULL,        -- mẫu đường dẫn, vd /api/stories/{id}, KHÔNG có query string
    status      SMALLINT NOT NULL,
    duration_ms INTEGER NOT NULL,
    ip          VARCHAR(45),
    user_agent  VARCHAR(255),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_api_logs_created_at ON api_logs (created_at);
CREATE INDEX ix_api_logs_user_created ON api_logs (user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX ix_api_logs_status_created ON api_logs (created_at DESC) WHERE status >= 500;
```
Retention: xóa bản ghi cũ hơn 30 ngày bằng job hằng ngày (xóa theo lô 10 000 dòng để không khóa bảng lâu). Không lưu query string, body, header.

### V35 — `user_activity` (lịch sử nghiệp vụ)

```sql
CREATE TABLE user_activity (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    action      VARCHAR(50)  NOT NULL,         -- STORY_CREATED, STORY_PUBLISHED, EVENT_UPDATED, ...
    entity_type VARCHAR(30),
    entity_id   UUID,
    summary     VARCHAR(255) NOT NULL,         -- câu ngắn hiển thị cho người dùng, không chứa IP/UA/bí mật
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_user_activity_user_created ON user_activity (user_id, created_at DESC);
```
Retention 12 tháng. Mã `action` cố định trong một enum phía Java để giao diện dịch nhãn.

### V36 — `story_edit_locks` (khóa chỉnh sửa theo Story)

```sql
CREATE TABLE story_edit_locks (
    story_id         UUID PRIMARY KEY REFERENCES stories (id) ON DELETE CASCADE,
    holder_user_id   UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    holder_client_id UUID NOT NULL,            -- id của cửa sổ/tab, sinh ở trình duyệt
    acquired_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    heartbeat_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at       TIMESTAMPTZ NOT NULL
);
CREATE INDEX ix_story_edit_locks_expires ON story_edit_locks (expires_at);
```
Một dòng cho mỗi Story (khóa chính = `story_id`) nên **không thể có hai chủ khóa**. Chiếm khóa bằng một câu `INSERT ... ON CONFLICT (story_id) DO UPDATE ... WHERE expires_at < now() OR holder_client_id = :clientId` (nguyên tử, không cần khóa ứng dụng).

### V37 — chống lạm dụng

```sql
ALTER TABLE users
    ADD COLUMN locked_until TIMESTAMPTZ,
    ADD COLUMN lock_reason  VARCHAR(100);

CREATE TABLE abuse_events (
    id             UUID PRIMARY KEY,
    user_id        UUID REFERENCES users (id) ON DELETE SET NULL,
    ip             VARCHAR(45),
    action         VARCHAR(40) NOT NULL,       -- STORY_CREATE, REGISTER, FORGOT_PASSWORD, ...
    level          VARCHAR(10) NOT NULL,       -- WARN, LIMITED, BLOCKED
    event_count    INTEGER NOT NULL,
    window_seconds INTEGER NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_abuse_level CHECK (level IN ('WARN','LIMITED','BLOCKED'))
);
CREATE INDEX ix_abuse_events_created ON abuse_events (created_at DESC);
CREATE INDEX ix_abuse_events_user ON abuse_events (user_id, created_at DESC);
```
Khóa **tạm thời** bằng `locked_until` (không đổi `users.status`, tránh động vào ràng buộc có sẵn). Hết hạn là tự mở khóa, không cần job.

### V38 — đồng ý pháp lý

```sql
CREATE TABLE user_consents (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    doc_type    VARCHAR(20) NOT NULL,          -- TERMS, PRIVACY, REFUND
    version     VARCHAR(20) NOT NULL,          -- vd 2026-10-08
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip          VARCHAR(45),
    CONSTRAINT ux_user_consents UNIQUE (user_id, doc_type, version)
);
```
Đồng ý cookie là quyết định phía trình duyệt (lưu `localStorage`), **không** lưu DB.

### V39 — OTP (HOÃN, chưa làm)

```sql
CREATE TABLE otp_challenges (
    id           UUID PRIMARY KEY,
    user_id      UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    purpose      VARCHAR(30) NOT NULL,         -- CHANGE_EMAIL (sau này: DELETE_ACCOUNT)
    target_email VARCHAR(255) NOT NULL,
    code_hash    VARCHAR(64) NOT NULL,         -- SHA-256 (code + id), không lưu mã gốc
    attempts     SMALLINT NOT NULL DEFAULT 0,
    max_attempts SMALLINT NOT NULL DEFAULT 5,
    expires_at   TIMESTAMPTZ NOT NULL,
    consumed_at  TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_otp_user_purpose ON otp_challenges (user_id, purpose, created_at DESC);
```
"Quên mật khẩu" dùng lại `auth_tokens` (`RESET_PASSWORD`) đã có, **không** tạo bảng mới.

### V40 — thanh toán

```sql
ALTER TABLE orders
    ADD COLUMN payment_method VARCHAR(20) NOT NULL DEFAULT 'BANK_TRANSFER',
    ADD COLUMN expires_at     TIMESTAMPTZ;

CREATE TABLE payment_transactions (
    id               UUID PRIMARY KEY,
    order_id         UUID NOT NULL REFERENCES orders (id),
    provider         VARCHAR(20) NOT NULL,     -- VNPAY
    provider_txn_ref VARCHAR(64) NOT NULL,     -- vnp_TxnRef, do hệ thống sinh
    provider_txn_no  VARCHAR(64),              -- mã giao dịch phía VNPay
    amount           BIGINT NOT NULL,
    currency         VARCHAR(3) NOT NULL DEFAULT 'VND',
    status           VARCHAR(12) NOT NULL DEFAULT 'INITIATED',
    response_code    VARCHAR(10),
    bank_code        VARCHAR(20),
    ipn_received_at  TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ux_payment_txn UNIQUE (provider, provider_txn_ref),
    CONSTRAINT ck_payment_status CHECK (status IN ('INITIATED','SUCCESS','FAILED','EXPIRED'))
);
CREATE INDEX ix_payment_tx_order ON payment_transactions (order_id);
```
Ràng buộc `UNIQUE (provider, provider_txn_ref)` là chốt chặn idempotency ở tầng DB. Không lưu toàn bộ payload IPN; chỉ lưu các trường cần đối soát.

### V41 — template mới (Pha 4, HOÃN, chưa làm)
Chỉ `INSERT` vào `templates` (code `solar-system`, `game-quest`, loại, gói, `max_display_events`, `min_events_for_publish`). Không đổi schema.

### Ma trận lưu trữ

| Bảng | Giữ | Dọn bằng |
|---|---|---|
| `api_logs` | 30 ngày | `ApiLogRetentionJob` hằng ngày, theo lô |
| `user_activity` | 12 tháng | job hằng tuần |
| `abuse_events` | 90 ngày | job hằng tuần |
| `otp_challenges` (hoãn), `auth_tokens` đã dùng/hết hạn | 7 ngày | job hằng ngày |
| `story_edit_locks` | theo `expires_at` | ghi đè khi chiếm; job xóa dòng hết hạn mỗi giờ |

---

## 5. Backend Tech Lead

### 5.1 Pha 0 — hotfix nền (làm ngay)

#### Task 0.1: Phiên Google phải có `token_version` và đá phiên cũ

**Files:**
- Modify: `API_V2/src/main/java/com/couplestory/security/JwtUtils.java` (thêm `generateJwtToken(UserDetailsImpl)`, xóa `generateTokenFromEmail`)
- Modify: `API_V2/src/main/java/com/couplestory/security/AuthTokenFilter.java:35-44`
- Modify: `API_V2/src/main/java/com/couplestory/controller/AuthController.java` (nhánh `/google`, và mọi chỗ gọi `generateTokenFromEmail`)
- Test: `API_V2/src/test/java/com/couplestory/security/SessionVersionTest.java`

**Interfaces:**
- Produces: `String JwtUtils.generateJwtToken(UserDetailsImpl principal)`; mọi JWT đều có claim `token_version`.
- Produces: bộ lọc gắn `request.setAttribute("auth.reason", "SESSION_REPLACED" | "TOKEN_INVALID")` để entry point trả `{ "status":401, "code":"SESSION_REPLACED", "message":"..." }`.

- [ ] **Bước 1: Viết test thất bại**

```java
@Test
void tokenWithoutVersionClaimIsRejected() {
    String legacy = Jwts.builder().setSubject("a@b.c")
        .setExpiration(new Date(System.currentTimeMillis() + 60_000))
        .signWith(key, SignatureAlgorithm.HS256).compact();   // không có claim token_version
    assertThat(filter.isSessionValid(legacy, userWithVersion(3))).isFalse();
}

@Test
void olderVersionIsRejectedAndNewerAccepted() {
    assertThat(filter.isSessionValid(tokenWithVersion(2), userWithVersion(3))).isFalse();
    assertThat(filter.isSessionValid(tokenWithVersion(3), userWithVersion(3))).isTrue();
}

@Test
void googleAndPasswordLoginProduceTokensWithVersion() {
    String t = jwtUtils.generateJwtToken(UserDetailsImpl.build(userWithVersion(5)));
    assertThat(jwtUtils.getTokenVersionFromJwtToken(t)).isEqualTo(5);
}
```
- [ ] **Bước 2:** `mvn -q -Dtest=SessionVersionTest test` → FAIL (chưa có `isSessionValid`, token Google không có version).
- [ ] **Bước 3: Cài đặt tối thiểu**

```java
// AuthTokenFilter: rút phần kiểm tra thành hàm để test được
boolean isSessionValid(String jwt, UserDetails ud) {
    Integer v = jwtUtils.getTokenVersionFromJwtToken(jwt);
    return v != null && ud instanceof UserDetailsImpl u && v >= u.getTokenVersion();
}
// trong doFilterInternal: nếu !isSessionValid → request.setAttribute("auth.reason",
//     jwtUtils.getTokenVersionFromJwtToken(jwt) == null ? "TOKEN_INVALID" : "SESSION_REPLACED");
```
```java
// AuthController.googleLogin: thay generateTokenFromEmail
user.setTokenVersion(user.getTokenVersion() + 1);   // cùng luật với đăng nhập email
userRepository.save(user);
String jwt = jwtUtils.generateJwtToken(UserDetailsImpl.build(user));
```
Entry point trong `WebSecurityConfig` đọc `auth.reason` và đưa vào trường `code` của JSON 401.
- [ ] **Bước 4:** chạy lại test → PASS; chạy `mvn -q test` toàn bộ.
- [ ] **Bước 5: Commit** `fix(auth): Google sessions carry token_version and can be revoked`

Lưu ý triển khai: token cũ không có claim sẽ bị từ chối ngay, người dùng đang online phải đăng nhập lại một lần. Chấp nhận được vì access token chỉ sống 15 phút (`jwt.expiration` mặc định 900000 ms).

#### Task 0.2: Tắt swagger/api-docs ở production

**Files:** Modify `API_V2/src/main/resources/application.yml`; Modify `application-dev.yml`.
- [ ] Thêm vào `application.yml`:
```yaml
springdoc:
  api-docs: { enabled: false }
  swagger-ui: { enabled: false }
```
- [ ] Bật lại trong `application-dev.yml` (`enabled: true`).
- [ ] Kiểm tra: ở profile mặc định `GET /swagger-ui/index.html` và `/v3/api-docs` trả **404**; ở `dev` trả 200.
- [ ] Commit `chore(security): disable swagger and api-docs outside dev`

#### Task 0.3: Ngừng ghi tham số SQL vào log production

**Files:** Modify `application.yml:22-32`; Modify `application-dev.yml`.
- [ ] Ở `application.yml` đặt `org.hibernate.SQL: WARN`, **xóa** dòng `org.hibernate.type.descriptor.sql.BasicBinder`.
- [ ] Chuyển hai dòng DEBUG/TRACE đó sang `application-dev.yml`.
- [ ] Kiểm tra: đăng nhập thử rồi `grep -c "BasicBinder" logs/couplestory.log` không tăng.
- [ ] Commit `chore(logging): keep SQL parameter logging in dev only`

#### Task 0.4: Kiểm tra cấu hình bí mật khi khởi động (fail-fast)

**Files:** Create `API_V2/src/main/java/com/couplestory/config/SecurityStartupCheck.java`; Test `SecurityStartupCheckTest.java`.
- [ ] Test: `jwt.secret` ngắn hơn 32 byte thì ném `IllegalStateException`; profile không phải `dev` mà `cookie.secure=false` thì ném lỗi.
- [ ] Cài đặt `@Component` kiểm tra trong `@PostConstruct`, thông báo lỗi **không in giá trị bí mật**.
- [ ] Commit `feat(security): fail fast on weak jwt secret or insecure cookies in prod`

#### Task 0.5: Security headers ở nginx (Report-Only trước)

**Files:** Modify `WEB/nginx.conf`.
- [ ] Thêm trong khối `server`:
```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;   # StoryPreview dùng iframe cùng origin
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' https://accounts.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com; connect-src 'self' https://accounts.google.com; frame-src https://accounts.google.com; frame-ancestors 'self'" always;
```
- [ ] Chạy 1 tuần ở chế độ Report-Only, xem console các lỗi vi phạm, chỉnh danh sách nguồn, rồi đổi sang `Content-Security-Policy`.
- [ ] HSTS bật ở Cloudflare (SSL/TLS → Edge Certificates → HSTS), không bật ở nginx vì nginx chỉ nói HTTP sau tunnel.
- [ ] Commit `chore(nginx): add security headers, CSP in report-only mode`

#### Task 0.6: Smoke test sau mỗi lần deploy

**Files:** Create `scripts/smoke-test.sh` (ở thư mục gốc `Couplestory`).
- [ ] Viết và chạy script (đã gói các sự cố vừa gặp: 502 wildcard, CORS tên miền gốc, trang trắng tên miền con):
```bash
#!/usr/bin/env bash
# Dùng: SLUG=huyen-truong ./scripts/smoke-test.sh
set -u
D=couplestory.site; SLUG=${SLUG:-huyen-truong}; fail=0
check() { # tên, mã mong đợi, mã thực tế
  if [ "$2" = "$3" ]; then echo "OK   $1 ($3)"; else echo "FAIL $1 (mong $2, được $3)"; fail=1; fi; }
code() { curl -s -m 20 -o /dev/null -w '%{http_code}' "$@"; }

check "trang gốc"                 200 "$(code https://$D/)"
check "main"                      200 "$(code https://main.$D/)"
check "tên miền con của Story"    200 "$(code https://$SLUG.$D/)"
check "API công khai Story"       200 "$(code "https://$SLUG.$D/api/public/story?slug=$SLUG")"
check "templates"                 200 "$(code https://$D/api/templates)"
for o in "https://$D" "https://main.$D" "https://$SLUG.$D"; do
  check "CORS preflight từ $o" 200 "$(code -X OPTIONS https://main.$D/api/auth/google -H "Origin: $o" -H 'Access-Control-Request-Method: POST')"
done
check "CORS chặn nguồn lạ"        403 "$(code -X OPTIONS https://main.$D/api/auth/google -H 'Origin: https://evil.example.com' -H 'Access-Control-Request-Method: POST')"
check "swagger đã tắt"            404 "$(code https://main.$D/swagger-ui/index.html)"
curl -sI "https://main.$D/" | grep -qi '^x-content-type-options: nosniff' && echo "OK   header nosniff" || { echo "FAIL thiếu header nosniff"; fail=1; }
exit $fail
```
- [ ] Chạy trước và sau mỗi deploy; thêm vào checklist §6.5.
- [ ] Commit `chore(ops): add post-deploy smoke test`

### 5.2 Pha 1 — Security, phiên, log

#### WP-1.0: `ClientIpResolver` (làm trước mọi WP khác của Pha 1)

**Files:** Create `security/ClientIpResolver.java`; Test `security/ClientIpResolverTest.java`; Modify `AuthController.java` (thay chỗ tự đọc `X-Forwarded-For`).

**Interfaces:** `String ClientIpResolver.resolve(HttpServletRequest)` — thứ tự: `CF-Connecting-IP` → phần tử đầu `X-Forwarded-For` → `getRemoteAddr()`; cắt về tối đa 45 ký tự, bỏ giá trị không phải địa chỉ IP hợp lệ.

- [ ] Test: header Cloudflare thắng `X-Forwarded-For`; giá trị rác (`<script>`) bị bỏ và rơi về `getRemoteAddr()`; IPv6 hợp lệ được giữ.
- [ ] Cài đặt (dùng `InetAddresses.isInetAddress` của Guava hoặc regex chặt), commit `feat(security): resolve real client ip behind cloudflare`.
- [ ] Điều kiện an toàn: backend không được mở thẳng ra ngoài tunnel (xem §6.4).

#### WP-1.1: Request ID và log API

**Files:** Create `logging/RequestIdFilter.java`, `logging/ApiLogFilter.java`, `logging/ApiLogWriter.java`, `logging/ApiLogRetentionJob.java`; Migration `V34__create_api_logs.sql`; Test `logging/ApiLogFilterTest.java`.

**Interfaces:** `ApiLogWriter.offer(ApiLogRecord)` không chặn luồng gọi; hàng đợi `ArrayBlockingQueue(5000)`; khi đầy thì **bỏ bản ghi mới** và tăng bộ đếm `dropped`. Một `@Scheduled(fixedDelay = 1000)` ghi lô bằng `JdbcTemplate.batchUpdate`.

- [ ] **Test:** gửi `GET /api/stories/123?token=abc` → bản ghi có `route = "/api/stories/{id}"` (lấy từ `HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE`), **không** có `token=abc`, `status`, `duration_ms >= 0`, và response có header `X-Request-Id`.
- [ ] **Test:** `/actuator/health` và `/uploads/**` không bị ghi.
- [ ] **Test:** hàng đợi đầy thì `offer` trả ngay và `dropped` tăng, request vẫn thành công.
- [ ] Cài đặt `RequestIdFilter` (sinh UUID, đưa vào `MDC` và header), `ApiLogFilter` (đo thời gian, lấy `user_id` từ `SecurityContext`), `ApiLogRetentionJob` (xóa theo lô, theo §4).
- [ ] Commit `feat(logging): request id and async technical api log`

#### WP-1.2: Lịch sử nghiệp vụ `user_activity`

**Files:** Create `service/UserActivityService.java`, `entity/UserActivity.java`, `repository/UserActivityRepository.java`, `controller/ActivityController.java`; Migration `V35__create_user_activity.sql`; Modify `StoryService`, `StoryEventService`, `PhotoService`, `OrderService`.

**Interfaces:** `void UserActivityService.record(UUID userId, ActivityAction action, String entityType, UUID entityId, String summary)`; `GET /api/users/activity?page=0&size=20` chỉ trả dữ liệu **của chính người gọi**, sắp xếp mới nhất trước.

Mã hành động cố định: `STORY_CREATED`, `STORY_UPDATED`, `STORY_PUBLISHED`, `STORY_UNPUBLISHED`, `STORY_DELETED`, `TEMPLATE_CHANGED`, `EVENT_CREATED/UPDATED/DELETED`, `PHOTO_UPLOADED/DELETED`, `ORDER_CREATED`, `ORDER_PAID`, `LOGIN`.

- [ ] **Test:** tạo Story rồi xuất bản → hai bản ghi theo thứ tự, `summary` kiểu `Đã tạo câu chuyện "Anh & Em"`; người dùng B gọi API không thấy bản ghi của A.
- [ ] **Test:** `summary` không chứa IP/User-Agent; ghi activity lỗi **không** làm giao dịch chính thất bại (bọc `try/catch`, log mức WARN).
- [ ] Commit `feat(audit): user activity history`

#### WP-1.3: Giới hạn tốc độ tổng quát

**Files:** Create `security/RateLimiter.java`, `security/RatePolicy.java`, `security/RateLimitInterceptor.java`; Modify `config/WebMvcConfig.java`, `security/LoginRateLimiter.java` (ủy quyền cho `RateLimiter`, giữ test cũ `LoginRateLimiterTest` xanh); Test `security/RateLimiterTest.java` (dùng `java.time.Clock` tiêm vào để test không cần chờ).

**Interfaces:** `void RateLimiter.check(RatePolicy policy, String key)` ném `TooManyRequestsException(retryAfterSeconds)`; `GlobalExceptionHandler` trả `429` + header `Retry-After` + thân `{status, code:"RATE_LIMITED", message, retryAfterSeconds}`.

| Chính sách | Giới hạn | Khóa |
|---|---|---|
| `AUTH_LOGIN` | 5 lần / 15 phút | IP (đã có) |
| `AUTH_REGISTER` | 5 / giờ | IP |
| `AUTH_FORGOT` (hoãn) | 3 / giờ | IP **và** email băm |
| `OTP_SEND` (hoãn) | 3 / 10 phút | user |
| `STORY_CREATE` | xem WP-1.5 | user |
| `MEDIA_UPLOAD` | 30 / 10 phút | user |
| `ORDER_CREATE` | 5 / 10 phút | user |

- [ ] **Test:** hết hạn mức → 429 kèm `Retry-After` đúng; sau khi cửa sổ trôi qua cho phép lại; hai khóa khác nhau không ảnh hưởng nhau (Review Focus #5).
- [ ] **Test:** `STORY_CREATE` của user A không ảnh hưởng user B dù cùng IP.
- [ ] Giới hạn cũng đặt ở Cloudflare cho `/api/auth/*` làm lớp ngoài (§6.3).
- [ ] Commit `feat(security): generic rate limiting with Retry-After`

#### WP-1.4: Khóa chỉnh sửa Story (editing lock)

**Files:** Create `service/EditLockService.java`, `controller/EditLockController.java`, `entity/StoryEditLock.java`, `repository/StoryEditLockRepository.java`, `security/EditLockGuard.java`; Migration `V36__create_story_edit_locks.sql`; Test `service/EditLockServiceTest.java`; Modify các controller ghi (`StoryController` PUT/publish, `StoryEventController`, `StoryMessageController`, `PhotoController`, `MusicController` PUT).

**Interfaces:**
```java
public record LockResult(String status, Instant expiresAt, Holder holder) {}   // status: ACQUIRED | HELD
public record Holder(boolean sameUser, Instant since) {}                        // không lộ danh tính/IP người giữ khóa

LockResult EditLockService.acquire(UUID storyId, UUID userId, UUID clientId);
LockResult EditLockService.heartbeat(UUID storyId, UUID userId, UUID clientId);   // gia hạn thêm 60 giây
void       EditLockService.release(UUID storyId, UUID userId, UUID clientId);
LockResult EditLockService.takeOver(UUID storyId, UUID userId, UUID clientId);
void       EditLockGuard.requireHolder(UUID storyId, UUID clientId);               // ném LockLostException → HTTP 423
```
API:
- `POST   /api/stories/{id}/edit-lock` body `{clientId}` → `200 {status:"ACQUIRED", expiresAt}` hoặc `409 {status:"HELD", holder:{sameUser, since}}`
- `PUT    /api/stories/{id}/edit-lock/heartbeat` → gia hạn (TTL **60 giây**, client gọi mỗi **20 giây**)
- `DELETE /api/stories/{id}/edit-lock` → nhả khóa (client gọi cả bằng `sendBeacon` khi đóng tab)
- `POST   /api/stories/{id}/edit-lock/takeover` → chiếm khóa
- Mọi request ghi dữ liệu Story gửi header `X-Edit-Client-Id`; thiếu hoặc không phải chủ khóa → **`423 Locked`** với `code`: `EDIT_LOCK_REQUIRED` hoặc `EDIT_LOCK_LOST`.

Chủ Story và người cộng tác (`StoryCollaborator`) dùng **chung một khóa theo Story**: hai người cũng không sửa cùng lúc.

- [ ] **Test:** A chiếm khóa → B nhận `HELD`; A gọi lại với cùng `clientId` → vẫn `ACQUIRED` (gia hạn, không tạo khóa thứ hai).
- [ ] **Test (Review Focus #1):** không gọi heartbeat; sau 60 giây (Clock giả) B chiếm được **không cần** takeover.
- [ ] **Test:** B takeover → A gọi `PUT story` với `X-Edit-Client-Id` cũ nhận `423 EDIT_LOCK_LOST`.
- [ ] **Test:** hai request `acquire` đồng thời từ hai client → đúng một `ACQUIRED` (kiểm tra bằng 2 luồng và `ON CONFLICT`).
- [ ] **Test:** khóa của Story A không chặn ghi vào Story B; người lạ gọi `acquire` Story không phải của mình nhận 403/404.
- [ ] Cài đặt `acquire` bằng một câu SQL nguyên tử:
```sql
INSERT INTO story_edit_locks (story_id, holder_user_id, holder_client_id, expires_at)
VALUES (:story, :user, :client, now() + interval '60 seconds')
ON CONFLICT (story_id) DO UPDATE
   SET holder_user_id = EXCLUDED.holder_user_id, holder_client_id = EXCLUDED.holder_client_id,
       acquired_at = now(), heartbeat_at = now(), expires_at = EXCLUDED.expires_at
 WHERE story_edit_locks.expires_at < now() OR story_edit_locks.holder_client_id = EXCLUDED.holder_client_id
RETURNING *;        -- không có dòng trả về = đang bị giữ
```
- [ ] Bật bằng cờ `FEATURE_EDIT_LOCK` (mặc định tắt khi deploy, bật sau khi frontend lên cùng).
- [ ] Commit `feat(editing): per-story edit lock with lease`

#### WP-1.5: Chống spam tạo Story

**Files:** Create `service/StoryCreationGuard.java`, `entity/AbuseEvent.java`, `repository/AbuseEventRepository.java`, `controller/AdminAbuseController.java`; Migration `V37__abuse_protection.sql`; Modify `StoryService.createStory` (gọi guard **trước** kiểm tra giới hạn gói), `security/UserDetailsImpl.isAccountNonLocked` (xét `locked_until`).

Ngưỡng theo spec, cấu hình được (`app.abuse.story-create.*`):

| Số Story trong 60 giây | Hành động |
|---|---|
| 1–2 | cho qua |
| 3 | cho qua, ghi `WARN`, thêm header `X-Abuse-Warning: true` |
| 5 | `429` (`LIMITED`) |
| 10 | khóa tạm tài khoản 15 phút (`BLOCKED`): đặt `users.locked_until`, gửi thông báo `SYSTEM`, ghi `abuse_events` |

**Interfaces:** `void StoryCreationGuard.check(UUID userId, String ip)`; `GET /api/admin/abuse?level=&page=` và `POST /api/admin/users/{id}/unlock` (chỉ `ROLE_ADMIN`).

- [ ] **Test:** 1, 2 Story qua; Story thứ 3 qua kèm cảnh báo; Story thứ 5 nhận 429; Story thứ 10 khóa tài khoản và `login`/mọi API sau đó trả `ACCOUNT_TEMP_LOCKED` đến khi hết 15 phút.
- [ ] **Test (Review Focus #5):** người dùng khác cùng IP không bị ảnh hưởng; **không** khóa chỉ vì IP, chỉ vì hành vi của chính tài khoản.
- [ ] **Test:** Story bị xóa mềm vẫn tính vào cửa sổ tốc độ (không lách được bằng tạo-xóa liên tục).
- [ ] **Test:** admin mở khóa thì dùng lại được ngay.
- [ ] Commit `feat(abuse): tiered rate limit and temporary lock on story spam`

#### WP-1.6: Ma trận phân quyền (IDOR) tự động

**Files:** Create `API_V2/src/test/java/com/couplestory/security/OwnershipMatrixTest.java`.

Danh sách endpoint phải có trong ma trận, mỗi dòng test với **người dùng B** trên tài nguyên của **người dùng A**, mong đợi `403` hoặc `404` (không bao giờ `200`, không rò rỉ dữ liệu trong thân lỗi):

`GET/PUT/DELETE /api/stories/{id}` · `POST publish/unpublish/template` · `GET/POST/PUT/DELETE .../events[/{eid}]` · `PUT .../events/visibility` · `GET/POST .../messages` · `GET/POST .../photos`, `DELETE .../photos/{pid}`, `PUT .../photos/order` · `GET/PUT .../music` · `.../collaborators` · `GET /api/orders/{id}`, `POST .../cancel` · `PUT /api/notifications/{id}/read` · `DELETE /api/auth/sessions` (chỉ ảnh hưởng chính mình) · `GET /api/users/activity` (chỉ của mình).

- [ ] Viết test tham số hóa (`@ParameterizedTest`) chạy cho mọi dòng trên.
- [ ] Mọi dòng thất bại là một lỗ hổng cần sửa trong service tương ứng (thường là thiếu `requireOwnedStory`).
- [ ] Thêm test: ID của Story/ảnh/sự kiện thuộc người khác lẫn ID không tồn tại phải trả **cùng một mã**, tránh dò ID.
- [ ] Đưa vào pipeline CI (§6.5): PR không qua nếu ma trận đỏ.
- [ ] Commit `test(security): ownership matrix across all private endpoints`

#### WP-1.7: Siết upload và nhập liệu

**Files:** Modify `service/PhotoService.java`; Create `util/ImageGuard.java`, `util/TextSanitizer.java`; Tests tương ứng.

- [ ] **Magic bytes:** đọc 12 byte đầu, chỉ nhận JPEG (`FF D8 FF`), PNG (`89 50 4E 47`), GIF (`47 49 46 38`), WebP (`52 49 46 46 … 57 45 42 50`). Đuôi file hoặc `Content-Type` do client gửi **không** được tin.
- [ ] **Giới hạn điểm ảnh:** từ chối ảnh vượt 40 megapixel (chống ảnh nén nhỏ nhưng giải nén ra bộ nhớ khổng lồ). Đọc kích thước từ `ImageReader` **trước** khi giải mã đầy đủ.
- [ ] Lưu `mime_type` theo **định dạng đã giải mã**, không theo `file.getContentType()`.
- [ ] **Test:** file `.jpg` thực chất là HTML, file PNG 1×1 hợp lệ, PNG 30000×30000 (bị từ chối), tên file `../../etc/passwd.png` (đuôi và đường dẫn lưu vẫn an toàn vì tên lưu là UUID), file 0 byte.
- [ ] `TextSanitizer`: bỏ ký tự điều khiển, chuẩn hóa Unicode NFC, cắt theo giới hạn cột. Áp dụng cho `title`, `shortQuote`, tên cặp đôi, nội dung thư, địa điểm. **Không** lọc thẻ HTML ở server (React đã escape); đây là lớp thứ hai cùng CSP.
- [ ] **Test XSS:** lưu `<img src=x onerror=alert(1)>` vào tiêu đề, mở trang công khai, xác nhận hiển thị dạng chữ.
- [ ] **Test SQLi:** gửi `' OR 1=1 --`, `"; DROP TABLE stories; --` vào `slug`, `q`, `sort`, `type`, `size`, `page` của các endpoint công khai và `explore`; mong đợi 400 hoặc kết quả rỗng, không bao giờ 500.
- [ ] Thêm kiểm tra tĩnh vào CI: `grep -rnE "createNativeQuery|JdbcTemplate|Statement\.|\"\s*\+\s*.*(WHERE|SELECT)" API_V2/src/main` không có kết quả mới (trừ `ApiLogWriter` dùng `PreparedStatement`).
- [ ] Commit `feat(security): harden uploads and input handling`

### 5.3 Pha 2 — tài khoản và pháp lý (backend)

#### WP-2.4: Quên mật khẩu (HOÃN, chưa làm)

**Files:** Modify `controller/AuthController.java`; Create `service/PasswordResetService.java`, `service/EmailServiceClient.java`; Create (trong `email-service`) `src/emails/couplestory/reset-password.tsx`; Test `service/PasswordResetServiceTest.java`.

**Interfaces:**
- `POST /api/auth/forgot-password {email}` → **luôn** `202 {message:"Nếu email tồn tại, chúng tôi đã gửi hướng dẫn."}` (Review Focus #4).
- `POST /api/auth/reset-password {token, newPassword}` → `204` hoặc `400 {code:"TOKEN_INVALID"}`.
- `EmailServiceClient.send(String template, String to, Map<String,Object> data, String idempotencyKey)`; cấu hình `EMAIL_SERVICE_URL`, `EMAIL_SERVICE_API_KEY` (env), timeout 3 giây, **không ném** ra ngoài khi lỗi (chỉ log mức WARN, không có địa chỉ email đầy đủ).

Luồng: tìm user theo email (không lộ kết quả) → nếu có, hủy mọi `RESET_PASSWORD` cũ chưa dùng → sinh token ngẫu nhiên 32 byte (Base64URL) → lưu `SHA-256` vào `auth_tokens` (hết hạn 30 phút) → gửi mail có link `https://couplestory.site/reset-password?token=...`. Khi đặt lại: kiểm tra hash, hạn, chưa dùng → đặt mật khẩu mới (`BCrypt`) → đánh dấu đã dùng → `tokenVersion + 1` (đá mọi phiên) → gửi `security-notice`.

- [ ] **Test:** email không tồn tại và email tồn tại trả **cùng** thân phản hồi và **cùng độ trễ xấp xỉ** (không dò email qua thời gian phản hồi: luôn làm công việc băm giả khi không có user).
- [ ] **Test:** token dùng lần hai, token hết hạn, token sai đều trả `TOKEN_INVALID`; yêu cầu thứ hai hủy token của yêu cầu thứ nhất.
- [ ] **Test:** sau đặt lại, JWT cũ bị từ chối (`SESSION_REPLACED`).
- [ ] **Test:** `email-service` trả 500 hoặc timeout → API vẫn `202`, không rò stack trace.
- [ ] **Test:** mật khẩu mới dưới 8 ký tự hoặc trùng với email bị từ chối.
- [ ] Giới hạn: `AUTH_FORGOT` (WP-1.3).
- [ ] Commit `feat(auth): forgot and reset password`

#### WP-2.5: OTP và đổi email (HOÃN, chưa làm)

**Files:** Create `service/OtpService.java`, `entity/OtpChallenge.java`, `repository/OtpChallengeRepository.java`; Modify `controller/UserController.java`; Migration `V39__create_otp_challenges.sql`; Test `service/OtpServiceTest.java`.

**Interfaces:**
```java
Challenge OtpService.issue(UUID userId, OtpPurpose purpose, String targetEmail);  // sinh mã 6 số bằng SecureRandom
boolean   OtpService.verify(UUID challengeId, UUID userId, String code);          // tăng attempts, so khớp hằng thời gian
```
- `POST /api/users/email/change {newEmail, currentPassword?}` → tạo thử thách, gửi mã tới **email mới**, gửi `security-notice` tới **email cũ**. Trả `{challengeId, resendAfterSeconds:60}`.
- `POST /api/users/email/verify {challengeId, code}` → đặt `email`, `email_verified=true`, `tokenVersion+1`.

Quy tắc: mã 6 chữ số, sống 10 phút, tối đa 5 lần thử rồi vô hiệu, gửi lại sau 60 giây, tối đa 3 lần gửi mỗi 10 phút (`OTP_SEND`). Tài khoản đăng ký bằng Google (mật khẩu ngẫu nhiên) yêu cầu đăng nhập gần đây thay vì mật khẩu hiện tại. Email mới đã tồn tại: trả lỗi chung "không dùng được email này", không nói tài khoản nào đang giữ.

- [ ] **Test:** sai 5 lần thì thử thách chết, đúng lần thứ 6 vẫn bị từ chối; mã hết hạn bị từ chối; mã của người dùng A không dùng được cho B.
- [ ] **Test:** `code_hash` trong DB không chứa mã gốc; log không chứa mã.
- [ ] **Test:** so khớp dùng `MessageDigest.isEqual` (không so chuỗi thường).
- [ ] Commit `feat(account): otp service and email change`

#### WP-2.1/2.3: Ghi nhận đồng ý pháp lý

**Files:** Create `service/ConsentService.java`, `controller/ConsentController.java`; Migration `V38__create_user_consents.sql`; Modify `AuthController.register` (nhận `acceptedTerms` là chuỗi phiên bản).

- [ ] `POST /api/auth/register` thiếu hoặc sai phiên bản điều khoản → `400 {code:"TERMS_REQUIRED"}`; thành công ghi 2 dòng `TERMS` và `PRIVACY`.
- [ ] `GET /api/users/consents/status` → `{needsAccept:[{docType, version}]}` so với phiên bản hiện hành lấy từ cấu hình `app.legal.versions`; `POST /api/users/consents` ghi đồng ý lại.
- [ ] **Test:** đăng ký không tích đồng ý bị chặn; đổi phiên bản `TERMS` thì `status` trả `needsAccept`; ghi trùng phiên bản không lỗi (idempotent nhờ `UNIQUE`).
- [ ] Commit `feat(legal): record terms acceptance`

### 5.4 Pha 3 — thanh toán (backend)

#### WP-3.1–3.4: VNPay, IPN, kích hoạt gói

**Files:** Create `payment/PaymentProvider.java`, `payment/VnPayProvider.java`, `payment/PaymentService.java`, `controller/PaymentController.java`, `entity/PaymentTransaction.java`, `repository/PaymentTransactionRepository.java`, `job/PendingOrderExpiryJob.java`; Modify `service/OrderService.java` (tách `markPaid`), `OrderController.java`; Migration `V40__payment_transactions.sql`; Tests `payment/VnPayProviderTest.java`, `payment/PaymentServiceIdempotencyTest.java`.

**Interfaces:**
```java
public interface PaymentProvider {
    String createPaymentUrl(Order order, PaymentTransaction txn, String clientIp);       // URL chuyển khách sang cổng
    VerifiedCallback verify(Map<String,String> params);                                  // kiểm tra chữ ký, trả dữ liệu đã tin cậy
}
public record VerifiedCallback(String txnRef, long amount, boolean success, String responseCode, String providerTxnNo) {}

PaymentService.startCheckout(UUID userId, UUID orderId, PaymentMethod method)  // -> {paymentUrl}
PaymentService.handleIpn(Map<String,String> params)                            // -> {RspCode, Message}
OrderService.markPaid(UUID orderId, UUID confirmedBy)                          // dùng chung cho admin và IPN
```
API:
- `POST /api/orders/{id}/pay {method:"VNPAY"}` → `{paymentUrl}` (số tiền lấy từ `orders.amount`; client không gửi số tiền)
- `GET  /api/payments/vnpay/ipn` (**công khai**, xác thực bằng chữ ký) → `{"RspCode":"00","Message":"Confirm Success"}`
- `GET  /api/payments/vnpay/return` → chỉ xác thực để hiển thị, rồi `302` về `https://couplestory.site/orders/{id}`; **không** đổi trạng thái đơn ở đây
- `GET  /api/payments` → lịch sử thanh toán của chính mình

Quy tắc IPN (đúng thứ tự): (1) kiểm tra chữ ký HMAC‑SHA512 trên toàn bộ tham số `vnp_*` đã sắp xếp, sai thì `RspCode 97`; (2) tìm giao dịch theo `provider_txn_ref`, không có thì `01`; (3) so **số tiền** với `orders.amount × 100`, lệch thì `04`; (4) giao dịch đã `SUCCESS` thì trả `02` (đã xác nhận, idempotent) và **không làm gì thêm**; (5) trong **một transaction DB**: cập nhật giao dịch, `orders.status PENDING → PAID`, áp dụng nâng gói hoặc gia hạn, ghi `user_activity`, tạo thông báo; (6) trả `00`.

- [ ] **Test (Review Focus #3):** IPN hợp lệ gọi **hai lần** → gói chỉ nâng một lần, đơn `PAID` một lần, lần hai trả `02`.
- [ ] **Test:** chữ ký sai, tham số bị sửa, số tiền lệch, `txnRef` lạ → không đổi trạng thái đơn nào.
- [ ] **Test:** IPN `FAILED` rồi IPN `SUCCESS` đến muộn cho cùng đơn còn `PENDING` → xử lý đúng; IPN `SUCCESS` cho đơn đã `CANCELLED`/`EXPIRED` → ghi nhận để đối soát thủ công, **không** tự nâng gói.
- [ ] **Test:** hai IPN đồng thời cho cùng đơn → ràng buộc `UNIQUE` và điều kiện `WHERE status='PENDING'` đảm bảo đúng một bên thắng.
- [ ] **Test:** người dùng B không `pay` được đơn của A; đơn của gói thấp hơn gói hiện tại bị từ chối.
- [ ] **Test đơn vị chữ ký:** dùng vector kiểm thử chính thức của VNPay sandbox.
- [ ] `PendingOrderExpiryJob`: đơn `PENDING` quá 30 phút và `payment_method=VNPAY` → `EXPIRED`.
- [ ] Cổng thanh toán cho phép IPN từ Internet: dùng `https://api.couplestory.site/api/payments/vnpay/ipn` (tunnel đã có luật `api.couplestory.site → localhost:8087`). `WebSecurityConfig` thêm `permitAll` **chỉ** cho `/api/payments/vnpay/ipn` và `/return`.
- [ ] Giữ **chuyển khoản thủ công** làm phương án dự phòng: admin `confirm` đi qua cùng `markPaid`, nên cùng một đường nâng gói.
- [ ] Cờ `FEATURE_VNPAY` (mặc định tắt); bật trên sandbox trước.
- [ ] Commit `feat(payment): vnpay checkout, verified idempotent ipn, shared markPaid`

#### WP-3.5: Kiểm soát gói và hết hạn

- [ ] Viết `PackageEnforcementTest`: người dùng `FREE` không `create`/`switchTemplate`/`publish` mẫu `PREMIUM` (đã có `TemplateAccessService.requireUsable`); thêm test cho tải ảnh vượt `maxPhotos`, số Story vượt `maxTotalStories`.
- [ ] `SubscriptionExpiryJob` (nếu chưa có): gói trả phí hết hạn → hạ về `FREE` và giữ nguyên dữ liệu (chỉ khóa tính năng); test với Clock giả.
- [ ] Mọi kiểm tra gói chạy ở **server**; frontend chỉ hiển thị khóa.

---

## 6. System Architect

### 6.1 Topology hiện tại và đích

```
Khách → Cloudflare (DNS wildcard, WAF, HSTS)
          │  Tunnel "ssh-tunnel" (cloudflared chạy bằng root, cấu hình /etc/cloudflared/config.yml)
          ▼  luật: couplestory.site, *.couplestory.site, main.couplestory.site → http://localhost:8091
          │        api.couplestory.site → http://localhost:8087
   nginx (container couplestory-web :8091)  ── /api, /uploads ──►  couplestory-api :8087
          │                                                              │
          └── SPA (React build)                                          ├── PostgreSQL
                                                                         └── email-service :3000 (shared-network)
```

Cấu hình tunnel **đúng** (đã sửa ngày 2026‑10‑03, cần giữ nguyên): `couplestory.site` và `*.couplestory.site` cùng trỏ `localhost:8091`. Mọi thay đổi file này phải qua `cloudflared tunnel ingress validate` rồi mới `systemctl restart cloudflared` (restart làm rớt SSH qua chính tunnel này vài giây).

### 6.2 Biến môi trường mới (đặt trong `.env` trên server, không commit)

| Biến | Dùng cho | Ghi chú |
|---|---|---|
| `EMAIL_SERVICE_URL` (hoãn) | `EmailServiceClient` | `http://email-service:3000` (cùng `shared-network`) |
| `EMAIL_SERVICE_API_KEY` (hoãn) | xác thực tới email-service | khóa riêng cho client `couplestory`, bật `allowedLinkDomains` chứa `couplestory.site` |
| `VNPAY_TMN_CODE`, `VNPAY_HASH_SECRET`, `VNPAY_URL`, `VNPAY_RETURN_URL` | thanh toán | sandbox trước, đổi sang thật khi duyệt |
| `FEATURE_EDIT_LOCK`, `FEATURE_VNPAY` | ra mắt có điều khiển | mặc định `false` |
| `APP_PUBLIC_BASE_URL` | link trong email | `https://couplestory.site` |
| `CORS_ALLOWED_ORIGINS` | CORS | **phải** có `https://couplestory.site,https://*.couplestory.site` |
| `COOKIE_SECURE` | cookie đăng nhập | **`true` trên production** |

### 6.3 Cloudflare (lớp ngoài)

- **Rate limiting rule** cho `/api/auth/*`: 20 request/phút/IP, hành động Managed Challenge. Đây là lớp thô; giới hạn chính xác nằm ở ứng dụng (WP-1.3).
- **WAF managed rules** bật mặc định; **Bot Fight Mode** bật.
- **Turnstile** (tùy chọn) cho `register` và `forgot-password` nếu thấy lạm dụng.
- **HSTS** bật tại Edge (xem Task 0.5). **Always Use HTTPS** bật.
- Không cache `/api/*`.

### 6.4 Mạng và cổng

- Hiện `ss` cho thấy `0.0.0.0:8091` đang lắng nghe trên mọi giao diện. Sửa `docker-compose.yml` thành `"127.0.0.1:8091:8091"` (và tương tự cổng `8087`) để **chỉ cloudflared mới vào được**. Đây là điều kiện để tin `CF-Connecting-IP` (ADR‑8): nếu ai đó vào thẳng cổng 8091 qua LAN, họ giả được header.
- Tường lửa (UFW): chỉ mở SSH; không mở 8091/8087 ra ngoài.
- `email-service` chỉ nghe `127.0.0.1:8092` và `shared-network`, giữ nguyên.

### 6.5 Quy trình triển khai (mỗi lần)

1. Chạy `mvn -q test` và `npx tsc --noEmit -p tsconfig.app.json` ở máy dev; ma trận IDOR xanh.
2. **Sao lưu DB:** `pg_dump` ra file có ngày; kiểm tra file không rỗng.
3. Triển khai **migration + backend trước** (migration chỉ thêm, tương thích ngược với bản frontend cũ), kiểm `GET /actuator/health`.
4. Triển khai frontend (`docker compose up -d --build couplestory-web` trên server).
5. Chạy `scripts/smoke-test.sh`; thất bại thì **quay lại** bản trước (giữ image cũ gắn thẻ), không sửa tại chỗ.
6. Bật cờ tính năng mới (`FEATURE_*`) sau khi cả backend lẫn frontend đã lên, theo từng bước nhỏ.
7. Theo dõi `api_logs` (lỗi 5xx) trong 30 phút đầu.

### 6.6 Giám sát, sao lưu, CI

- **Giám sát:** kiểm tra sức khỏe từ ngoài (uptime check tới `https://main.couplestory.site/api/templates` và một Story mẫu); cảnh báo khi 5xx tăng (truy vấn `api_logs`), khi `dropped` của `ApiLogWriter` > 0, khi `abuse_events` mức `BLOCKED` tăng đột biến.
- **Sao lưu:** `pg_dump` hằng ngày, giữ 14 ngày, **thử khôi phục mỗi tháng** vào DB tạm. Sao lưu thư mục `uploads` (ảnh) cùng lịch; tài liệu hóa vị trí.
- **CI tối thiểu (GitHub Actions):** backend `mvn -q test` (gồm `FlywayMigrationValidationTest`, ma trận IDOR, kiểm tra tĩnh SQL), frontend `npx tsc --noEmit` + `npm run build`. Chưa có CI nào, nên đây là việc đáng làm ngay sau Pha 0.
- **Môi trường:** thêm `staging.couplestory.site` (một hostname riêng trong tunnel, DB riêng) để thử VNPay sandbox và migration trước production.

---

## 7. Frontend Tech Lead

### 7.1 Nguyên tắc chung

- Một `apiClient` xử lý **mã lỗi có cấu trúc** (`code`) tập trung: `RATE_LIMITED` (đếm ngược từ `Retry-After`), `EDIT_LOCK_LOST`/`EDIT_LOCK_REQUIRED` (423), `SESSION_REPLACED` (về trang đăng nhập kèm thông báo "Tài khoản đã đăng nhập ở nơi khác"), `ACCOUNT_TEMP_LOCKED`, `TERMS_REQUIRED`. Thông báo là tiếng Việt, ngắn, không lộ chi tiết kỹ thuật.
- Component mới chia nhỏ theo trách nhiệm, đặt trong `src/components` và `src/hooks`; trang mới trong `src/pages`; nội dung pháp lý trong `src/content/legal`.
- Mobile trước: mọi màn hình mới kiểm tra ở 390px và 1280px, không tràn ngang (theo bài học trang Cá nhân).
- Không dùng `dangerouslySetInnerHTML` (hiện đang là 0, giữ nguyên).

### 7.2 Pha 1

#### F-1.4: Khóa chỉnh sửa trong trình soạn

**Files:** Create `hooks/useEditLock.ts`, `components/EditLockBanner.tsx`; Modify `pages/StoryEditor.tsx`, `services/api.ts` (cho phép thêm header theo từng request).

**Interfaces:** `useEditLock(storyId)` trả `{ state: 'acquiring' | 'held' | 'lost' | 'ok', clientId, takeOver(), readOnly: boolean }`.

- `clientId = crypto.randomUUID()` lưu `sessionStorage` (mỗi tab một id, F5 giữ nguyên id nên vẫn là cùng "cửa sổ").
- Vào trình soạn thì `acquire`; heartbeat mỗi **20 giây**; `pagehide` gọi `navigator.sendBeacon(DELETE ...)` để nhả khóa sớm; `BroadcastChannel('cs-edit-lock')` báo cho các tab cùng trình duyệt biết ngay.
- Trạng thái `held`: hộp thoại "Câu chuyện đang được chỉnh sửa ở cửa sổ khác" với **[Xem ở chế độ chỉ đọc]** và **[Tiếp quản]**. Trạng thái `lost`: băng rôn cố định, **mọi ô nhập chuyển chỉ đọc, giữ nguyên nội dung đang gõ** và có nút "Sao chép nội dung" để không mất bài (Review Focus #2).
- `handleSave` gửi `X-Edit-Client-Id`; nhận 423 thì chuyển sang `lost` thay vì hiện lỗi chung.
- [ ] **Test (Playwright/headless):** mở hai ngữ cảnh trình duyệt cùng đăng nhập, mở cùng Story: cửa sổ thứ hai thấy hộp thoại; bấm Tiếp quản thì cửa sổ thứ nhất chuyển `lost` ở lần heartbeat kế tiếp, nội dung còn nguyên.
- [ ] **Test:** đóng cửa sổ thứ nhất đột ngột (không nhả khóa) → cửa sổ thứ hai vào được sau ≤ 60 giây không cần tiếp quản.

#### F-1.5: Chống spam và log

- [ ] Luồng tạo Story: nhận 429 thì hiện đếm ngược "Thử lại sau N giây", khóa nút; nhận `X-Abuse-Warning` thì hiện nhắc nhẹ.
- [ ] `pages/AdminAbuse.tsx` (`/admin/abuse`): bảng Người dùng, Hành động, Số lượng, IP, Thời gian, Trạng thái + nút "Mở khóa"; thêm vào menu admin.
- [ ] `pages/Activity.tsx` (`/home/activity`): dòng thời gian từ `GET /api/users/activity`, gom theo ngày, nhãn tiếng Việt theo mã `action`; liên kết từ trang Cá nhân. Không hiển thị IP hay User-Agent.

### 7.3 Pha 2

#### F-2.1: Cookie consent

**Files:** Create `components/CookieConsent.tsx`, `hooks/useCookieConsent.ts`; Modify `layouts/MainLayout.tsx`, `layouts/DashboardLayout.tsx` (gắn banner).

- Hiện **một lần** ở lần truy cập đầu (khóa `cs_cookie_consent_v1` trong `localStorage`, có `version` và `ts`).
- Hiện trạng chỉ dùng cookie cần thiết, nên giao diện đơn giản đúng như bạn nêu: nội dung "CoupleStory dùng cookie cần thiết để đăng nhập, bảo mật và duy trì phiên." với **[Chấp nhận tất cả]**, **[Chỉ cookie cần thiết]**, **[Tuỳ chỉnh]**. "Tuỳ chỉnh" mở hộp thoại hai nhóm: *Cần thiết* (luôn bật) và *Dịch vụ bên thứ ba* (Google đăng nhập).
- Script Google nạp **theo yêu cầu** khi người dùng bấm "Tiếp tục với Google" (hành động chủ động), không nạp lúc tải trang. Trang công khai của cặp đôi (`*.couplestory.site`) không hiện banner vì khách không bị đặt cookie.
- [ ] Test: lần đầu hiện, chọn xong không hiện lại sau F5; xóa khóa thì hiện lại; nút truy cập được bằng bàn phím và có `aria-label`.

#### F-2.2: Footer dùng chung

**Files:** Create `components/SiteFooter.tsx`; Modify `layouts/MainLayout.tsx` (thay footer nội tuyến), trang Cá nhân/Cài đặt (liên kết pháp lý gọn).

- Desktop 4 cột: **Sản phẩm** (Love Story, Love Card, Kho giao diện, Bảng giá), **Hỗ trợ** (Trung tâm trợ giúp, Liên hệ), **Pháp lý** (Điều khoản, Chính sách bảo mật, Chính sách cookie, Hoàn tiền), cột thương hiệu. Mobile: mỗi cột thu thành accordion. `© 2026 CoupleStory`.
- Thay các link `/#terms`, `/#privacy` ở `Login.tsx` và `Register.tsx` bằng `/terms`, `/privacy`.

#### F-2.3: Bốn trang pháp lý và ghi nhận đồng ý

**Files:** Create `content/legal/{terms,privacy,cookies,refund}.ts` (xuất `{ version, title, sections[] }`), `pages/legal/LegalPage.tsx` (một component dùng chung), thêm 4 route công khai vào `routes/index.tsx`.

- Mục lục bên trái (desktop) / thu gọn (mobile), neo `#section`, in được.
- **Điều khoản** phải có các phần: tài khoản, nội dung do người dùng tạo, tải ảnh, Story công khai, thanh toán và gói, kiểm duyệt nội dung, đình chỉ tài khoản, giới hạn trách nhiệm, thay đổi điều khoản. **Chính sách bảo mật:** dữ liệu thu thập (email, ảnh, log IP 30 ngày, lịch sử hoạt động 12 tháng), mục đích, bên thứ ba (Google, Cloudflare, nhà cung cấp email, VNPay), quyền của người dùng, liên hệ. **Cookie** và **Hoàn tiền/Hủy gói** theo thực tế sản phẩm.
- **Lưu ý:** nội dung pháp lý cần luật sư rà soát trước khi công bố; bản trong repo là khung kỹ thuật để gắn phiên bản và ghi nhận.
- `Register.tsx`: ô tích "Tôi đồng ý Điều khoản và Chính sách bảo mật" bắt buộc, gửi `acceptedTerms=<version>`. `ConsentGate` ở `DashboardLayout`: nếu `GET /api/users/consents/status` trả `needsAccept` thì hiện hộp thoại chặn nhẹ yêu cầu đồng ý lại.
- [ ] Test: không tích thì không gửi được; đổi `version` trong `terms.ts` thì người dùng cũ thấy hộp thoại.

#### F-2.4/2.5: Quên mật khẩu, OTP, đổi email (HOÃN, chưa làm)

- [ ] Nối `ForgotPassword.tsx` với `POST /api/auth/forgot-password`; **luôn** hiện cùng một thông báo thành công; chống bấm liên tục (đếm ngược).
- [ ] Tạo `pages/ResetPassword.tsx` (`/reset-password?token=`): hai ô mật khẩu, thước đo độ mạnh, hết hạn/sai token hiện trạng thái rõ kèm nút "Gửi lại liên kết".
- [ ] Tạo `components/OtpInput.tsx` (6 ô, dán nhận cả 6 số, tự nhảy ô, `inputmode="numeric"`, `autocomplete="one-time-code"`, đếm ngược gửi lại).
- [ ] Mục "Đổi email" trong `AccountModal` và `AccountMobile`: nhập email mới (và mật khẩu hiện tại nếu có) → ô OTP → xác nhận; thành công thì thông báo và yêu cầu đăng nhập lại.

### 7.4 Pha 3 — thanh toán

- [ ] `Pricing` → `DashboardUpgrade` → `Checkout`: thêm **chọn phương thức** (VNPay, Chuyển khoản). VNPay thì gọi `POST /api/orders/{id}/pay` rồi `window.location = paymentUrl`.
- [ ] `/orders/:id` (trang kết quả): vì IPN bất đồng bộ, **thăm dò trạng thái mỗi 3 giây tối đa 60 giây**; hiện rõ `PENDING`/`PAID`/`FAILED`/`EXPIRED`. Không bao giờ tin tham số trên URL trả về; chỉ tin trạng thái từ `GET /api/orders/{id}`.
- [ ] `/home/billing`: lịch sử thanh toán thật từ `GET /api/payments` (ngày, gói, số tiền, trạng thái, mã giao dịch rút gọn).
- [ ] Mẫu bị khóa theo gói: giữ nút "Nâng cấp" như hiện tại, nhưng quyền thật do server quyết định.

### 7.5 Pha 4 — template mới (HOÃN, chưa làm)

Mỗi template là một chunk tải lười (`React.lazy`) để không làm nặng gói chính.

| | **Hệ mặt trời** (mỗi sao là một sự kiện) | **Game** |
|---|---|---|
| Ý tưởng | Mặt trời ở giữa là cặp đôi; các hành tinh/sao quay quanh theo thứ tự thời gian, sự kiện nổi bật có sao lớn hơn; chạm sao mở chi tiết | Giao diện kiểu HUD/nhiệm vụ: mỗi sự kiện là một "nhiệm vụ hoàn thành", điểm, huy hiệu mở khóa |
| Dữ liệu | Dùng nguyên `StoryData.timeline_block.events`; không đổi schema | Như bên trái |
| Kỹ thuật | SVG hoặc Canvas 2D (không thêm thư viện 3D), `requestAnimationFrame`, tạm dừng khi tab ẩn | Thành phần CSS/SVG, `framer-motion` đã có |
| Hiệu năng | Mục tiêu 60 fps trên máy tầm trung, tối đa 12 sao, giảm số hạt trên màn nhỏ | Như bên trái |
| Truy cập | Tôn trọng `prefers-reduced-motion` (hiện danh sách tĩnh), danh sách sự kiện dạng văn bản thay thế cho Canvas | Như bên trái |
| Đăng ký | Thêm dòng ở `V41`, ảnh vào `TEMPLATE_THUMBNAILS`, một nhánh ở `DynamicStoryTemplate` | Như bên trái |

Cần quyết định sản phẩm trước khi làm template Game: xem câu hỏi ở §10.

---

## 8. Danh sách việc theo gói (kiểm kê nhanh)

| Gói | Tên | Vai chủ trì | Ước lượng (ngày) | Phụ thuộc |
|---|---|---|---|---|
| 0.1–0.6 | Hotfix nền | Backend, System | 2 | — |
| 1.0 | ClientIpResolver + ràng cổng localhost | Backend, System | 1 | 0 |
| 1.1 | Request ID + api_logs | Backend, DBA | 2 | 1.0 |
| 1.2 | user_activity | Backend, DBA | 2 | 1.1 |
| 1.3 | Rate limit tổng quát | Backend | 2 | 1.0 |
| 1.4 + F-1.4 | Khóa chỉnh sửa | Backend, DBA, Frontend | 4 | 0.1 |
| 1.5 + F-1.5 | Chống spam, admin abuse, trang hoạt động | Backend, Frontend | 3 | 1.3, 1.2 |
| 1.6 | Ma trận IDOR | Backend | 2 | — |
| 1.7 | Siết upload và nhập liệu | Backend | 2 | — |
| 2.1–2.3 | Cookie, footer, pháp lý, đồng ý | Frontend, Backend, DBA | 5 | — |
| 2.4 | Quên mật khẩu (**hoãn**) | Backend, Frontend | (3) | 1.3 |
| 2.5 | OTP + đổi email (**hoãn**) | Backend, Frontend, DBA | (3) | 2.4 |
| 3.1–3.4 | VNPay + IPN + kích hoạt gói | Backend, DBA, Frontend | 8 | 2.3 (Terms/Refund), 1.2 |
| 3.5 | Kiểm soát gói, hết hạn | Backend | 2 | 3.4 |
| 4.x | Template Hệ mặt trời / Game (**hoãn**) | Frontend, DBA | (7–9 mỗi cái) | 3 |

Tổng ước tính (đã bỏ phần hoãn): Pha 0 ≈ 2 ngày, Pha 1 ≈ 18, Pha 2 ≈ 5, Pha 3 ≈ 10, tổng ≈ 35 ngày công cho 1 người; hai người làm song song Backend/Frontend rút còn khoảng 60%, tức ≈ 21 ngày. Phần hoãn nếu làm sau: WP-2.4 ≈ 3, WP-2.5 ≈ 3, Pha 4 ≈ 14–18.

**Quy tắc chuyển pha:** chỉ sang pha sau khi mọi mục "Exit" của pha trước đạt và `scripts/smoke-test.sh` xanh trên production.

---

## 9. Chiến lược kiểm thử và rủi ro

**Kiểm thử:** đơn vị (JUnit 5) cho mọi service mới; **ma trận IDOR** chạy trong CI; kiểm thử đồng thời (hai luồng) cho khóa chỉnh sửa và IPN; kiểm thử cổng thanh toán trên sandbox; kịch bản trình duyệt (headless) cho khóa chỉnh sửa, cookie consent, đặt lại mật khẩu; `smoke-test.sh` sau mỗi deploy; kiểm thử mobile 390px và desktop 1280px cho mọi màn hình mới.

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Khóa chỉnh sửa gây mất bài đang soạn | Cao | Chỉ đọc nhưng giữ nội dung, nút sao chép, TTL ngắn, cờ `FEATURE_EDIT_LOCK` bật dần |
| Rate limit chặn oan người dùng chung IP | Trung bình | Khóa theo user + IP thật; chỉ khóa tài khoản theo hành vi của chính nó; khóa tạm 15 phút, admin mở được |
| Mất log khi quá tải | Thấp | Hàng đợi có giới hạn, đếm `dropped`, cảnh báo |
| IPN giả mạo hoặc phát lại | Cao | HMAC‑SHA512, so số tiền với DB, `UNIQUE (provider, txn_ref)`, trạng thái chỉ đi tiến |
| Rò rỉ email tồn tại qua quên mật khẩu/đổi email | Trung bình | Phản hồi trung tính, làm việc băm giả khi không có user |
| Tin nhầm `CF-Connecting-IP` | Trung bình | Ràng cổng `127.0.0.1`, UFW, chỉ truy cập qua tunnel |
| Pháp lý chưa được luật sư duyệt | Cao (đối với bán hàng) | Chặn bật `FEATURE_VNPAY` ở production cho tới khi có bản duyệt |
| Migration lỗi trên production | Trung bình | Chỉ thêm, sao lưu trước, thử ở `staging`, `FlywayMigrationValidationTest` |
| Cấu hình Cloudflare/CORS lệch lần nữa | Trung bình | `smoke-test.sh` bắt buộc sau mỗi deploy |
| Chưa có quên mật khẩu/đổi email khi mở cho người dùng thật | Trung bình | Hướng dẫn liên hệ hỗ trợ, khuyến khích đăng nhập Google; làm WP-2.4 sớm nếu người quên mật khẩu tăng |

---

## 10. Câu hỏi cần bạn quyết định trước khi vào Pha tương ứng

1. **VNPay:** đã có tài khoản merchant (sandbox hay chính thức, đã đăng ký kinh doanh chưa)? Không có thì Pha 3 chạy tạm bằng chuyển khoản thủ công đang có, và tôi đề xuất thêm VietQR động thay vì VNPay.
2. **Pháp lý:** ai rà soát Điều khoản, Chính sách bảo mật, Hoàn tiền? Tôi đề xuất không bật thanh toán thật trước khi có bản duyệt.
3. **Thời gian lưu:** `api_logs` 30 ngày, `user_activity` 12 tháng, `abuse_events` 90 ngày có phù hợp chính sách bảo mật bạn muốn công bố không?
4. **Khóa tài khoản:** 10 Story/phút rồi khóa 15 phút có hợp lý, hay muốn khóa lâu hơn và cần admin duyệt mở?
5. **Template Game (hoãn cùng Pha 4, chưa cần trả lời):** dành cho "người chơi game" theo hướng nào: HUD/nhiệm vụ, pixel-art, hay chủ đề một tựa game cụ thể (cần kiểm tra bản quyền hình ảnh)? Cần chốt trước khi thiết kế.
6. **Turnstile (CAPTCHA không phiền):** có muốn bật cho `register` và `forgot-password` ngay từ đầu không?
7. **Môi trường staging:** có chấp nhận thêm `staging.couplestory.site` và một DB riêng không (tốn thêm một ít tài nguyên server)?

---

## 11. Bảng đối chiếu với `update 10082026.md`

| # | Hạng mục gốc | Pha | Gói |
|---|---|---|---|
| 1 | Cookie consent | 2 | F-2.1 |
| 2 | Footer | 2 | F-2.2 |
| 3 | Điều khoản và các chính sách | 2 | 2.1–2.3 / F-2.3 |
| 4 | Template Hệ mặt trời | 4 (**hoãn**) | §7.5, V41 |
| 5 | Template cho người chơi game | 4 (**hoãn**) | §7.5, V41 |
| 6 | Chống SQL Injection và Security checklist | 0 và 1 | 0.2–0.5, 1.6, 1.7 |
| 7 | Một phiên hoạt động / khóa chỉnh sửa | 0 và 1 | 0.1, 1.4 / F-1.4 |
| 8 | Log API và lịch sử người dùng | 1 | 1.1, 1.2 / F-1.5 |
| 9 | Chống spam tạo Story | 1 | 1.3, 1.5 / F-1.5 |
| 10 | Gửi OTP | 2 (**hoãn**) | 2.5 |
| 11 | Cập nhật lại email | 2 (**hoãn**) | 2.5 |
| 12 | Quên mật khẩu | 2 (**hoãn**) | 2.4 |
| 13 | Thanh toán | 3 | 3.1–3.5 |

---

## Tự rà soát

- **Độ phủ spec:** cả 13 hạng mục và các ý bổ sung trong file gốc (IDOR, file upload, path traversal, rate limiting, session security, audit log, "không unlock dựa vào frontend") đều có gói công việc, xem §11.
- **Đã bổ sung ngoài spec vì có bằng chứng trong code:** Task 0.1 (lỗ hổng phiên Google), 0.2 (swagger mở), 0.3 (log tham số SQL), 1.0 (IP thật sau Cloudflare), ràng cổng localhost.
- **Mức chi tiết:** Pha 0 và Pha 1 đã ở mức task có test và mã chính. Pha 2–4 ở mức gói công việc kèm giao diện (interface), API, ca kiểm thử và tiêu chí hoàn thành. **Trước khi bắt đầu mỗi pha 2, 3, 4, cần mở rộng thành task từng bước** (dùng lại `superpowers:writing-plans`) vì chi tiết còn phụ thuộc các quyết định ở §10.
- **Cập nhật 2026-10-08:** hạng mục 4, 5, 10, 11, 12 hoãn theo yêu cầu, xem "Phạm vi hiện tại". Pha 0 đã làm xong (6 task, đã push); bước tiếp theo là Pha 1.
- **Chưa kiểm chứng:** các con số ước lượng ngày công, danh sách nguồn trong CSP (cần chạy Report-Only để hiệu chỉnh), và việc `UserDetailsImpl.build(user)` lấy đúng `tokenVersion` mới sau `save` (kiểm bằng test ở Task 0.1).
