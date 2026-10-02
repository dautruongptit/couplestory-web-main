import type { Story, Plan } from '../types';

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
