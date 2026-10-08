> **LỖI THỜI — chỉ để tham khảo lịch sử.** Không dùng làm chuẩn. Bản BA Master, phiên bản trước `ba-master-v2-latest.md`. Sai ở: tên gói, quota, thời hạn TRIAL 7 ngày, kiến trúc Next.js. Tài liệu hiện hành: `documentation/` (bắt đầu từ `README.md`). Chuyển từ `DOC/` ngày 2026-10-08, nội dung giữ nguyên bên dưới.

---

# CoupleStory — Tài liệu Phân tích Nghiệp vụ (BA Master Document)

> Nền tảng tạo website kỷ niệm tình yêu, kiến trúc multi-tenant.
> Stack: React/TS + Spring Boot + PostgreSQL + Docker + Cloudflare Tunnel.
>
> **Nguyên tắc cốt lõi:**
> - Database lưu nội dung câu chuyện. Template quyết định cách kể câu chuyện đó.
> - 1 Backend — 1 Database — N Couple Story — N Template.
> - Đổi Template không làm mất bất kỳ dữ liệu nào.

---

## MỤC LỤC

1. Actor & Role
2. Plan / Tier
3. Vòng đời Website
4. Tính năng Partner Invite (gói COUPLE)
5. Template Architecture
6. Quản lý ảnh — Media Library
7. Album
8. Notification
9. Roadmap
10. Data Model tổng thể
11. Checklist review Source Code

---

## 1. Actor & Role

| Role | Mô tả | Phase |
|---|---|---|
| `GUEST` | Chưa đăng nhập — chỉ xem story đã publish qua subdomain | Phase 1 |
| `USER` | Đã đăng ký — tạo/quản lý story của mình | Phase 1 |
| `ADMIN` | Quản trị hệ thống — quản lý user, duyệt/khóa story vi phạm | Phase 2-3 |

### Ma trận quyền

| Hành động | GUEST | USER | ADMIN |
|---|:---:|:---:|:---:|
| Xem story đã publish | ✅ | ✅ | ✅ |
| Tạo Couple Story | ❌ | ✅ (theo quota) | ✅ |
| Sửa/xóa story của mình | ❌ | ✅ | ✅ |
| Sửa/xóa story người khác | ❌ | ❌ | ✅ |
| Quản lý toàn hệ thống | ❌ | ❌ | ✅ |

> Phase 1: dùng enum trong bảng `users`, check bằng `@PreAuthorize("hasRole('ADMIN')")`.
> Chưa cần RBAC phức tạp — chỉ nâng cấp khi có nhiều cấp Admin thật sự.

---

## 2. Plan / Tier

**Nguyên tắc:** Plan gắn với **từng Website**, không gắn với User.
Một user có thể có nhiều web ở nhiều plan khác nhau cùng lúc.

**Quyết định:** `PERMANENT` và `COUPLE` tồn tại **song song** — không thay thế nhau.
`COUPLE` có giá **cao hơn** `PERMANENT`.

| Plan | Thời hạn | Partner Invite | Đặc điểm |
|---|---|:---:|---|
| `TRIAL` | 7 ngày kể từ **publish** | ❌ | Mặc định khi tạo; giới hạn ảnh/template cơ bản; có watermark |
| `PERMANENT` | Vĩnh viễn | ❌ | Không giới hạn thời gian, 1 người quản lý |
| `COUPLE` ⭐ | Vĩnh viễn | ✅ **(cốt lõi)** | Mời Partner; không watermark; template riêng cho Couple |
| `PRO` | Vĩnh viễn | ✅ | Custom domain, animation nâng cao, không giới hạn ảnh |

### Upgrade Trigger (UX)

```
User đang ở TRIAL/PERMANENT
      ↓
Vào Story Settings → thấy "Mời người yêu" (bị khóa 🔒)
      ↓
Click → Modal: "Nâng cấp lên gói COUPLE để cùng nhau tạo story 💑"
      ↓
Thanh toán → plan_type = COUPLE → Mở khóa Partner Invite
```

### Giới hạn tính năng theo Plan

