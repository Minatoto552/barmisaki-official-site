import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, Sparkles } from 'lucide-react';
import { externalLinks } from '../data';
import { EditorialHero, EditorialHeading, StatusBadge } from '@/components/editorial';

export const metadata: Metadata = { title: 'HOW TO JOIN | BarMisaki', description: 'BarMisakiへの参加方法をご案内します。' };
const steps = [
  ['FRIEND REQUEST', 'フレンド申請', '公式Xの案内を確認し、「BarMisaki_Bot」へVRChatでフレンド申請します。'],
  ['LOTTERY ENTRY', '抽選に応募', '公式Xで案内される抽選システムから応募します。'],
  ['REQUEST INVITE', '抽選結果を確認', '当選した方は22:40〜22:50にBarMisaki_BotへRequest Inviteしてください。'],
];
export default function HowToJoinPage() {
  return <main className="editorial-page">
    <EditorialHero index="03" eyebrow="HOW TO JOIN" word="JOIN US" title={<>BarMisakiへの<em>参加方法</em></>} intro="VRChatイベントが初めての方も、3つのステップでご参加いただけます。" />
    <section className="editorial-content">
      <EditorialHeading eyebrow="YOUR FIRST NIGHT" title="3 steps to Misaki." note="ご来店までの流れ" />
      <ol className="entry-steps">{steps.map(([en, title, text], index) => <li key={en} className="entry-step">
        <div className="entry-step-top"><span className="editorial-number">0{index + 1}</span><span>{en}</span></div>
        <h2>{title}</h2><p>{text}</p>
        <div className="entry-step-action">
          {index === 0 && <a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="editorial-text-link">公式Xを見る <ArrowUpRight size={18} /></a>}
          {index === 1 && (externalLinks.lotteryUrl ? <a href={externalLinks.lotteryUrl} className="editorial-button">抽選に応募する <ArrowUpRight size={18} /></a> : <div className="editorial-state-note"><StatusBadge state="soon" /><span>現在受付準備中です</span></div>)}
          {index === 2 && <div className="entry-hours"><Clock3 size={18} /><div><small>OPEN HOURS</small><span>22:50 — 24:00</span></div></div>}
        </div>
      </li>)}</ol>
      <aside className="same-day-entry"><Sparkles size={28} strokeWidth={1} /><div><p className="editorial-kicker">SAME DAY ENTRY</p><h2>当日リクイン枠もあります</h2><p>通常の抽選とは別に当日枠をご用意する場合があります。詳細は公式Xをご確認ください。</p></div><a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="editorial-text-link">公式Xを見る <ArrowUpRight size={18} /></a></aside>
    </section>
  </main>;
}
