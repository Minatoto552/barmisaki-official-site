import { ContentPage, PageFooter, PageHero, PageNav } from '@/components/new-site/content-page';

const guides = [['HOW TO JOIN', '参加方法', '初めてのご来店から抽選・入場まで。', '/how-to-join'], ['RULE', '店舗ルール', '皆様に心地よい時間を楽しんでいただくために。', '/rule'], ['GROUP', '団体様向けのご案内', '団体でのご来店と予約のご相談。', '/group'], ['RECRUIT', '募集情報', 'キャスト・スタッフとして夜を一緒につくる。', '/recruit']];

export default function GuidePage() {
  return <ContentPage>
    <PageNav />
    <PageHero index="07" en="GUIDE" ja="ご利用ガイド" lead="特別な夜を楽しむためのご案内。" />
    <section className="sp-section">
      <div className="sp-grid">{guides.map(([en, ja, lead, href]) => <article className="sp-card" key={href}><small>{en}</small><h3>{ja}</h3><p>{lead}</p><a href={href}>詳しく見る →</a></article>)}</div>
    </section>
    <PageFooter />
  </ContentPage>;
}
