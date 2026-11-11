import { ContentPage, PageFooter, PageHero, PageNav, Placeholder, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

export default function PickupPage() {
  return <ContentPage>
    <PageNav />
    <PageHero index="05" en="PICK UP" ja="注目のイベント" lead="BarMisakiから届く、特別な夜のご案内。" />
    <section className="sp-section">
      <SectionHead en="Special nights." />
      <div className="sp-grid">
        <article className="sp-card is-dark">
          <small>NOTICE</small><h3>イベントの詳細は公式Xで</h3>
          <p>イベントの詳細・参加条件は、公式Xでの最新告知をご確認ください。</p>
          <div className="sp-actions"><a className="sp-action" href={links.x} target="_blank" rel="noreferrer">公式Xを見る →</a><a className="sp-action is-ghost" href="/schedule">営業予定 →</a></div>
        </article>
        <Placeholder label="EVENT VISUAL" ratio="16 : 9" />
      </div>
    </section>
    <PageFooter />
  </ContentPage>;
}
