import { useEffect, useRef, useState } from 'react';

export interface MusicTrackInfo {
  id: string;
  title: string;
  artist?: string | null;
  url: string;
}

// Browsers block sound until the viewer interacts, so playback only starts from the button.
export default function MusicPlayer({ tracks }: { tracks: MusicTrackInfo[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const track = tracks[index % Math.max(tracks.length, 1)];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playing) audio.play().catch(() => setPlaying(false));
  }, [index, playing]);

  if (tracks.length === 0 || !track) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const next = () => setIndex(i => (i + 1) % tracks.length);

  return (
    <div className="fixed bottom-3 left-3 z-[9999] flex items-center gap-1 rounded-full bg-black/60 text-white backdrop-blur-md pl-1 pr-3 py-1">
      <audio ref={audioRef} src={track.url} onEnded={next} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
        className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[22px]">{playing ? 'pause' : 'play_arrow'}</span>
      </button>
      <span className="text-xs max-w-[140px] truncate">{playing ? track.title : 'Chạm để mở nhạc'}</span>
      {tracks.length > 1 && (
        <button type="button" onClick={next} aria-label="Bài tiếp theo" className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">skip_next</span>
        </button>
      )}
    </div>
  );
}
