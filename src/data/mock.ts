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
  }
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
    name: 'FREE',
    price: 0,
    features: ['Miễn phí trọn đời', 'Template cơ bản', 'Tối đa 10 ảnh', '1 Story']
  },
  {
    id: '2',
    name: 'PRO',
    price: 49000,
    features: ['Trọn đời', 'Lưu trữ không giới hạn', 'Bảo mật mã PIN', 'Nhạc nền tự chọn']
  },
  {
    id: '3',
    name: 'COUPLE',
    price: 69000,
    features: ['Trọn đời', '2 tài khoản đồng sáng tạo', 'Template độc quyền', 'Không giới hạn ảnh']
  },
  {
    id: '4',
    name: 'PRO_MAX',
    price: 119000,
    features: ['Trọn đời', 'Tên miền riêng', 'Toàn bộ tính năng Couple', 'Thiệp cưới điện tử']
  }
];
