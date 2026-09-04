import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { recruitment } from '../data';
import { EditorialHero, EditorialHeading, StatusBadge } from '@/components/editorial';

export const metadata: Metadata = { title: 'RECRUIT | BarMisaki', description: 'BarMisakiのキャスト・スタッフ募集情報です。' };
const actionLabel = (key: string) => key === 'staff' ? '公式Xから応募する' : '応募する';
export default function RecruitPage() {
  return <main className="editorial-page">
    <EditorialHero index="07" eyebrow="RECRUIT" word="OUR TEAM" title={<>キャスト・<em>スタッフ募集</em></>} intro="BarMisakiの夜を一緒につくる仲間を募集します。" />
    <section className="editorial-content"><EditorialHeading eyebrow="JOIN OUR TEAM" title="Create the night." note="それぞれの役割で、ひとつの夜を。" />
      <div className="recruit-grid">{[
        ['cast', 'CAST', 'キャスト募集', 'お客様との会話を楽しみながら、BarMisakiらしい時間を届けるキャストです。'],
        ['staff', 'STAFF', 'スタッフ募集', '受付や運営を通して、心地よいイベントづくりを支えるスタッフです。'],
      ].map(([key, en, title, text], index) => { const state = recruitment[key as keyof typeof recruitment]; return <article key={key} className="recruit-editorial-card"><div className="recruit-top"><span className="editorial-kicker">0{index + 1} / {en}</span><StatusBadge state={state.enabled ? 'open' : 'closed'}>{state.enabled ? 'OPEN · 募集中' : 'CLOSED · 募集停止'}</StatusBadge></div><p className="recruit-word display" aria-hidden="true">{en}</p><h2>{title}</h2><p className="recruit-description">{text}</p><div className="recruit-action">{state.enabled && state.url ? <a href={state.url} target="_blank" rel="noreferrer" className="editorial-button">{actionLabel(key)} <ArrowUpRight size={18} /></a> : <p>{state.enabled ? '応募先は準備中です。' : '現在は募集を行っておりません。'}</p>}</div></article>; })}</div>
    </section>
  </main>;
}
