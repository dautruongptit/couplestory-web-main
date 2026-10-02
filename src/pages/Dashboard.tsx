import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import ConfirmModal from '@/components/ConfirmModal';
import { usePlans } from '@/hooks/usePlans';

export interface StoryResponse {
  id: string;
  coupleName1: string;
  coupleName2: string;
  subdomain: string;
  startDate?: string;
  templateCode?: string;
  createdAt: string;
  status?: string;
}

// ============================================================
// WIZARD: Tạo Story mới theo từng bước
// ============================================================

const PURPOSE_OPTIONS = [
  { id: 'confession', icon: '💌', label: 'Tỏ tình / Thả thính', desc: 'Gửi lời yêu thương đến crush' },
  { id: 'anniversary', icon: '🎉', label: 'Kỷ niệm ngày yêu', desc: '100 ngày, 1 năm, 1000 ngày...' },
  { id: 'apology', icon: '🥺', label: 'Xin lỗi / Làm hòa', desc: 'Vì lỡ làm người ấy buồn...' },
  { id: 'wedding', icon: '💍', label: 'Đám cưới / Save the Date', desc: 'Thiệp cưới & đếm ngược ngày trọng đại' },
  { id: 'diary', icon: '📖', label: 'Nhật ký tình yêu', desc: 'Ghi lại mọi khoảnh khắc hàng ngày' },
];

