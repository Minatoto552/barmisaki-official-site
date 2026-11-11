import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';

export const metadata = { title: 'GROUP | BarMisaki', description: 'BarMisakiの団体利用についてご案内します。' };

const items = [
  ['GROUP NAME', '団体名', '活動名・グループ名', ''],
  ['NUMBER OF GUESTS', '団体人数', '5〜10名', ''],
  ['RESERVATION', '希望日程', '1か月前まで', '第5希望までご記載ください'],
];

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="06" en="TOGETHER" ja="団体様向けのご案内" lead="団体でのご来店をご希望の場合は、必要事項をご記入の上、BarMisaki公式Xからご相談ください。" />
    <section className="sp-section">
      <SectionHead en="A night together." note="BOOKING INFORMATION / ご相談時にお知らせいただくこと" />
      <div className="sp-grid">{items.map((item, i) => <article className="sp-card" key={item[0]}>
        <small>0{i + 1} / {item[0]}</small><h3>{item[1]}</h3><p className="sp-value">{item[2]}</p>{item[3] && <p>{item[3]}</p>}
      </article>)}</div>
      <aside className="sp-note">
        <span>希望日程は第5希望まで記載し、ご希望日の1か月前までにご相談ください。</span><br />
        <span>※キャストのシフト状況によっては、お断りする場合がございます。</span>
      </aside>
      <div className="sp-actions"><a className="sp-action" href={links.x} target="_blank" rel="noreferrer">公式Xから相談する →</a></div>
    </section>
    <PageFooter />
  </ContentPage>;
}
