import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';
import { getTemplateTheme } from '@/data/templateThemes';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import TemplateRomanticAnniversary from '@/templates/TemplateRomanticAnniversary';
import TemplateMemoryWall from '@/templates/TemplateMemoryWall';

function mapPublicStoryToStoryData(res: any, templateCode: string): StoryData {
  const photos: any[] = res.gallery || [];
  const coverUrl = res.coverPhotoUrl || (photos.length > 0 ? photos[0].url : '');

  return {
    id: res.id || 'preview',
    slug: res.subdomain || 'preview',
    template_id: templateCode,
    status: 'published',
    global_config: {
      purpose: 'anniversary',
      theme_color: '#ff4d8d',
      is_music_autoplay: false,
    },
    hero_block: {
      is_enabled: true,
      title: res.title || `${res.coupleName1 || ''} & ${res.coupleName2 || ''}`,
      partner_a: { name: res.coupleName1 || '', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=A', gender: 'male' },
      partner_b: { name: res.coupleName2 || '', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=B', gender: 'female' },
      banner_images: coverUrl ? [coverUrl] : [],
      short_quote: res.shortQuote || '',
    },
    counter_block: {
      is_enabled: !!res.startDate,
      mode: 'count_up',
      target_date: res.startDate ? `${res.startDate}T00:00:00Z` : '',
      label_text: 'Chúng mình đã chung đôi được',
    },
    letter_block: {
      is_enabled: !!res.loveLetter,
      heading: res.loveLetter?.heading || 'Gửi người yêu thương,',
      content: res.loveLetter?.content || '',
      signature: res.loveLetter?.signature || '',
    },
    timeline_block: {
      is_enabled: (res.events || []).length > 0,
      section_title: 'Hành trình của chúng mình',
      events: (res.events || []).map((e: any) => ({
        id: e.id,
        date: e.eventDate || '',
        title: e.title || '',
        description: e.description || '',
        media_url: e.photoUrl || '',
      })),
    },
    gallery_block: {
      is_enabled: photos.length > 0,
      section_title: 'Khoảnh khắc đáng nhớ',
      images: photos.map((p: any) => ({
        url: p.url || '',
        caption: '',
      })),
    },
  };
}

function getFallbackData(templateCode: string): StoryData {
  return {
    id: 'preview',
    slug: 'preview',
    template_id: templateCode,
    status: 'published',
    global_config: {
      purpose: 'anniversary',
      theme_color: '#ff4d8d',
      is_music_autoplay: false,
    },
    hero_block: {
      is_enabled: true,
      title: 'Our Love Story',
      partner_a: { name: 'Bảo Long', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=BaoLong', gender: 'male' },
      partner_b: { name: 'An Nhiên', avatar_url: 'https://api.dicebear.com/7.x/notionists/svg?seed=AnNhien', gender: 'female' },
      banner_images: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&auto=format'],
      short_quote: 'Yêu em từ cái nhìn đầu tiên, và sẽ yêu em đến hơi thở cuối cùng.',
    },
    counter_block: {
      is_enabled: true,
      mode: 'count_up',
      target_date: '2021-05-20T00:00:00Z',
      label_text: 'Chúng mình đã chung đôi được',
    },
    letter_block: {
      is_enabled: true,
      heading: 'Gửi An Nhiên của anh,',
      content: 'Từ ngày có em, thế giới của anh trở nên rực rỡ và ấm áp hơn bao giờ hết. Cảm ơn em đã bước vào cuộc đời anh, chịu đựng sự buồng bỉnh và luôn nắm chặt tay anh trên mọi nẻo đường.\n\nEm là nắng ấm những ngày đông lạnh, là cơn gió mát giữa mùa hè oi bức. Em là tất cả những gì đẹp đẽ nhất mà cuộc đời đã dành lặng cho anh.\n\nHãy cùng nhau viết tiếp những chương thật đẹp nhé!',
      signature: 'Mãi yêu em – Bảo Long',
    },
    timeline_block: {
      is_enabled: true,
      section_title: 'Hành trình của chúng mình',
      events: [
        { id: '1', date: '2021-05-20', title: 'Lần Đầu Chạm Mặt', description: 'Tại quán cafe nhỏ trên phố cổ. Cơn mưa rào mùa hạ đã mang chúng mình đến với nhau.', media_url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop&auto=format' },
        { id: '2', date: '2021-08-15', title: 'Nụ Hôn Đầu Tiên', description: 'Bên bờ hồ trong gió, mọi thứ như ngừng lại, chỉ còn nhịp đập của hai trái tim.', media_url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop&auto=format' },
        { id: '3', date: '2022-05-20', title: 'Kỷ Niệm Một Năm', description: '365 ngày bên nhau – mỗi ngày đều là một câu chuyện mới.', media_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format' },
        { id: '4', date: '2023-01-10', title: 'Chuyến Du Lịch Đà Lạt', description: 'Lạc giữa biển hoa đã quỳ vàng rực, chúng mình cùng nhau ngắm bình minh trên đỉnh Langbiang.', media_url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop&auto=format' },
      ],
    },
    gallery_block: {
      is_enabled: true,
      section_title: 'Khoảnh khắc đáng nhớ',
      images: [
        { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop&auto=format', caption: 'Khoảnh khắc đầu tiên bên nhau ❤️' },
        { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop&auto=format', caption: 'Chuyến du lịch đáng nhớ 🌅' },
        { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop&auto=format', caption: 'Những buổi tối bên nhau ✨' },
        { url: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&h=600&fit=crop&auto=format', caption: 'Mỗi ngày bên em đều đặc biệt 💕' },
        { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop&auto=format', caption: 'Yêu em từng giây phút 💖' },
      ],
    },
  };
}

export default function TemplatePreview() {
  const { templateCode } = useParams();
  const theme = getTemplateTheme(templateCode);
  const [data, setData] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/public/story?subdomain=baolong-annhien', {
          headers: { Accept: 'application/json' },
        });
        if (cancelled) return;
        if (res.ok) {
          const publicData = await res.json();
          setData(mapPublicStoryToStoryData(publicData, theme.code));
          return;
        }
      } catch {
        // fetch failed — use fallback
      }

      if (!cancelled) {
        setData(getFallbackData(theme.code));
      }
    }

    load().finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [templateCode, theme.code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-lg">Đang tải mẫu...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Không có dữ liệu</p>
      </div>
    );
  }

  if (templateCode === 'romantic-anniversary') {
    return <TemplateRomanticAnniversary storyData={data} />;
  }

  if (templateCode === 'memory-wall') {
    return <TemplateMemoryWall storyData={data} />;
  }

  return <DynamicStoryTemplate storyData={data} />;
}
