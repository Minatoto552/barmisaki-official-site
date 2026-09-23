import type { Metadata } from 'next';
import { EditorialHero } from '@/components/editorial';
import { AlbumClient } from './album-client';

export const metadata: Metadata = { title: 'ALBUM | BarMisaki', description: 'BarMisakiの営業やイベントで撮影した集合写真をご覧いただけます。' };

export default function AlbumPage() {
  return <main className="editorial-page">
    <EditorialHero index="05" eyebrow="MEMORIES OF BAR MISAKI" word="ALBUM" title={<>アルバム</>} intro="営業やイベントで生まれた、Bar Misakiの夜の記録。日付ごとに集合写真をご覧いただけます。" />
    <section className="editorial-content"><AlbumClient /></section>
  </main>;
}
