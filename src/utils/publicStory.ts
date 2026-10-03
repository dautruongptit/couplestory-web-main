import type { StoryData } from '@/data/mockScenarios';

const RESERVED_SUBDOMAINS = new Set(['main', 'www', 'api']);
const ROOT_DOMAIN = 'couplestory.site';

// Storage keys such as "photos/STORY/<id>/<uuid>.webp" are served from /uploads/.
export function photoSrc(keyOrUrl?: string | null): string {
  if (!keyOrUrl) return '';
  if (/^(https?:)?\/\//.test(keyOrUrl) || keyOrUrl.startsWith('/')) return keyOrUrl;
  return `/uploads/${keyOrUrl}`;
}

/** Slug when the app is opened on <slug>.couplestory.site, otherwise null. */
export function getTenantSlug(hostname: string = window.location.hostname): string | null {
  if (!hostname.endsWith(`.${ROOT_DOMAIN}`)) return null;
  const sub = hostname.slice(0, -(ROOT_DOMAIN.length + 1));
  if (!sub || sub.includes('.') || RESERVED_SUBDOMAINS.has(sub)) return null;
  return sub;
}

/** Address shown to users, always in the <slug>.couplestory.site form (also used for display in dev). */
export function getStoryDisplayHost(slug: string): string {
  return `${slug}.${ROOT_DOMAIN}`;
}

/** Public address of a published story: a subdomain in production, a /s/<slug> path elsewhere (dev). */
export function getStoryPublicUrl(slug: string): string {
  const { hostname, origin, protocol } = window.location;
  if (hostname === ROOT_DOMAIN || hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return `${protocol}//${slug}.${ROOT_DOMAIN}`;
  }
  // In dev, VITE_PUBLIC_ORIGIN (e.g. http://192.168.1.10:8091) makes links and QR codes reachable from a phone.
  const devOrigin = (import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined)?.replace(/\/+$/, '');
  return `${devOrigin || origin}/s/${slug}`;
}

export function mapPublicStoryToStoryData(res: any, templateCode: string): StoryData {
  const photos: any[] = res.gallery || [];
  const coverUrl = photoSrc(res.coverPhotoUrl) || (photos.length > 0 ? photoSrc(photos[0].url) : '');

  return {
    id: res.id || 'preview',
    slug: res.slug || res.subdomain || 'preview',
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
        description: e.message || '',
        location: e.location || '',
        media_url: photoSrc(e.photoUrl),
      })),
    },
    gallery_block: {
      is_enabled: photos.length > 0,
      section_title: 'Khoảnh khắc đáng nhớ',
      images: photos.map((p: any) => ({
        url: photoSrc(p.url),
        caption: '',
      })),
    },
  };
}
