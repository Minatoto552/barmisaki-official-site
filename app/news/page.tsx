import type { Metadata } from 'next';
import NewsView from './news-view';

export const metadata: Metadata = { title: 'NEWS | BarMisaki', description: 'BarMisakiからの最新のお知らせです。' };

export default function Page() {
  return <NewsView />;
}
