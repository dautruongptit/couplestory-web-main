import { toast } from '@/utils/toast';
import { FacebookIcon, InstagramIcon, MessengerIcon, ThreadsIcon, ZaloIcon } from '@/components/SocialIcons';

interface Props {
  url: string;
  iconSize?: number;
}

export default function ShareButtons({ url, iconSize = 44 }: Props) {
  const encoded = encodeURIComponent(url);

  const platforms = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: <FacebookIcon size={iconSize} /> },
    { name: 'Messenger', href: `https://www.facebook.com/dialog/send?link=${encoded}&app_id=291494419107518&redirect_uri=${encoded}`, icon: <MessengerIcon size={iconSize} /> },
    { name: 'Zalo', href: `https://zalo.me/share?url=${encoded}`, icon: <ZaloIcon size={iconSize} /> },
    { name: 'Instagram', href: 'https://www.instagram.com/', copyFirst: true, icon: <InstagramIcon size={iconSize} /> },
    { name: 'Threads', href: `https://www.threads.net/intent/post?text=${encoded}`, icon: <ThreadsIcon size={iconSize} /> },
  ];

  const share = async (platform: (typeof platforms)[number]) => {
    if (platform.copyFirst) {
      try {
        await navigator.clipboard.writeText(url);
        toast('Đã copy link! Đang mở ' + platform.name, 'success');
      } catch {
        toast('Không sao chép được', 'error');
      }
      setTimeout(() => window.open(platform.href, '_blank'), 800);
    } else {
      window.open(platform.href, '_blank');
    }
  };

  return (
    <div className="grid grid-cols-5 gap-1">
      {platforms.map(p => (
        <button
          key={p.name}
          onClick={() => share(p)}
          className="flex flex-col items-center gap-1.5 py-2 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <span className="flex items-center justify-center" style={{ width: iconSize + 4, height: iconSize + 4 }}>{p.icon}</span>
          <span className="text-[11px] font-semibold text-gray-600">{p.name}</span>
        </button>
      ))}
    </div>
  );
}
