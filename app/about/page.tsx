import { ContentPage, PageFooter, PageHero, PageNav, Placeholder } from '@/components/new-site/content-page';
import { links, siteFacts } from '../content-data';

export default function AboutPage() {
  return <ContentPage>
    <PageNav />
    <PageHero index="03" en="ABOUT" ja="BarMisakiについて" lead="夜にだけ開く、少し特別なVirtual Bar。" />
    <section className="sp-section">
      <div className="sp-pair">
        <div className="sp-pair-copy">
          <h2 className="sp-title">A special night.</h2>
          <p className="sp-lead">キャストもスタッフも、みんな海咲ちゃん。VRChatで月2回、不定期に開催するBarイベントです。落ち着いた距離感で会話を楽しめる、もうひとつの居場所をお届けします。</p>
          <div className="sp-actions">
            <a className="sp-action" href="/how-to-join">参加方法 →</a>
            <a className="sp-action is-ghost" href={links.vrchat} target="_blank" rel="noreferrer">VRChatグループ →</a>
          </div>
        </div>
        <Placeholder label="ABOUT VISUAL" ratio="4 : 5" />
      </div>
    </section>
    <section className="sp-section">
      <div className="sp-grid">{siteFacts.map(([value, note]) => <article className="sp-card" key={value}><small>BAR MISAKI / INFORMATION</small><h3>{value}</h3><p>{note}</p></article>)}</div>
    </section>
    <PageFooter />
  </ContentPage>;
}
