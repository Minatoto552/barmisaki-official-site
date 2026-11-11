import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

export const metadata = { title: 'HOW TO JOIN | BarMisaki', description: 'BarMisakiへの参加方法をご案内します。' };

const steps = [
  ['FRIEND REQUEST', 'インスタンスリーダーへ\nフレンド申請', '営業当日のインスタンスリーダーを、Bar Misaki公式Xにてご案内します。\n\n公式Xをご確認のうえ、案内されたインスタンスリーダーへVRChatでフレンド申請をお願いします。'],
  ['LOTTERY ENTRY', '抽選に応募', '公式Xで案内される抽選システムから応募します。'],
  ['REQUEST INVITE', '抽選結果を確認', '当選した方は22:40〜22:50に、当日のインスタンスリーダーへRequest Inviteしてください。'],
];

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="03" en="JOIN US" ja="参加方法" lead="VRChatイベントが初めての方も、3つのステップでご参加いただけます。" />
    <section className="sp-section">
      <SectionHead en="3 steps to Misaki." note="YOUR FIRST NIGHT / ご来店までの流れ" />
      <div className="sp-grid sp-steps">{steps.map((step, i) => <article className={`sp-card${i === 1 ? ' is-dark' : ''}`} key={step[0]}>
        <small>0{i + 1} / {step[0]}</small>
        <h3 className="sp-pre">{step[1]}</h3>
        <p className="sp-pre">{step[2]}</p>
        {i === 0 && <a href={links.x} target="_blank" rel="noreferrer">Xで申請先を確認 →</a>}
        {i === 1 && (links.lottery
          ? <a href={links.lottery} target="_blank" rel="noreferrer">抽選に応募する →</a>
          : <p className="sp-status is-closed">現在受付準備中です</p>)}
        {i === 2 && <div className="sp-fact"><small>OPEN HOURS</small><strong>22:50 — 24:00</strong></div>}
      </article>)}</div>
      <article className="sp-card is-dark sp-wide">
        <small>SAME DAY ENTRY</small>
        <h3>当日リクイン枠もあります</h3>
        <p>通常の抽選とは別に当日枠をご用意する場合があります。詳細は公式Xをご確認ください。</p>
        <a href={links.x} target="_blank" rel="noreferrer">公式Xを見る →</a>
      </article>
    </section>
    <PageFooter />
  </ContentPage>;
}
