# CoupleStory - Frontend Implementation Plan

## 1. Danh sách Page & Route
Dựa trên các thư mục design, hệ thống sẽ có các page và route sau:

**Public / Khách hàng:**
- `couplestory_trang_ch` -> Trang chủ -> Route: `/`
- `couplestory_b_ng_gi_d_ch_v` -> Bảng giá -> Route: `/pricing`
- `couplestory_kho_template_giao_di_n` -> Kho Template -> Route: `/templates`

**Auth:**
- `couplestory_ng_nh_p` -> Đăng nhập -> Route: `/login`
- `couplestory_ng_k_t_i_kho_n` -> Đăng ký -> Route: `/register`
- `couplestory_qu_n_m_t_kh_u` -> Quên mật khẩu -> Route: `/forgot-password`

**User Dashboard (Require Login):**
- `couplestory_dashboard_qu_n_l` -> Dashboard -> Route: `/dashboard`
- `couplestory_dashboard_s_p_h_t_h_n_n_ng_c_p` -> Dashboard (Trạng thái sắp hết hạn) -> State trong `/dashboard`
- `couplestory_thanh_to_n_k_ch_ho_t_g_i_d_ch_v_checkout` -> Checkout -> Route: `/checkout`
- `couplestory_thanh_to_n_th_nh_c_ng_k_ch_ho_t_k_ni_m_success` -> Thanh toán thành công -> Route: `/checkout/success`

**Public Story (Trang Kỷ niệm):**
- `public_story_eternal_love_template` -> Template Eternal Love
- `public_story_minimal_couple_template` -> Template Minimal Couple
- *Lưu ý: Truy cập qua wildcard domain hoặc route `/s/:id`, UI phụ thuộc vào trường `templateId` của mock data.*

**Admin:**
- `couplestory_admin_qu_n_l_ng_i_d_ng_story` -> Quản lý Người dùng & Story -> Route: `/admin/users`
- `couplestory_admin_qu_n_l_g_i_c_c_doanh_thu` -> Quản lý Gói & Doanh thu -> Route: `/admin/revenue`

**Error Pages:**
- `couplestory_kh_ng_t_m_th_y_trang_404` -> 404 Not Found -> Route: `*`
- `couplestory_403_forbidden_admin_access_restricted` -> 403 Forbidden -> Route: `/403`

## 2. Component Dùng Chung (Shared Components)
- **Layouts:** `MainLayout` (Header, Footer cho Public), `DashboardLayout` (Sidebar, Navbar cho User/Admin), `AuthLayout`, `StoryLayout`.
- **UI Basic:** `Button`, `Input`, `Checkbox`, `Radio`, `Badge/Chip`.
- **Cards:** `TemplateCard`, `PricingCard`, `MilestoneCard`, `PhotoCard`.
- **Modals:** `Modal` (base), `PublishShareModal` (từ `couplestory_modal_xu_t_b_n_chia_s_desktop`).
- **Couple Specific:** `DualAvatarIndicator`, `TimelineTrack`.

## 3. Design Tokens (từ DESIGN.md)
- **Colors:**
  - Primary: `#FF4D8D` (Hover: `#E63E7B`)
  - Secondary: `#7A5068`
  - Tertiary: `#FFB3CE`
  - Background/Canvas: `#FFF5F9`
  - Surface: `#FDFBFC`
- **Typography:**
  - Headers/Titles: `Playfair Display`
  - Body/UI/Inputs: `DM Sans`
  - Accent (Trang trí): `Dancing Script`
- **Spacing/Radius:**
  - Radius: Pill (`9999px`) cho button/input, Card (`24px`), Modals (`32px`), Media (`20px`).
  - Container Max-width: `1280px` (Desktop).

## 4. Thứ tự Implementation (Phases)

**PHASE 1: Setup & Architecture (Hoàn thành sau bước này)**
- Cài đặt Vite React + TS + Tailwind.
- Khởi tạo thư mục `src` theo chuẩn.
- Map Design Tokens vào `tailwind.config.js`.

**PHASE 2: Design System & Mock Data**
- Tạo UI components cơ bản (Button, Input, Card).
- Tạo mock data cho Templates, Pricing, User Info, Story content.
- Setup Layouts (Main, Auth, Dashboard, Admin).
- Setup React Router.

**PHASE 3: Implement Pages**
- Auth Pages.
- Public Pages (Home, Pricing, Templates).
- User Dashboard & Checkout.
- Admin Pages.
- Public Story Templates.

**PHASE 4 & 5: Responsive, Polish & Review**
- Tối ưu Mobile / Tablet.
- Fix UI bugs, TS errors, ESLint.