| Tính năng | TRIAL | PERMANENT | COUPLE | PRO |
|---|:---:|:---:|:---:|:---:|
| Thời hạn | 7 ngày | Vĩnh viễn | Vĩnh viễn | Vĩnh viễn |
| Số ảnh tối đa | 10 | 50 | 50 | Không giới hạn |
| Size file tối đa | 5MB | 10MB | 10MB | 15MB |
| Template cơ bản | ✅ | ✅ | ✅ | ✅ |
| Template COUPLE riêng | ❌ | ❌ | ✅ | ✅ |
| Watermark CoupleStory | ✅ | ❌ | ❌ | ❌ |
| Partner Invite | ❌ | ❌ | ✅ | ✅ |
| Custom domain | ❌ | ❌ | ❌ | ✅ |
| Animation nâng cao | ❌ | ❌ | ❌ | ✅ |

### Quota cấp User

- Giới hạn **3 website/user**.
- Tính cả website `hidden` — chỉ khi **hard delete** (`status = deleted`) mới không tính.

```sql
SELECT COUNT(*) FROM websites
WHERE user_id = ? AND status != 'deleted'
```

---

## 3. Vòng đời Website

### Trạng thái (`status`)

| Status | Ý nghĩa | Guest xem? | Owner xem/sửa? | Tính quota? |
|---|---|:---:|:---:|:---:|
| `draft` | Chưa publish lần nào | ❌ | ✅ | ✅ |
| `published` | Đang công khai | ✅ | ✅ | ✅ |
| `hidden` | Hết hạn trial, ẩn (soft delete) | ❌ (404) | ✅ | ✅ |
| `deleted` | Hard delete thật (thông báo trước) | ❌ | ❌ | ❌ |

> Guest truy cập web `status != published` → luôn trả 404.
> Không phân biệt draft/hidden trong response để tránh lộ thông tin.

### Luồng vòng đời

```
Tạo mới → DRAFT
      ↓ publish
PUBLISHED (TRIAL, expires_at = published_at + 7 ngày)
      ↓
   ┌──────────────────┴──────────────────┐
   │                                      │
Nâng cấp trước hạn                  Hết hạn
   │                                      │
   ▼                                      ▼
PUBLISHED (PERMANENT/COUPLE/PRO)   Gửi cảnh báo (warning_sent_at)
                                          ↓
                                   status = HIDDEN
                                          ↓
                                   User nâng cấp bất kỳ lúc nào
                                          ↓
                                   status = PUBLISHED
```

### Business rule: gỡ Partner khi downgrade

Khi `plan_type` đổi khỏi `(COUPLE, PRO)`:
```sql
UPDATE website_collaborators
SET status = 'removed'
WHERE website_id = ? AND status = 'accepted'
```
→ Gửi notification cho Partner: "Bạn đã bị gỡ quyền do Story chuyển gói."

---

## 4. Tính năng Partner Invite (gói COUPLE)

### Use Case

| ID | Use Case | Actor |
|---|---|---|
| UC-12 | Mời đối tác vào Story | Owner |
| UC-13 | Chấp nhận lời mời | Partner |
| UC-14 | Chỉnh sửa Story (quyền Partner) | Partner |
| UC-15 | Gỡ quyền đối tác | Owner |
| UC-16 | Chuyển quyền Owner cho Partner | Owner |
| UC-17 | Cấu hình quyền Publish cho Partner | Owner |

**UC-12 — Mời đối tác:**
1. Owner vào Story Settings → "Mời người yêu cùng chỉnh sửa".
2. Check `plan_type IN (COUPLE, PRO)` → nếu không: hiện CTA nâng cấp.
3. Check Story đã có Partner chưa (tối đa 1 Partner/story).
4. Tạo record `website_collaborators` (status=`pending`) → gửi email mời kèm token.
5. Link mời hết hạn sau 7 ngày.

**UC-16 — Chuyển quyền Owner:**
- Giới hạn **1 lần/tuần** — tránh tranh chấp qua lại liên tục.
- Check `owner_transferred_at`: nếu `now() - owner_transferred_at < 7 ngày` → chặn.

**UC-17 — Cấu hình quyền Publish:**
- Owner bật/tắt `allow_partner_publish` trong Story Settings.
- Mặc định: `false` (Partner không được Publish).

### Ma trận quyền Owner vs Partner

| Hành động | OWNER | PARTNER |
|---|:---:|:---:|
| Sửa nội dung/ảnh/timeline | ✅ | ✅ |
| Chọn/đổi Template | ✅ | ✅ |
| Publish/Unpublish | ✅ | Theo `allow_partner_publish` |
| Mời thêm người khác | ✅ | ❌ |
| Gỡ quyền Partner | ✅ | ❌ |
| Xóa Story | ✅ | ❌ |
| Nâng cấp Plan / Thanh toán | ✅ | ❌ |
| Chuyển quyền Owner (1 lần/tuần) | ✅ | ❌ (chỉ nhận) |
| Tự rời khỏi Story | — | ✅ |

