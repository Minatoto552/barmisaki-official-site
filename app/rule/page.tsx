import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { houseRules } from '../content-data';

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="05" en="RESPECT" ja="店舗ルール" lead="皆様に安心してイベントを楽しんでいただくため、以下のルールをお守りください。" />
    <section className="sp-section">
      <SectionHead en="With respect." note={`HOUSE RULES / ${houseRules.length}`} />
      <ol className="sp-list">{houseRules.map((rule, i) => <li key={rule}><span>0{i + 1}</span><h3>{rule}</h3></li>)}</ol>
    </section>
    <PageFooter />
  </ContentPage>;
}
