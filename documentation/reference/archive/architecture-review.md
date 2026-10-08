> **LỖI THỜI — chỉ để tham khảo lịch sử.** Không dùng làm chuẩn. Mô tả kiến trúc Next.js/Auth.js/ISR/Redis/MinIO; thực tế là SPA React + Vite, không Redis, ảnh lưu đĩa. Tài liệu hiện hành: `documentation/` (bắt đầu từ `README.md`). Chuyển từ `DOC/` ngày 2026-10-08, nội dung giữ nguyên bên dưới.

---

# CoupleStory — Đánh giá Kiến trúc & Quyết định Kỹ thuật

> Tài liệu tổng hợp từ buổi review kiến trúc ngày 23/09/2026.
> Bổ sung cho BA Master Document — tập trung vào các quyết định kỹ thuật cụ thể.

> ## ⚠️ Trạng thái triển khai thực tế — đối chiếu 2026-09-24
>
> Phase 1 MVP đã build xong (5 tính năng chính, xem `CoupleStory_BA_Summary (2).md` §9, §11) nhưng **hầu hết đề xuất kỹ thuật trong tài liệu này KHÔNG được áp dụng** — team chọn phương án đơn giản hơn cho từng mục để kịp beta, thay vì implement đúng như đề xuất dưới đây:
>
> | Đề xuất trong tài liệu | Thực tế đã build |
> |---|---|
> | §2.1 Optimistic Locking (`@Version`) | ✅ **Đã làm 2026-09-24** — xem ghi chú cập nhật ở §2.1 |
> | §2.2 `@Async` xử lý ảnh | ❌ Chưa có — upload ảnh xử lý đồng bộ (cố ý, xem §2.2 ghi chú) |
> | §2.3 Redis Cache | ❌ Chưa có — không có Redis trong stack |
> | §3.1 ISR cho Public Story | ❌ Chưa có — dùng SSR thuần (`cache: "no-store"`), render lại mỗi request |
> | §3.2 SSE cho Notification | ❌ Chưa có — dùng **polling 45s**, đúng như phương án Phase 1 gốc ở BA §8 (SSE vẫn để dành Phase 2) |
> | §4.1 MinIO cho Storage | ✅ **Đã làm 2026-09-24** (dạng khác đề xuất — xem ghi chú cập nhật ở §4.1) |
> | §4.2 Docker Compose 5 service | ⚠️ 2/5 service gốc (`postgres` + `api`) + đã thêm `minio` (profile `s3`, optional) — vẫn không có `web`, `redis` |
> | §4.3 Subdomain routing qua `X-Tenant-Subdomain` header | 🟢 **Quyết định giữ nguyên 2026-09-24** — không làm, xem ghi chú cập nhật ở §4.3 |
>
> Các đề xuất này **vẫn còn giá trị tham khảo cho Phase 2-3** khi traffic thật tăng — không xoá, chỉ đánh dấu trạng thái ở từng mục bên dưới và ở bảng tổng hợp §5 + checklist §6.
>
> **Cập nhật 2026-09-24:** 2 gap ưu tiên cao nhất (concurrent-edit data loss, mất ảnh khi đổi server) đã được xử lý — xem §2.1 và §4.1. Mục §4.3 (subdomain qua header) được xem lại và **quyết định giữ nguyên cách hiện tại** — không phải gap, xem §4.3.

---

## MỤC LỤC

1. Tổng quan điểm mạnh kiến trúc hiện tại
2. Quyết định kỹ thuật — Backend
3. Quyết định kỹ thuật — Frontend
4. Quyết định kỹ thuật — Infrastructure
5. Bảng tổng hợp quyết định
6. Checklist kỹ thuật bổ sung (cập nhật vào BA)

---

## 1. Tổng quan điểm mạnh kiến trúc hiện tại

### ✅ Template độc lập với Data
- `template_config` lưu dạng JSONB — không phình schema khi thêm template mới.
- Content Contract chuẩn hóa dữ liệu chung — phát triển template mới nhanh chóng.
- Đổi template chỉ update 1 field, không migrate data.

### ✅ BFF Pattern — Authentication an toàn
- Next.js (BFF) không lưu Access/Refresh token dạng plaintext xuống client.
- Bọc trong Encrypted Session Cookie của Auth.js.
- Refresh token không bao giờ rò rỉ xuống browser.
- Đây là **Best Practice bảo mật** phù hợp với kiến trúc Next.js + Spring Boot.

