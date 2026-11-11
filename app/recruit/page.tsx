import { ContentPage, PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { recruitment } from '../data';

export const metadata = { title: 'RECRUIT | BarMisaki', description: 'BarMisakiのキャスト・スタッフ募集情報です。' };

const roles = [
  ['cast', 'CAST', 'キャスト募集', 'お客様との会話を楽しみながら、BarMisakiらしい時間を届けるキャストです。'],
  ['staff', 'STAFF', 'スタッフ募集', '受付や運営を通して、心地よいイベントづくりを支えるスタッフです。'],
] as const;

export default function Page() {
  return <ContentPage>
    <PageNav />
    <PageHero index="07" en="OUR TEAM" ja="キャスト・スタッフ募集" lead="BarMisakiの夜を一緒につくる仲間を募集します。" />
    <section className="sp-section">
      <SectionHead en="Create the night." note="JOIN OUR TEAM / それぞれの役割で、ひとつの夜を。" />
      <div className="sp-grid">{roles.map(([key, en, title, text], i) => {
        const state = recruitment[key];
        return <article className={`sp-card${state.enabled ? ' is-dark' : ''}`} key={key}>
          <small>0{i + 1} / {en}</small>
          <p className={`sp-status ${state.enabled ? 'is-open' : 'is-closed'}`}>{state.enabled ? 'OPEN · 募集中' : 'CLOSED · 募集停止'}</p>
          <h3>{title}</h3>
          <p>{text}</p>
          {state.enabled && state.url
            ? <a href={state.url} target="_blank" rel="noreferrer">{key === 'staff' ? '公式Xから応募する' : '応募する'} →</a>
            : <p className="sp-empty">{state.enabled ? '応募先は準備中です。' : '現在は募集を行っておりません。'}</p>}
        </article>;
      })}</div>
    </section>
    <PageFooter />
  </ContentPage>;
}
