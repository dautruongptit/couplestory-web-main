# Cơ sở dữ liệu

Sở hữu: quy ước DB và bản đồ bảng theo domain. **Không chép cột**: nguồn thật là migration (`API_V2/src/main/resources/db/migration`, V1–V35) và entity (`API_V2/src/main/java/com/couplestory/entity`).

## Quy ước (CONFIRMED)
- PostgreSQL; Flyway tự áp migration khi khởi động; Hibernate `ddl-auto: validate` (lệch schema thì không khởi động).
- Chỉ thêm migration **mới** (số kế tiếp: **V36**); không sửa migration đã áp dụng. Số không cần liên tục (kế hoạch dành chỗ cho V36–V41).
- Khóa chính UUID (`gen_random_uuid()`); thời gian `TIMESTAMPTZ`; entity dùng `GenerationType.UUID`.
- Khóa lạc quan: `@Version` trên `Story`, `StoryEvent`, `FavoriteMoment`, `StoryMessage` (V15). Xung đột → 409.
- Xóa mềm cho Story (`status = 'DELETED'`, `deleted_at`).
- Profile `dev`/`test`: README cũ nói dùng H2 — **sai với dev** (xem `current-state.md`); profile `test` dùng H2 `create-drop`, tắt Flyway.
- **Cảnh báo:** `API_V2/.env` trên máy dev trỏ DB thật của server (`CLAUDE.md`).
- Dữ liệu cấu hình sống trong DB: `plans`, `templates`, `roles`, `music_tracks`. Migration chỉ là giá trị khởi tạo.

## Bản đồ bảng
| Domain | Bảng | Ghi chú |
|---|---|---|
| Tài khoản | `users`, `roles`, `user_roles` | `users.plan_type`, `token_version`, `status` |
| Phiên và thiết bị | `devices` (đang dùng), `refresh_tokens` (chỉ `SessionController` đọc, không ai ghi) | |
| Story | `stories`, `story_events`, `story_messages`, `favorite_moments` | `story_sections` đã bị xóa ở V14 |
| Ảnh và nhạc | `photos` (owner_type/owner_id tổng quát), `music_tracks`, `story_music` | `media_assets` đã thay bằng `photos` (V11) |
| Gói và đơn | `plans`, `orders` | |
| Template | `templates` | Xem `template-system.md` |
| Cộng tác | `story_collaborators` | Chưa dùng được (`business-rules.md` mục 5) |
| Thông báo | `notifications` | |
| Quan sát | `api_logs` (V34, giữ 30 ngày), `user_activity` (V35) | Xem `architecture.md` mục 4 |
| **Không dùng** | `subscriptions`, `payments`, `auth_tokens` | Có bảng và entity nhưng không có code dùng (CONFIRMED). Kế hoạch dùng lại `auth_tokens` cho quên mật khẩu/OTP (hoãn) |

## Dữ liệu và hạn giữ (CONFIRMED trừ khi ghi khác)
- `api_logs`: xóa sau 30 ngày (job hằng ngày).
- `user_activity`: **chưa có job xóa**; dự kiến giữ 12 tháng (UNKNOWN: người dùng chưa chốt).
- `orders`: khóa ngoại tới `users` có `ON DELETE CASCADE`.

## Dữ liệu nhạy cảm (CONFIRMED từ entity/migration)
`users.password_hash`, `users.token_version`, `users.google_sub`; `story_collaborators.invite_token_hash`; địa chỉ IP và user-agent trong `devices`, `api_logs`, `users.last_login_ip`. Quy tắc: không ghi password, token, JWT, header, body vào log hay bảng audit; không đưa IP/UA vào thông báo người dùng.

## Việc cần lưu ý
- `FlywayMigrationValidationTest` lỗi thời và đỏ (nhắc tới bảng/thư mục không còn): cần viết lại, xem `current-state.md`.
- `DOC/migration/V1–V15` là bản sao cũ; **không** dùng. Migration thật nằm trong API_V2.
