import { ContentPage, PageFooter, PageHero, PageNav, Placeholder, SectionHead } from '@/components/new-site/content-page';

export default function GalleryPage() {
  return <ContentPage>
    <PageNav />
    <PageHero index="06" en="GALLERY" ja="ギャラリー" lead="BarMisakiの空間と、それぞれの夜の表情。" />
    <section className="sp-section">
      <SectionHead en="The atmosphere." note="BAR MISAKI / INTERIOR" />
      <div className="sp-grid">{Array.from({ length: 7 }, (_, i) => <article className="sp-card" key={i}>
        <Placeholder label={`GALLERY ${String(i + 1).padStart(2, '0')}`} ratio="4 : 3" />
        <h3>店内写真 {String(i + 1).padStart(2, '0')}</h3>
      </article>)}</div>
      <div className="sp-actions"><a className="sp-action" href="/album">営業日のアルバムへ →</a></div>
    </section>
    <PageFooter />
  </ContentPage>;
}
