'use client';
import { useState } from 'react';
import { PageFooter, PageNav } from '@/components/new-site/content-page';
import { useSiteData } from '../use-site-data';
import type { SiteCast } from '../site-data';
import './night-cast.css';
import './night-cast-v2.css';
import { CastDeck } from './cast-deck';
import './cast-compact.css';

type Member = SiteCast & { no: string; nameEn: string };

export default function CastView() {
  const { data, status } = useSiteData();
  const [staff, setStaff] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [generation, setGeneration] = useState('all');
  const members: Member[] = (data?.casts ?? []).map((cast, index) => ({
    ...cast,
    no: String(index + 1).padStart(2, '0'),
    nameEn: cast.name.toUpperCase(),
  }));
  const visible = members.filter((member) => member.role === (staff ? 'STAFF' : 'CAST'));
  const current = visible.find((member) => member.id === selectedId) ?? visible[0];
  const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase().trim();
  const generations = [...new Set(visible.map(member => member.generation).filter(Boolean))];
  const results = visible.filter(member => normalize(member.name).includes(normalize(query)) && (generation === 'all' || member.generation === generation));

  if (!current) {
    return <main className="nc">
      <PageNav />
      <p className="nc-empty">{status === 'error' ? 'キャスト情報を読み込めませんでした。時間をおいて再度お試しください。' : status === 'ready' ? '現在、このカテゴリの掲載はありません。' : 'キャスト情報を読み込んでいます…'}</p>
      <PageFooter />
    </main>;
  }

  const index = visible.findIndex((member) => member.id === current.id);
  const prev = visible[(index - 1 + visible.length) % visible.length];
  const next = visible[(index + 1) % visible.length];
  const photo = current.photos[photoIndex % current.photos.length];
  const select = (id: string) => { setSelectedId(id); setPhotoIndex(0); };
  const move = (step: number) => select(visible[(index + step + visible.length) % visible.length].id);
  const changeGroup = (isStaff: boolean) => {
    setStaff(isStaff);
    setSelectedId(null);
    setQuery('');
    setGeneration('all');
  };
  const choose = (id: string) => {
    select(id);
    document.querySelector('#profile')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  return <main className="nc">
    <PageNav />

    <section className="nc-hero">
      <div className="nc-hero-copy">
        <p className="nc-kicker">それぞれの夜が、ここで出会う。</p>
        <h1>CAST</h1>
        <p className="nc-hero-sub">BAR MISAKI / CAST INTRODUCTION</p>
        <p className="nc-hero-lead">BarMisakiのキャスト・スタッフをご紹介します。</p>
        <p className="nc-script" aria-hidden="true">Meet the Cast</p>
      </div>
      <div className="nc-hero-art nc-deck-slot">
        <CastDeck members={members.filter((member) => member.role === 'CAST' && member.card)} onOpen={choose} />
      </div>
    </section>

    <section className="nc-stage" id="profile" aria-label="選択中のキャスト">
      <div className="nc-visual">
        {photo.full
          ? <img key={photo.full} src={photo.full} alt={`${current.name} メインビジュアル`} />
          : <div className="nc-visual-empty"><span>MAIN CAST IMAGE</span><small>IMAGE TO BE ADDED</small></div>}
        <span className="nc-visual-no">{current.no}</span>
        {current.photos.length > 1 && <button type="button" className="nc-change" onClick={() => setPhotoIndex((photoIndex + 1) % current.photos.length)}>CHANGE <span>{(photoIndex % current.photos.length) + 1} / {current.photos.length}</span></button>}
      </div>

      <article className="nc-info">
        <p className="nc-kicker">{current.no} / {current.role}</p>
        <h2>{current.name}</h2>
        <p className="nc-generation">{current.generation}</p>
        {current.xUrl && <a className="nc-sns-inline" href={current.xUrl} target="_blank" rel="noreferrer" aria-label={`${current.name}のX`}>X ↗</a>}
        <dl className="nc-facts">
          <div><dt>ROLE</dt><dd>{current.role}</dd></div>
          {current.favorite && <div><dt>好きなもの・話題</dt><dd>{current.favorite}</dd></div>}
        </dl>
        {current.message && <blockquote className="nc-message">{current.message}</blockquote>}
        <div className="nc-controls">
          <button type="button" onClick={() => move(-1)}>← PREV</button>
          <button type="button" onClick={() => move(1)}>NEXT →</button>
        </div>
        <a className="nc-reselect" href="#selector">CASTを選びなおす ↑</a>
      </article>
    </section>

    <section className="nc-selector" id="selector" aria-labelledby="nc-selector-title">
      <div className="nc-selector-head">
        <div><p className="nc-directory-kicker">MEET THE CAST</p><h2 id="nc-selector-title">今夜、誰と話そう。</h2><p className="nc-directory-intro">気になるキャストを選んで、プロフィールへ。<br />写真に触れて、ひとりひとりを知る。</p></div>
        <div className="nc-tabs" role="group" aria-label="表示の切り替え">
          <button type="button" aria-pressed={!staff} onClick={() => changeGroup(false)}>CAST <small>{members.filter(m => m.role === 'CAST').length}</small></button>
          <button type="button" aria-pressed={staff} onClick={() => changeGroup(true)}>STAFF <small>{members.filter(m => m.role === 'STAFF').length}</small></button>
        </div>
      </div>
      <div className="nc-directory-tools"><label>名前から探す<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="キャスト名を入力" /></label><label>期生<select value={generation} onChange={event => setGeneration(event.target.value)}><option value="all">すべて</option>{generations.map(value => <option key={value} value={value}>{value}</option>)}</select></label><p aria-live="polite">{results.length} / {visible.length} MEMBERS</p></div>
      <div className="nc-grid">{results.map((member) => {
        const isSelected = member.id === current.id;
        return <button type="button" key={member.id} className={`nc-thumb${isSelected ? ' is-selected' : ''}`} aria-label={`${member.name}のプロフィールを見る`} aria-pressed={isSelected} onClick={() => choose(member.id)}>
          <span className="nc-thumb-media">{member.card
            ? <><img className="nc-thumb-main" src={member.card} alt="" loading="lazy" />{member.photos[1] && <img className="nc-thumb-alt" src={member.photos[1].card} alt="" loading="lazy" />}</>
            : <span className="nc-thumb-empty">{member.role} IMAGE</span>}<span className="nc-thumb-action">{isSelected ? '選択中' : 'PROFILE'} <span aria-hidden="true">↗</span></span></span>
          <span className="nc-thumb-meta"><b>{member.no}</b><span>{member.name}<small>{member.generation}</small></span></span>
        </button>;
      })}</div>
      {results.length === 0 && <div className="nc-no-results"><p>条件に合うキャストが見つかりませんでした。</p><button type="button" onClick={() => {setQuery('');setGeneration('all');}}>絞り込みを解除する</button></div>}
    </section>

    <section className="nc-extras" aria-label="キャストの追加情報">
      <article className="nc-card">
        <p className="nc-kicker">GALLERY PREVIEW</p>
        {current.card
          ? <div className="nc-card-media"><img src={current.card} alt={`${current.name} ギャラリー`} loading="lazy" /></div>
          : <div className="nc-card-media nc-card-empty"><span>GALLERY IMAGE</span></div>}
        <h3>{current.name}</h3>
      </article>
      <article className="nc-card is-dark">
        <p className="nc-kicker">SNS</p>
        <h3>{current.name}のX</h3>
        {current.xUrl
          ? <a className="nc-sns" href={current.xUrl} target="_blank" rel="noreferrer">Xでフォローする ↗</a>
          : <p className="nc-drink-note">Xアカウントは準備中です。</p>}
      </article>
    </section>

    <section className="nc-next" aria-label="前後のキャスト">
      <button type="button" onClick={() => move(-1)}><span>← PREVIOUS CAST</span><strong>{prev.nameEn}</strong></button>
      <p>WHO WILL YOU MEET<br /><em>next?</em></p>
      <button type="button" onClick={() => move(1)}><span>NEXT CAST →</span><strong>{next.nameEn}</strong></button>
    </section>

    <PageFooter />
  </main>;
}
