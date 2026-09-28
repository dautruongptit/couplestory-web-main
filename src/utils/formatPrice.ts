export function formatPrice(price: number): string {
  if (price === 0) return '0đ';
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}