### ✅ Media Library tách biệt khỏi DB
- Chỉ lưu metadata vào PostgreSQL.
- File vật lý lưu ở Storage riêng.
- Resize + WebP ngay từ đầu — tối ưu tốc độ load và băng thông.

---

## 2. Quyết định kỹ thuật — Backend

---

### 2.1 Optimistic Locking — Xử lý chỉnh sửa đồng thời

**Vấn đề:**
Gói COUPLE cho phép Owner và Partner cùng chỉnh sửa Story.
Nếu cả 2 mở cùng 1 trang và bấm "Lưu" cùng lúc → dữ liệu người lưu trước bị đè im lặng, không ai biết.

**Quyết định: ✅ Làm ngay — Phase 1**

> **Thực tế (2026-09-24): ✅ Đã làm**, gần sát đề xuất — `@Version` (kiểu `long`, không phải `Integer`) thêm vào `Story`/`StoryEvent`/`FavoriteMoment`/`StoryMessage` (migration `V15__optimistic_locking.sql`), và `GlobalExceptionHandler` bắt `org.springframework.orm.ObjectOptimisticLockingFailureException` (Spring wrap của JPA `OptimisticLockException`) → 409 `EDIT_CONFLICT`. FE: `describeError()` trong `actions.ts` map code này sang thông báo "Your partner just changed this — reload...".
>
> **Phạm vi thật của cơ chế này:** vì mỗi request PATCH đọc lại row mới nhất trong chính transaction của nó (không giữ object cũ qua nhiều request), `@Version` bắt được đúng trường hợp tài liệu mô tả — **2 request submit gần như đồng thời** (transaction của request B chồng lấn thời gian với lúc request A commit) — chứ **không** bắt được trường hợp "mở trang lúc 10:00, người kia lưu lúc 10:05, mình lưu lúc 10:10 với state cũ" (server luôn đọc fresh nên ghi đè âm thầm những field không đổi vẫn xảy ra ở kịch bản này). Muốn chặn cả kịch bản thứ hai cần client gửi kèm `version` đã đọc và server so sánh tường minh — **chưa làm**, ngoài phạm vi lần sửa này.
>
> Test: `OptimisticLockingIntegrationTest` (chứng minh conflict thật ở tầng repository cho cả 4 entity) + `GlobalExceptionHandlerTest` (chứng minh mapping sang 409).

**Implement:**

```java
// Thêm @Version vào các Entity chính
@Entity
public class Website {
    @Version
    private Integer version;
    // các field khác...
}

@Entity
public class WebsiteEvent {
    @Version
    private Integer version;
}
```

```java
// Bắt conflict ở @ControllerAdvice
@ExceptionHandler(OptimisticLockException.class)
public ResponseEntity<ErrorResponse> handleOptimisticLock(OptimisticLockException e) {
    return ResponseEntity.status(409).body(
        new ErrorResponse("CONFLICT", "Story vừa được cập nhật bởi người kia, vui lòng tải lại.")
    );
}
```

**Frontend xử lý 409:**
```
API trả 409 Conflict
      ↓
Hiển thị toast: "Có thay đổi mới từ người yêu bạn 💑 Tải lại để xem bản mới nhất"
      ↓
Nút: [Tải lại] / [Giữ bản của tôi]
```

**Các Entity cần thêm `@Version`:**
- `websites`
- `website_events` (Timeline)
- `favorite_moments`
- `website_messages`

---

### 2.2 Xử lý ảnh bất đồng bộ

**Vấn đề:**
Resize/compress ảnh bằng Thumbnailator trên API thread → block request → ảnh hưởng throughput khi nhiều user upload cùng lúc.

**Quyết định theo Phase:**

| Phase | Giải pháp | Lý do |
|---|---|---|
| Phase 1 | `@Async` (Spring Boot) | Traffic thấp (beta), zero thêm hạ tầng |
| Phase 2-3 | Message Queue (RabbitMQ) | Khi traffic thật sự tăng |

