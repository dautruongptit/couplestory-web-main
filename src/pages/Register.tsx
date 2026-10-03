import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import { toast } from '@/utils/toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const { triggerLogin: triggerGoogleLogin, isAvailable: googleAvailable } = useGoogleLogin({
    onSuccess: async (credential) => {
      setError('');
      setIsLoading(true);
      try {
        const res = await googleLogin(credential);
        if (!res.ok) throw new Error(res.error);
        navigate('/home');
      } catch (err: any) {
        setError(err.message || 'Đăng nhập Google thất bại');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (msg) => setError(msg),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    try {
      setError('');
      setIsLoading(true);
      const res = await register(name, email, password);
      if (!res.ok) throw new Error(res.error);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
<main className="min-h-screen w-full flex flex-col justify-center"><div className="flex flex-col w-full">
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-inverse-surface flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-on-primary">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/40 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20 pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <a className="group flex items-center gap-2 text-on-primary" href="/">
            <span className="font-headline-md text-headline-md tracking-tight font-bold">CoupleStory</span>
            <span className="material-symbols-outlined text-rose-200 transition-transform duration-300 group-hover:scale-125" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
          </a>
          <span className="text-xs uppercase tracking-widest text-primary-fixed/80 font-label-sm">&#x2728; Milestone Space</span>
        </div>
        <div className="relative z-10 my-auto py-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 text-primary-fixed-dim select-none">
            <span className="text-lg">&#x1F338;</span>
            <span className="text-xs tracking-[0.3em] uppercase font-label-sm">Our Forever Canvas</span>
            <span className="text-lg">&#x1F338;</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl font-normal italic leading-tight text-white max-w-lg drop-shadow-sm">
            “Cùng nhau ghi lại từng nhịp đập, từng cái nắm tay và viết nên chương mới của hai bạn.”
          </h1>
          <p className="mt-4 font-headline-md text-headline-md text-pink-100/90 italic font-light">
            Start your forever journey in just 5 minutes.
          </p>
          <div className="relative mt-8 w-full max-w-sm px-4">
            <div className="relative mx-auto rounded-3xl bg-surface-container-lowest/95 text-on-surface shadow-2xl p-4 sm:p-5 transform -rotate-2 hover:rotate-0 transition-transform duration-500 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" data-alt="Warm aesthetic portrait of young romantic couple in gentle sunset light, soft cinematic color grading, editorial candid style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpPI02nT8F0KRpi3aADvqMNKeli5JrhYYYBY4lqmKAVpk7Oqt1qjxb0JyUI8hBnO54I4JFV6a8Rqdwv8PP5Y7H6ofCDnLmMGqJNOgX-5TguCjVTiNODl4n1Nj54cjb6CfkJICxaKmS1dE3nbO8IWSbNkbJziLgcDW-FptZInW83qJdrVVdDVzaXxZOjjDY7iMSl6_zKg0pnOQAGCFgQM_HM8cZH5losfVdH_ulWe5ngM-jrSIqN8gm" />
                  </div>
                  <div className="text-left">
                    <p className="font-title-md text-body-sm font-bold leading-tight">Minh Anh &amp; Hoàng</p>
                    <p className="font-label-sm text-[10px] text-secondary">couplestory.site/anhandhoang</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                  ? Day 1,248
                </span>
              </div>
              <div className="mt-3 p-3 rounded-2xl bg-surface-container-low text-center">
                <span className="font-label-sm text-[10px] tracking-wider text-secondary uppercase block mb-1">Thời gian yêu nhau</span>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="bg-surface-container-lowest rounded-xl py-1.5 shadow-sm">
                    <span className="block font-headline-md text-title-md font-bold text-primary">03</span>
                    <span className="text-[9px] text-secondary">Năm</span>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl py-1.5 shadow-sm">
                    <span className="block font-headline-md text-title-md font-bold text-primary">05</span>
                    <span className="text-[9px] text-secondary">Tháng</span>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl py-1.5 shadow-sm">
                    <span className="block font-headline-md text-title-md font-bold text-primary">18</span>
                    <span className="text-[9px] text-secondary">Ngày</span>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl py-1.5 shadow-sm">
                    <span className="block font-headline-md text-title-md font-bold text-primary">42</span>
                    <span className="text-[9px] text-secondary">Giờ</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 h-24 rounded-xl overflow-hidden relative">
                <img className="w-full h-full object-cover" data-alt="Romantic couple holding hands walking along beach shoreline during golden twilight hour, atmospheric soft film texture, rose pink tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClp_DKuFC7M33ihfpbZByarl6FZWM1kSq5CS6oAFLSGIeDsGisoKVX9fV2xm4Yg9NoyweNCyj-VvMIjvqmVyLxFTXYa1kZ-zA1meMgd1QRumzfxQMTanrp_QvWa0-cL6ntDhmGAHBnZrbKXh3EOvEM0f0zxGEdQLFFZnTI2PTUNjzrwC85lZ7KHDjA0iM8tHZUKdI7ZXYB2TppewmxNntVEGz7klQJeu23b07AtprOjuyZ3lHLcMwX" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                  <p className="text-white text-[11px] font-title-md italic">“Mỗi hoàng hôn đều đẹp hơn khi có em bên cạnh.”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-pink-100/90 pt-4">
          <span className="inline-flex items-center gap-1.5 font-label-md text-body-sm">
            <span className="material-symbols-outlined text-base text-primary-fixed">check_circle</span>
            Đăng ký miễn phí
          </span>
          <span className="text-white/40">•</span>
          <span className="inline-flex items-center gap-1.5 font-label-md text-body-sm">
            <span className="material-symbols-outlined text-base text-primary-fixed">check_circle</span>
            Không cần thẻ tín dụng
          </span>
        </div>
      </div>
      <div className="bg-surface-container-low/50 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
        <div className="w-full flex items-center justify-between pb-6">
          <a className="group inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-body-sm font-label-md" href="/">
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            Về trang chủ
          </a>
          <div className="flex items-center bg-surface-container rounded-full p-1 shadow-sm">
            <button className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-on-primary transition-all" type="button">VI</button>
            <button className="px-2.5 py-0.5 rounded-full text-xs font-medium text-secondary hover:text-on-surface transition-all" type="button">EN</button>
          </div>
        </div>
        <div className="w-full max-w-[460px] mx-auto my-auto py-4">
          <div className="mb-6 p-3.5 rounded-xl bg-surface-container-high text-on-surface flex items-start gap-3 shadow-sm">
            <span className="text-xl shrink-0 leading-none select-none">✨</span>
            <div className="text-xs leading-relaxed">
              <span className="font-bold text-primary">Template đã chọn:</span>
              <span className="font-medium"> Eternal Love (Luxury Editorial)</span>
              <span className="block text-secondary mt-0.5 text-[11px]">✨ Sẽ tự động áp dụng vào tài khoản sau khi đăng ký!</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Tạo tài khoản mới</h2>
            <p className="font-body-md text-body-sm text-secondary mt-1">
              Đã có tài khoản?
              <Link className="font-bold text-primary-container hover:underline ml-1" to="/login">Đăng nhập</Link>
            </p>
          </div>
          <button onClick={() => googleAvailable ? triggerGoogleLogin() : toast('Google Login chưa được cấu hình', 'info')} className="w-full h-12 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-body-md shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 active:scale-[0.99]" type="button">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4" />
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z" fill="#34A853" />
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z" fill="#FBBC05" />
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
            </svg>
            <span>Đăng ký nhanh với Google</span>
          </button>
          <div className="relative flex items-center justify-center my-6">
            <div className="w-full bg-surface-variant h-px" />
            <span className="relative bg-surface-container-low px-4 text-xs font-label-sm uppercase tracking-wider text-secondary">
              hoặc đăng ký bằng email
            </span>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                Họ và tên bạn (hoặc tên cặp đôi)
              </label>
              <div className="relative">
                <input className="w-full h-12 px-4 rounded-xl bg-surface-container-lowest text-on-surface text-body-md placeholder:text-secondary/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all" placeholder="VD: Hoàng & Minh Anh" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary/60 text-xl">favorite</span>
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                Email liên hệ
              </label>
              <div className="relative">
                <input className="w-full h-12 px-4 rounded-xl bg-surface-container-lowest text-on-surface text-body-md placeholder:text-secondary/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all" placeholder="hai_ban@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary/60 text-xl">mail</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-label-md text-label-md text-on-surface font-medium">Mật khẩu</label>
                <span className="text-xs font-label-sm font-semibold text-emerald-600">Mạnh</span>
              </div>
              <div className="relative">
                <input className="w-full h-12 px-4 pr-11 rounded-xl bg-surface-container-lowest text-on-surface text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all tracking-widest" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-on-surface" type="button">
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-1.5 flex-1 rounded-full bg-emerald-500 transition-colors" />
                <div className="h-1.5 flex-1 rounded-full bg-emerald-500 transition-colors" />
                <div className="h-1.5 flex-1 rounded-full bg-emerald-500 transition-colors" />
              </div>
              <div className="flex justify-between text-[10px] font-label-sm text-secondary mt-1">
                <span>Yếu</span>
                <span>Trung bình</span>
                <span className="text-emerald-600 font-semibold">Mạnh</span>
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input className="w-full h-12 px-4 pr-11 rounded-xl bg-surface-container-lowest text-on-surface text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all tracking-widest" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                {password && confirmPassword && password === confirmPassword ? (
                  <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 text-xl font-bold">check_circle</span>
                ) : null}
              </div>
            </div>
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input defaultChecked className="mt-0.5 w-4 h-4 rounded text-primary-container accent-primary-container shrink-0" type="checkbox" required />
                <span className="text-xs text-secondary leading-relaxed">
                  Tôi đồng ý với <a className="text-primary-container hover:underline font-medium" href="#">Điều khoản sử dụng</a> và <a className="text-primary-container hover:underline font-medium" href="#">Chính sách quyền riêng tư</a> của CoupleStory.
                </span>
              </label>
            </div>
            <div className="pt-2">
              <button disabled={isLoading} className="w-full h-14 rounded-full bg-primary-container hover:bg-primary text-on-primary font-title-lg text-title-md font-bold shadow-lg shadow-primary-container/30 hover:shadow-xl hover:shadow-primary-container/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none" type="submit">
                <span>{isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản miễn phí ✨'}</span>
                {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full pt-6 text-center text-secondary">
          <p className="inline-flex items-center gap-1.5 text-xs font-label-sm">
            <span className="material-symbols-outlined text-sm text-secondary/70">lock</span>
            Được bảo mật mã hóa SSL 256-bit
          </p>
        </div>
      </div>
    </div>
  </div></main>

    </div>
  );
}

