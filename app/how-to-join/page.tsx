import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

const steps = [['FRIEND REQUEST', 'インスタンスリーダーへフレンド申請', '営業当日のインスタンスリーダーは公式Xでご案内します。'], ['LOTTERY ENTRY', '抽選に応募', '公式Xで案内される抽選システムから応募します。'], ['REQUEST INVITE', '抽選結果を確認', '当選した方は22:40〜22:50にRequest Inviteしてください。']];

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="03" en="JOIN US" ja="参加方法" lead="VRChatイベントが初めての方も、3つのステップでご参加いただけます。" />
    <section className="sp-section">
      <SectionHead en="3 steps to Misaki." note="YOUR FIRST NIGHT" />
      <div className="sp-grid sp-steps">{steps.map((step, i) => <article className={`sp-card${i === 1 ? ' is-dark' : ''}`} key={step[0]}>
        <small>0{i + 1} / {step[0]}</small><h3>{step[1]}</h3><p>{step[2]}</p>
        {i === 0 && <a href={links.x}>公式Xを確認 →</a>}
        {i === 1 && <a href={links.lottery}>抽選ページ →</a>}
      </article>)}</div>
      <aside className="sp-note">通常の抽選とは別に当日リクイン枠をご用意する場合があります。詳細は公式Xをご確認ください。</aside>
    </section>
    <PageFooter />
  </ContentPage>;
}
