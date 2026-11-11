'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteNavigation, siteNavigation } from '@/components/new-site/navigation';
import { siteImage } from './site-images';
import { castImagePosition } from './cast/cast-images';
import { useSiteData } from './use-site-data';
import { newsCategoryLabels, type SiteCast } from './site-data';
import { links, siteFacts } from './content-data';
import { misakiCollection } from './misaki-collection';
import './night-home.css';
import './night-home-v2.css';

const nav = siteNavigation;

// Pick-up members first, then regular cast, six in total for the home stage.
function homeCastList(casts: SiteCast[]) {
  const pickups = casts.filter((cast) => cast.isPickup);
  const regular = casts.filter((cast) => !cast.isPickup && cast.role === 'CAST');
  return [...pickups, ...regular].slice(0, 6).map((cast, index) => ({
    no: String(index + 1).padStart(2, '0'),
    en: cast.name.toUpperCase(),
    ja: cast.name,
    src: cast.card,
    generation: cast.generation,
    pickup: cast.isPickup,
  }));
}

const factLabels = ['OPEN', 'TIME', 'STYLE', 'SYSTEM'];
const labelOf = (key: string) => newsCategoryLabels.find(([k]) => k === key)?.[1] ?? 'お知らせ';

function Placeholder({ label, detail, className = '', src, alt }: { label: string; detail?: string; className?: string; src?: string; alt?: string }) {
  const image = src ? { src, alt: alt ?? label } : siteImage(label);
  if (image) return <div className={`nh-media ${className}`}><img src={image.src} alt={image.alt} loading={label === 'KEY VISUAL' ? 'eager' : 'lazy'} style={{ objectPosition: label === 'CAST IMAGE' ? castImagePosition(image.src) : 'center' }} /></div>;
  return <div className={`nh-media nh-media-empty ${className}`} aria-label={`${label} image placeholder`}>
    <span><b>{label}</b>{detail && <small>{detail}</small>}</span>
  </div>;
}

function Heading({ en, ja, index, script }: { en: string; ja: string; index?: string; script?: string }) {
  return <div className="nh-heading">
    {script && <span className="nh-script" aria-hidden="true">{script}</span>}
    <span className="nh-index">{index}</span><h2>{en}</h2><p>{ja}</p>
  </div>;
}

function ArrowLink({ children, href = '#' }: { children: React.ReactNode; href?: string }) {
  return <a className="nh-link" href={href}><span>{children}</span><i aria-hidden="true">→</i></a>;
}

function Sparkles({ count = 7 }: { count?: number }) {
  return <div className="nh-sparkles" aria-hidden="true">{Array.from({ length: count }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties}>✦</i>)}</div>;
}