---

## 5. Template Architecture

### Nguyên tắc cốt lõi

```
Data defines WHAT the story contains.
Template defines HOW the story is told.
```

### Kiến trúc phân tầng

```
DATABASE / DATA MODEL        ← Không thay đổi theo Template
        ↓
SHARED CONTENT CONTRACT      ← Định nghĩa các loại content CoupleStory hỗ trợ
        ↓
DESIGN SYSTEM FOUNDATION     ← Nguyên tắc UX/UI dùng chung (responsive, a11y...)
        ↓
TEMPLATE PRESENTATION        ← Mỗi Template sáng tạo riêng (layout, màu, font...)
        ↓
PUBLIC LOVE STORY UI
```

### Shared Content Contract

Các loại nội dung dùng chung cho tất cả Template:

| Content | Bảng DB | Ghi chú |
|---|---|---|
| Couple | `websites` | couple_name_1, couple_name_2, start_date |
| Hero | `photos` + `websites` | cover_photo_id + couple info |
| Timeline | `website_events` | Đã có |
| Gallery | `photos` (Media Library) | Đã có |
| Favorite Moments | `favorite_moments` | **Cần tạo mới** |
| Love Letter | `website_messages` (type='love_letter') | Dùng type field |
| Final Message | `website_messages` (type='final_message') | Dùng type field |

> `Love Letter` và `Final Message` dùng chung bảng `website_messages` với field `type` để phân biệt — không tạo 2 bảng riêng, tránh phình schema.

### Template switching

```sql
-- Chỉ cần update 1 field, không copy/migrate bất kỳ data nào
UPDATE websites
SET template_code = 'polaroid-memories',
    template_config = '{}' -- reset về default config của template mới
WHERE id = ?;
```

### Nguyên tắc Template

**Giống nhau giữa tất cả Template:**
- Data Model & Content Contract
- Media relationship
- Template switching mechanism
- Accessibility & Responsive principles
- Core UX principles

**Khác nhau — Template được phép sáng tạo riêng:**
- Visual identity, Layout, Section order
- Storytelling style, Typography, Color palette
- Hero design, Image treatment
- Timeline & Gallery presentation
- Navigation, Animation

### Template KHÔNG được phép

- Tạo field DB riêng chỉ phục vụ 1 Template (VD: `luxury_wedding_venue`, `polaroid_caption`).
- Sở hữu ảnh riêng — tất cả ảnh đều từ Media Library.
- Yêu cầu user nhập lại dữ liệu khi đổi Template.

### `template_config` — chỉ chứa presentation config

```json
{
  "template": "luxury-wedding",
  "config": {
    "showWeddingDetails": true,
    "showVenue": true,
    "showRsvp": true
  }
}
```

> Lưu dạng `JSONB` trong PostgreSQL — linh hoạt, không cần tạo cột riêng cho từng template.
> **Reset `template_config` về `{}` khi user đổi sang template khác.**

### 10 Template dự kiến & thứ tự ưu tiên

| Phase | Template code | Style | Độ phức tạp |
|---|---|---|---|
| Phase 1 (MVP) | `minimal-couple` | Minimal / Editorial | Thấp |
| Phase 1 (MVP) | `eternal-love` | Elegant / Luxury | Thấp-Vừa |
| Phase 2 | `our-journey` | Journey / Cinematic | Vừa |
| Phase 2 | `love-letter` | Letter / Romantic | Vừa |
| Phase 2 | `polaroid-memories` | Scrapbook / Playful | Vừa |
| Phase 3 | `soft-blossom` | Soft / Floral | Cao |
| Phase 3 | `cinematic-love` | Cinematic / Dramatic | Cao |
| Phase 3 | `vintage-romance` | Vintage / Film | Cao |
| Phase 3 | `night-romance` | Dark / Romantic | Cao |
| Phase 3 | `luxury-wedding` | Wedding / Luxury | Cao nhất |

> Phase 1 chỉ cần 2 template — đủ để kiểm chứng Content Contract hoạt động đúng,
> trước khi đầu tư làm các template phức tạp hơn.

