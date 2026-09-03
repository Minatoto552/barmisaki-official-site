import type { Metadata } from 'next';
import { FittedText } from '@/components/site-elements';
import { CastClient } from './cast-client';
import { getManagedData } from '../managed-data';
import './cast.css';

export const metadata: Metadata = { title: 'CAST | BarMisaki', description: 'BarMisakiのキャスト・スタッフをご紹介します。' };

export default async function CastPage() {
  const data = await getManagedData();
  return <main className="cast-page">
    <header className="cast-editorial-hero">
      <span className="cast-hero-watermark" aria-hidden="true">CAST MEMBERS</span>
      <p className="cast-kicker">CAST</p>
      <h1><FittedText>キャスト一覧</FittedText></h1>
      <div className="cast-hero-foot"><span>BAR MISAKI</span><a href="#cast-directory">キャストを探す <span aria-hidden="true">↓</span></a><span>VIRTUAL / REAL PERSONALITY</span></div>
    </header>
    <CastClient casts={data.casts} />
  </main>;
}
