> **LỖI THỜI — chỉ để tham khảo lịch sử.** Không dùng làm chuẩn. Bản BA đầu tiên (nhỏ nhất). Sai ở: tên gói (TRIAL/PERMANENT/COUPLE/PRO), quota 3 website/user, "website" thay cho "story". Tài liệu hiện hành: `documentation/` (bắt đầu từ `README.md`). Chuyển từ `DOC/` ngày 2026-10-08, nội dung giữ nguyên bên dưới.

---

# CoupleStory — Tổng hợp Phân tích Nghiệp vụ (BA Summary)

> Tài liệu tổng hợp từ quá trình phân tích nghiệp vụ giai đoạn đầu dự án CoupleStory — nền tảng tạo website kỷ niệm tình yêu, kiến trúc multi-tenant (React/TS + Spring Boot + PostgreSQL + Docker + Cloudflare Tunnel).
>
> **Cập nhật lần cuối:** đã chốt toàn bộ Open Questions (mục 6) + bổ sung Album, Notification.

---

## 1. Actor & Role

| Role | Mô tả | Phase |
|---|---|---|
| `GUEST` | Chưa đăng nhập — chỉ xem story đã publish | Phase 1 |
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

Phase 1: dùng enum đơn giản trong bảng `users`, check bằng `@PreAuthorize("hasRole('ADMIN')")` — chưa cần RBAC phức tạp.

---

## 2. Plan / Tier (gắn với Website, không gắn với User)

**Nguyên tắc quan trọng:** Plan áp dụng theo **từng Website**, vì 1 user có thể sở hữu nhiều web ở nhiều plan khác nhau.

**Quyết định:** `PERMANENT` và `COUPLE` **tồn tại song song** — không thay thế nhau. `COUPLE` có giá **cao hơn** `PERMANENT`.

| Plan | Thời hạn | Partner Invite | Giá (tương đối) | Đặc điểm |
|---|---|:---:|:---:|---|
| `TRIAL` | 7 ngày kể từ **publish** | ❌ | Miễn phí | Mặc định khi tạo mới; giới hạn ảnh/template cơ bản; có watermark |
| `PERMANENT` | Vĩnh viễn | ❌ | Mức cơ bản | Không giới hạn thời gian, 1 người quản lý |
| **`COUPLE`** ⭐ | Vĩnh viễn | ✅ **(tính năng cốt lõi)** | **Cao hơn PERMANENT** | Mời Partner cùng quản lý; không watermark; template riêng cho Couple |
| `PRO` *(tùy chọn mở rộng)* | Vĩnh viễn | ✅ (kế thừa Couple) | Cao nhất | Custom domain, animation nâng cao, không giới hạn ảnh |

### Quota cấp User (không phải Plan)
- Giới hạn **3 website/user**.
- **Quyết định:** Quota **tính cả website `hidden`**. Chỉ khi website bị **hard delete** thật sự (`status = deleted`) mới không tính vào quota.

```sql
-- Đếm quota
SELECT COUNT(*) FROM websites 
WHERE user_id = ? AND status != 'deleted'
```

### Vòng đời Plan

```
TRIAL (7 ngày kể từ publish)
   ↓ hết hạn, chưa nâng cấp
Gửi cảnh báo trước hạn (VD: còn 24h) → warning_sent_at
   ↓
Hết hạn → status = HIDDEN (soft delete, giữ nguyên data, không xóa cứng)
   ↓ user nâng cấp bất kỳ lúc nào
status = PUBLISHED, plan_type = PERMANENT / COUPLE / PRO
```

### Trạng thái Website (`status`)

| Status | Ý nghĩa | Guest xem được? | Owner xem/sửa được? | Tính vào quota? |
|---|---|:---:|:---:|:---:|
| `draft` | Chưa publish lần nào | ❌ | ✅ | ✅ |
| `published` | Đang công khai | ✅ | ✅ | ✅ |
| `hidden` | Hết hạn trial, đã ẩn (soft delete) | ❌ (404) | ✅ | ✅ |
| `deleted` | Hard delete thật (đã thông báo trước cho user) | ❌ | ❌ | ❌ |

Guest truy cập web `status != published` → luôn trả 404 (không phân biệt draft/hidden, tránh lộ thông tin).

### Business rule: gỡ Partner khi downgrade/hết hạn COUPLE

**Quyết định:** Khi Owner bị mất quyền `COUPLE`/`PRO` (downgrade hoặc hết hạn) → **gỡ quyền Partner ngay lập tức**, không có thời gian ân hạn.

