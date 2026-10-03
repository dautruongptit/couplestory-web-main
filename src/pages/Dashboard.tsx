import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import ConfirmModal from '@/components/ConfirmModal';
import RenewModal from '@/components/RenewModal';
import { usePlans } from '@/hooks/usePlans';
import { useTemplates } from '@/hooks/useTemplates';

export interface StoryResponse {
  id: string;
  coupleName1: string;
  coupleName2: string;
  subdomain: string;
  startDate?: string;
  templateCode?: string;
  createdAt: string;
  status?: string;
  expiresAt?: string | null;
}

function daysSince(dateStr?: string): number | null {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / 86_400_000);
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { plans } = usePlans();
  const { templates } = useTemplates();
  const maxStories = plans.find(p => p.code === (user?.plan ?? 'FREE'))?.maxStories ?? 1;

  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [renewTarget, setRenewTarget] = useState<string | null>(null);

  const [applyModal, setApplyModal] = useState<string | null>(null);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tpl = params.get('applyTemplate');
    if (tpl) {
      setApplyModal(tpl);
      navigate('/home', { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (location.hash === '#templates') {
      const el = document.getElementById('templates');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#stories') {
      const el = document.getElementById('stories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash, loading]);

  const handleCreateWithTemplate = async () => {
    if (!name1.trim() || !name2.trim()) {
      toast('Vui lòng nhập tên cả hai bạn', 'error');
      return;
    }
    setCreating(true);
    try {
      const tpl = templates.find(t => t.code === applyModal);
      const result: any = await apiClient.post('/stories', {
        coupleName1: name1.trim(),
        coupleName2: name2.trim(),
        templateCode: applyModal,
        type: tpl?.type || 'LOVE_STORY',
        title: `${name1.trim()} & ${name2.trim()}`,
      });
      toast('Đã tạo Story thành công!', 'success');
      navigate(`/editor/${result.id}`);
    } catch {
      toast('Không thể tạo Story. Vui lòng thử lại.', 'error');
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    apiClient.get('/stories')
      .then((data) => setStories(Array.isArray(data) ? data : []))
      .catch(() => toast('Không thể tải danh sách Story', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    if (stories.length >= maxStories) {
      toast(`Đã đạt giới hạn ${maxStories} Story. Nâng cấp gói để tạo thêm.`, 'error');
      return;
    }
    navigate('/create');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await apiClient.delete(`/stories/${deleteTarget}`);
      setStories(prev => prev.filter(s => s.id !== deleteTarget));
      toast('Đã xóa story', 'success');
    } catch { toast('Có lỗi xảy ra khi xóa', 'error'); }
    finally { setDeleteTarget(null); }
  };

  const firstName = user?.name?.split(' ').pop() || 'bạn';
  const planCode = user?.plan ?? 'FREE';
  const published = stories.filter(s => s.status === 'published').length;
  const drafts = stories.filter(s => s.status !== 'published').length;
  const firstStory = stories[0];
  const daysCount = daysSince(firstStory?.startDate);

  const showTemplates = templates.filter(t => t.isActive).slice(0, 4);

  return (
    <>
      {renewTarget && <RenewModal storyId={renewTarget} onClose={() => setRenewTarget(null)} />}

      <div className="px-4 md:px-6 py-6 max-w-[1600px] mx-auto">
        {/* Hero welcome */}
        <section className="rounded-2xl bg-gradient-to-br from-[#fff5f8] via-white to-[#fef0f4] border border-[#ffe0eb]/60 p-6 md:p-8 mb-6">
          {daysCount !== null && daysCount > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff0f4] border border-[#ffe0eb] text-xs font-semibold text-[#ff4d8d] mb-3">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              NGÀY {daysCount} BÊN NHAU
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-[#2e1220] mb-1">
            Chào mừng trở lại, <span className="text-[#ff4d8d]">{firstName}</span>! ✨
          </h1>
          <p className="text-sm text-[#594046] mb-5">
            {published > 0
              ? <>Bạn có <strong>{published}</strong> câu chuyện đã xuất bản{drafts > 0 && <> và <strong>{drafts}</strong> bản nháp</>}.</>
              : 'Bắt đầu tạo câu chuyện tình yêu đầu tiên của bạn.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(255,77,141,0.3)] hover:shadow-[0_6px_20px_rgba(255,77,141,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo Story mới
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {[
              { icon: 'photo_library', value: '—', label: 'Ảnh đã lưu', color: 'text-[#e63e7b]' },
              { icon: 'music_note', value: '—', label: 'Bài nhạc', color: 'text-[#7c3aed]' },
              { icon: 'visibility', value: '—', label: 'Lượt xem', color: 'text-[#0ea5e9]' },
              { icon: 'auto_stories', value: String(stories.length), label: 'Câu chuyện', color: 'text-[#f59e0b]' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#f0e4e8]/80 shadow-sm">
                <span className={`material-symbols-outlined text-[22px] ${s.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <div>
                  <p className="text-lg font-bold text-[#2e1220] leading-tight">{s.value}</p>
                  <p className="text-[11px] text-[#8d7076]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stories section */}
        <section id="stories" className="mb-8 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#2e1220] flex items-center gap-2">
              <span className="text-[#ff4d8d]">●</span> Câu chuyện của bạn
            </h2>
            <div className="flex items-center gap-1 text-sm">
              <button className="px-3 py-1 rounded-full bg-[#ff4d8d] text-white font-medium text-xs">Tất cả ({stories.length})</button>
              <button className="px-3 py-1 rounded-full text-[#594046] hover:bg-[#fff5f9] font-medium text-xs">Stories ({published})</button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-[#8d7076]">
              <span className="material-symbols-outlined text-[28px] animate-spin mr-2">progress_activity</span>
              Đang tải...
            </div>
          ) : stories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#fff0f4] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#ff4d8d] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
              <h3 className="text-lg font-bold text-[#2e1220] mb-1">Bắt đầu viết câu chuyện tình yêu</h3>
              <p className="text-sm text-[#594046] max-w-md mb-5">Tạo một trang web tình yêu để lưu giữ kỷ niệm, tỏ tình, hoặc đếm ngược ngày cưới.</p>
              <button onClick={openCreate} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white font-semibold shadow-lg">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Tạo Story đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map(story => {
                const isPublished = story.status === 'published';
                const days = daysSince(story.startDate);
                return (
                  <article key={story.id} className="bg-white rounded-2xl border border-[#f0e4e8] shadow-sm hover:shadow-md transition-all overflow-hidden group">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[48px] text-[#ff4d8d]/30">image</span>
                      </div>
                      {/* Status badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-[#ff4d8d] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {story.templateCode || 'Love Story'}
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold shadow-sm ${
                          isPublished ? 'bg-white/90 text-emerald-600' : 'bg-amber-50/90 text-amber-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                          {days !== null && days > 0 && <> · {days} ngày</>}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-[#2e1220] text-base mb-0.5 truncate">
                        {story.coupleName1} &amp; {story.coupleName2}
                      </h3>
                      <p className="text-xs text-[#8d7076] mb-3 truncate">
                        {story.subdomain ? `${story.subdomain}.couplestory.site` : 'Chưa có đường dẫn'}
                      </p>

                      {/* Expiry info */}
                      {story.expiresAt && (
                        <p className="text-[11px] text-[#8d7076] mb-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          Hết hạn: {new Date(story.expiresAt).toLocaleDateString('vi-VN')}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/editor/${story.id}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white text-xs font-semibold hover:opacity-95 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          Chỉnh sửa
                        </Link>
                        <Link
                          to={`/demo/${story.id}`}
                          className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[#f5eef1] text-[#594046] text-xs font-medium hover:bg-[#ffe8ef] transition-colors"
                          title="Xem"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </Link>
                        {story.expiresAt && planCode !== 'PREMIUM' && (
                          <button
                            onClick={() => setRenewTarget(story.id)}
                            className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#f5eef1] text-[#594046] text-xs font-medium hover:bg-[#ffe8ef] transition-colors"
                            title="Gia hạn"
                          >
                            <span className="material-symbols-outlined text-[16px]">update</span>
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteTarget(story.id)}
                          className="flex items-center justify-center py-2 px-3 rounded-xl bg-[#fef1f1] text-[#ba1a1a] text-xs font-medium hover:bg-[#ffdad6] transition-colors"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Create new card */}
              {stories.length < maxStories && (
                <div
                  onClick={openCreate}
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#ffe0eb] bg-[#fffbfc] hover:bg-[#fff5f9] hover:border-[#ff4d8d]/40 transition-all cursor-pointer min-h-[280px] group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#fff0f4] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#ff4d8d] text-[28px]">add</span>
                  </div>
                  <p className="font-semibold text-[#2e1220] text-sm">Tạo thêm câu chuyện</p>
                  <p className="text-xs text-[#8d7076] mt-0.5">Còn {maxStories - stories.length} lượt</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* CTA Banner */}
        {stories.length > 0 && (
          <section className="rounded-2xl bg-gradient-to-r from-[#fff0f4] to-[#ffe8ef] border border-[#ffe0eb] p-5 flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#ff4d8d]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ff4d8d] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-[#2e1220] text-sm">Có một dịp đặc biệt sắp tới?</p>
              <p className="text-xs text-[#594046]">Tạo website kỷ niệm, thiệp mời hoặc nhật ký tình yêu chỉ trong vài phút.</p>
            </div>
            <button onClick={openCreate} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
              Tạo ngay
            </button>
          </section>
        )}

        {/* Template inspiration */}
        {showTemplates.length > 0 && (
          <section id="templates" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest uppercase mb-0.5">● Giao diện đề xuất</p>
                <h2 className="text-lg font-bold text-[#2e1220]">Khám phá giao diện</h2>
                <p className="text-xs text-[#594046]">Những mẫu giao diện xinh xắn dành riêng cho các cặp đôi</p>
              </div>
              <Link to="/templates" className="text-[#ff4d8d] text-sm font-semibold hover:underline whitespace-nowrap">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {showTemplates.map(t => (
                <div key={t.code} className="group flex flex-col">
                  <Link to={`/preview/${t.code}`} className="block">
                    <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6] overflow-hidden mb-2 border border-[#f0e4e8] group-hover:shadow-md transition-shadow relative">
                      {/* Optional Overlay on hover */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[40px] text-[#ff4d8d]/30">palette</span>
                      </div>
                    </div>
                  </Link>
                  <p className="font-semibold text-sm text-[#2e1220] truncate">{t.name}</p>
                  <p className="text-[11px] text-[#8d7076] mb-2">{t.package === 'FREE' ? 'Miễn phí' : `Gói ${t.package}`}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <Link to={`/preview/${t.code}`} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center bg-[#fff0f4] text-[#b90a5a] hover:bg-[#ffe0eb] transition-colors">
                      Xem demo
                    </Link>
                    <Link to={`/home?applyTemplate=${t.code}`} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-center bg-[#ff4d8d] text-white shadow-sm hover:bg-[#e63e7b] transition-colors">
                      Dùng mẫu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Xóa story này?"
        message="Toàn bộ nội dung, ảnh và sự kiện sẽ bị xóa vĩnh viễn. Không thể hoàn tác."
        confirmLabel="Xóa story"
        cancelLabel="Giữ lại"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setApplyModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[#2e1220] mb-1">Tạo Story mới</h3>
            <p className="text-sm text-[#594046] mb-4">
              Mẫu: <span className="font-semibold text-[#ff4d8d]">{templates.find(t => t.code === applyModal)?.name || applyModal}</span>
            </p>
            <div className="flex flex-col gap-3 mb-5">
              <input
                type="text"
                placeholder="Tên bạn"
                value={name1}
                onChange={e => setName1(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e1bec5] focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 outline-none text-sm"
                autoFocus
              />
              <input
                type="text"
                placeholder="Tên người ấy"
                value={name2}
                onChange={e => setName2(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e1bec5] focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 outline-none text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setApplyModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#e1bec5] text-[#594046] text-sm font-medium hover:bg-[#fff5f9] transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateWithTemplate}
                disabled={creating}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {creating ? 'Đang tạo...' : 'Tạo Story'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