function CreateStoryWizard({ onClose, onCreated, presetTemplateCode, prefill }: { onClose: () => void; onCreated: (story: StoryResponse) => void; presetTemplateCode?: string; prefill?: StoryResponse }) {
  const [step, setStep] = useState(presetTemplateCode ? 2 : 1);
  const [purpose, setPurpose] = useState('');
  const [partnerAName, setPartnerAName] = useState(prefill?.coupleName1 || '');
  const [partnerBName, setPartnerBName] = useState(prefill?.coupleName2 || '');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(prefill?.startDate || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPurpose = PURPOSE_OPTIONS.find(p => p.id === purpose);

  const handleFinish = async () => {
    try {
      setIsSubmitting(true);
      const newStory = await apiClient.post('/stories', {
        coupleName1: partnerAName,
        coupleName2: partnerBName,
        startDate,
        title: title || undefined,
        templateCode: presetTemplateCode || purpose
      });
      onCreated(newStory);
    } catch (error: any) {
      console.error(error);
      toast(error?.message || 'Có lỗi xảy ra khi tạo story', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface z-10 px-8 pt-8 pb-4 border-b border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label-sm text-primary uppercase tracking-widest">Bước {step} / 2</p>
              <h2 className="font-headline-md text-on-surface mt-1">
                {step === 1 && 'Hôm nay bạn muốn làm gì đặc biệt?'}
                {step === 2 && 'Thông tin cặp đôi'}
              </h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step ? 'bg-primary-container' : 'bg-surface-container'}`} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* STEP 1: Chọn mục đích */}
          {step === 1 && (
            <div className="grid grid-cols-1 gap-3">
              {PURPOSE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setPurpose(opt.id); setStep(2); }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] ${
                    purpose === opt.id
                      ? 'border-primary-container bg-primary-container/10 shadow-sm'
                      : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/30'
                  }`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div className="flex-1">
                    <p className="font-title-md text-on-surface">{opt.label}</p>
                    <p className="font-body-sm text-on-surface-variant">{opt.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2: Thông tin cặp đôi */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                {selectedPurpose ? (
                  <>
                    <span className="text-xl">{selectedPurpose.icon}</span>
                    Kịch bản: <strong className="text-on-surface">{selectedPurpose.label}</strong>
                  </>
                ) : (
                  <>Đang tạo Story với mẫu giao diện bạn đã chọn.</>
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface" htmlFor="partnerA">Tên bạn</label>
                  <input
                    id="partnerA"
                    value={partnerAName}
                    onChange={e => setPartnerAName(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Ví dụ: Bảo Long"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-on-surface" htmlFor="partnerB">Tên người ấy</label>
                  <input
                    id="partnerB"
                    value={partnerBName}
                    onChange={e => setPartnerBName(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Ví dụ: An Nhiên"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface" htmlFor="title">Tiêu đề Story <span className="text-outline font-normal">(không bắt buộc)</span></label>
                <input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={purpose === 'wedding' ? 'Ví dụ: Save The Date' : purpose === 'apology' ? 'Ví dụ: Anh Xin Lỗi Em' : 'Ví dụ: Happy 1st Anniversary'}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface" htmlFor="startDate">
                  {purpose === 'wedding' ? 'Ngày cưới dự kiến' : purpose === 'confession' ? 'Ngày gặp nhau lần đầu' : 'Ngày bắt đầu yêu'}
                  <span className="text-outline font-normal ml-1">(không bắt buộc)</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Gợi ý: sau này sẽ thêm phần upload ảnh / nhạc ở đây */}
              <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">lightbulb</span>
                <div>
                  <p className="font-title-md text-on-surface text-sm">Chưa có ảnh cũng không sao!</p>
                  <p className="font-body-sm text-on-surface-variant">Bạn có thể tải ảnh lên sau trong phần Chỉnh sửa. Hệ thống sẽ dùng ảnh mặc định cho bạn trước.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {!presetTemplateCode && (
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-colors">
                    ← Quay lại
                  </button>
                )}
                <button
                  onClick={handleFinish}
                  disabled={!partnerAName.trim() || !partnerBName.trim() || isSubmitting}
                  className="flex-1 px-6 py-3 rounded-full bg-primary-container text-on-primary font-title-md shadow-md hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  {isSubmitting ? 'Đang tạo...' : 'Tạo Story ngay!'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EMPTY STATE: Dashboard khi chưa có story nào
// ============================================================

function EmptyDashboard({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Icon lớn */}
      <div className="w-28 h-28 rounded-full bg-primary-container/10 flex items-center justify-center mb-8 animate-pulse">
        <span className="material-symbols-outlined text-primary-container text-[56px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
      </div>

      <h2 className="font-headline-lg text-on-surface mb-3">Bắt đầu viết câu chuyện tình yêu</h2>
      <p className="font-body-lg text-on-surface-variant max-w-md mb-8">
        Chưa có Story nào cả! Hãy tạo một trang web để lưu giữ kỷ niệm, tỏ tình, hoặc đếm ngược ngày cưới — chỉ mất 30 giây.
      </p>

      <button
        onClick={onCreateClick}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary-container text-on-primary font-title-lg shadow-lg shadow-primary-container/30 hover:opacity-95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <span className="material-symbols-outlined text-[24px]">add_circle</span>
        <span>Tạo Story đầu tiên</span>
      </button>

      {/* Gợi ý các kịch bản */}
      <div className="mt-12 w-full max-w-lg">
        <p className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">Bạn có thể tạo</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: '💌', label: 'Tỏ tình' },
            { icon: '🎉', label: 'Kỷ niệm' },
            { icon: '🥺', label: 'Xin lỗi' },
            { icon: '💍', label: 'Đám cưới' },
            { icon: '📖', label: 'Nhật ký' },
            { icon: '🎁', label: 'Bất ngờ' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant font-body-md">
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD CHÍNH
// ============================================================

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { plans } = usePlans();
  const maxStories = plans.find(p => p.code === (user?.plan ?? 'FREE'))?.maxStories ?? 1;

  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showWizard, setShowWizard] = useState(location.search.includes('new=1'));
  // Read directly from the URL rather than storing in state: it must stay in sync
  // with location.search, and this avoids a second source of truth to drift from it.
  const applyTemplate = new URLSearchParams(location.search).get('applyTemplate') || undefined;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get('/stories')
      .then(async (data) => {
        setStories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        toast('Không thể tải danh sách Story', 'error');
      })
      .finally(() => setLoading(false));
  }, [location.search]);

  useEffect(() => {
    if (!applyTemplate || loading || plans.length === 0) return;
    if (stories.length >= maxStories) {
      toast(`Bạn đã đạt giới hạn ${maxStories} Story. Vui lòng xóa Story cũ hoặc nâng cấp gói.`, 'error');
    } else {
      setShowWizard(true);
    }
  }, [applyTemplate, loading, plans.length]);

  const displayStories = stories;

  const openWizard = () => {
    if (displayStories.length >= maxStories) {
      toast(`Bạn đã đạt giới hạn ${maxStories} Story. Vui lòng xóa Story cũ hoặc nâng cấp gói.`, 'error');
      return;
    }
    navigate('/create');
  };

  const handleCreated = (newStory: StoryResponse) => {
    setStories(prev => [...prev, newStory]);
    setShowWizard(false);
    navigate(`/editor/${newStory.id}`);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiClient.delete(`/stories/${deleteTarget}`);
      setStories(prev => prev.filter(s => s.id !== deleteTarget));
      toast('Đã xóa story', 'success');
    } catch (e) {
      console.error(e);
      toast('Có lỗi xảy ra khi xóa story', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  const getStoryLink = (story: StoryResponse): string => {
    return `/demo/${story.id}`;
  };

  const getStoryMeta = (story: StoryResponse) => {
    const purposeOption = PURPOSE_OPTIONS.find(p => p.id === story.templateCode);
    return { 
      icon: purposeOption?.icon || '💕', 
      label: purposeOption?.label || story.templateCode || 'Story', 
      badge: story.status === 'published' ? 'PUBLISHED' : 'DRAFT', 
      image: '' 
    };
  };

  // Tách tên cặp đôi từ user.name (VD: "Bảo Long & An Nhiên" → ["Bảo Long", "An Nhiên"])
  const names = user?.name?.split('&').map(n => n.trim()) || ['Bạn'];
  const displayName = names.length >= 2
    ? <><span className="text-primary italic">{names[0]}</span> &amp; <span className="text-primary italic">{names[1]}</span></>
    : <span className="text-primary italic">{names[0]}</span>;

  const planLabel = user?.plan === 'PREMIUM' ? 'GÓI PREMIUM' : user?.plan === 'COUPLE' ? 'GÓI COUPLE' : user?.plan === 'PLUS' ? 'GÓI PLUS' : 'GÓI FREE';

  return (
    <>
      {showWizard && (
        <CreateStoryWizard
          onClose={() => setShowWizard(false)}
          onCreated={handleCreated}
          presetTemplateCode={applyTemplate}
          prefill={applyTemplate && stories.length > 0 ? stories[0] : undefined}
        />
      )}

      <main className="w-full pt-16 bg-surface min-h-screen px-space-lg py-space-md">
        <div className="flex flex-col w-full gap-space-xl">

          {/* HEADER */}
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-xs text-primary font-label-md">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                <span className="tracking-wide">HÀNH TRÌNH TÌNH YÊU</span>
              </div>
              <h1 className="font-headline-lg text-on-surface tracking-tight">
                Chào buổi sáng, {displayName} ✨
              </h1>
              <p className="font-body-lg text-on-surface-variant">
                {displayStories.length > 0
                  ? <>Bạn đang có <span className="font-title-md text-primary font-bold">{displayStories.length}</span> câu chuyện tình yêu được lưu giữ trên nền tảng.</>
                  : 'Chào mừng bạn đến với CoupleStory! Hãy bắt đầu tạo câu chuyện tình yêu đầu tiên.'
                }
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm">
              <button
                onClick={openWizard}
                className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary font-title-md shadow-md shadow-primary-container/25 hover:opacity-95 hover:shadow-lg hover:shadow-primary-container/30 transition-all active:scale-98"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Tạo Story mới</span>
              </button>
            </div>
          </section>

          {/* LOADING or EMPTY STATE or CONTENT */}
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
              <span className="font-label-md">Đang tải story của bạn...</span>
            </div>
          ) : displayStories.length === 0 ? (
            <EmptyDashboard onCreateClick={openWizard} />
          ) : (
            <>
              {/* STATS */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex flex-col justify-between p-space-lg rounded-DEFAULT bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-space-sm">
                    <span className="font-label-md text-on-surface-variant">Story đang hoạt động</span>
                    <span className="px-space-xs py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm tracking-wider">{planLabel}</span>
                  </div>
                  <div className="my-space-md">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-headline-md text-on-surface">{displayStories.length}</span>
                      <span className="font-title-md text-outline">/ {maxStories} Story</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full transition-all duration-700" style={{ width: `${displayStories.length / maxStories * 100}%` }} />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-space-lg rounded-DEFAULT bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-label-md text-on-surface-variant">Lượt xem &amp; Chúc mừng</span>
                  <div className="my-space-md flex items-center gap-space-lg">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-on-surface">2,486</span>
                      <span className="font-label-sm text-emerald-500">+12%</span>
                    </div>
                    <div className="h-8 w-px bg-outline-variant/30" />
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-on-surface">38</span>
                      <span className="font-body-sm text-on-surface-variant">lời chúc</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-space-lg rounded-DEFAULT bg-gradient-to-br from-primary-container/10 to-primary/5 shadow-sm hover:shadow-md transition-shadow border border-primary-container/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>auto_awesome</span>
                    <span className="font-label-md text-primary">Nâng cấp Premium</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant my-space-md">Mở khóa <strong className="text-on-surface">Template VIP</strong>, tên miền riêng, xóa watermark.</p>
                  <Link to="/dashboard/upgrade" className="inline-flex items-center gap-1 text-primary font-label-md hover:underline">
                    <span>Xem gói nâng cấp</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </section>

              {/* STORY CARDS */}
              <section className="flex flex-col gap-space-md">
                <h2 className="font-headline-md text-on-surface flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
                  Tất cả Story của bạn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {displayStories.map((story) => {
                    const meta = getStoryMeta(story);
                    const link = getStoryLink(story);
                    return (
                      <article key={story.id} className="flex flex-col rounded-DEFAULT bg-surface-container-lowest shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="relative w-full aspect-video overflow-hidden bg-surface-container">
                          {meta.image ? (
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src={meta.image} alt={`${story.coupleName1} & ${story.coupleName2}`} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                              <span className="material-symbols-outlined text-[48px] text-outline">image</span>
                            </div>
                          )}
                          <div className="absolute top-space-sm left-space-sm right-space-sm flex items-center justify-between pointer-events-none">
                            <span className="px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm shadow-sm flex items-center gap-1">
                              <span>{meta.icon}</span> {meta.badge}
                            </span>
                            <span className={`px-space-sm py-1 rounded-full backdrop-blur-md font-label-sm shadow-sm flex items-center gap-1.5 ${
                              story.status === 'published'
                                ? 'bg-surface-container-lowest/90 text-on-surface'
                                : 'bg-amber-100/90 text-amber-800'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${story.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {story.status === 'published' ? 'ĐANG HOẠT ĐỘNG' : 'BẢN NHÁP'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col flex-1 p-space-lg gap-space-md">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-headline-md text-on-surface tracking-tight leading-snug">{story.coupleName1} &amp; {story.coupleName2}</h3>
                            <Link className="inline-flex items-center gap-1 text-primary hover:underline font-body-sm group/link w-fit" to={link}>
                              <span className="material-symbols-outlined text-[15px]">public</span>
                              <span className="truncate">{story.subdomain || story.id}.couplestory.site</span>
                              <span className="material-symbols-outlined text-[14px] opacity-70 group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                            </Link>
                          </div>

                          <div className="flex flex-col gap-space-xs p-space-sm rounded-DEFAULT bg-surface-container-low font-body-sm text-on-surface-variant">
                            <div className="flex items-center justify-between">
                              <span className="text-outline">Kịch bản:</span>
                              <span className="font-title-md text-on-surface text-[13px] flex items-center gap-1">
                                <span>{meta.icon}</span> {meta.label}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-outline">Cặp đôi:</span>
                              <span className="text-on-surface font-medium">{story.coupleName1} &amp; {story.coupleName2}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {story.startDate && (
                              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">event</span> {new Date(story.startDate).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-space-xs pt-space-xs mt-auto">
                            <Link className="flex-1 py-space-sm px-space-md rounded-full bg-primary-container text-on-primary font-title-md text-center shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-1" to={`/editor/${story.id}`}>
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                              <span>Chỉnh sửa</span>
                            </Link>
                            <Link className="py-space-sm px-space-md rounded-full bg-surface-container-high text-on-surface font-title-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1" to={link} title="Xem trang web">
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                              <span className="hidden sm:inline">Xem</span>
                            </Link>
                            <button onClick={() => setDeleteTarget(story.id)} className="w-10 h-10 rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors flex items-center justify-center" title="Xóa story">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {/* Create New Card */}
                  <div
                    onClick={openWizard}
                    className="flex flex-col items-center justify-center p-space-xl rounded-DEFAULT bg-surface-container-lowest/60 text-center gap-space-md shadow-sm min-h-[380px] hover:bg-surface-container-lowest transition-colors cursor-pointer hover:shadow-md"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
                      <span className="material-symbols-outlined text-[32px]">favorite</span>
                    </div>
                    <div className="flex flex-col gap-space-xs max-w-xs">
                      <h3 className="font-headline-md text-on-surface">Tạo thêm một câu chuyện</h3>
                      <p className="font-body-md text-on-surface-variant">
                        Bạn còn <span className="text-primary font-bold">{maxStories - displayStories.length} lượt tạo Story</span> trong tài khoản.
                      </p>
                    </div>
                    <span className="mt-space-xs inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary font-title-md shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">add_circle</span>
                      <span>+ Tạo Story mới</span>
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <ConfirmModal
        open={!!deleteTarget}
        title="Xóa story này?"
        message="Toàn bộ nội dung, ảnh và sự kiện trong story sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác."
        confirmLabel="Xóa story"
        cancelLabel="Giữ lại"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