> **Thực tế (2026-09-24): ❌ Chưa dùng `@Async`.** `PhotoService` xử lý resize/compress **đồng bộ** trong request thread — cố ý, theo comment trong code: xử lý ảnh không nên giữ transaction/lock DB mở lâu, và traffic beta hiện tại chưa cần async. Việc rollback khi lưu Storage thất bại cũng làm thủ công (compensating cleanup: xoá file nếu ghi DB lỗi) thay vì trong 1 DB transaction bao ngoài toàn bộ luồng.

**Phase 1 — @Async:**

```java
// Cấu hình thread pool riêng cho image processing
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean("imageProcessingExecutor")
    public Executor imageProcessingExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("img-processing-");
        executor.initialize();
        return executor;
    }
}
```

```java
@Service
public class PhotoService {

    @Async("imageProcessingExecutor")
    public CompletableFuture<PhotoResult> processAndSave(MultipartFile file, String websiteId) {
        // 1. Validate MIME type
        // 2. Resize + compress + convert WebP
        // 3. Lưu vào Storage
        // 4. Lưu metadata vào DB
        return CompletableFuture.completedFuture(result);
    }
}
```

**Luồng upload với @Async:**
```
POST /api/photos/upload
      ↓
Validate ngay (MIME, size, quota) — đồng bộ
      ↓
Trả về 202 Accepted + uploadId
      ↓
@Async xử lý ngầm (resize, compress, lưu Storage, lưu DB)
      ↓
Frontend poll GET /api/photos/upload/{uploadId}/status
hoặc SSE push khi xong
```

---

### 2.3 Redis Cache cho Public Story

**Vấn đề:**
Public Story là read-heavy — khi được share lên MXH, nhiều Guest truy cập cùng lúc → tải nặng DB không cần thiết.

**Quyết định:**
- Redis **thêm vào docker-compose ngay Phase 1** (chuẩn bị sẵn).
- **Implement cache logic ở Phase 2** — sau khi có traffic thật để đo.

> **Thực tế (2026-09-24): ❌ Chưa có Redis.** `docker-compose.yml` của API chỉ có `postgres` + `api`, không có service Redis, và không có reference Redis nào trong code/`pom.xml`. Public Story hiện query DB trực tiếp mỗi request (không cache tầng nào ngoài Cloudflare CDN cho static asset). Hợp lý cho traffic beta, cân nhắc lại khi có traffic thật như kế hoạch Phase 2 gốc.

**Tầng cache (2 tầng):**

```
Guest request anh-em.couplestory.site
      ↓
Tầng 1: Cloudflare CDN (static assets, ảnh — tự động, không cần code)
      ↓
Tầng 2: Redis Cache (Story data JSON)
  → HIT: trả về cache (< 5ms)
  → MISS: query DB → lưu Redis (TTL: 5-10 phút) → trả về
      ↓
PostgreSQL (chỉ hit khi cache miss hoặc hết TTL)
```

**Cache invalidation:**
```
Owner/Partner publish hoặc update Story
      ↓
Backend xóa cache key: "story:{subdomain}"
      ↓
Request tiếp theo sẽ rebuild cache từ DB
```

---

## 3. Quyết định kỹ thuật — Frontend

---

### 3.1 ISR (Incremental Static Regeneration) cho Public Story

**Vấn đề:**
Public Story (Guest xem qua subdomain) dùng SSR thuần → mỗi lượt xem đều render lại → tốn server compute không cần thiết vì data hiếm khi thay đổi theo từng giây.

**Quyết định: ✅ Làm ngay — Phase 1**

> **Thực tế (2026-09-24): ❌ Chưa dùng ISR.** `src/app/s/[slug]/page.tsx` không có `export const revalidate`; `apiFetch` (client gọi API dùng chung toàn FE) set `cache: "no-store"` — Public Story render lại hoàn toàn (SSR thuần) mỗi request. Không có route `/api/revalidate`. Đơn giản hơn, đúng cho traffic thấp hiện tại nhưng sẽ tốn compute hơn khi 1 story được share rộng — cân nhắc bật ISR khi cần.

**Implement Next.js:**

