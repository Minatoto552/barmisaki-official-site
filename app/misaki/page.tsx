import { PageFooter, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';
import { MisakiMedia } from './misaki-media';
import { MisakiShowcase } from './misaki-showcase';
import './misaki-night.css';
import './misaki-night-v2.css';

export const metadata = {
  title: 'Misakiについて | BarMisaki',
  description: 'VISION TOKYO・BLUESTELLA制作のVRChat向けアバター「海咲 -Misaki-」。公式PV、制作へのこだわり、BarMisakiのキャストたちによる多彩な改変をご紹介します。',
};

const features = [
  ['532', '表情の選択肢', '豊富な表情シェイプキーを実装。好みの表情をつくり込み、幅広い改変を楽しめます。'],
  ['Fit', '改変に寄り添う設計', '従来のアバターに合わせた規格設定・シェイプキー名を採用。多数のBody用シュリンクシェイプキーで、衣装の貫通対策にも配慮されています。'],
  ['Simply', 'そのままでも、愛らしく', 'デフォルトの状態でも可愛く使いやすいデザイン。初めての方にも扱いやすく、自然に楽しめることを目指して制作されています。'],
];

export default function Page() {
  return <main className="mk">
    <PageNav />

    <section className="mk-hero">
      <span className="mk-hero-moon" aria-hidden="true" />
      <div className="mk-hero-copy">
        <p className="mk-kicker">THE AVATAR BEHIND OUR NIGHTS</p>
        <p className="mk-hero-script" aria-hidden="true">Everyone is Misaki</p>
        <h1>海咲 <em>— Misaki —</em></h1>
        <p className="mk-hero-sub">Misakiについて / ORIGINAL 3D AVATAR</p>
        <div className="mk-hero-faces" aria-hidden="true">{['nabechi', 'kurin', 'tama', 'secchan', 'misuzu'].map((name) => <img key={name} src={`/misaki-gallery/${name}-thumb.webp`} alt="" />)}<span>+ ALL CAST &amp; STAFF</span></div>
      </div>
      <div className="mk-film">
        <MisakiMedia mode="film" />
      </div>
      <div className="mk-caption">
        <span>OFFICIAL PROMOTION FILM / LONG VER.</span>
        <a href="https://www.youtube.com/watch?v=Ubmy48zaJAI" target="_blank" rel="noreferrer">YouTubeで見る ↗</a>
      </div>
      <div className="mk-film-details">
        <p>海咲 -Misaki- ｜ 公式プロモーションPV（Long Ver.）</p>
        <p>PV Production <a href="https://x.com/vkkoox" target="_blank" rel="noreferrer">あれ。（@vkkoox） ↗</a></p>
      </div>
    </section>

    <section className="mk-section mk-two">
      <div>
        <p className="mk-kicker">01 / BEAUTY, WITH A PERSONALITY.</p>
        <h2>凛と、美しく。<br /><em>ふと、愛らしく。</em></h2>
        <p className="mk-sign">海咲 −Misaki−</p>
      </div>
      <div className="mk-copy">
        <p>BarMisakiの夜を彩るのは、ひとりひとりの個性を映した「海咲」。スタイリッシュな佇まいと、思わず惹かれるやわらかな表情。そのどちらも楽しめるアバターです。</p>
        <blockquote className="mk-quote" cite={links.misaki}>
          <p>海咲は、スタイリッシュさと美しさ、そしてキュートさを兼ね備えた、VRChat向けオリジナル3Dアバターです。</p>
          <p>都会でモデルとして活動しながら、自分らしい世界観を大切に生きる女性。<br />クールなファッションを纏いながらも、ふっとした瞬間明るくやわらかな一面を見せるような存在をイメージして制作されました。</p>
          <footer>引用：<a href={links.misaki} target="_blank" rel="noreferrer">VISION TOKYO「海咲 -Misaki-」BOOTH商品説明 ↗</a></footer>
        </blockquote>
        <dl className="mk-facts">
          <div><dt>CREATED BY</dt><dd><a href="https://visiontokyo.booth.pm/" target="_blank" rel="noreferrer">VISION TOKYO</a> / BLUESTELLA</dd></div>
          <div><dt>DESIGNED BY</dt><dd><a href="https://x.com/Nya_rl" target="_blank" rel="noreferrer">甘音しぃら ↗</a></dd></div>
        </dl>
        <a className="mk-link" href={links.misaki} target="_blank" rel="noreferrer">公式商品説明を見る ↗</a>
      </div>
    </section>

    <section className="mk-section mk-dark">
      <SectionHead en="MADE TO BE YOURS" note="02 / 好きな姿へ。自然な表情のまま。" />
      <p className="mk-lead">見た目の美しさだけでなく、毎日使うアバターとしての扱いやすさまで。<br />公式商品説明で紹介されている、海咲のこだわりです。</p>
      <div className="sp-grid">{features.map(([number, title, body]) => <article className="sp-card is-dark" key={number}>
        <small>{number}</small><h3>{title}</h3><p>{body}</p>
      </article>)}</div>
      <p className="mk-note">出典・要約：VISION TOKYO「海咲 -Misaki-」商品説明。仕様・利用条件の詳細は<a href={links.misaki} target="_blank" rel="noreferrer">販売ページ</a>をご確認ください。</p>
    </section>

    <section className="mk-section">
      <div className="mk-gallery-head">
        <p className="mk-script" aria-hidden="true">So many Misaki</p>
        <p className="mk-kicker">03 / ONE MISAKI. SO MANY EXPRESSIONS.</p>
        <h2>同じ海咲から、<br /><em>こんなにも自由に。</em></h2>
        <p className="mk-lead">髪、衣装、メイク、そして表情。<br />BarMisakiのキャスト・スタッフが楽しむ、それぞれの海咲。</p>
      </div>
      <MisakiShowcase />
      <p className="mk-note">掲載写真はキャスト・スタッフによる改変例です。髪型・衣装・小物などには、海咲本体に含まれないアイテムや個別の改変が含まれます。</p>
    </section>

    <section className="mk-section mk-two">
      <div>
        <p className="mk-kicker">04 / OFFICIAL FILM &amp; CREDITS</p>
        <h2>「静かなときめきを、<br /><em>あなたに。」</em></h2>
        <p className="mk-note">引用：VISION TOKYO 公式XのPV告知</p>
      </div>
      <div className="mk-copy">
        <p>海咲の世界観を伝える公式プロモーションPV。映像に込められた表情や佇まいも、ぜひ大きな画面でお楽しみください。</p>
        <dl className="mk-facts">
          <div><dt>作品</dt><dd>海咲 -Misaki- プロモーションPV / Long Ver.</dd></div>
          <div><dt>告知元</dt><dd><a href={links.vision} target="_blank" rel="noreferrer">VISION TOKYO（@VisionTokyo2026）</a><br />2026年5月13日 公開告知</dd></div>
          <div><dt>PV Production</dt><dd><a href="https://x.com/vkkoox" target="_blank" rel="noreferrer">あれ。（@vkkoox） ↗</a></dd></div>
          <div><dt>発売告知</dt><dd>2026年5月14日 18:00 ON SALE</dd></div>
        </dl>
        <a className="mk-link" href="https://www.youtube.com/watch?v=Ubmy48zaJAI" target="_blank" rel="noreferrer">公式PVをYouTubeで見る ↗</a>
        <p className="mk-note">クレジット・告知内容はVISION TOKYOの公式XでのPV公開告知（2026年5月13日）より引用・転載。動画は<a href="https://www.youtube.com/watch?v=Ubmy48zaJAI" target="_blank" rel="noreferrer">公式YouTube公開動画</a>の埋め込みです。映像および原文の権利は各権利者に帰属します。</p>
      </div>
    </section>

    <section className="mk-thanks">
      <p className="mk-kicker">WITH LOVE &amp; RESPECT</p>
      <h2>この出会いは、<br /><em>海咲からはじまった。</em></h2>
      <p>それぞれの「好き」を映せる海咲がいるから、<br />BarMisakiには、こんなにも多彩な個性が集まります。</p>
      <p>海咲を生み出してくださった VISION TOKYO・BLUESTELLA、<br />デザインを手がけた甘音しぃらさんへ、感謝と敬意を込めて。</p>
      <div className="sp-actions">
        <a className="sp-action" href={links.misaki} target="_blank" rel="noreferrer">海咲をBOOTHで見る ↗</a>
        <a className="sp-action is-ghost" href={links.vision} target="_blank" rel="noreferrer">VISION TOKYO のX ↗</a>
      </div>
    </section>

    <PageFooter />
  </main>;
}