```
Trigger khi plan_type đổi khỏi (COUPLE, PRO):
  → UPDATE website_collaborators SET status = 'removed' 
    WHERE website_id = ? AND status = 'accepted'
  → Gửi notification cho Partner: "Bạn đã bị gỡ quyền do Story chuyển gói"
```

---

## 3. Tính năng cốt lõi: Mời Partner cùng quản lý Story (gói COUPLE)

### Ý tưởng sản phẩm
Biến "mời người yêu cùng làm story" thành **động lực nâng cấp (upgrade trigger)** chính — chỉ mở khóa khi Plan = `COUPLE` (hoặc `PRO`). Đây là paywall theo tính năng, dễ hiểu giá trị hơn so với giới hạn mơ hồ (VD: giới hạn số ảnh).

### Use Case

| ID | Use Case | Actor |
|---|---|---|
| UC-12 | Mời đối tác vào Story | Owner |
| UC-13 | Chấp nhận lời mời | Partner |
| UC-14 | Chỉnh sửa Story (quyền Partner) | Partner |
| UC-15 | Gỡ quyền đối tác | Owner |
| UC-16 | Chuyển quyền Owner cho Partner | Owner |
| UC-17 | Owner cấu hình quyền Publish cho Partner | Owner |

**UC-12 — Mời đối tác:**
1. Owner vào Story Settings → "Mời người yêu cùng chỉnh sửa" (chỉ hiện nếu `plan_type IN (COUPLE, PRO)`, ngược lại hiện CTA nâng cấp).
2. Nhập email đối tác → check Story đã có Partner chưa (giới hạn 1 Partner/story).
3. Tạo record `website_collaborators` (status=`pending`) → gửi email mời kèm token.

**UC-13 — Chấp nhận lời mời:** Click link → đăng ký (nếu chưa có tài khoản) hoặc login → xác nhận → `status = accepted`.

**UC-15 — Gỡ quyền:** Owner gỡ Partner → mất quyền truy cập ngay lập tức.

**UC-16 — Chuyển quyền Owner (quyết định mới):**
- Owner có quyền chuyển vai trò Owner sang Partner.
- **Giới hạn: chỉ 1 lần/tuần** — tránh lạm dụng/tranh chấp qua lại liên tục.
```
Khi request "Chuyển quyền Owner":
  → Check: now() - websites.owner_transferred_at < 7 ngày ?
  → Có → chặn, báo "Chỉ được chuyển quyền Owner 1 lần/tuần"
  → Không → hoán đổi user_id (Owner mới) và role trong website_collaborators
           → update owner_transferred_at = now()
```

**UC-17 — Cấu hình quyền Publish cho Partner (quyết định mới):**
- Owner **tự quyết định** (bật/tắt) việc Partner có được bấm Publish hay không — không cố định cứng.
```
websites.allow_partner_publish   (BOOLEAN, default: false)
```
Khi `false`: nút Publish bị khóa với Partner, chỉ Owner thấy được.

### Ma trận quyền Owner vs Partner (cập nhật)

| Hành động | OWNER | PARTNER |
|---|:---:|:---:|
| Sửa nội dung/ảnh/timeline | ✅ | ✅ |
| Chọn/đổi Template | ✅ | ✅ |
| Publish/Unpublish | ✅ | Theo `allow_partner_publish` (Owner cấu hình) |
| Mời thêm người khác | ✅ | ❌ |
| Gỡ quyền Partner | ✅ | ❌ |
| Xóa Story | ✅ | ❌ |
| Nâng cấp Plan / Thanh toán | ✅ | ❌ |
| Chuyển quyền Owner (1 lần/tuần) | ✅ | ❌ (chỉ nhận) |
| Tự rời khỏi Story | — | ✅ |

### Data Model

```
websites
 ├── id
 ├── user_id                    (Owner hiện tại)
 ├── subdomain
 ├── status                      (draft / published / hidden / deleted)
 ├── plan_type                   (TRIAL / PERMANENT / COUPLE / PRO)
 ├── allow_partner_publish        (BOOLEAN, default: false)
 ├── owner_transferred_at         (nullable — lần chuyển Owner gần nhất)
 ├── expires_at
 ├── published_at
 └── created_at

website_collaborators
 ├── id
 ├── website_id       (FK → websites)
 ├── user_id           (FK → users, nullable nếu chưa accept)
 ├── email             (dùng để match khi user đăng ký/login)
 ├── role              (PARTNER)
 ├── status            (pending / accepted / removed)
 ├── invite_token
 ├── invited_at
 ├── accepted_at
 └── expires_at        (hạn lời mời, VD: +7 ngày)
```