```typescript
// app/[subdomain]/page.tsx (Public Story page)

// ISR: revalidate mỗi 5 phút
export const revalidate = 300

export default async function PublicStoryPage({ params }) {
  const story = await fetchStoryData(params.subdomain)

  if (!story || story.status !== 'published') {
    notFound() // → 404 page
  }

  return <StoryTemplate story={story} />
}

export async function generateMetadata({ params }) {
  const story = await fetchStoryData(params.subdomain)
  return {
    title: `${story.coupleName1} & ${story.coupleName2} 💑`,
    openGraph: {
      images: [story.coverPhotoUrl],
    },
  }
}
```

**On-demand Revalidation (quan trọng):**
Khi Owner publish hoặc update story → gọi revalidate ngay, không chờ hết TTL 5 phút.

```typescript
// Từ Spring Boot API sau khi save story thành công:
// Gọi Next.js revalidation endpoint

// Next.js API route: app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { subdomain, secret } = await request.json()

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath(`/${subdomain}`)
  return Response.json({ revalidated: true })
}
```

**Lợi ích ISR so với SSR thuần:**

| | SSR thuần | ISR |
|---|---|---|
| Mỗi lượt xem | Render lại từ đầu | Serve pre-built HTML |
| Tốc độ load | Chậm hơn | Gần như tức thì |
| Server compute | Tốn với mỗi request | Chỉ rebuild khi cần |
| Data freshness | Luôn mới nhất | Mới nhất trong 5 phút (hoặc on-demand) |

---

### 3.2 SSE (Server-Sent Events) thay Polling cho Notification

**Vấn đề:**
Polling 30-60s tạo N×(số user online) request/phút không cần thiết, ngay cả khi không có notification mới.

**Quyết định: ✅ Dùng SSE từ Phase 1**

> **Thực tế (2026-09-24): ❌ Chưa dùng SSE — vẫn polling**, đúng như phương án Phase 1 gốc ghi ở BA Summary §8 ("Frontend polling 30-60s (Phase 1)"), **không theo** quyết định "SSE ngay Phase 1" ở tài liệu này. `NotificationBell.tsx` poll `GET /notifications/unread-count` mỗi 45s bằng `setInterval`, không có `EventSource`/`SseEmitter` nào ở FE lẫn API. Đơn giản, đủ dùng cho beta; SSE để dành khi thật sự cần real-time (đúng lộ trình Phase 2 mà BA đã ghi).

SSE phù hợp hơn WebSocket vì Notification chỉ cần **server → client (1 chiều)**.

**Backend — Spring Boot:**

```java
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotifications(@AuthenticationPrincipal UserDetails user) {
        SseEmitter emitter = new SseEmitter(0L); // 0 = không timeout
        Long userId = getUserId(user);
        emitters.put(userId, emitter);

        // Heartbeat định kỳ — giữ connection sống qua Cloudflare
        // (Cloudflare mặc định timeout 100s nếu không có traffic)
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().comment("heartbeat"));
            } catch (Exception e) {
                emitters.remove(userId);
                scheduler.shutdown();
            }
        }, 0, 30, TimeUnit.SECONDS);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        emitter.onError(e -> emitters.remove(userId));

        return emitter;
    }

    // Gọi method này khi có notification mới cần push
    public void pushNotification(Long userId, NotificationDto notification) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                    .name("notification")
                    .data(notification));
            } catch (Exception e) {
                emitters.remove(userId);
            }
        }
    }
}
```

**Frontend — Next.js:**

```typescript
// hooks/useNotifications.ts
export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream', {
      withCredentials: true
    })

    eventSource.addEventListener('notification', (e) => {
      const notification = JSON.parse(e.data)
      setNotifications(prev => [notification, ...prev])
      setUnreadCount(prev => prev + 1)
    })

    eventSource.onerror = () => {
      // Tự động reconnect sau 5s nếu mất kết nối
      eventSource.close()
      setTimeout(() => { /* re-init EventSource */ }, 5000)
    }

    return () => eventSource.close()
  }, [])

  return { notifications, unreadCount }
}
```

**⚠️ Lưu ý Cloudflare Tunnel + SSE:**
Cloudflare có thể buffer response trước khi gửi xuống client (Response Buffering).
Cần tắt buffering cho endpoint SSE:

```java
// Thêm header vào SSE response
response.setHeader("X-Accel-Buffering", "no");
response.setHeader("Cache-Control", "no-cache");
```

---

## 4. Quyết định kỹ thuật — Infrastructure

---

