import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { externalLinks } from '../data';
import { EditorialHero, EditorialHeading } from '@/components/editorial';

export const metadata: Metadata = { title: 'GROUP | BarMisaki', description: 'BarMisakiの団体利用についてご案内します。' };
export default function GroupPage() {
  return <main className="editorial-page">
    <EditorialHero index="06" eyebrow="FOR GROUPS" word="TOGETHER" title={<>団体様向けの<em>ご案内</em></>} intro="団体でのご来店をご希望の場合は、必要事項をご記入の上、BarMisaki公式Xからご相談ください。" />
    <section className="editorial-content">
      <EditorialHeading eyebrow="BOOKING INFORMATION" title="A night together." note="ご相談時にお知らせいただくこと" />
      <div className="booking-grid">{[
        ['01', 'GROUP NAME', '団体名', '活動名・グループ名'],
        ['02', 'NUMBER OF GUESTS', '団体人数', '5〜10名'],
        ['03', 'RESERVATION', '希望日程', '1か月前まで'],
      ].map(([number, en, label, value]) => <article className="booking-item" key={number}><div className="entry-step-top"><span className="editorial-number">{number}</span><span>{en}</span></div><h2>{label}</h2><p className={number === '02' ? 'booking-value is-number' : 'booking-value'}>{value}</p>{number === '03' && <p className="booking-sub">第5希望までご記載ください</p>}</article>)}</div>
      <div className="booking-bottom"><aside className="editorial-note"><p className="editorial-kicker">NOTE</p><div><p>希望日程は第5希望まで記載し、ご希望日の1か月前までにご相談ください。</p><p>※キャストのシフト状況によっては、お断りする場合がございます。</p></div></aside><a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="editorial-button">公式Xから相談する <ArrowUpRight size={20} /></a></div>
    </section>
  </main>;
}
