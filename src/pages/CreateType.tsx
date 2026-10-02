import { Link } from 'react-router-dom';

const TYPES = [
  {
    id: 'LOVE_STORY',
    icon: '❤️',
    title: 'Love Story',
    desc: 'Hành trình tình yêu theo dòng thời gian: các mốc kỷ niệm, ảnh, địa điểm và lời nhắn.',
    to: '/templates?type=LOVE_STORY',
    available: true,
  },
  {
    id: 'LOVE_CARD',
    icon: '💌',
    title: 'Love Card',
    desc: 'Thiệp tình cảm cho một dịp riêng: sinh nhật, tỏ tình, đám cưới...',
    to: '',
    available: false,
  },
];

export default function CreateType() {
  return (
    <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)]">
      <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin py-space-xl">
        <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-space-xs">Bước 1</p>
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-sm">
          Bạn muốn tạo gì hôm nay?
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-xl">
          Chọn loại nội dung, sau đó chọn mẫu giao diện phù hợp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {TYPES.map(t => {
            const body = (
              <>
                <span className="text-5xl">{t.icon}</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-space-md">{t.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs flex-1">{t.desc}</p>
                {t.available ? (
                  <span className="mt-space-lg inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold">
                    Chọn mẫu <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </span>
                ) : (
                  <span className="mt-space-lg inline-flex w-fit px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                    Sắp ra mắt
                  </span>
                )}
              </>
            );
            const base = 'flex flex-col p-space-lg rounded-lg bg-surface-container-lowest shadow-sm transition-all';
            return t.available ? (
              <Link key={t.id} to={t.to} className={`${base} hover:shadow-xl hover:scale-[1.01]`}>{body}</Link>
            ) : (
              <div key={t.id} aria-disabled="true" className={`${base} opacity-60 cursor-not-allowed`}>{body}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