### 4.1 MinIO thay Docker Volume cho Storage ảnh

**Vấn đề:**
Docker Volume lưu file ảnh trên local disk → mất dữ liệu khi đổi server, không thể scale ngang.

**Quyết định: ✅ Dùng MinIO ngay từ Phase 1**

> **Thực tế (2026-09-24): ✅ Đã làm, dạng abstraction thay vì "chuyển hẳn sang MinIO".** Thêm `app.storage.type` (`local` mặc định | `s3`), `PhotoStorageConfig` chọn đúng 1 bean `PhotoStorage` theo config (`@ConditionalOnProperty`), và `S3PhotoStorage` (AWS SDK v2, tương thích MinIO/R2/S3 thật qua `s3-endpoint` + `s3-path-style-access`). `LocalPhotoStorage` **vẫn là mặc định** — máy dev hiện tại không có Docker nên vẫn cần local hoạt động y hệt trước đây, đã xác nhận bằng `PhotoIntegrationTest` (không đổi gì) chạy qua toàn bộ suite.
>
> Khác với đề xuất gốc ("chuyển hẳn sang MinIO ngay Phase 1"): **chưa có môi trường nào thực sự chạy MinIO** — mục này chỉ tắt được rủi ro kỹ thuật (giờ đổi sang MinIO/R2 chỉ là đổi 6 biến env `STORAGE_*`, không đổi 1 dòng code, đúng tinh thần "StorageService — abstraction layer" đề xuất ban đầu), chưa tắt được rủi ro vận hành (`docker-compose.yml` có thêm service `minio` dưới profile `s3` để test local, nhưng chưa ai chạy thật). Khuyến nghị: bật `STORAGE_TYPE=s3` khi deploy production thật, không cần sửa code.
>
> Test: `S3PhotoStorageTest` (mock `S3Client`, không cần MinIO thật) + `PhotoStorageConfigTest` (`ApplicationContextRunner`, xác nhận đúng 1 bean `PhotoStorage` active với mỗi giá trị `app.storage.type`).

**So sánh phương án:**

| | Docker Volume | MinIO (local) | Cloudflare R2 |
|---|---|---|---|
| Cài đặt | Zero | Thêm 1 Docker service | Cần account CF |
| Chi phí | $0 | $0 | $0 (free egress) |
| Rủi ro mất data | ⚠️ Cao | ✅ Thấp | ✅ Rất thấp |
| S3-compatible API | ❌ | ✅ | ✅ |
| Migrate lên R2 sau | Khó, tốn effort | **Chỉ đổi endpoint + credentials** | — |
| Phù hợp Phase | Không dùng | Phase 1 (local dev + staging) | Phase 2+ (production) |

**MinIO trong docker-compose.yml:**

```yaml
services:
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ACCESS_KEY}
      MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY}
    ports:
      - "9000:9000"   # S3 API
      - "9001:9001"   # Console UI (dev only)
    volumes:
      - minio_data:/data
    expose:
      - "9000"

volumes:
  minio_data:
```

**Spring Boot config (S3-compatible):**

```yaml
# application.yml
storage:
  type: minio  # đổi thành 's3' hoặc 'r2' khi lên production
  endpoint: http://minio:9000
  access-key: ${MINIO_ACCESS_KEY}
  secret-key: ${MINIO_SECRET_KEY}
  bucket: couplestory-photos
  region: us-east-1  # MinIO không quan tâm region, nhưng SDK cần
```

```java
// StorageService — abstraction layer
// Chỉ cần đổi config, không đổi code khi migrate MinIO → R2/S3
@Service
public class StorageService {
    private final S3Client s3Client; // AWS SDK v2, tương thích MinIO & R2

    public String uploadFile(String key, byte[] data, String contentType) {
        s3Client.putObject(PutObjectRequest.builder()
            .bucket(bucket)
            .key(key)
            .contentType(contentType)
            .build(),
            RequestBody.fromBytes(data));
        return generatePublicUrl(key);
    }
}
```

**Migrate MinIO → Cloudflare R2 (Phase 2) chỉ cần:**
```yaml
# Đổi trong application.yml (không đổi 1 dòng code)
storage:
  endpoint: https://<account_id>.r2.cloudflarestorage.com
  access-key: ${R2_ACCESS_KEY}
  secret-key: ${R2_SECRET_KEY}
```

