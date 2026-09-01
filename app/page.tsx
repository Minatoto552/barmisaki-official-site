'use client';

import {
  AlertTriangle, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, ChevronLeft,
  ChevronRight, Clock3, DoorOpen, Menu, PawPrint, Sparkles, Star, Users, X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { casts, externalLinks, gallery, news, recruitment, rules, type Cast } from './data';

const navItems = [
  ['HOME', '#home'], ['CAST', '#cast'], ['NEWS', '#news'], ['HOW TO JOIN', '#join'],
  ['RECRUIT', '#recruit'], ['RULE', '#rule'], ['GROUP', '#group'],
];

const categories = ['すべて', '1期生', '2期生 花組', '2期生 月組', 'スタッフ'];

function SectionTitle({ eyebrow, children, intro }: { eyebrow: string; children: React.ReactNode; intro?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <p className="mb-3 text-xs font-bold tracking-[.28em] text-[#d7b85b]">{eyebrow}</p>
      <h2 className="display text-4xl leading-tight sm:text-6xl">{children}</h2>
      {intro && <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{intro}</p>}
    </div>
  );
}

function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`placeholder relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_50%_30%,#a372ff,transparent_52%)]" />
      <img src="/barmisaki-icon.png" alt="" className="relative w-24 rounded-full opacity-20 mix-blend-screen sm:w-32" />
      <span className="absolute bottom-5 left-5 text-xs font-semibold tracking-[.18em] text-white/48">{label}</span>
    </div>
  );
}

function ImageOrPlaceholder({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return src ? <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} /> : <Placeholder label={alt} className={className} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('すべて');
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);
  const [selectedNews, setSelectedNews] = useState<(typeof news)[number] | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<(typeof gallery)[number] | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pickupRef = useRef<HTMLDivElement>(null);

  const filteredCasts = useMemo(() => casts.filter((cast) => {
    if (activeCategory === 'すべて') return true;
    if (activeCategory === 'スタッフ') return cast.generation === 'スタッフ';
    return `${cast.generation}${cast.group ? ` ${cast.group}` : ''}` === activeCategory;
  }), [activeCategory]);

  const pickups = useMemo(() => casts.filter((cast) => cast.isPickup).sort((a, b) => (a.pickupOrder ?? 99) - (b.pickupOrder ?? 99)), []);
  const modalOpen = selectedCast || selectedNews || selectedGallery;

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    const close = (event: KeyboardEvent) => event.key === 'Escape' && (setSelectedCast(null), setSelectedNews(null), setSelectedGallery(null));
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [modalOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const el = galleryRef.current;
      if (!el || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 24;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * .72, behavior: 'smooth' });
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .8, behavior: 'smooth' });

  return (
    <main className="min-h-screen overflow-hidden bg-[#080710] text-white">
      <section id="home" className="relative isolate flex min-h-screen flex-col overflow-hidden">
        <video className="absolute inset-0 -z-20 h-full w-full object-cover" autoPlay loop muted playsInline poster="/barmisaki-icon.png">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
        </video>

        <header className="relative z-30 flex w-full items-center justify-between px-6 py-4 lg:px-[72px] xl:px-[120px]">
          <a href="#home" className="group flex items-center" aria-label="BarMisaki ホーム">
            <img src="/barmisaki-logo.png" alt="BarMisaki" className="h-12 w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-[1.02] sm:h-14" />
          </a>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="メインナビゲーション">
            {navItems.map(([label, href], index) => (
              <a key={label} href={href} className="ui flex items-center gap-1 text-[12px] font-semibold tracking-[.09em] text-white transition-opacity hover:opacity-70">
                {label}{index === 1 && <ChevronDown size={14} strokeWidth={1.5} />}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="ui rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:bg-white/20">公式X</a>
            <a href="#join" className="ui rounded-lg bg-[#7b39fc] px-5 py-3 text-sm font-semibold shadow-[0_8px_28px_rgba(123,57,252,.38)] transition hover:bg-[#8b51ff]">参加方法</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="grid size-11 place-items-center rounded-xl border border-white/20 bg-black/20 backdrop-blur-md md:hidden" aria-label="メニューを開く"><Menu size={24} /></button>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-center px-6 pb-20 pt-16 text-center sm:pb-24">
          <div className="mb-7 flex h-[38px] items-center gap-2 rounded-[10px] border border-[rgba(220,185,255,.45)] bg-[rgba(35,27,55,.45)] px-2.5 pr-4 backdrop-blur-xl">
            <span className="ui rounded-md bg-[#7b39fc] px-2.5 py-1 text-xs font-medium">VRChat</span>
            <span className="button-font text-sm font-medium tracking-wide">月2回だけ開く、海咲ちゃんの夜</span>
          </div>
          <p className="mb-4 text-xs font-semibold tracking-[.32em] text-[#f4d98b] sm:text-sm">WELCOME TO BAR MISAKI</p>
          <h1 className="display max-w-[980px] text-[clamp(3.35rem,8.3vw,6rem)] leading-[.96] tracking-[-.045em] text-white [text-shadow:0_4px_35px_rgba(0,0,0,.35)]">
            海咲ちゃんと過ごす、<br className="hidden sm:block" />特別な<em className="px-[.08em] font-normal">夜</em>を。
          </h1>
          <p className="mt-7 max-w-[660px] text-[15px] leading-8 text-white/75 [text-shadow:0_2px_18px_rgba(0,0,0,.7)] sm:text-lg">キャストもスタッフも、みんな海咲ちゃん。VRChatで出会う、上品で少し不思議なキャバクラ＆Barイベントです。</p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href="#join" className="button-font rounded-[10px] bg-[#7b39fc] px-8 py-4 text-base font-semibold shadow-[0_12px_38px_rgba(123,57,252,.45)] transition hover:-translate-y-0.5 hover:bg-[#8b51ff]">参加方法はこちら！</a>
            <a href="#cast" className="button-font rounded-[10px] border border-white/15 bg-[#2b2344]/90 px-8 py-4 text-base font-semibold text-[#f6f7f9] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#3a2e5b]">キャストを見る</a>
          </div>
        </div>
        <a href="#about" aria-label="次のセクションへ" className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/65"><ChevronDown size={26} /></a>

        {menuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-[#06050b]/98 px-6 py-5 md:hidden">
            <div className="flex items-center justify-between">
              <img src="/barmisaki-logo.png" alt="BarMisaki" className="h-12 w-auto" />
              <button onClick={() => setMenuOpen(false)} className="grid size-11 place-items-center rounded-xl border border-white/15" aria-label="メニューを閉じる"><X /></button>
            </div>
            <nav className="my-auto flex flex-col items-center gap-6">
              {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="display text-3xl text-white">{label}</a>)}
              <a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="mt-3 rounded-xl bg-[#7b39fc] px-8 py-4 font-semibold">公式Xを見る</a>
            </nav>
          </div>
        )}
      </section>

      <section id="about" className="section relative border-t border-white/[.06]">
        <div className="ambient ambient-a" />
        <SectionTitle eyebrow="ABOUT BAR MISAKI" intro="一人のキャストにお客様二人。落ち着いた距離感で会話を楽しめる、海咲ちゃんだけの特別なBarです。">海咲ちゃんが紡ぐ、<em className="text-[#c8a4ff]">やさしい夜</em></SectionTitle>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [CalendarDays, '月2回', '不定期開催'], [Clock3, '22:50 – 24:00', '22:40 当選者入場'],
            [Users, '1 : 2', 'キャスト1名／お客様2名'], [DoorOpen, '2 ROTATIONS', '個室のみ一部例外あり'],
          ].map(([Icon, value, note]) => (
            <div key={String(value)} className="glass-card min-h-44 p-5 sm:p-7">
              <Icon className="mb-8 text-[#d7b85b]" size={25} strokeWidth={1.5} />
              <p className="display text-2xl sm:text-3xl">{String(value)}</p>
              <p className="mt-2 text-xs leading-5 text-white/48 sm:text-sm">{String(note)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#0c0a16]">
        <SectionTitle eyebrow="ATMOSPHERE" intro="ワールド、接客、イベントの一瞬。写真はあとからデータを差し替えるだけで追加できます。">店内の<em className="text-[#c8a4ff]">雰囲気</em></SectionTitle>
        <div className="relative mx-auto max-w-[1240px]">
          <div ref={galleryRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3">
            {gallery.map((item, index) => (
              <button key={item.id} onClick={() => setSelectedGallery(item)} className="group relative aspect-[4/3] min-w-[88%] snap-center overflow-hidden rounded-[22px] border border-white/10 text-left sm:min-w-[47%] lg:min-w-[32%]">
                <ImageOrPlaceholder src={item.image} alt={item.alt} />
                <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/15 bg-black/25 opacity-0 backdrop-blur transition group-hover:opacity-100"><ArrowUpRight size={17} /></span>
                <span className="absolute bottom-4 right-4 text-xs tracking-[.18em] text-white/45">0{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={() => scrollRow(galleryRef, -1)} className="round-button" aria-label="前の写真"><ChevronLeft /></button>
            <button onClick={() => scrollRow(galleryRef, 1)} className="round-button" aria-label="次の写真"><ChevronRight /></button>
          </div>
        </div>
      </section>

      <section className="section relative">
        <div className="ambient ambient-b" />
        <SectionTitle eyebrow="MONTHLY SELECTION" intro="今月、あなたをお迎えする海咲ちゃんたち。カードをタップするとプロフィールをご覧いただけます。">今月の<em className="text-[#c8a4ff]">ピックアップ</em></SectionTitle>
        <div className="relative mx-auto max-w-[1240px]">
          <div ref={pickupRef} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-3">
            {pickups.map((cast) => <CastCard key={cast.id} cast={cast} onClick={() => setSelectedCast(cast)} wide />)}
          </div>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={() => scrollRow(pickupRef, -1)} className="round-button" aria-label="前のキャスト"><ChevronLeft /></button>
            <button onClick={() => scrollRow(pickupRef, 1)} className="round-button" aria-label="次のキャスト"><ChevronRight /></button>
          </div>
        </div>
      </section>

      <section id="cast" className="section scroll-mt-6 bg-[#0c0a16]">
        <SectionTitle eyebrow="CAST" intro="同じ海咲ちゃんでも、話し方も好きなものもそれぞれ。あなたと気の合う海咲ちゃんを見つけてください。">Meet the <em className="text-[#c8a4ff]">Misakis</em></SectionTitle>
        <div className="no-scrollbar mx-auto mb-8 flex max-w-4xl gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`ui shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${activeCategory === category ? 'border-[#9d69ff] bg-[#7b39fc] text-white' : 'border-white/10 bg-white/[.035] text-white/55 hover:text-white'}`}>{category}</button>
          ))}
        </div>
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filteredCasts.map((cast) => <CastCard key={cast.id} cast={cast} onClick={() => setSelectedCast(cast)} />)}
        </div>
      </section>

      <section id="news" className="section scroll-mt-6">
        <SectionTitle eyebrow="LATEST NEWS">お知らせ</SectionTitle>
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {news.map((item) => (
            <button key={item.id} onClick={() => setSelectedNews(item)} className="group overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.025] text-left transition hover:-translate-y-1 hover:border-[#9d69ff]/45">
              <div className="aspect-[4/3] overflow-hidden"><ImageOrPlaceholder src={item.thumbnail} alt={item.title} className="transition duration-500 group-hover:scale-105" /></div>
              <div className="p-4"><time className="text-[10px] tracking-[.13em] text-[#d7b85b]">{item.date}</time><h3 className="mt-2 text-sm font-semibold leading-6 text-white/88">{item.title}</h3></div>
            </button>
          ))}
        </div>
      </section>

      <section id="join" className="section relative scroll-mt-6 bg-[#0c0a16]">
        <div className="ambient ambient-a" />
        <SectionTitle eyebrow="HOW TO JOIN" intro="VRChatイベントが初めての方も、3つのステップでご参加いただけます。">BarMisakiへの<em className="text-[#c8a4ff]">参加方法</em></SectionTitle>
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
          {[
            ['01', '公式Xを確認', '公式Xの案内を確認し、「BarMisaki_Bot」へVRChatでフレンド申請します。'],
            ['02', '抽選に応募', '公式Xで案内される抽選システムから応募します。受付開始までお待ちください。'],
            ['03', 'Request Invite', '当選した方は22:40〜22:50にBarMisaki_BotへRequest Inviteしてください。'],
          ].map(([step, title, text], index) => (
            <article key={step} className="glass-card relative p-7 sm:p-9">
              <span className="display text-5xl italic text-[#7b39fc]/65">{step}</span>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-white/55">{text}</p>
              {index === 0 && <a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="inline-link mt-7">公式Xを見る <ArrowUpRight size={15} /></a>}
              {index === 1 && <button disabled={!externalLinks.lotteryUrl} className="mt-7 rounded-lg border border-white/10 bg-white/[.045] px-5 py-3 text-sm text-white/38 disabled:cursor-not-allowed">現在受付準備中です</button>}
            </article>
          ))}
        </div>
        <div className="mx-auto mt-5 flex max-w-6xl items-center gap-5 rounded-2xl border border-[#d7b85b]/25 bg-[#d7b85b]/[.07] p-5 sm:p-7">
          <Sparkles className="shrink-0 text-[#efd878]" /><div><h3 className="font-semibold text-[#fff0b4]">当日リクイン枠もあります！</h3><p className="mt-1 text-sm leading-6 text-white/52">当日のご案内は公式Xをご確認ください。</p></div>
        </div>
      </section>

      <section id="recruit" className="section scroll-mt-6">
        <SectionTitle eyebrow="RECRUIT" intro="BarMisakiの夜を一緒につくる仲間を募集します。募集状況はそれぞれ個別に更新できます。">Join our <em className="text-[#c8a4ff]">team</em></SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {[['cast', 'CAST', 'キャスト募集', 'お客様との会話を楽しみながら、BarMisakiらしい時間を届けるキャストです。'], ['staff', 'STAFF', 'スタッフ募集', '受付や運営を通して、心地よいイベントづくりを支えるスタッフです。']].map(([key, en, title, text]) => {
            const state = recruitment[key as keyof typeof recruitment];
            return <article key={key} className="glass-card p-7 sm:p-10"><div className="flex items-center justify-between"><span className="display text-4xl">{en}</span><span className={`rounded-full px-3 py-1 text-xs ${state.enabled ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/[.06] text-white/38'}`}>{state.enabled ? '募集中' : '募集停止'}</span></div><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/52">{text}</p>{state.enabled && state.url ? <a href={state.url} className="primary-button mt-7 inline-flex">応募はこちら</a> : <button disabled className="mt-7 rounded-lg border border-white/10 px-5 py-3 text-sm text-white/32">現在は募集を行っておりません</button>}</article>;
          })}
        </div>
      </section>

      <section id="rule" className="section scroll-mt-6 bg-[#0c0a16]">
        <SectionTitle eyebrow="RULE" intro="皆様に安心してイベントを楽しんでいただくため、以下のルールをお守りください。">店舗<em className="text-[#c8a4ff]">ルール</em></SectionTitle>
        <div className="mx-auto max-w-4xl divide-y divide-white/[.07] rounded-[22px] border border-white/[.08] bg-white/[.025] px-5 sm:px-8">
          {rules.map((rule, index) => <div key={rule} className="flex items-center gap-4 py-5"><span className="display w-8 shrink-0 text-xl italic text-[#d7b85b]/75">0{index + 1}</span><AlertTriangle size={18} className="shrink-0 text-[#d7b85b]" strokeWidth={1.5} /><p className="text-sm text-white/72 sm:text-base">{rule}</p></div>)}
        </div>
      </section>

      <section id="group" className="section relative scroll-mt-6">
        <div className="ambient ambient-b" />
        <SectionTitle eyebrow="FOR GROUPS" intro="団体でのご来店をご希望の場合は、必要事項をご記入の上、BarMisaki公式Xからご相談ください。">団体様向け<em className="text-[#c8a4ff]">ご案内</em></SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          {[['01', '団体名', '活動名・グループ名'], ['02', '団体人数', '5〜10名'], ['03', '希望日程', '1か月前まで／第5希望まで']].map(([number, title, value]) => <div key={number} className="glass-card p-7"><span className="display text-3xl italic text-[#7b39fc]">{number}</span><p className="mt-8 text-sm text-white/40">{title}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>)}
        </div>
        <p className="mx-auto mt-7 max-w-xl text-center text-xs leading-6 text-white/40">※キャストのシフト状況によっては、お断りする場合がございます。</p>
        <div className="mt-7 text-center"><a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="primary-button inline-flex items-center gap-2">公式Xから相談する <ArrowUpRight size={17} /></a></div>
      </section>

      <footer className="border-t border-white/[.07] bg-[#06050b] px-6 py-10 sm:px-12">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-8 md:flex-row">
          <img src="/barmisaki-logo.png" alt="BarMisaki" className="h-14 w-auto" />
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3">{navItems.map(([label, href]) => <a key={label} href={href} className="ui text-[11px] tracking-[.1em] text-white/45 hover:text-white">{label}</a>)}<a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="ui text-[11px] tracking-[.1em] text-white/45 hover:text-white">公式X</a></nav>
          <p className="text-xs text-white/28">Copyright © BarMisaki</p>
        </div>
      </footer>

      {selectedCast && <Modal onClose={() => setSelectedCast(null)}><div className="grid overflow-hidden md:grid-cols-[.9fr_1.1fr]"><div className="min-h-[320px]"><ImageOrPlaceholder src={selectedCast.image} alt={selectedCast.name} /></div><div className="p-7 sm:p-10"><p className="text-xs tracking-[.2em] text-[#d7b85b]">{selectedCast.generation} {selectedCast.group} / {selectedCast.role}</p><h2 className="display mt-4 text-5xl">{selectedCast.name}</h2><div className="mt-8 space-y-5 text-sm"><div><p className="text-white/35">好きなもの</p><p className="mt-1 text-white/78">{selectedCast.favorite}</p></div><div><p className="text-white/35">ひとこと</p><p className="mt-1 leading-7 text-white/78">{selectedCast.message}</p></div></div>{selectedCast.xUrl && <a href={selectedCast.xUrl} target="_blank" rel="noreferrer" className="primary-button mt-8 inline-flex items-center gap-2">Xを見る <ArrowUpRight size={16} /></a>}</div></div></Modal>}
      {selectedNews && <Modal onClose={() => setSelectedNews(null)}><div className="aspect-[16/7] overflow-hidden"><ImageOrPlaceholder src={selectedNews.thumbnail} alt={selectedNews.title} /></div><article className="p-7 sm:p-10"><time className="text-xs tracking-[.14em] text-[#d7b85b]">{selectedNews.date}</time><h2 className="display mt-3 text-4xl sm:text-5xl">{selectedNews.title}</h2><p className="mt-6 leading-8 text-white/62">{selectedNews.content}</p></article></Modal>}
      {selectedGallery && <Modal onClose={() => setSelectedGallery(null)}><div className="aspect-[16/10] overflow-hidden"><ImageOrPlaceholder src={selectedGallery.image} alt={selectedGallery.alt} /></div></Modal>}
    </main>
  );
}

