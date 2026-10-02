import { Outlet, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f8]">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="w-full bg-[#F5EEF1] border-t border-[#e1bec5]/40 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <Link to="/" className="flex items-center gap-2 font-headline-md text-headline-md text-[#ff4d8d]">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                CoupleStory
              </Link>
              <p className="text-body-sm text-[#594046] max-w-xs">
                Nền tảng lưu giữ kỷ niệm tình yêu hiện đại, tinh tế và riêng tư.
              </p>
            </div>

            {[
              {
                title: 'Sản phẩm',
                links: [
                  { label: 'Kho giao diện', to: '/templates' },
                  { label: 'Gói thành viên', to: '/pricing' },
                  { label: 'Xem demo', to: '/s/eternal' },
                ],
              },
              {
                title: 'Tài khoản',
                links: [
                  { label: 'Đăng nhập', to: '/login' },
                  { label: 'Đăng ký', to: '/register' },
                  { label: 'Home', to: '/dashboard' },
                ],
              },
              {
                title: 'Hỗ trợ',
                links: [
                  { label: 'Câu hỏi thường gặp', to: '/#faq' },
                  { label: 'Liên hệ', to: '/#contact' },
                  { label: 'Điều khoản', to: '/#terms' },
                ],
              },
            ].map(col => (
              <div key={col.title} className="space-y-2">
                <h3 className="font-title-md text-title-md text-[#2e1220]">{col.title}</h3>
                <ul className="space-y-1">
                  {col.links.map(link => (
                    <li key={link.to}>
                      <Link to={link.to}
                        className="text-body-sm text-[#594046] hover:text-[#ff4d8d] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#e1bec5]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-body-sm text-[#594046]">
              © 2026 CoupleStory. Made with{' '}
              <span className="text-[#ff4d8d]">♥</span> in Vietnam
            </p>
            <span className="inline-flex items-center gap-1.5 text-label-sm text-label-sm text-[#8d7076]">
              <span className="w-2 h-2 rounded-full bg-[#ff4d8d] animate-pulse" />
              couplestory.site
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
