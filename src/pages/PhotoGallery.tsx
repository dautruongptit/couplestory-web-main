// src/pages/PhotoGallery.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

type Photo = {
  id: string;
  url: string; // URL to display image
  title?: string;
  uploadedAt: string;
};

export default function PhotoGallery() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`/api/users/${user.id}/photos`);
        if (!res.ok) throw new Error('Failed to load photos');
        const data = await res.json();
        setPhotos(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [user]);

  if (!user) {
    return <div className="p-4">Vui lòng đăng nhập để xem thư viện ảnh.</div>;
  }

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">Lỗi: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thư viện ảnh</h1>
      {photos.length === 0 ? (
        <p>Chưa có ảnh nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <Link key={photo.id} to={photo.url} target="_blank" className="group">
              <img src={photo.url} alt={photo.title ?? 'Photo'} className="object-cover w-full h-40 rounded-md hover:opacity-90 transition-opacity" />
              {photo.title && <p className="mt-1 text-sm text-center">{photo.title}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
