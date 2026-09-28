import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import { toast } from '@/utils/toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const { triggerLogin: triggerGoogleLogin, isAvailable: googleAvailable } = useGoogleLogin({
    onSuccess: async (credential) => {
      setError('');
      setIsLoading(true);
      try {
        const res = await googleLogin(credential);
        if (!res.ok) throw new Error(res.error);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Đăng nhập Google thất bại');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (msg) => setError(msg),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (!res.ok) throw new Error(res.error);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (googleAvailable) {
      triggerGoogleLogin();
    } else {
      toast('Google Login chưa được cấu hình', 'info');
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <div className="flex flex-col w-full">
        <div className="w-full min-h-screen lg:min-h-[calc(100vh-2rem)] flex flex-col lg:flex-row shadow-2xl rounded-none lg:rounded-xl overflow-hidden my-auto lg:p-4">
          
          {/* LEFT PANEL: Romantic Visual Studio (50%) */}
          <section className="relative w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ff4d8d] via-[#7a2e5b] to-[#2e1220] text-white min-h-[400px] lg:min-h-[820px] rounded-t-xl lg:rounded-xl lg:mr-4">
            {/* Background Ambient Glow & Sparkle Overlays */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#ffb1c4]/20 blur-3xl pointer-events-none" />
            
            {/* Brand Header */}
            <header className="relative z-10 flex items-center justify-between">
              <Link className="group flex items-center gap-2 text-white" to="/">
                <span className="font-headline-md text-headline-md tracking-tight font-bold group-hover:opacity-90 transition-opacity">
                  CoupleStory
                </span>
                <span className="text-[#ffb1c4] text-xl animate-pulse">&#x1F495;</span>
              </Link>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-label-sm font-label-sm tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Không gian riêng tư</span>
              </div>
            </header>

            {/* Center Hero Narrative & Phone Mockup */}
            <div className="relative z-10 flex flex-col my-auto py-8">
              <div className="max-w-md">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/70 block mb-3">
                  Digital Archive for Two
                </span>
                <h1 className="font-headline-lg text-headline-lg lg:font-headline-xl lg:text-headline-xl italic font-semibold leading-tight text-white mb-4">
                  “Mỗi câu chuyện tình yêu đều là một kiệt tác, và nơi đây là phòng trưng bày của riêng hai bạn.”
                </h1>
                <p className="font-headline-md text-headline-md italic font-normal text-white/80 tracking-wide mb-8">
                  Where eternal love stories are preserved forever...
                </p>
              </div>
              
              {/* Sleek Phone Mockup Showcase */}
              <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 shadow-2xl rounded-xl p-3 bg-white/10 backdrop-blur-md hidden sm:block">
                <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-inner bg-black/20">
                  <img className="w-full h-full object-cover" alt="Romantic couple" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj9m6sHPY6bEuXwkqMPr8OQhZw9hHL26A8X3QUGUFu-ZOAPccU0uEym7rLtSOvUmFOe1xvwToV03HtcUjUe21JSbL_Rza4_TdcAuUe9g3jfXGf__06oKH_TLC2ikUXcga7jLamDGRfpy2puyZMoWtUTqRi00TLfipt3KYH5JdFnChQzoEaZtRnSydA-nFhs_spuuIEY4a9TDFVNLxUqFpEamztsxJSmP6tcx_kro2mWfya3gd_Xb99" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="font-title-md text-title-md font-medium leading-none text-white">Minh &amp; Lan</p>
                      <p className="font-label-sm text-label-sm text-white/70 mt-1">1,248 ngày chung đôi ở Đà Lạt</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#ff4d8d]/80 flex items-center justify-center text-white shadow-md">
                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Left Panel Footer: Social Proof */}
            <footer className="relative z-10 pt-6 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-white/5 via-white/10 to-transparent p-4 rounded-lg backdrop-blur-sm hidden sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#ff4d8d] flex items-center justify-center text-white font-label-sm font-bold shadow-sm">T</div>
                  <div className="w-8 h-8 rounded-full bg-[#b90a5a] flex items-center justify-center text-white font-label-sm font-bold shadow-sm">M</div>
                  <div className="w-8 h-8 rounded-full bg-[#8d7076] flex items-center justify-center text-white font-label-sm font-bold shadow-sm">K</div>
                </div>
                <div>
                  <p className="font-title-md text-title-md text-white font-semibold flex items-center gap-1.5 leading-none">
                    Được tin tưởng bởi 5,000+ cặp đôi ❤️
                  </p>
                  <p className="font-body-sm text-body-sm text-white/70 mt-1 leading-none">Khắp 63 tỉnh thành Việt Nam</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full">
                <div className="flex text-amber-300 text-xs">
                  <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                  <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-white ml-1">4.9/5</span>
              </div>
            </footer>
          </section>

          {/* RIGHT PANEL: Authentication Form (50%) */}
          <section className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-between bg-white text-[#2e1220] rounded-b-xl lg:rounded-xl">
            {/* Right Top Navigation Bar */}
            <nav className="flex items-center justify-between w-full pb-6">
              <Link className="inline-flex items-center gap-2 font-label-md text-label-md text-[#594046] hover:text-[#ff4d8d] transition-colors duration-200" to="/">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>Về trang chủ</span>
              </Link>
            </nav>

            {/* Center Auth Workspace */}
            <div className="w-full max-w-[440px] mx-auto my-auto py-4">
              {/* Form Header */}
              <div className="mb-8">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#ff4d8d] font-semibold mb-2 block">
                  Chào mừng trở lại
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-[#2e1220] tracking-tight mb-2">
                  Đăng nhập
                </h2>
                <p className="font-body-md text-body-md text-[#594046]">
                  Chào mừng bạn quay lại! Chưa có tài khoản?{' '}
                  <Link className="text-[#ff4d8d] hover:text-[#b90a5a] font-semibold underline underline-offset-4 transition-colors" to="/register">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              {/* Google OAuth Button */}
              <button onClick={handleGoogleLogin} className="w-full h-12 flex items-center justify-center gap-3 px-6 bg-[#fff8f8] hover:bg-[#ffe8ef] border border-[#e1bec5] text-[#2e1220] font-title-md text-title-md rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99]" type="button">
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="font-medium">Tiếp tục với Google</span>
              </button>
              
              {/* Divider */}
              <div className="relative flex items-center my-7">
                <div className="flex-grow h-px bg-[#e1bec5]" />
                <span className="flex-shrink mx-4 font-body-sm text-body-sm text-[#8d7076] bg-white px-2">
                  hoặc Đăng nhập bằng email
                </span>
                <div className="flex-grow h-px bg-[#e1bec5]" />
              </div>

              {error && (
                <div className="mb-4 bg-[#ffdad6] text-[#93000a] text-body-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>{error}
                </div>
              )}

              {/* Login Form */}
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="font-label-md text-label-md text-[#2e1220] font-semibold mb-1.5 flex items-center justify-between" htmlFor="email">
                    <span>Email của bạn</span>
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full h-12 px-4 rounded-xl bg-[#fff8f8] border border-[#e1bec5] text-[#2e1220] placeholder:text-[#8d7076] focus:outline-none focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 transition-all duration-200" 
                      id="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="user@couplestory.site" 
                      required 
                      type="email" 
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#8d7076] pointer-events-none text-xl">
                      mail
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="font-label-md text-label-md text-[#2e1220] font-semibold mb-1.5 flex items-center justify-between" htmlFor="password">
                    <span>Mật khẩu</span>
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full h-12 pl-4 pr-12 rounded-xl bg-[#fff8f8] border border-[#e1bec5] text-[#2e1220] placeholder:text-[#8d7076] focus:outline-none focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 transition-all duration-200" 
                      id="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="******" 
                      required 
                      type={showPassword ? "text" : "password"} 
                    />
                    <button 
                      aria-label="Ẩn hiện mật khẩu" 
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#8d7076] hover:text-[#ff4d8d] transition-colors rounded-full" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <input className="w-4 h-4 rounded text-[#ff4d8d] focus:ring-0 bg-[#fff8f8] border-[#e1bec5] cursor-pointer" type="checkbox" />
                    <span className="font-body-sm text-body-sm text-[#594046] group-hover:text-[#2e1220] transition-colors">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <Link className="font-body-sm text-body-sm font-semibold text-[#ff4d8d] hover:text-[#b90a5a] transition-colors" to="/forgot-password">
                    Quên mật khẩu?
                  </Link>
                </div>

                <button 
                  disabled={isLoading}
                  className="relative mt-2 w-full h-12 flex items-center justify-center gap-2 rounded-full bg-[#ff4d8d] hover:bg-[#b90a5a] text-white font-title-md text-title-md font-semibold shadow-lg shadow-[#ff4d8d]/30 hover:shadow-[#ff4d8d]/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100" 
                  type="submit"
                >
                  {isLoading ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Đang xử lý...</>
                  ) : (
                    <>
                      <span>Đăng nhập vào CoupleStory</span>
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </>
                  )}
                </button>
              </form>

              {/* Mock Accounts Hint Box Removed */}
            </div>

            {/* Legal Footnote */}
            <footer className="pt-6 w-full text-center">
              <p className="font-body-sm text-body-sm text-[#8d7076] max-w-sm mx-auto leading-relaxed">
                Bằng cách đăng nhập, bạn đồng ý với{' '}
                <Link className="underline underline-offset-2 hover:text-[#ff4d8d] transition-colors" to="/#terms">Điều khoản dịch vụ</Link> 
                {' '}và{' '}
                <Link className="underline underline-offset-2 hover:text-[#ff4d8d] transition-colors" to="/#privacy">Chính sách bảo mật</Link> 
                {' '}của CoupleStory.
              </p>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