---

### 4.2 Docker Compose hoàn chỉnh — Phase 1

> **Thực tế (2026-09-24): ⚠️ Chỉ có 2/5 service.** `docker-compose.yml` thật (ở repo `couplestory-api`) chỉ định nghĩa `postgres` + `api` (service `api` sau profile riêng, opt-in) — **không có** `web`, `redis`, `minio`. Volume chỉ có `couplestory-postgres-data` + `couplestory-photos` (bind cho local disk, không phải MinIO volume). FE (`couplestory-fe`) không có `docker-compose.yml` riêng, chạy bằng `next dev`/`next start` trực tiếp trong phiên làm việc hiện tại — chưa containerize.

```yaml
version: '3.9'

services:

  web:
    image: couplestory-web
    ports:
      - "8091:3000"   # Next.js — Cloudflare Tunnel trỏ vào đây
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8080
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - REVALIDATE_SECRET=${REVALIDATE_SECRET}
    depends_on:
      - api

  api:
    image: couplestory-api
    expose:
      - "8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/couplestory
      - SPRING_REDIS_HOST=redis
      - STORAGE_ENDPOINT=http://minio:9000
      - STORAGE_ACCESS_KEY=${MINIO_ACCESS_KEY}
      - STORAGE_SECRET_KEY=${MINIO_SECRET_KEY}
    depends_on:
      - postgres
      - redis
      - minio

  postgres:
    image: postgres:16-alpine
    expose:
      - "5432"
    environment:
      POSTGRES_DB: couplestory
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    expose:
      - "6379"
    volumes:
      - redis_data:/data
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    expose:
      - "9000"
    environment:
      MINIO_ROOT_USER: ${MINIO_ACCESS_KEY}
      MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY}
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

**Cloudflare Tunnel config:**
```yaml
# cloudflared config
- hostname: couplestory.site
  service: http://localhost:8091

- hostname: "*.couplestory.site"
  service: http://localhost:8091
