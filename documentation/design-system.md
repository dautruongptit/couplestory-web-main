# Design system

Sở hữu: quy ước giao diện của **ứng dụng** (trang công khai, dashboard, admin). Giao diện của từng **template Story** thuộc `template-system.md`. Giá trị cụ thể (mã màu, cỡ chữ) nằm ở `WEB/src/index.css`, không chép vào đây.

## Nguồn thật (CONFIRMED)
- Token và kiểu chữ: khối `@theme` và `@layer utilities` trong `WEB/src/index.css` (Tailwind v4). Phong cách đặt tên: "Romantic Candy Pop", bảng màu theo Material Design 3.
- Mockup tham khảo (không phải code): `D:\My Project\Couplestory\Design\*\screen.png` và `code.html` (INFERRED: xuất từ công cụ Stitch), `DOC/Template/` (Figma Make).

## Quy ước (CONFIRMED)
- **Màu:** dùng token ngữ nghĩa (`primary`, `primary-container`, `secondary`, `tertiary`, `surface*`, `on-*`, `outline*`, `error*`), không viết mã màu cứng trong trang ứng dụng. Chủ đạo hồng đậm (`primary`) và tím (`secondary`); nền hồng nhạt (`surface`).
- **Chữ:** Quicksand cho tiêu đề (`font-headline-*`, `font-display-hero`), Nunito Sans cho thân và điều khiển (`font-title-*`, `font-body-*`, `font-label-*`); Dancing Script cho chữ viết tay. Cỡ chữ dùng lớp `text-display-hero`, `text-headline-{xl,lg,md,sm}`, `text-title-*`, `text-body-*`, `text-label-*`; có biến thể `-mobile` cho tiêu đề lớn.
- **Khoảng cách:** `space-xs … space-xl`, `gutter*`, `margin*` (có biến thể tablet/desktop).
- **Bo góc:** `radius-sm … radius-xl`, `radius-full`. Nút và thẻ thường bo tròn lớn.
- **Icon:** Material Symbols Outlined (chữ `material-symbols-outlined`) cho phần lớn giao diện; `lucide-react` có trong phụ thuộc (dùng ở một số component).
- **Phản hồi thiết bị:** nhiều màn hình có biến thể mobile riêng (`TemplateMinimalCoupleMobile`, `TemplateEternalLoveMobile`...) hoặc dùng lớp responsive; không có quy tắc chung được ghi lại (UNKNOWN).
- **Thành phần dùng chung:** `components/ui/` (`Button`, `Input`), `ConfirmModal`, `ShareModal`, `MusicPlayer`, `SlugField`; thông báo nhanh qua `utils/toast.ts`.

## Phông và tài nguyên tải ngoài (CONFIRMED)
`index.html` tải Google Fonts (DM Sans, Playfair Display, …) và Material Symbols; `index.css` nhập Quicksand, Nunito Sans. CSP ở nginx đang cho phép `fonts.googleapis.com`/`fonts.gstatic.com`.

## Ngôn ngữ giao diện
Giao diện bằng tiếng Việt, chuỗi viết thẳng trong component (INFERRED: `package.json` không có thư viện i18n). Thông báo cho người dùng ngắn gọn, không chứa IP/User-Agent.

## Vấn đề đã biết
- Một số trang có dữ liệu mẫu cứng trong giao diện (trái quy tắc dữ liệu thật): xem `current-state.md`.
- Không có hướng dẫn chính thức về chế độ tối, khả năng truy cập (a11y): UNKNOWN.
