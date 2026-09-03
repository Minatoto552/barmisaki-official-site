import type { Metadata } from 'next';
import { EditorialHero } from '@/components/editorial';
import { NewsArchive } from './news-client';
export const metadata: Metadata = { title: 'NEWS | BarMisaki', description: 'BarMisakiからの最新のお知らせです。' };
export default function NewsPage() {
  return <main className="editorial-page"><EditorialHero index="04" eyebrow="LATEST NEWS" word="NEWS" title={<>お知らせ</>} intro="営業日、イベント情報、キャストやワールドに関する最新情報をお届けします。" /><section className="editorial-content"><NewsArchive /></section></main>;
}
