'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { externalLinks } from '@/app/data';

export const navigation = [
  { label: 'HOME', href: '/' },
  { label: 'Misakiについて', href: '/misaki' },
  { label: 'CAST', href: '/cast' },
  { label: 'NEWS', href: '/news' },
  { label: 'HOW TO JOIN', href: '/how-to-join' },
  { label: 'RECRUIT', href: '/recruit' },
  { label: 'RULE', href: '/rule' },
  { label: 'GROUP', href: '/group' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#080710]/72 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 xl:px-[72px]">
        <span aria-hidden="true" className="block h-11 w-[72px] shrink-0 sm:h-12" />
        <nav className="hidden items-stretch self-stretch xl:flex" aria-label="メインナビゲーション">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return <a key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`ui relative flex items-center px-3.5 text-[11px] font-semibold tracking-[.09em] transition ${active ? 'text-[#c9a9ff]' : 'text-white/65 hover:text-white'}`}>{item.label}{active && <span className="absolute inset-x-3 bottom-0 h-px bg-[#9d69ff] shadow-[0_0_12px_#9d69ff]" />}</a>;
          })}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="ui rounded-lg border border-white/15 bg-white/[.05] px-4 py-2.5 text-xs font-semibold transition hover:bg-white/10">公式X</a>
          <a href={externalLinks.vrcGroup} target="_blank" rel="noreferrer" className="ui rounded-lg border border-white/15 bg-white/[.05] px-4 py-2.5 text-xs font-semibold transition hover:bg-white/10">グループ</a>
          <a href="/how-to-join" className="ui rounded-lg bg-[#7b39fc] px-4 py-2.5 text-xs font-semibold shadow-[0_8px_25px_rgba(123,57,252,.32)] transition hover:bg-[#8b51ff]">参加方法</a>
        </div>
        <button onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-xl border border-white/15 bg-white/[.04] xl:hidden" aria-label="メニューを開く"><Menu /></button>
      </div>
      {open && <div className="fixed inset-0 z-[90] flex min-h-dvh flex-col bg-[#06050b] p-5 xl:hidden">
        <div className="flex items-center justify-end"><button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-xl border border-white/15" aria-label="メニューを閉じる"><X /></button></div>
        <nav className="my-auto flex flex-col items-center gap-5">{navigation.map((item) => { const active = isActive(pathname, item.href); return <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={`display text-3xl ${active ? 'text-[#c9a9ff]' : 'text-white'}`}>{item.label}</a>; })}<a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="mt-3 rounded-xl bg-[#7b39fc] px-8 py-4 font-semibold">公式Xを見る</a><a href={externalLinks.vrcGroup} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-8 py-4 font-semibold">グループ</a></nav>
      </div>}
    </header>
  );
}

export function SiteFooter() {
  const partnerLinks = [
    { label: 'VISION TOKYO X', href: externalLinks.visionTokyoX },
    { label: 'VISION TOKYO BOOTH', href: externalLinks.visionTokyoBooth },
    { label: '海咲 販売ページ', href: externalLinks.misakiBooth },
  ];
  const hashtags = [
    { label: '#VRC_BarMisaki', href: externalLinks.hashtagBarMisaki },
    { label: '#海咲3D', href: externalLinks.hashtagMisaki3D },
    { label: '#VISIONTOKYO', href: externalLinks.hashtagVisionTokyo },
  ];

  return <footer className="border-t border-white/[.07] bg-[#06050b] px-6 py-10">
    <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-8 md:flex-row"><a href="/"><img src="/barmisaki-logo.png" alt="BarMisaki" width="84" height="56" className="h-14 w-auto" /></a><nav className="flex flex-wrap justify-center gap-x-5 gap-y-3">{navigation.map((item) => <a key={item.href} href={item.href} className="ui text-[10px] tracking-[.1em] text-white/42 hover:text-white">{item.label}</a>)}<a href={externalLinks.officialX} target="_blank" rel="noreferrer" className="ui text-[10px] tracking-[.1em] text-white/42 hover:text-white">公式X</a><a href={externalLinks.vrcGroup} target="_blank" rel="noreferrer" className="ui text-[10px] tracking-[.1em] text-white/42 hover:text-white">グループ</a></nav><p className="text-xs text-white/28">Copyright © BarMisaki</p></div>
    <div className="mx-auto mt-9 grid max-w-[1240px] gap-5 border-t border-white/[.07] pt-7 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="ui text-[10px] font-bold tracking-[.28em] text-[#d7b85b]">OFFICIAL AVATAR PARTNER</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">BarMisakiは、海咲アバターを制作された VISION TOKYO さんより公認をいただいて運営しています。</p>
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        <nav className="flex flex-wrap gap-2" aria-label="VISION TOKYO 関連リンク">
          {partnerLinks.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="ui inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[.08em] text-white/52 transition hover:border-[#d7b85b]/60 hover:text-white">{item.label}<ArrowUpRight size={12} /></a>)}
        </nav>
        <nav className="flex flex-wrap gap-x-3 gap-y-2 text-xs" aria-label="関連ハッシュタグ">
          {hashtags.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-[#c9a9ff]/68 transition hover:text-[#d7b85b]">{item.label}</a>)}
        </nav>
      </div>
    </div>
  </footer>;
}
