import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { StoryData } from '@/data/mockScenarios';

export interface OccasionTemplateMeta {
  code: string;
  name: string;
  occasion: 'wedding' | 'birthday' | 'confession';
  occasionLabel: string;
  icon: string;
  tagline: string;
  description: string;
  palette: string;
  accent: string;
  gradient: string;
  image: string;
  tags: string[];
  component: LazyExoticComponent<ComponentType<{ storyData: StoryData }>>;
}

// Ẩn khỏi gallery đến khi có tính năng chọn Type (WEDDING / BIRTHDAY...). Route /preview/<code> vẫn hoạt động.
export const SHOW_OCCASION_TEMPLATES = false;

export const OCCASION_TEMPLATES: OccasionTemplateMeta[] = [
  {
    code: 'wedding-cinematic',
    name: 'Wedding Cinematic',
    occasion: 'wedding',
    occasionLabel: 'Đám cưới',
    icon: '🎬',
    tagline: 'Forever & Always',
    description: 'Điện ảnh nền tối, vàng kim sang trọng, hero parallax và dải ảnh phim. Dành cho cặp đôi thích sự tinh tế, editorial.',
    palette: 'Đen Than & Vàng Kim',
    accent: '#c9a96e',
    gradient: 'linear-gradient(180deg, #111111 0%, #1c1a16 60%, #2a2418 100%)',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tags: ['Parallax', 'Film strip', 'Serif nghiêng'],
    component: lazy(() => import('./TemplateWeddingCinematic')),
  },
  {
    code: 'wedding-garden-bloom',
    name: 'Wedding Garden Bloom',
    occasion: 'wedding',
    occasionLabel: 'Đám cưới',
    icon: '🌿',
    tagline: 'Câu chuyện của chúng mình',
    description: 'Vườn hoa sáng nhẹ nhàng, xanh sage và hồng đất, timeline dọc và thư tay trong khung trắng.',
    palette: 'Sage Green & Dusty Rose',
    accent: '#7a9e7e',
    gradient: 'linear-gradient(180deg, #f7f3ee 0%, #e8efe6 60%, #f0d9d5 100%)',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    tags: ['Boho garden', 'Timeline dọc', 'Thư tay'],
    component: lazy(() => import('./TemplateWeddingGardenBloom')),
  },
  {
    code: 'birthday-neon-party',
    name: 'Birthday Neon Party',
    occasion: 'birthday',
    occasionLabel: 'Sinh nhật',
    icon: '🎉',
    tagline: 'Happy Birthday',
    description: 'Neon Y2K nền tối, hạt sáng bay, chữ khổng lồ phát sáng và thẻ kính mờ. Dành cho bữa tiệc Gen Z.',
    palette: 'Hot Pink & Cyan Neon',
    accent: '#ff0099',
    gradient: 'linear-gradient(180deg, #0d0d12 0%, #1a0d24 60%, #2a0d2e 100%)',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Neon glow', 'Glassmorphism', 'Đếm ngày'],
    component: lazy(() => import('./TemplateBirthdayNeonParty')),
  },
  {
    code: 'birthday-soft-yume',
    name: 'Birthday Soft Yume',
    occasion: 'birthday',
    occasionLabel: 'Sinh nhật',
    icon: '🎂',
    tagline: 'Happy Birthday ✨',
    description: 'Pastel mộng mơ với sao lấp lánh, chữ Pacifico dễ thương, đếm ngược tới sinh nhật tiếp theo.',
    palette: 'Pastel Hồng, Tím & Mint',
    accent: '#f472b6',
    gradient: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #ecfdf5 100%)',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Kawaii', 'Sao lấp lánh', 'Đếm ngược'],
    component: lazy(() => import('./TemplateBirthdaySoftYume')),
  },
  {
    code: 'confession-typewriter',
    name: 'Confession Typewriter',
    occasion: 'confession',
    occasionLabel: 'Tỏ tình',
    icon: '💌',
    tagline: 'Có một lá thư cho em',
    description: 'Phong bì bí mật mở ra, lá thư được đánh máy từng chữ trên giấy cổ điển. Tỏ tình theo kiểu vintage.',
    palette: 'Giấy Kem & Mực Nâu',
    accent: '#b3261e',
    gradient: 'linear-gradient(180deg, #e9e2d3 0%, #f3ead5 60%, #faf7f0 100%)',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    tags: ['Đánh máy', 'Phong bì', 'Vintage'],
    component: lazy(() => import('./TemplateConfessionTypewriter')),
  },
  {
    code: 'confession-midnight-bloom',
    name: 'Confession Midnight Bloom',
    occasion: 'confession',
    occasionLabel: 'Tỏ tình',
    icon: '🌙',
    tagline: 'Em làm người yêu anh nhé?',
    description: 'Đêm tím với đom đóm, thẻ kính mờ và nút "Để em nghĩ" chạy trốn. Tỏ tình huyền ảo, đầy bất ngờ.',
    palette: 'Midnight Purple & Pink Glow',
    accent: '#c084fc',
    gradient: 'radial-gradient(ellipse at top, #1e1240 0%, #0d0b16 70%)',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    tags: ['Đom đóm', 'Nút né tránh', 'Dark romantic'],
    component: lazy(() => import('./TemplateConfessionMidnightBloom')),
  },
];

export function getOccasionTemplate(code: string | undefined) {
  return OCCASION_TEMPLATES.find(t => t.code === code);
}