### Functional Requirements — Template

| ID | Requirement |
|---|---|
| FR-TEMPLATE-01 | User có thể chọn Template cho Website |
| FR-TEMPLATE-02 | User có thể thay đổi Template bất kỳ lúc nào |
| FR-TEMPLATE-03 | Thay đổi Template không làm thay đổi Story Data |
| FR-TEMPLATE-04 | Thay đổi Template không làm mất Media |
| FR-TEMPLATE-05 | Thay đổi Template không yêu cầu nhập lại nội dung |
| FR-TEMPLATE-06 | Các Template sử dụng chung Content Contract |
| FR-TEMPLATE-07 | Mỗi Template được phép có UI, Layout, Storytelling khác nhau |
| FR-TEMPLATE-08 | Template chỉ quyết định Presentation, không sở hữu Story Data |
| FR-TEMPLATE-09 | User có thể **preview** story với template khác trước khi chính thức đổi |

### Acceptance Criteria — Template

**AC-01: Template Switching không mất data**
- Khi đổi template_code → Story, Timeline, Gallery, Media, Favorite Moments, Love Letter, Final Message vẫn còn nguyên.

**AC-02: Không duplicate data**
- Không tạo Story mới, không copy Media/Timeline/Gallery khi đổi template.

**AC-03: UI khác nhau, data chung**
- 2 Template có thể khác hoàn toàn về layout/typography/màu/animation nhưng dùng chung 1 Story Data.

**AC-04: Optional content — Template tự thích nghi**
- Nếu Story không có một section tùy chọn → Template ẩn section đó, không hiển thị broken UI, không tạo dữ liệu giả.

---

## 6. Quản lý ảnh — Media Library

### Quyết định kiến trúc

- Không lưu ảnh trong DB (BLOB) — chỉ lưu metadata.
- MVP: **Docker Volume** → khi scale: **Cloudflare R2 / S3**.
- Bắt buộc resize + compress ngay từ MVP — dùng `Thumbnailator` (Java), convert sang **WebP**.
- Mô hình **Media Library**: upload hàng loạt vào kho ảnh chung, sau đó chọn ảnh khi làm Cover/Timeline/Gallery/Album.
- Vẫn cho phép upload bổ sung tại bất kỳ bước nào — không ép quay về bước đầu.
- Schema generic (`owner_type/owner_id`) — chuẩn bị tái sử dụng cho các dự án khác (TripTravel...).

### Luồng xử lý Upload

```
Upload ảnh gốc
      ↓
Validate (MIME type thật, size limit, quota theo Plan)
      ↓
Resize max-width 1920px + Generate thumbnail (400px)
      ↓
Compress + Convert WebP
      ↓
Tên file = UUID
      ↓
Lưu file → Storage (/data/photos/{owner_type}/{owner_id}/{uuid}.webp)
      ↓
Lưu metadata → DB (photos)
```

### Template và ảnh

Cùng 1 ảnh, Template quyết định cách hiển thị:
- `eternal-love` → Large editorial photograph
- `polaroid-memories` → Polaroid card
- `cinematic-love` → Full-screen cinematic scene
- `vintage-romance` → Film-style photograph

---

## 7. Album

### Định nghĩa (phân biệt với Media Library)

| | Media Library | Album |
|---|---|---|
| Bản chất | Kho ảnh gốc, phẳng — mọi ảnh upload đều ở đây | Bộ sưu tập có chủ đề, gom tập con ảnh từ Library |
| Ví dụ | Toàn bộ 80 ảnh đã upload | "Chuyến Đà Lạt 2025" (15 ảnh), "Sinh nhật em" (8 ảnh) |
| Tiêu đề/mô tả | Không | Có (title, description, cover ảnh đại diện) |
| 1 ảnh nhiều nơi | Là nguồn gốc duy nhất | 1 ảnh có thể thuộc nhiều Album |
| Hiển thị Public Story | Nguồn chọn ảnh cho Cover/Timeline | Hiển thị như 1 section riêng ("chương kỷ niệm") |

> Album đưa vào **Phase 2** — Phase 1 chỉ cần Media Library phẳng là đủ.

---

## 8. Notification

### Yêu cầu
- Kênh: **Email** + **Bell icon** (chuông) góc **trên-trái** giao diện, kèm badge số chưa đọc.

### Các loại thông báo

