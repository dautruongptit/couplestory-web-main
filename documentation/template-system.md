# Hệ thống template

Sở hữu: danh mục template, quy tắc template, cách frontend chọn và hiển thị template. Quy tắc gói/hạn mức ở `business-rules.md`.

## Nguồn thật
| Cái gì | Ở đâu |
|---|---|
| Danh mục (mã, tên, loại, gói, số kỷ niệm, bật/tắt) | Bảng `templates` trong DB (migration V24 chỉ khởi tạo) |
| Quyền dùng template | `TemplateAccessService.requireUsable` + `util/PackageRank` |
| Cách hiển thị | `WEB/src/templates/` + `data/templateThemes.ts` |

## Danh mục trong DB (đối chiếu DB thật 2026-10-08, CONFIRMED)
`LOVE_STORY`, đang **bật**: `minimal-couple`, `romantic-anniversary`, `memory-wall` (gói FREE); `autumn-paris`, `sunset-horizon`, `sweet-polaroid` (PLUS); `anniversary-journey`, `royal-wedding` (COUPLE); `eternal-love` (PREMIUM).
`LOVE_CARD`, đang **tắt** (hoãn đến khi có mô hình nội dung WEDDING/BIRTHDAY/CONFESSION): `wedding-cinematic`, `wedding-garden-bloom`, `birthday-neon-party`, `confession-midnight-bloom` (PREMIUM); `birthday-soft-yume`, `confession-typewriter` (FREE).

## Quy tắc (CONFIRMED, từ ràng buộc DB và service)
- Mỗi template có `max_display_events` và `recommended_events` trong **4–6**, `min_events_for_publish` ≥ 1 và ≤ `max_display_events`.
- Loại template phải khớp loại Story (`LOVE_STORY` / `LOVE_CARD`), nếu không bị từ chối.
- Template phải bật (`is_active`) và gói user ≥ gói template, nếu không bị từ chối (403 với gợi ý nâng gói).
- Mã template không có trong danh mục (dữ liệu cũ) rơi về mặc định: hiển thị tối đa 6, cần 2 kỷ niệm để xuất bản.
- Đổi template giữ nguyên dữ liệu, đặt lại `template_config` thành `{}`.
- Gói `FREE/PLUS/COUPLE/PREMIUM` và thứ tự **bị khai báo hai nơi**: backend `PackageRank`, frontend `data/templatePackages.ts` (`PACKAGE_RANK`). Sửa gói phải sửa cả hai (rủi ro lệch; chưa có test).

## Frontend chọn template thế nào (CONFIRMED)
1. Trang công khai (`PublicStory`) và xem của chủ Story (`DemoStory`) hiển thị `DynamicStoryTemplate` với `StoryData` ánh xạ từ API (`utils/publicStory.ts`).
2. `DynamicStoryTemplate` rẽ theo `template_id`:
   - `romantic-anniversary` → `TemplateRomanticAnniversary`; `memory-wall` → `TemplateMemoryWall`; `anniversary-journey` → `TemplateAnniversaryJourney`.
   - Mã nằm trong `templates/occasionRegistry.ts` (LOVE_CARD) → component tương ứng; gallery ẩn chúng khi `SHOW_OCCASION_TEMPLATES = false` nhưng route `/preview/<code>` vẫn chạy.
   - Còn lại → bố cục chung, lấy màu/chữ/khung ảnh từ `templateThemes.ts` theo mã.
3. Số kỷ niệm hiển thị = `min(maxDisplayEvents của template, số kỷ niệm đang bật)`; frontend đọc `maxDisplayEvents` từ `/api/templates`.
4. Hình thu nhỏ: `data/templateThumbnails.ts`; gallery: `TemplatesGallery`, `HomeTemplates`; đổi template: `ChangeTemplateModal`.
5. Có biến thể mobile riêng cho `Minimal Couple` và `Eternal Love` (`*Mobile`, `TemplateEternalLoveResponsive`) và hai route tĩnh `/s/eternal`, `/s/minimal`.

**INFERRED:** `minimal-couple`, `eternal-love`, `autumn-paris`, `sunset-horizon`, `sweet-polaroid`, `royal-wedding` dùng bố cục chung theo `templateThemes`; ánh xạ chính xác của `minimal-couple`/`eternal-love` sang các component `TemplateMinimalCouple*`/`TemplateEternalLove*` chưa được xác minh (UNKNOWN).

## Thêm template mới (INFERRED từ cấu trúc code; chưa có hướng dẫn chính thức)
1. Thêm hàng vào `templates` bằng **migration mới** (gói, loại, số kỷ niệm 4–6).
2. Thêm entry vào `templateThemes.ts` hoặc component riêng và nhánh trong `DynamicStoryTemplate`.
3. Thêm hình thu nhỏ trong `templateThumbnails.ts`; cập nhật `templatePackages.ts` nếu có gói mới.
4. Template hệ mặt trời và template game: **hoãn** (`decisions.md` D9).

## Dữ liệu mặc định trong frontend (vấn đề đã biết)
`DynamicStoryTemplate` có ảnh/avatar mặc định lấy từ dịch vụ ngoài (dicebear, unsplash) khi Story thiếu dữ liệu. Với quy tắc "dữ liệu thật" của `AGENTS.md` đây là điểm cần xem xét (UNKNOWN: có chủ ý hay không).
