import type { Metadata } from 'next';
import { PageHero } from '@/components/site-elements';
import { CastClient } from './cast-client';
import { getManagedData } from '../managed-data';

export const metadata: Metadata = { title: 'CAST | BarMisaki', description: 'BarMisakiのキャスト・スタッフをご紹介します。' };

export default async function CastPage() {
  const data = await getManagedData();
  return <main><PageHero eyebrow="CAST" title={<>CAST</>} /><section className="content-section bg-[#0c0a16]"><CastClient casts={data.casts} /></section></main>;
}