function Badge() {
  return <div className="nh-badge" aria-hidden="true">
    <svg viewBox="0 0 200 200"><defs><path id="nh-badge-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
      <text><textPath href="#nh-badge-path">BAR MISAKI ✦ VRCHAT ✦ NIGHT ONLY ✦ COCKTAIL &amp; TALK ✦ </textPath></text></svg>
    <img src="/brand/barmisaki-cat-logo.png" alt="" />
  </div>;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const heroArt = useRef<HTMLDivElement>(null);
  const { data, status } = useSiteData();
  const news = data?.news ?? [];
  const [featured, ...restNews] = news;
  const casts = homeCastList(data?.casts ?? []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('.nh-reveal:not(.is-visible)');
    if (reduced) { elements.forEach((element) => element.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [status]);

  return <main className="nh" id="top">
    <SiteNavigation />

    <section className="nh-hero" onPointerMove={(event) => {
      if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const box = event.currentTarget.getBoundingClientRect();
      heroArt.current?.style.setProperty('--art-x', `${((event.clientX - box.left) / box.width - 0.5) * -14}px`);
    }}>
      <div className="nh-hero-art" ref={heroArt}><Placeholder label="KEY VISUAL" detail="1440 × 810" /></div>
      <div className="nh-hero-moon" aria-hidden="true" />
      <Badge />
      <Sparkles />
      <div className="nh-hero-copy">
        <p className="nh-kicker">VIRTUAL BAR EVENT / VRCHAT</p>
        <p className="nh-hero-script" aria-hidden="true">Welcome to the night</p>
        <h1><span>BAR</span><span>MISAKI</span></h1>
        <p className="nh-hero-lead">バーチャルの夜に、<br />もうひとつの居場所を。</p>
        <p className="nh-hero-sub">キャスト＆スタッフ全員が、海咲ちゃん。<br />月に二度だけ扉が開く、上品で少し不思議な夜。</p>
        <div className="nh-hero-actions">
          <a className="nh-hero-cta" href="/how-to-join">参加方法を見る <span aria-hidden="true">→</span></a>
          <a className="nh-hero-cta is-ghost" href="/cast">CASTに会う <span aria-hidden="true">♥</span></a>
        </div>
      </div>
      <a className="nh-hero-scroll" href="#news" aria-label="お知らせへ進む"><span>SCROLL</span><i aria-hidden="true" /></a>
    </section>

    <a className="nh-next" href={links.x} target="_blank" rel="noreferrer">
      <span className="nh-next-label">OPEN</span>
      <span className="nh-next-date">22:50 <small>— 24:00</small></span>
      <span className="nh-next-time">月2回・不定期開催</span>
      <span className="nh-next-go">営業日は公式Xで告知 ↗</span>
    </a>

    <div className="nh-bands" aria-hidden="true">
      <div className="nh-band is-red"><div>{[0, 1].map((i) => <span key={i}>CUTE <b>♥</b> NIGHT <em>✦</em> CONVERSATION <b>♥</b> BAR MISAKI <em>✦</em> </span>)}</div></div>
      <div className="nh-band is-ink"><div>{[0, 1].map((i) => <span key={i}>ONLY TONIGHT <em>✦</em> 夜にだけ開く、少し特別なBar <b>♥</b> VRCHAT <em>✦</em> </span>)}</div></div>
    </div>

    <section className="nh-section nh-news nh-reveal" id="news">
      <div className="nh-section-head"><Heading en="NEWS" ja="お知らせ" index="01" script="Latest" /><ArrowLink href="/news">VIEW ALL</ArrowLink></div>
      {!featured && <p className="nh-loading">{status === 'error' ? 'お知らせを読み込めませんでした。' : 'お知らせを読み込んでいます…'}</p>}
      {featured && <div className="nh-news-layout">
        <a className="nh-news-feature" href={`/news/detail?id=${encodeURIComponent(featured.id)}`}>
          <span className="nh-news-thumb"><Placeholder label="NEWS 01" src={featured.thumbnail || undefined} alt={featured.title} /><b className="nh-news-new">NEW</b></span>
          <span className="nh-news-body">
            <span className="nh-meta"><time>{featured.date.replace(/-/g, '.')}</time><span>{labelOf(featured.category)}</span></span>
            <strong>{featured.title}</strong>
            {featured.summary && <small>{featured.summary}</small>}
            <em>READ MORE →</em>
          </span>
        </a>
        <ul className="nh-news-list">{restNews.slice(0, 4).map((item) => <li key={item.id}><a href={`/news/detail?id=${encodeURIComponent(item.id)}`}>
          {item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" />}
          <span><span className="nh-meta"><time>{item.date.replace(/-/g, '.')}</time><span>{labelOf(item.category)}</span></span><strong>{item.title}</strong></span>
        </a></li>)}
          <li className="nh-news-x"><a href={links.x} target="_blank" rel="noreferrer"><span><small>OFFICIAL X</small><strong>最新の営業告知は公式Xで ↗</strong></span></a></li>
        </ul>
      </div>}
    </section>

    <section className="nh-cast nh-reveal" id="cast">
      <Sparkles count={5} />
      <div className="nh-cast-head">
        <Heading en="CAST" ja="キャスト" index="02" script="Meet the cast" />
        <p>それぞれの夜が、ここで出会う。<br /><span>気になる一人を選んでみてください。</span></p>
      </div>
      <div className="nh-stage" role="group" aria-label="キャスト一覧">
        {casts.map((cast, i) => {
          const isActive = active === i;
          return <article className={`nh-panel${isActive ? ' is-active' : ''}`} key={cast.no}>
            <button type="button" className="nh-panel-button" aria-pressed={isActive} aria-label={`${cast.ja}を表示`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              <Placeholder label="CAST IMAGE" detail="2 : 3" src={cast.src} alt={cast.ja} />
              <span className="nh-panel-no">{cast.no}</span>
              {cast.pickup && <span className="nh-panel-pick">PICK UP</span>}
              <span className="nh-panel-name">{cast.en}</span>
            </button>
            <div className="nh-panel-info">
              <small>{cast.generation}</small>
              <h3>{cast.ja}</h3>
              <a href="/cast">PROFILE <span aria-hidden="true">→</span></a>
            </div>
          </article>;
        })}
      </div>
      <div className="nh-cast-foot"><ArrowLink href="/cast">VIEW ALL CAST</ArrowLink></div>
    </section>

    <section className="nh-collection nh-reveal" aria-labelledby="nh-collection-title">
      <div className="nh-collection-head">
        <p className="nh-script" aria-hidden="true">Everyone is Misaki</p>
        <h2 id="nh-collection-title">みんな、海咲ちゃん。</h2>
        <p>キャストもスタッフも、全員が海咲ちゃん。<br />同じアバターから生まれた、それぞれの「かわいい」を見てください。</p>
        <ArrowLink href="/misaki">Misakiについて</ArrowLink>
      </div>
      <div className="nh-polaroids">
        <div className="nh-polaroid-track">{[...misakiCollection, ...misakiCollection].map((item, i) => <a href="/misaki" className="nh-polaroid" key={`${item.name}-${i}`} aria-hidden={i >= misakiCollection.length} tabIndex={i >= misakiCollection.length ? -1 : undefined}>
          <img src={item.thumb} alt={i < misakiCollection.length ? `${item.name}の海咲ちゃん` : ''} loading="lazy" />
          <span>{item.name}</span>
        </a>)}</div>
      </div>
    </section>

    <section className="nh-about nh-reveal" id="about">
      <div className="nh-about-visual">
        <Placeholder label="ABOUT VISUAL" className="nh-about-main" />
        <Placeholder label="GALLERY 05" className="nh-about-sub" />
        <span className="nh-sticker" aria-hidden="true">Night<br />only ♥</span>
      </div>
      <div className="nh-about-copy">
        <Heading en="ABOUT" ja="BarMisakiについて" index="03" script="Our little bar" />
        <p className="nh-lead">海咲ちゃんが紡ぐ、やさしい夜。</p>
        <p>落ち着いた距離感で会話を楽しめる、海咲ちゃんだけの特別なBar。静かな高揚感と、ここでしか生まれない出会いを。</p>
        <p>ここは、バーチャルの夜にだけ開く、少し特別なBar。日常から少し離れて、気の合う誰かと語り合える場所。</p>
        <p>音楽、会話、そして、ここにいるみんながつくる特別な時間をあなたに。</p>
        <div className="nh-about-links"><ArrowLink href="/about">VIEW MORE</ArrowLink><ArrowLink href="/how-to-join">HOW TO JOIN</ArrowLink></div>
      </div>
    </section>

    <section className="nh-section nh-info nh-reveal" id="schedule">
      <div className="nh-section-head"><Heading en="OPENING INFO" ja="営業について" index="04" script="When we open" /><ArrowLink href="/schedule">VIEW DETAIL</ArrowLink></div>
      <div className="nh-facts">{siteFacts.map(([value, note], i) => <a className="nh-fact" href="/schedule" key={value}>
        <small>{factLabels[i]}</small><strong>{value}</strong><span>{note}</span>
      </a>)}</div>
      <p className="nh-info-note">次回の営業日と当日のインスタンス情報は、<a href={links.x} target="_blank" rel="noreferrer">公式X</a>でお知らせします。</p>
    </section>

    <section className="nh-pickup nh-reveal">
      <div className="nh-pickup-copy">
        <p className="nh-kicker">PICK UP / 注目のイベント</p>
        <h2>SPECIAL<br />EVENT</h2>
        <p className="nh-pickup-text">我々のバレー、我バレー<br />BarMisaki 出場決定！</p>
        <ArrowLink href="/pickup">VIEW DETAIL</ArrowLink>
      </div>
      <div className="nh-pickup-frame">
        <span className="nh-pickup-stamp" aria-hidden="true">ENTRY!</span>
        <Placeholder label="EVENT VISUAL" className="nh-pickup-visual" src="/events/warabare-announcement.png" alt="BarMisaki 我々のバレー、我バレー 出場決定！" />
      </div>
    </section>

    <section className="nh-counter nh-reveal">
      <div className="nh-counter-bg" aria-hidden="true"><img src="/atmosphere/interior-03-display.webp" alt="" loading="lazy" /></div>
      <p className="nh-kicker">A MOMENT AT THE COUNTER</p>
      <h2>COCKTAIL<br /><em>&amp; Conversation.</em></h2>
      <div className="nh-counter-body">
        <p>グラスを片手に、今夜だけの会話を。</p>
        <span>ふとしたひと言から、特別な時間がはじまる。バーチャルのBarで、あなたらしい夜を。</span>
        <div className="nh-monthly">
          <p className="nh-monthly-eyebrow">今月のおすすめ</p>
          <h3>月影 <em>— Tsukikage —</em></h3>
          <p>月明かりを映したような、静かな余韻のオリジナルカクテル。夜のBar Misakiで、会話とともにゆっくりお楽しみください。</p>
          <small>MONTHLY COCKTAIL / NON-ALCOHOLIC</small>
        </div>
        <ArrowLink href="/how-to-join">HOW TO JOIN</ArrowLink>
      </div>
    </section>

    <section className="nh-section nh-gallery nh-reveal" id="gallery">
      <div className="nh-section-head"><Heading en="GALLERY" ja="ギャラリー" index="05" script="Inside the bar" /><ArrowLink href="/gallery">VIEW ALL</ArrowLink></div>
      <div className="nh-gallery-grid">{[1, 2, 3, 4, 5, 6].map((n) => <Placeholder key={n} label={`GALLERY ${String(n).padStart(2, '0')}`} detail={n === 1 || n === 4 ? '4 : 5' : '4 : 3'} className={`nh-gallery-${n}`} />)}</div>
    </section>

    <section className="nh-guide nh-reveal" id="guide">
      <div className="nh-section-head"><Heading en="HOW TO JOIN" ja="参加の流れ" index="06" script="Four little steps" /><ArrowLink href="/how-to-join">VIEW DETAIL</ArrowLink></div>
      <div className="nh-guide-steps">{[['01', 'JOIN', 'VRChatに参加する'], ['02', 'LOTTERY', '抽選に申し込む'], ['03', 'ENTER', '当選して入場する'], ['04', 'ENJOY', 'BarMisakiを楽しむ']].map((step) => <a href="/how-to-join" key={step[0]}>
        <span>{step[0]}</span><h3>{step[1]}</h3><small>{step[2]}</small>
      </a>)}</div>
    </section>

    <section className="nh-follow" id="official-x">
      <img className="nh-follow-logo" src="/brand/barmisaki-cat-logo.png" alt="" />
      <p className="nh-script" aria-hidden="true">See you tonight</p>
      <p className="nh-kicker">FOLLOW US</p>
      <a href={links.x} target="_blank" rel="noreferrer">@BarMisaki_VRC <span aria-hidden="true">→</span></a>
      <small>営業日・イベントの最新情報をチェック</small>
    </section>

    <footer className="nh-footer">
      <a className="nh-footer-brand" href="/">BAR MISAKI</a>
      <nav>{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a href={links.x}>CONTACT</a></nav>
      <p>© 2026 BarMisaki. All rights reserved.</p>
    </footer>
  </main>;
}