| Type | Mô tả | Phase |
|---|---|---|
| `TRIAL_EXPIRING` | Trial sắp hết hạn (VD: còn 24h) | Phase 1 |
| `TRIAL_EXPIRED` | Trial đã hết hạn, story bị ẩn | Phase 1 |
| `INVITE_RECEIVED` | Nhận lời mời làm Partner | Phase 1 |
| `PARTNER_JOINED` | Partner đã chấp nhận lời mời | Phase 1 |
| `PARTNER_REMOVED` | Bị gỡ quyền Partner (do downgrade plan) | Phase 1 |
| `OWNER_TRANSFERRED` | Chuyển quyền Owner thành công | Phase 1 |
| `PARTNER_ACTIVITY` | Partner vừa thêm ảnh/timeline mới | Phase 2 |

### Luồng gửi

```
Trigger event (cron job / action của user)
      ↓
Ghi vào bảng notifications (in-app)  ←→  Gửi Email (song song)
      ↓
Frontend polling 30-60s (Phase 1)
      ↓
Cập nhật badge số chưa đọc trên Bell icon
      ↓
(Phase 2) Nâng cấp WebSocket/SSE cho real-time
```

---

## 9. Roadmap

### Phase 1 — MVP (launch cho bạn bè beta test trước)

```
├── User / Account (đăng ký, đăng nhập)
├── Story (tạo, sửa, publish/unpublish, soft delete)
├── Template (2 template: minimal-couple + eternal-love)
├── Media Library (upload, resize, compress, chọn ảnh)
├── Public Story (xem qua subdomain, multi-tenant resolver)
├── Partner Invite — gói COUPLE ⭐
├── Notification (Email + Bell icon)
└── Plan: TRIAL + PERMANENT + COUPLE
     Nâng cấp thủ công qua Admin trong giai đoạn beta
     (bạn bè: gán COUPLE/PERMANENT miễn phí thủ công)
```

### Phase 2 — Personalization + Monetization

```
├── Album (bộ sưu tập theo chủ đề)
├── Favorite Moments
├── Love Letter / Final Message editor nâng cao
├── Music nền, Animation, Countdown ngày kỷ niệm
├── Thêm 3 Template (our-journey, love-letter, polaroid-memories)
├── Thanh toán tự động (VNPay/Momo/Stripe...)
├── Chính thức hoá đủ tier: TRIAL / PERMANENT / COUPLE / PRO
├── Quảng cáo cho tier thấp / tắt cho tier trả phí
├── Ad placement / Ad analytics
└── Direct sponsor / quảng cáo đối tác
```

### Phase 3 — Growth

```
├── 5 Template còn lại (cinematic, vintage, night, soft-blossom, luxury-wedding)
├── Referral & Affiliate
├── Marketplace Template
├── Custom Domain (gói PRO)
└── Business / Wedding package
```

---

## 10. Data Model tổng thể

