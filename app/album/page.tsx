import type { Metadata } from 'next';
import AlbumView from './album-view';

export const metadata: Metadata = { title: 'ALBUM | BarMisaki', description: 'BarMisakiの営業やイベントで撮影した集合写真をご覧いただけます。' };

export default function Page() {
  return <AlbumView />;
}
