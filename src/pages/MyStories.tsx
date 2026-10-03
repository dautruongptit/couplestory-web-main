// src/pages/MyStories.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

type StoryBrief = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
};

export default function MyStories() {
  const { user } = useAuth();
  const [stories, setStories] = useState<StoryBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchStories = async () => {
      try {
        const res = await fetch(`/api/users/${user.id}/stories`);
        if (!res.ok) throw new Error('Failed to load stories');
        const data = await res.json();
        setStories(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [user]);

  if (!user) {
    return <div className="p-4">Vui lòng đăng nhập để xem các story của bạn.</div>;
  }

  if (loading) return <div className="p-4">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-600">Lỗi: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Story của tôi</h1>
      {stories.length === 0 ? (
        <p>Chưa có story nào.</p>
      ) : (
        <ul className="space-y-2">
          {stories.map(story => (
            <li key={story.id} className="p-3 border rounded-md hover:bg-gray-50">
              <Link to={`/editor/${story.id}`} className="font-medium text-blue-600 hover:underline">
                {story.title}
              </Link>
              <span className="ml-2 text-sm text-gray-500">({story.status})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