```
users
 ├── id
 ├── email
 ├── password_hash
 ├── role               (USER / ADMIN)
 └── created_at

websites
 ├── id
 ├── user_id                     (Owner hiện tại)
 ├── subdomain
 ├── status                       (draft / published / hidden / deleted)
 ├── plan_type                    (TRIAL / PERMANENT / COUPLE / PRO)
 ├── template_code                (VD: 'eternal-love')
 ├── template_config              (JSONB — presentation config, reset khi đổi template)
 ├── allow_partner_publish        (BOOLEAN, default: false)
 ├── owner_transferred_at         (nullable — lần chuyển Owner gần nhất)
 ├── expires_at                   (nullable — null nếu Permanent/Couple/Pro)
 ├── published_at                 (mốc tính 7 ngày TRIAL)
 ├── warning_sent_at              (nullable — chống gửi cảnh báo trùng)
 └── created_at

website_collaborators
 ├── id
 ├── website_id         (FK → websites)
 ├── user_id             (FK → users, nullable nếu chưa accept)
 ├── email               (match khi user đăng ký/login)
 ├── role                (PARTNER)
 ├── status              (pending / accepted / removed)
 ├── invite_token
 ├── invited_at
 ├── accepted_at
 └── expires_at          (hạn lời mời: +7 ngày)

photos                   (Media Library — generic, dùng lại được)
 ├── id
 ├── owner_type          ('WEBSITE' — chuẩn bị mở rộng)
 ├── owner_id
 ├── url
 ├── thumbnail_url
 ├── filename_original
 ├── filename_stored     (UUID)
 ├── size_bytes
 ├── mime_type
 ├── order
 └── created_at

website_events           (Timeline)
 ├── id
 ├── website_id
 ├── title
 ├── event_date
 ├── description
 ├── photo_id             (FK → photos, nullable)
 └── order

website_messages         (Love Letter + Final Message)
 ├── id
 ├── website_id
 ├── type                 ('love_letter' / 'final_message')
 ├── content
 └── created_at

favorite_moments
 ├── id
 ├── website_id
 ├── title
 ├── description
 ├── photo_id             (FK → photos, nullable)
 ├── order
 └── created_at

albums                   (Phase 2)
 ├── id
 ├── website_id
 ├── title
 ├── description
 ├── cover_photo_id       (FK → photos)
 ├── order
 └── created_at

album_photos             (Phase 2 — many-to-many)
 ├── id
 ├── album_id
 ├── photo_id             (FK → photos)
 └── order

notifications
 ├── id
 ├── user_id              (người nhận)
 ├── type                 (TRIAL_EXPIRING / TRIAL_EXPIRED / INVITE_RECEIVED /
 │                         PARTNER_JOINED / PARTNER_REMOVED / OWNER_TRANSFERRED / ...)
 ├── title
 ├── content
 ├── related_website_id   (nullable, FK → websites)
 ├── is_read              (default: false)
 └── created_at

upgrades                 (lịch sử nâng cấp / thanh toán — Phase 2)
 ├── id
 ├── website_id
 ├── from_plan
 ├── to_plan
 ├── amount
 ├── paid_at
 └── payment_method
```

---

## 11. Checklist review Source Code

Dùng khi đối chiếu code thực tế với BA:

### Schema & Data Model
- [ ] `websites` có đủ cột: `status`, `plan_type`, `template_code`, `template_config` (JSONB), `allow_partner_publish`, `owner_transferred_at`, `expires_at`, `published_at`, `warning_sent_at`
- [ ] `website_messages` có field `type` để phân biệt `love_letter` vs `final_message`
- [ ] `favorite_moments` đã tạo bảng
- [ ] `photos` dùng `owner_type/owner_id` (generic), không hardcode `website_id`
- [ ] Quota 3 web/user filter đúng `status != 'deleted'`

### Multi-tenant
- [ ] Tenant resolver đọc subdomain từ `Host` header, không hardcode
- [ ] Guest chỉ thấy `status = published`, trả 404 cho các status khác (không phân biệt draft/hidden trong response)

### Partner & Collaborator
- [ ] Check `plan_type IN (COUPLE, PRO)` trước khi cho phép mời Partner
- [ ] Giới hạn đúng 1 Partner/website khi tạo lời mời
- [ ] Logic gỡ Partner tự động khi downgrade plan (scheduled job/trigger)
- [ ] Giới hạn chuyển Owner 1 lần/tuần bằng `owner_transferred_at`
- [ ] `allow_partner_publish` được check đúng trước khi Partner bấm Publish

### Template
- [ ] Đổi template chỉ update `template_code` + reset `template_config`, không động đến data khác
- [ ] Template không lưu data riêng vào DB (không có field `template-specific`)
- [ ] Frontend xử lý gracefully khi section không có data (ẩn section, không broken UI)
- [ ] Template Preview (FR-TEMPLATE-09) không thay đổi `template_code` thật trong DB

### Media & Upload
- [ ] Validate MIME type thật (đọc header, không chỉ dựa extension)
- [ ] Check quota theo Plan **trước** khi resize/compress
- [ ] Resize max-width 1920px + thumbnail 400px song song
- [ ] Tên file UUID, path: `/data/photos/{owner_type}/{owner_id}/{uuid}.webp`
- [ ] Transaction: upload Storage fail → rollback, tránh orphan file

### Notification
- [ ] Bảng `notifications` đã tạo
- [ ] Cron job gửi cảnh báo TRIAL trước khi hết hạn (`TRIAL_EXPIRING`)
- [ ] Cron job xử lý TRIAL hết hạn → `status = hidden` + ghi notification + gửi email
- [ ] Bell icon hiển thị đúng số `is_read = false`

---

*Tài liệu này là nguồn sự thật duy nhất (Single Source of Truth) cho BA của CoupleStory.*
*Cập nhật mỗi khi có quyết định nghiệp vụ hoặc kiến trúc mới được thống nhất.*
