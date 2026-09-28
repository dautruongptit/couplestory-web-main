// Mock notifications data
export interface Notification {
  id: string;
  type: 'story' | 'plan' | 'system' | 'heart';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'heart',
    title: 'Story của bạn được yêu thích!',
    message: 'Có 12 người vừa xem story "Câu chuyện của chúng mình" của bạn hôm nay.',
    time: '5 phút trước',
    read: false,
    icon: 'favorite',
  },
  {
    id: '2',
    type: 'plan',
    title: 'Gói Premium sắp hết hạn',
    message: 'Gói Premium của bạn sẽ hết hạn sau 3 ngày. Gia hạn ngay để không gián đoạn.',
    time: '2 giờ trước',
    read: false,
    icon: 'workspace_premium',
  },
  {
    id: '3',
    type: 'story',
    title: 'Nhắc nhở thêm ảnh kỷ niệm',
    message: 'Đã 7 ngày bạn chưa cập nhật story. Thêm một khoảnh khắc mới nhé!',
    time: '1 ngày trước',
    read: true,
    icon: 'photo_album',
  },
  {
    id: '4',
    type: 'system',
    title: 'Tính năng mới: Timeline nâng cao',
    message: 'Chúng tôi vừa ra mắt Timeline với hiệu ứng cuộn mượt mà. Khám phá ngay!',
    time: '3 ngày trước',
    read: true,
    icon: 'new_releases',
  },
  {
    id: '5',
    type: 'heart',
    title: 'Chúc mừng kỷ niệm!',
    message: 'Hôm nay là 365 ngày kể từ ngày bạn tạo story đầu tiên. 🎉',
    time: '5 ngày trước',
    read: true,
    icon: 'celebration',
  },
];
