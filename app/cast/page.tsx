import type { Metadata } from 'next';
import { PageHero } from '@/components/site-elements';
import { CastClient } from './cast-client';
import { getManagedData } from '../managed-data';

export const metadata: Metadata = { title: 'CAST | BarMisaki', description: 'BarMisakiのキャスト・スタッフをご紹介します。' };

export default async function CastPage() {
  const data = await getManagedData();
  return <main><PageHero eyebrow="CAST" title={<>CAST</>} intro="同じ海咲ちゃんでも、話し方も好きなものもそれぞれ。気の合う海咲ちゃんを見つけてください。" /><section className="content-section bg-[#0c0a16]"><CastClient casts={data.casts} /></section></main>;
}
