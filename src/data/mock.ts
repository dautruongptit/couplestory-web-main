import type { Template, Story, Plan } from '../types';

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Minimal Couple',
    code: 'minimal-couple',
    thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80',
    type: 'FREE',
    description: 'Phong cách tối giản, tập trung vào hình ảnh và khoảng trắng.'
  },
  {
    id: '2',
    name: 'Eternal Love',
    code: 'eternal-love',
    thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80',
    type: 'PREMIUM',
    description: 'Phong cách sang trọng, lãng mạn như một cuốn tạp chí cưới.'
  },
  {
    id: '3',
    name: 'Anniversary Journey',
    code: 'anniversary-journey',
    thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80',
    type: 'PREMIUM',
    description: 'Hành trình tình yêu theo từng cột mốc, với hiệu ứng road animation lãng mạn.'
  },
  { id: '4', name: 'Wedding Cinematic', code: 'wedding-cinematic', thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', type: 'PREMIUM', description: 'Đám cưới điện ảnh nền tối, vàng kim sang trọng.' },
  { id: '5', name: 'Wedding Garden Bloom', code: 'wedding-garden-bloom', thumbnail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80', type: 'PREMIUM', description: 'Đám cưới vườn hoa sáng, xanh sage và hồng đất.' },
  { id: '6', name: 'Birthday Neon Party', code: 'birthday-neon-party', thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80', type: 'PREMIUM', description: 'Sinh nhật neon Y2K nền tối, phong cách Gen Z.' },
  { id: '7', name: 'Birthday Soft Yume', code: 'birthday-soft-yume', thumbnail: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80', type: 'FREE', description: 'Sinh nhật pastel mộng mơ với sao lấp lánh.' },
  { id: '8', name: 'Confession Typewriter', code: 'confession-typewriter', thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80', type: 'FREE', description: 'Tỏ tình bằng lá thư đánh máy trong phong bì bí mật.' },
  { id: '9', name: 'Confession Midnight Bloom', code: 'confession-midnight-bloom', thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80', type: 'PREMIUM', description: 'Tỏ tình đêm tím huyền ảo với nút "Để em nghĩ" chạy trốn.' }
];

export const mockStories: Story[] = [
  {
    id: '1',
    coupleName1: 'Alex',
    coupleName2: 'Sarah',
    startDate: '2021-10-12',
    templateCode: 'eternal-love',
    coverPhoto: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80'
  }
];

export const mockPlans: Plan[] = [
  {
    id: '1',
    code: 'FREE',
    name: 'FREE',
    price: 0,
    description: 'Miễn phí vĩnh viễn với các tính năng cơ bản.',
    features: ['Miễn phí trọn đời', 'Template cơ bản', 'Tối đa 20 ảnh', '1 Story'],
    sortOrder: 1,
    isActive: true,
    isFeatured: false,
    maxPhotos: 20,
    maxStories: 1,
    allowCollaborator: false,
    allowCustomDomain: false,
  },
  {
    id: '2',
    code: 'PLUS',
    name: 'PLUS',
    price: 49000,
    description: 'Lưu giữ kỷ niệm vĩnh viễn không bao giờ hết hạn.',
    features: ['Trọn đời', 'Lưu trữ không giới hạn', 'Bảo mật mã PIN', 'Nhạc nền tự chọn'],
    sortOrder: 2,
    isActive: true,
    isFeatured: false,
    maxPhotos: 100,
    maxStories: 1,
    allowCollaborator: false,
    allowCustomDomain: false,
  },
  {
    id: '3',
    code: 'COUPLE',
    name: 'COUPLE',
    price: 69000,
    description: 'Dành cho hai người muốn cùng vun đắp không gian tình yêu.',
    features: ['Trọn đời', '2 tài khoản đồng sáng tạo', 'Template độc quyền', 'Không giới hạn ảnh'],
    sortOrder: 3,
    isActive: true,
    isFeatured: true,
    maxPhotos: 500,
    maxStories: 1,
    allowCollaborator: true,
    allowCustomDomain: false,
  },
  {
    id: '4',
    code: 'PREMIUM',
    name: 'PREMIUM',
    price: 119000,
    description: 'Trải nghiệm sang trọng đỉnh cao với tên miền riêng.',
    features: ['Trọn đời', 'Tên miền riêng', 'Toàn bộ tính năng Couple', 'Thiệp cưới điện tử'],
    sortOrder: 4,
    isActive: true,
    isFeatured: false,
    maxPhotos: null,
    maxStories: 3,
    allowCollaborator: true,
    allowCustomDomain: true,
  }
];
