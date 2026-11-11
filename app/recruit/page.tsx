import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="07" en="OUR TEAM" ja="キャスト・スタッフ募集" lead="BarMisakiの夜を一緒につくる仲間を募集します。" />
    <section className="sp-section">
      <SectionHead en="Create the night." note="JOIN OUR TEAM" />
      <div className="sp-grid">
        <article className="sp-card"><small>CLOSED / CAST</small><h3>キャスト募集</h3><p>お客様との会話を楽しみながら、BarMisakiらしい時間を届ける役割です。現在は募集していません。</p></article>
        <article className="sp-card is-dark"><small>OPEN / STAFF</small><h3>スタッフ募集</h3><p>受付や運営を通して、心地よいイベントづくりを支える役割です。</p><a href={links.x}>公式Xから応募 →</a></article>
      </div>
    </section>
    <PageFooter />
  </ContentPage>;
}
