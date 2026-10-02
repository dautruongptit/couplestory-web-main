import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import MusicPlayer, { type MusicTrackInfo } from '@/components/MusicPlayer';
import { apiClient } from '@/services/api';

// Owner-side view of a story (dashboard "Xem" and the preview step), with its music player.
export default function DemoStory() {
  const { scenarioId } = useParams();
  const [tracks, setTracks] = useState<MusicTrackInfo[]>([]);

  useEffect(() => {
    if (!scenarioId) return;
    apiClient.get(`/stories/${scenarioId}/music`).then(setTracks).catch(() => setTracks([]));
  }, [scenarioId]);

  return (
    <>
      <DynamicStoryTemplate />
      <MusicPlayer tracks={tracks} />
    </>
  );
}
