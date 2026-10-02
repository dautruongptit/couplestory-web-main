import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import { mapPublicStoryToStoryData } from '@/utils/publicStory';
import MusicPlayer, { type MusicTrackInfo } from '@/components/MusicPlayer';

type State = { status: 'loading' } | { status: 'missing' } | { status: 'ready'; data: StoryData; watermark: boolean; music: MusicTrackInfo[] };

export default function PublicStory({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    if (!slug) {
      setState({ status: 'missing' });
      return;
    }
    let cancelled = false;
    fetch(`/api/public/story?slug=${encodeURIComponent(slug)}`, { headers: { Accept: 'application/json' } })
      .then(async res => {
        if (cancelled) return;
        if (!res.ok) {
          setState({ status: 'missing' });
          return;
        }
        const body = await res.json();
        setState({
          status: 'ready',
          data: mapPublicStoryToStoryData(body, body.templateCode || 'minimal-couple'),
          watermark: body.showWatermark !== false,
          music: body.music || [],
        });
      })
      .catch(() => { if (!cancelled) setState({ status: 'missing' }); });
    return () => { cancelled = true; };
  }, [slug]);

  if (state.status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }
  if (state.status === 'missing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-center px-6">
        <p className="text-5xl">💔</p>
        <h1 className="text-2xl font-semibold">Không tìm thấy trang này</h1>
        <p className="text-gray-600">Trang có thể chưa được xuất bản hoặc đã hết hạn.</p>
      </div>
    );
  }
  return (
    <>
      <DynamicStoryTemplate storyData={state.data} />
      <MusicPlayer tracks={state.music} />
      {state.watermark && (
        <a
          href="https://couplestory.site"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-3 right-3 z-[9999] px-3 py-1.5 rounded-full bg-black/60 text-white text-xs backdrop-blur-md hover:bg-black/80"
        >
          Made with CoupleStory
        </a>
      )}
    </>
  );
}