```

---

### 4.3 Subdomain Routing — Next.js Middleware

**Vấn đề:**
Next.js cần extract subdomain từ `Host` header và forward sang Spring Boot API.

> **Thực tế (2026-09-24): 🟢 Đã xem lại — quyết định giữ nguyên cách hiện tại, không thêm header.** File thật tên `src/proxy.ts` (không phải `middleware.ts` — đổi tên do version Next.js đang dùng), dùng `src/lib/tenant/subdomain.ts::extractStorySlug()` để lấy slug từ `Host` header, rồi `NextResponse.rewrite(new URL(\`/s/${slug}\`, ...))` sang route nội bộ `/s/[slug]`. Route đó gọi API bằng `GET /public/stories/{slug}` với slug như path param — một REST resource identifier bình thường, không phải cơ chế tạm.
>
> **Lý do không làm theo đề xuất gốc:** Cloudflare Tunnel route toàn bộ traffic (kể cả `*.couplestory.site`) vào Next.js (`localhost:8091`) — API không bao giờ nhận request trực tiếp từ subdomain của trình duyệt, Next.js luôn là điểm vào duy nhất. Thêm `X-Tenant-Subdomain` header lúc này sẽ chỉ là: Next.js tự extract slug (đã làm) → set header → API đọc header để tự resolve lại slug đó (dư thừa), trong khi Next.js **đã có** slug trong tay và có thể gọi thẳng `/public/stories/{slug}` — đơn giản hơn, không có 2 nguồn xác định tenant (header vs path) có thể lệch nhau. Đề xuất gốc chỉ thật sự có giá trị nếu sau này có client KHÁC (mobile app, v.v.) cần tự resolve tenant qua subdomain khi gọi thẳng API — chưa có nhu cầu đó, nên không build trước (tránh spec cho yêu cầu giả định). Nếu nhu cầu đó xuất hiện, làm lại đúng lúc đó với dữ liệu thật.

```typescript
// middleware.ts (Next.js)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]

  // Các subdomain hệ thống — không phải tenant
  const systemSubdomains = ['www', 'api', 'dashboard', 'couplestory']

  if (!systemSubdomains.includes(subdomain) && subdomain !== '') {
    // Forward subdomain xuống API qua header
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('X-Tenant-Subdomain', subdomain)

    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  return NextResponse.next()
}
```

```java
// Spring Boot — đọc subdomain từ header
@GetMapping("/story")
public ResponseEntity<StoryDto> getPublicStory(
    @RequestHeader("X-Tenant-Subdomain") String subdomain) {
    
    Website website = websiteRepository
        .findBySubdomainAndStatus(subdomain, Status.PUBLISHED)
        .orElseThrow(() -> new NotFoundException("Story không tồn tại"));
    
    return ResponseEntity.ok(storyMapper.toDto(website));
}
```

---

## 5. Bảng tổng hợp quyết định

| # | Vấn đề | Quyết định | Phase | Độ ưu tiên | Trạng thái thực tế (2026-09-24) |
|---|---|---|---|---|---|
| 1 | Concurrent editing (Owner + Partner) | Optimistic Locking (`@Version`) | Phase 1 | 🔴 Cao | ✅ Đã làm 2026-09-24 (xem §2.1) |
| 2 | Image processing block thread | `@Async` Spring Boot | Phase 1 | 🔴 Cao | ❌ Chưa làm — vẫn đồng bộ (cố ý) |
| 3 | Image processing scale | Message Queue (RabbitMQ) | Phase 2-3 | 🟡 Vừa | — (chưa tới Phase 2-3) |
| 4 | Redis trong docker-compose | Thêm ngay, implement cache sau | Phase 1 | 🔴 Cao | ❌ Chưa có Redis |
| 5 | Cache Public Story API | Redis Cache + invalidation | Phase 2 | 🟡 Vừa | — (chưa tới Phase 2) |
| 6 | Public Story rendering | ISR (Next.js) + On-demand revalidation | Phase 1 | 🔴 Cao | ❌ Chưa làm — SSR thuần (`cache: "no-store"`) |
| 7 | Notification real-time | SSE (SseEmitter) thay Polling | Phase 1 | 🔴 Cao | ❌ Chưa làm — polling 45s (đúng plan gốc BA §8) |
| 8 | Storage ảnh | MinIO (Phase 1) → Cloudflare R2 (Phase 2) | Phase 1 | 🔴 Cao | ✅ Đã làm 2026-09-24, dạng abstraction (xem §4.1) |
| 9 | Subdomain routing | Next.js middleware + X-Tenant-Subdomain header | Phase 1 | 🔴 Cao | 🟢 Quyết định giữ nguyên 2026-09-24 — xem §4.3 |

> **2026-09-24: mục #1 và #8 đã xử lý** (2 gap độ ưu tiên cao nhất — data loss khi 2 người sửa cùng lúc, mất ảnh khi đổi server). Mục #9 đã review và **quyết định giữ nguyên** cách hiện tại (path param, không phải gap — xem §4.3). 6/9 quyết định "Phase 1, độ ưu tiên Cao" còn lại vẫn chưa áp dụng đúng như đề xuất — MVP ship bằng phương án đơn giản hơn cho các mục đó (không phải lỗi, là lựa chọn ưu tiên tốc độ ra beta). Review lại phần còn lại trước khi tăng traffic thật hoặc deploy production.

---

## 6. Checklist kỹ thuật bổ sung

> **Đối chiếu 2026-09-24:** 2 mục (optimistic locking, S3-compatible storage) đã hoàn thành trong lần cập nhật này; mục subdomain-qua-header đã review và quyết định giữ nguyên (không phải việc "chưa làm", là thiết kế được chọn có chủ đích — xem §4.3). Phần còn lại — xem giải thích/thay thế ở từng dòng và ở §5.

### Backend

- [x] `@Version` field thêm vào: `Website`, `WebsiteEvent`, `FavoriteMoment`, `WebsiteMessage` — ✅ đổi tên thực tế: `Story`/`StoryEvent`/`FavoriteMoment`/`StoryMessage`, kiểu `long` (không phải `Integer`), migration `V15__optimistic_locking.sql`
- [x] `@ControllerAdvice` bắt `OptimisticLockException` → trả 409 với message rõ ràng — ✅ `GlobalExceptionHandler.handleEditConflict()` bắt `ObjectOptimisticLockingFailureException` (Spring wrap của JPA exception đó) → 409 `EDIT_CONFLICT`
- [ ] `@Async("imageProcessingExecutor")` tách khỏi API thread — ❌ chưa có, xử lý đồng bộ (cố ý)
- [ ] `ThreadPoolTaskExecutor` cấu hình đúng pool size cho image processing — ❌ N/A (không có `@Async`)
- [x] `StorageService` dùng AWS SDK v2 (S3-compatible) — không hardcode MinIO — ✅ `S3PhotoStorage` (interface `PhotoStorage`), chọn qua `app.storage.type=s3`; `LocalPhotoStorage` vẫn là mặc định (`type=local`)
- [ ] SSE endpoint `/api/notifications/stream` có heartbeat mỗi 30s — ❌ chưa có, không có `SseEmitter` nào trong code
- [ ] SSE response header: `X-Accel-Buffering: no`, `Cache-Control: no-cache` — ❌ N/A (không có SSE)
- [~] Spring Boot forward `X-Tenant-Subdomain` header sang đúng tenant resolver — 🟢 quyết định không làm 2026-09-24 — API resolve qua path param `{slug}` (`GET /public/stories/{slug}`), không cần header vì Next.js là điểm vào duy nhất (xem §4.3)

### Frontend (Next.js)

- [ ] Public Story page dùng ISR (`export const revalidate = 300`) — ❌ chưa có, dùng SSR thuần
- [ ] On-demand revalidation endpoint `/api/revalidate` có kiểm tra secret — ❌ chưa có route này
- [ ] Spring Boot gọi revalidation endpoint sau khi Owner publish/update story — ❌ N/A
- [ ] `useNotifications` hook dùng `EventSource` (SSE), có auto-reconnect — ❌ chưa có, dùng `setInterval` polling 45s trong `NotificationBell.tsx`
- [~] `middleware.ts` extract subdomain và set `X-Tenant-Subdomain` header — 🟢 file thật là `src/proxy.ts`, extract subdomain đúng như đề xuất, nhưng **quyết định không set header** — rewrite sang route nội bộ `/s/{slug}`, route đó gọi thẳng API bằng path param thay vì header (xem §4.3)
- [x] Bell icon hiển thị đúng `unreadCount` — số hiển thị đúng (`NotificationController.unreadCount`), chỉ khác cơ chế cập nhật: polling thay vì đẩy qua SSE

### Infrastructure

- [ ] `docker-compose.yml` có đủ 5 services: web, api, postgres, redis, minio — ⚠️ 3/5: `postgres`, `api`, và nay có `minio` (profile `s3`, optional, chưa test thật) — vẫn thiếu `web`, `redis`
- [x] MinIO volume mount persistent (`minio_data:/data`) — ✅ volume `couplestory-minio-data:/data` trong service `minio` (profile `s3`); local disk (`couplestory-photos`) vẫn là default khi không bật profile này
- [ ] Redis config: `maxmemory 256mb`, `maxmemory-policy allkeys-lru` — ❌ N/A (không có Redis)
- [ ] `.env` có đủ: `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `REVALIDATE_SECRET`, `NEXTAUTH_SECRET` — ❌ chưa có các biến MinIO/Revalidate; `.env` thật dùng `STORAGE_LOCAL_ROOT`, `STORAGE_PUBLIC_BASE_URL`, `JWT_SECRET`, `DB_*`, `MAIL_*` (`NEXTAUTH_SECRET` thuộc repo FE, chưa đối chiếu)
- [ ] Cloudflare Tunnel config: cả `couplestory.site` và `*.couplestory.site` → `localhost:8091` — chưa đối chiếu (ngoài phạm vi 2 repo, thuộc hạ tầng deploy)
- [ ] Wildcard DNS `*.couplestory.site` đã trỏ đúng — chưa đối chiếu (hạ tầng deploy, dev hiện dùng `*.localhost` tự resolve)

---

*Tài liệu này bổ sung cho BA Master Document (`CoupleStory_BA_Summary (2).md`).*
*Khi nhận được trao đổi kiến trúc mới, đánh giá và cập nhật vào đây.*

*Cập nhật 2026-09-24: đối chiếu toàn bộ §2-§6 với source code thực tế (`couplestory-api` + `couplestory-fe`) sau khi Phase 1 MVP hoàn thành — thêm trạng thái triển khai thực tế vào từng mục.*