Business rule mời Partner:
```
Khi Owner bấm "Mời Partner":
  → Check plan_type của website
  → NOT IN (COUPLE, PRO) → chặn, hiển thị CTA nâng cấp
  → IN (COUPLE, PRO) → cho phép tạo lời mời
```

---

## 4. Album vs Media Library (định nghĩa mới)

Mô hình đề xuất — tách theo hướng **kho chứa vs. bộ sưu tập có chủ đề** (giống Google Photos: "Thư viện" vs "Album"):

| | Media Library | Album |
|---|---|---|
| **Bản chất** | Kho ảnh gốc, phẳng (flat) — mọi ảnh upload đều nằm ở đây | Một **bộ sưu tập có chủ đề**, gom 1 tập con ảnh từ Media Library |
| **Ví dụ** | Toàn bộ 80 ảnh đã upload | "Chuyến Đà Lạt 2025" (15 ảnh), "Sinh nhật em" (8 ảnh) |
| **Tiêu đề/mô tả riêng** | Không | Có (title, description, cover ảnh đại diện) |
| **1 ảnh thuộc nhiều nơi** | Là nguồn gốc duy nhất | 1 ảnh có thể thuộc **nhiều Album** khác nhau |
| **Hiển thị ở Public Story** | Nguồn chọn ảnh cho Cover/Timeline | Hiển thị như 1 **section riêng** (từng "chương kỷ niệm") |

### Data Model

```
albums
 ├── id
 ├── website_id
 ├── title
 ├── description
 ├── cover_photo_id     (FK → photos)
 ├── order
 └── created_at

album_photos                   (bảng trung gian many-to-many)
 ├── id
 ├── album_id
 ├── photo_id              (FK → photos, tức bảng Media Library)
 └── order
```

**Kết luận:** Media Library = nơi *chứa* ảnh gốc; Album = cách *tổ chức/kể chuyện* từ ảnh đó thành từng nhóm chủ đề. Đề xuất đưa Album vào **Phase 2 (Personalization)** — Phase 1 chỉ cần Media Library phẳng là đủ dùng.

---

## 5. Quản lý ảnh (Photo / Media Library)

### Quyết định kiến trúc
- **Không lưu ảnh trong DB (BLOB)** — chỉ lưu metadata; file thật lưu ở Storage riêng.
- MVP: **Docker Volume**. Khi mở rộng: **Cloudflare R2 / S3** (độc lập server, không mất dữ liệu khi đổi hạ tầng).
- **Bắt buộc resize + compress** ngay từ MVP (không giữ ảnh gốc từ điện thoại) — dùng `Thumbnailator` (Java), convert sang **WebP**.
- Mô hình **Media Library**: upload hàng loạt vào kho ảnh chung của story, sau đó chọn ảnh khi làm Cover/Timeline/Gallery/Album.

### Data Model (thiết kế generic, chuẩn bị dùng lại cho dự án khác)

```
photos
 ├── id
 ├── owner_type         (VD: 'WEBSITE' — chuẩn bị mở rộng cho tương lai)
 ├── owner_id
 ├── url
 ├── thumbnail_url
 ├── filename_original
 ├── filename_stored     (UUID — tránh trùng, tránh lộ pattern)
 ├── size_bytes
 ├── mime_type
 ├── order
 └── created_at
```

### Giới hạn theo Plan

| Plan | Số ảnh tối đa | Size file tối đa |
|---|---|---|
| TRIAL | 10 | 5MB/ảnh gốc |
| PERMANENT / COUPLE | 50 | 10MB/ảnh gốc |
| PRO | Không giới hạn | 15MB/ảnh gốc |

### Checklist kỹ thuật
- Validate MIME type thật (đọc header, không chỉ dựa extension)
- Check quota theo Plan **trước** khi xử lý resize (tránh tốn tài nguyên vô ích)
- Resize max-width 1920px + generate thumbnail song song
- Đặt tên file UUID, path có cấu trúc: `/data/photos/{owner_type}/{owner_id}/{uuid}.webp`
- Transaction: lưu Storage thất bại → rollback, tránh orphan file

---

## 6. Notification (mới bổ sung)

