import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { rules } from '../data';

export const metadata = { title: 'RULE | BarMisaki', description: '皆さまに安心して楽しんでいただくためのBarMisaki店舗ルールです。' };

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="05" en="RESPECT" ja="店舗ルール" lead="皆様に安心してイベントを楽しんでいただくため、以下のルールをお守りください。" />
    <section className="sp-section">
      <SectionHead en="With respect." note={`HOUSE RULES / ${String(rules.length).padStart(2, '0')} RULES`} />
      <p className="sp-lead">心地よい夜を、皆様と。</p>
      <h3 className="sp-label">禁止事項</h3>
      <ol className="sp-list">{rules.map((rule, i) => <li key={rule}><span>{String(i + 1).padStart(2, '0')}</span><h3>{rule}</h3></li>)}</ol>
    </section>
    <PageFooter />
  </ContentPage>;
}
