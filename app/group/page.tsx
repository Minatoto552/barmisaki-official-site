import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

const items = [['GROUP NAME', '団体名', '活動名・グループ名'], ['NUMBER OF GUESTS', '団体人数', '5〜10名'], ['RESERVATION', '希望日程', '1か月前まで／第5希望まで']];

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="06" en="TOGETHER" ja="団体様向けのご案内" lead="必要事項をご記入の上、BarMisaki公式Xからご相談ください。" />
    <section className="sp-section">
      <SectionHead en="A night together." note="BOOKING INFORMATION" />
      <div className="sp-grid">{items.map((item, i) => <article className="sp-card" key={item[0]}><small>0{i + 1} / {item[0]}</small><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
      <p className="sp-note">キャストのシフト状況によっては、お断りする場合があります。</p>
      <div className="sp-actions"><a className="sp-action" href={links.x}>公式Xから相談する →</a></div>
    </section>
    <PageFooter />
  </ContentPage>;
}
