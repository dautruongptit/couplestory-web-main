import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { usePlans } from '@/hooks/usePlans';
import { getStoryPublicUrl } from '@/utils/publicStory';

interface StoryInfo {
  id: string;
  slug: string;
  title: string;
  status: string;
  expiresAt?: string | null;
}

const NEXT_PLAN: Record<string, string> = { FREE: 'PLUS', PLUS: 'COUPLE', COUPLE: 'PREMIUM' };
const UNLIMITED = 1_000_000;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export default function StoryPublished() {
  const { scenarioId } = useParams();
  const { user } = useAuth();
  const { plans } = usePlans();
  const [story, setStory] = useState<StoryInfo | null>(null);
  const [storyCount, setStoryCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    Promise.all([apiClient.get(`/stories/${scenarioId}`), apiClient.get('/stories')])
      .then(([s, list]) => {
        setStory(s);
        setStoryCount(Array.isArray(list) ? list.length : null);
      })
      .catch(() => setFailed(true));
  }, [scenarioId]);

  if (failed) {
    return <div className="min-h-screen flex items-center justify-center">Không tải được thông tin website.</div>;
  }
  if (!story) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  const planCode = user?.plan ?? 'FREE';
  const plan = plans.find(p => p.code === planCode);
  const nextCode = NEXT_PLAN[planCode];
  const nextPlan = plans.find(p => p.code === nextCode);
  const url = getStoryPublicUrl(story.slug);
  const showQuota = !!plan && plan.maxStories < UNLIMITED && storyCount !== null;
  const showExpiry = planCode !== 'PREMIUM' && !!story.expiresAt;
  const framedQr = planCode !== 'FREE';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép link', 'success');
    } catch {
      toast('Không sao chép được, hãy chép thủ công', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-xl p-8 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[36px]">check_circle</span>
        </div>
        <div>
          <h1 className="font-headline-md text-on-surface">Website của bạn đã được đăng!</h1>
          <p className="font-body-md text-on-surface-variant mt-1">{story.title}</p>
        </div>

        <div className="w-full rounded-xl bg-surface-container px-4 py-3 font-mono text-sm text-on-surface break-all">{url}</div>

        <div className="flex gap-3 w-full">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            Xem website
          </a>
          <button
            type="button"
            onClick={copy}
            className="flex-1 px-4 py-2.5 rounded-full bg-surface-container text-on-surface font-label-md flex items-center justify-center gap-1 hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Sao chép link
          </button>
        </div>

        <div className={framedQr ? 'p-4 rounded-2xl bg-white border-4 border-primary-container shadow-md' : 'p-2 bg-white'}>
          <QRCodeSVG value={url} size={framedQr ? 160 : 140} />
          {framedQr && <p className="font-label-sm text-primary mt-2">Quét để xem câu chuyện của chúng mình</p>}
        </div>

        {(showQuota || showExpiry || planCode === 'FREE') && (
          <ul className="w-full text-left font-body-sm text-on-surface-variant flex flex-col gap-1.5">
            {showQuota && <li>Đã dùng {storyCount} / {plan!.maxStories} website</li>}
            {showExpiry && <li>Hết hạn ngày {formatDate(story.expiresAt!)}</li>}
            {planCode === 'FREE' && <li>Trang đang có watermark "Made with CoupleStory".</li>}
          </ul>
        )}

        {nextPlan && (
          <div className="w-full rounded-xl bg-primary-container/10 px-4 py-3 text-left">
            <p className="font-title-md text-on-surface">Nâng cấp lên {nextPlan.name}</p>
            <p className="font-body-sm text-on-surface-variant">{nextPlan.description}</p>
            <Link to="/dashboard/upgrade" className="inline-block mt-2 font-label-md text-primary hover:underline">Xem gói →</Link>
          </div>
        )}

        <Link to="/dashboard" className="font-label-md text-on-surface-variant hover:text-primary">Về trang quản lý</Link>
      </div>
    </main>
  );
}