### Yêu cầu
- Kênh: **Email** + **chuông thông báo (bell icon)** ở **góc trên-trái** giao diện, kèm badge số lượng chưa đọc.

### Loại thông báo cần hỗ trợ
- Trial sắp hết hạn / đã hết hạn (`HIDDEN`)
- Lời mời Partner mới
- Partner đã chấp nhận lời mời
- Partner bị gỡ quyền (do downgrade plan)
- Chuyển quyền Owner thành công
- (Tùy chọn, Phase 2) Partner vừa thêm ảnh/timeline mới

### Data Model

```
notifications
 ├── id
 ├── user_id            (người nhận)
 ├── type                (TRIAL_EXPIRING / TRIAL_EXPIRED / INVITE_RECEIVED / 
 │                        PARTNER_JOINED / PARTNER_REMOVED / OWNER_TRANSFERRED / ...)
 ├── title
 ├── content
 ├── related_website_id  (nullable, FK → websites)
 ├── is_read              (default: false)
 └── created_at
```

### Luồng gửi

```
Trigger event (VD: cron job phát hiện Trial hết hạn, Owner mời Partner...)
      ↓
Ghi vào bảng notifications (in-app)
      ↓
Đồng thời gửi Email (song song, không phụ thuộc nhau)
      ↓
Frontend poll định kỳ (Phase 1) → cập nhật badge chuông
      ↓
(Phase 2) Nâng cấp lên WebSocket/SSE cho real-time
```

**Gợi ý kỹ thuật Phase 1:** dùng polling đơn giản (VD: mỗi 30-60s gọi API đếm `is_read = false`) — đủ dùng cho launch bạn bè test, chưa cần WebSocket ngay.

---

## 7. Roadmap tổng thể

**Bối cảnh:** SaaS thương mại — bạn bè là nhóm early user/beta tester trước khi mở rộng công khai.

```
PHASE 1 — MVP (launch cho bạn bè dùng thử trước)
├── User / Account
├── Story
├── Template
├── Media Library
├── Public Story
├── Partner Invite (gói COUPLE) ⭐ tính năng cốt lõi
├── Notification (Email + Bell)
└── Plan: TRIAL + PERMANENT + COUPLE, nâng cấp thủ công qua Admin
     (bạn bè: gán COUPLE/PERMANENT miễn phí thủ công)

PHASE 2 — Personalization / Monetization
├── Album (bộ sưu tập theo chủ đề)
├── Music nền, Animation, Countdown
├── Thanh toán tự động (VNPay/Momo/Stripe...)
├── Chính thức hoá đủ tier: TRIAL / PERMANENT / COUPLE / PRO
├── Quảng cáo cho tier thấp / tắt cho tier trả phí
├── Advertisement placement / Ad analytics
└── Direct sponsor / quảng cáo đối tác

PHASE 3 — Growth
├── Referral
├── Affiliate
├── Marketplace Template
├── Custom Domain
└── Business / Wedding package
```

---

## 8. Checklist review Source Code (dùng khi đối chiếu code với BA)

Khi review code thực tế, đối chiếu theo các điểm sau:

- [ ] `websites` có đủ cột: `status`, `plan_type`, `allow_partner_publish`, `owner_transferred_at`, `expires_at`, `published_at`
- [ ] Quota 3 web/user filter đúng `status != 'deleted'`
- [ ] Tenant resolver đọc đúng subdomain từ `Host` header, không hardcode
- [ ] Guest chỉ thấy `status = published`, trả 404 cho các status khác (không phân biệt draft/hidden trong response)
- [ ] `website_collaborators` giới hạn đúng 1 Partner/website khi tạo lời mời
- [ ] Check `plan_type IN (COUPLE, PRO)` trước khi cho phép mời Partner
- [ ] Logic gỡ Partner tự động khi downgrade plan (trigger/scheduled job)
- [ ] Giới hạn chuyển Owner 1 lần/tuần bằng `owner_transferred_at`
- [ ] Ảnh: validate MIME type thật, resize + compress trước khi lưu, tên file UUID
- [ ] Photo model dùng `owner_type/owner_id` (generic) chứ không hardcode `website_id`
- [ ] Notification: có bảng `notifications`, có cron gửi cảnh báo trial trước khi hết hạn

---

*Tài liệu này tổng hợp toàn bộ quyết định đã thống nhất qua quá trình trao đổi phân tích nghiệp vụ — dùng làm nền tảng để viết chi tiết UC/User Story, ERD và spec API, cũng như đối chiếu khi review source code thực tế.*