function CastCard({ cast, onClick, wide = false }: { cast: Cast; onClick: () => void; wide?: boolean }) {
  return (
    <button onClick={onClick} className={`group relative shrink-0 overflow-hidden rounded-[20px] border border-white/[.08] bg-white/[.025] text-left transition duration-300 hover:-translate-y-1 hover:border-[#9d69ff]/45 ${wide ? 'w-[74vw] max-w-[300px] snap-center sm:w-[290px]' : ''}`}>
      <div className="relative aspect-[4/5] overflow-hidden"><ImageOrPlaceholder src={cast.image} alt={cast.name} className="transition duration-700 group-hover:scale-[1.035]" />{cast.isPickup && <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#7b39fc] px-2.5 py-1 text-[9px] font-bold tracking-[.1em]"><Star size={10} fill="currentColor" /> PICK UP</span>}</div>
      <div className="flex items-end justify-between p-4 sm:p-5"><div><p className="text-[10px] tracking-[.16em] text-[#d7b85b]">{cast.role}</p><h3 className="display mt-1 text-2xl">{cast.name}</h3><p className="mt-1 text-[11px] text-white/40">{cast.generation} {cast.group}</p></div><ArrowRight size={17} className="mb-1 text-white/35 transition group-hover:translate-x-1 group-hover:text-white" /></div>
    </button>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-white/10 bg-[#100d1d] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-black/45 backdrop-blur" aria-label="閉じる"><X size={19} /></button>{children}
      </div>
    </div>
  );
}
