import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links, siteFacts } from '../content-data';

export default function SchedulePage() {
  return <ContentPage>
    <PageNav />
    <PageHero index="04" en="SCHEDULE" ja="営業予定" lead="BarMisakiの扉が開く夜をご案内します。" />
    <section className="sp-section">
      <SectionHead en="When the night opens." note="OPENING INFORMATION" />
      <p className="sp-note">営業は月2回、不定期開催です。次回営業日と当日のインスタンスリーダーは、公式Xの最新告知をご確認ください。</p>
      <div className="sp-grid">{siteFacts.slice(0, 2).map(([value, note]) => <article className="sp-card" key={value}><small>OPEN HOURS</small><h3>{value}</h3><p>{note}</p></article>)}</div>
      <div className="sp-actions">
        <a className="sp-action" href={links.x} target="_blank" rel="noreferrer">公式Xで営業日を確認 →</a>
        <a className="sp-action is-ghost" href="/how-to-join">参加方法 →</a>
      </div>
    </section>
    <PageFooter />
  </ContentPage>;
}
