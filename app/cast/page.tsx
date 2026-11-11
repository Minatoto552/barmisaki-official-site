import type { Metadata } from 'next';
import CastView from './cast-view';

export const metadata: Metadata = { title: 'CAST | BarMisaki', description: 'BarMisakiのキャスト・スタッフをご紹介します。' };

export default function Page() {
  return <CastView />;
}
