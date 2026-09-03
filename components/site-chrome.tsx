'use client';

import { ArrowRight, ArrowUpRight, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { externalLinks } from '@/app/data';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    <Dialog open={open} onOpenChange={setOpen}>
      <header className="site-header">
        <a href="/" className="site-brand" aria-label="BarMisaki ホーム">
          <img src="/barmisaki-logo.png" alt="BarMisaki" width="96" height="64" />
        </a>
        <div className="site-header-actions">
          <SocialLinks />
          <DialogTrigger className="site-menu-toggle" aria-label="メニューを開く">Menu</DialogTrigger>
        </div>
      </header>
      <DialogContent className="site-menu" showCloseButton={false}>
        <DialogTitle className="sr-only">メインメニュー</DialogTitle>
        <div className="site-menu-top">
          <a href="/" className="site-brand" aria-label="BarMisaki ホーム" onClick={() => setOpen(false)}>
            <img src="/barmisaki-logo.png" alt="BarMisaki" width="96" height="64" />
          </a>
          <div className="site-header-actions">
            <SocialLinks />
            <DialogClose className="site-menu-toggle" aria-label="メニューを閉じる">Close</DialogClose>
          </div>
        </div>
        <nav className="site-menu-links" aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
              <span>{item.label}</span><span className="site-menu-arrow"><ArrowRight size={18} /></span>
            </a>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}

function SocialLinks() {
  return <div className="site-social-links">
    <a href={externalLinks.officialX} target="_blank" rel="noreferrer" aria-label="BarMisaki 公式X" title="公式X">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L1.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>
    </a>
    <a href={externalLinks.vrcGroup} target="_blank" rel="noreferrer" aria-label="BarMisaki VRChatグループ" title="VRChatグループ"><Users size={18} /></a>
  </div>;
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
