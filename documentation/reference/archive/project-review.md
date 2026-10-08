> **LỖI THỜI — chỉ để tham khảo lịch sử.** Không dùng làm chuẩn. Đề xuất ngày 2026-09-23; phần lớn đã được làm hoặc thay đổi. Tài liệu hiện hành: `documentation/` (bắt đầu từ `README.md`). Chuyển từ `DOC/` ngày 2026-10-08, nội dung giữ nguyên bên dưới.

---

# CoupleStory — Đánh giá Kiến trúc & Đề xuất Phát triển

**Ngày đánh giá:** 23/09/2026
**Đối tượng:** Kiến trúc Backend (API), Frontend (source_code) và Tài liệu BA.

## 1. Đánh giá ưu điểm hiện tại của kiến trúc

* **Tư duy thiết kế Template độc lập với Data:** Đây là một trong những điểm sáng giá nhất của dự án. Việc lưu `template_config` dạng JSONB và chuẩn hóa dữ liệu chung (Content Contract) sẽ giúp việc phát triển các template về sau cực kỳ nhanh chóng và không làm phình Database.
* **Xử lý Authentication & Security an toàn:** Frontend (Next.js) không lưu trữ trực tiếp Access/Refresh token dưới dạng plaintext mà bọc trong Encrypted Session Cookie của Auth.js. Refresh token không bao giờ bị rò rỉ xuống Client. BFF (Backend For Frontend) pattern này là một Best Practice bảo mật tuyệt vời.
* **Quy hoạch luồng Media Library rõ ràng:** Việc chỉ lưu metadata ảnh vào DB và lưu file vật lý ở Storage, kết hợp với việc Resize + WebP ngay từ đầu sẽ giúp tối ưu tốc độ load trang và tiết kiệm băng thông đáng kể.

## 2. Đề xuất cải thiện & Phát triển dự án

### A. Về Backend (Spring Boot) & Database

1. **Xử lý Concurrent Editing (Chỉnh sửa đồng thời):**
   * **Vấn đề:** Gói COUPLE cho phép Partner và Owner cùng chỉnh sửa. Nếu cả 2 cùng mở một trang và nhấn "Lưu" cùng lúc, dữ liệu người lưu trước có thể bị đè.
   * **Đề xuất:** Áp dụng **Optimistic Locking** cho các bảng chính (như `websites`, `website_events`). Thêm cột `@Version Integer version;` trong các Entity JPA. Khi xảy ra conflict, hệ thống sẽ quăng `OptimisticLockException` và báo cho người dùng tải lại trang, tránh mất mát hoặc ghi đè dữ liệu sai.

2. **Nút thắt cổ chai ở xử lý ảnh (Image Processing Bottleneck):**
   * **Vấn đề:** Việc dùng `Thumbnailator` trên chính server API để resize/compress ảnh có thể làm tốn rất nhiều CPU.
   * **Đề xuất Phase 2/3:** Tách việc xử lý ảnh ra một Message Queue (vd: RabbitMQ/Kafka) và để một Worker xử lý ngầm (Asynchronous), hoặc sử dụng các serverless function (AWS Lambda / Cloudflare Workers).

3. **Quản lý Cache cho Public Story:**
   * **Vấn đề:** Khách (Guest) truy cập trang Story dạng subdomain sẽ chỉ đọc dữ liệu chứ không ghi, có thể gây tải nặng nếu share trên MXH.
   * **Đề xuất:** Cần implement Redis Cache trên Backend cho các endpoint GET lấy dữ liệu Story. 

### B. Về Frontend (Next.js) & Giao diện

1. **Chiến lược Rendering cho Public Story:**
   * **Đề xuất:** Đối với trang xem Story của Guest (Public), do dữ liệu hiếm khi thay đổi theo từng giây, Next.js nên sử dụng `ISR (Incremental Static Regeneration)` với `revalidate` hoặc Cache control tốt ở Route Handlers thay vì SSR liên tục để mang lại tốc độ load nhanh nhất.

2. **Cải thiện Notification (Real-time):**
   * **Vấn đề:** Tài liệu BA nhắc đến việc dùng Polling 30-60s cho Notification ở Phase 1 có thể gây dư thừa request.
   * **Đề xuất:** Sử dụng **SSE (Server-Sent Events)** ngay từ Phase 1. SSE dễ implement với Spring Boot (qua `SseEmitter`) hơn WebSockets, nhẹ nhàng và phù hợp cho cơ chế chỉ server đẩy dữ liệu xuống client (chuông thông báo).

### C. Về Hạ tầng, Tên miền & Triển khai (DevOps)

1. **Xử lý Subdomain Mapping:**
   * **Lưu ý:** Tính năng multi-tenant yêu cầu resolve subdomain. Cần thiết lập Wildcard DNS `*.couplestory.com` trỏ về server, và cấu hình Reverse Proxy (Nginx/Traefik hoặc Next.js middleware) bắt được Host header để truyền đúng `subdomain` xuống cho Spring Boot API.

2. **Storage cho Ảnh:**
   * **Vấn đề:** Ở MVP dùng Docker Volume rủi ro mất dữ liệu cao nếu container lỗi hoặc mất cấu hình mount.
   * **Đề xuất:** Cân nhắc tích hợp S3 API (như MinIO cài đặt local, hoặc dùng gói Cloudflare R2 miễn phí) ngay từ ngày đầu. Chuyển đổi từ Local Storage sang S3 ở giai đoạn sau sẽ tốn kém chi phí migrate.

3. **Docker Compose Profile:**
   * **Đề xuất:** Bổ sung thêm service `Redis` vào file `docker-compose.yml` để chuẩn bị sẵn sàng cho việc caching và quản lý session phân tán sau này.

---
*Tài liệu được phân tích và tổng hợp dựa trên kiến trúc hiện tại nhằm mục đích định hướng và hỗ trợ mở rộng dự án an toàn, tối ưu.*
