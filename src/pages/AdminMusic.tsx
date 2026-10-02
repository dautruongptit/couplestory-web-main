import { useEffect, useRef, useState } from 'react';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';

interface Track {
  id: string;
  title: string;
  artist: string | null;
  licenseNote: string | null;
  isActive: boolean;
  url: string;
}

export default function AdminMusic() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [licenseNote, setLicenseNote] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    apiClient.get('/admin/music')
      .then(setTracks)
      .catch(() => toast('Không tải được thư viện nhạc', 'error'))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast('Hãy chọn file nhạc', 'error');
      return;
    }
    const form = new FormData();
    form.append('file', file);
    form.append('title', title);
    if (artist) form.append('artist', artist);
    if (licenseNote) form.append('licenseNote', licenseNote);
    setUploading(true);
    try {
      await apiClient.postFormData('/admin/music', form);
      toast('Đã thêm bài nhạc', 'success');
      setTitle('');
      setArtist('');
      setLicenseNote('');
      if (fileRef.current) fileRef.current.value = '';
      load();
    } catch (error: any) {
      toast(error?.message || 'Không thêm được bài nhạc', 'error');
    } finally {
      setUploading(false);
    }
  };

  const setActive = async (t: Track, isActive: boolean) => {
    try {
      await apiClient.put(`/admin/music/${t.id}`, { isActive });
      load();
    } catch (error: any) {
      toast(error?.message || 'Không cập nhật được', 'error');
    }
  };

  const input = 'h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 text-sm focus:outline-none focus:border-primary';

  return (
    <main className="w-full bg-[#faf7f8] min-h-screen px-4 md:px-6 py-6">
      <h1 className="font-headline-lg text-on-surface mb-1">Thư viện nhạc nền</h1>
      <p className="font-body-md text-on-surface-variant mb-space-lg">
        Mọi bài đang bật đều dùng được ở mọi gói; gói chỉ giới hạn số bài mỗi website. Chỉ thêm nhạc bạn có quyền sử dụng và ghi rõ nguồn giấy phép.
      </p>

      <form onSubmit={upload} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end bg-surface-container-lowest rounded-lg p-4 shadow-sm mb-space-lg">
        <input ref={fileRef} type="file" accept=".mp3,.m4a,.ogg,.wav,audio/*" className="sm:col-span-2 text-sm" />
        <input value={title} onChange={e => setTitle(e.target.value)} maxLength={150} placeholder="Tên bài hát" className={input} />
        <input value={artist} onChange={e => setArtist(e.target.value)} maxLength={150} placeholder="Nghệ sĩ" className={input} />
        <input value={licenseNote} onChange={e => setLicenseNote(e.target.value)} maxLength={300} placeholder="Nguồn / giấy phép" className={`${input} sm:col-span-2 lg:col-span-3`} />
        <button type="submit" disabled={uploading} className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md disabled:opacity-50">
          {uploading ? 'Đang tải lên...' : 'Thêm bài nhạc'}
        </button>
      </form>

      {loading && <p>Đang tải...</p>}
      {!loading && tracks.length === 0 && <p className="text-on-surface-variant">Chưa có bài nhạc nào.</p>}

      <ul className="flex flex-col gap-2">
        {tracks.map(t => (
          <li key={t.id} className={`flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-sm ${t.isActive ? '' : 'opacity-60'}`}>
            <div className="min-w-0 flex-1 basis-full sm:basis-0">
              <p className="font-title-md text-on-surface truncate">{t.title}{t.artist ? ` · ${t.artist}` : ''}</p>
              {t.licenseNote && <p className="font-label-sm text-on-surface-variant truncate">{t.licenseNote}</p>}
            </div>
            <audio controls preload="none" src={t.url} className="h-9 w-full sm:w-auto" />
            <button
              type="button"
              onClick={() => setActive(t, !t.isActive)}
              className="px-4 py-1.5 rounded-full bg-surface-container font-label-md hover:bg-surface-container-high"
            >
              {t.isActive ? 'Tắt' : 'Bật'}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
