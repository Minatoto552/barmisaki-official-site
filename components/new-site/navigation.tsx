'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import './navigation.css';

import { siteNavigation } from './nav-items';

export { siteNavigation };

export function SiteNavigation() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 36);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className={`bm-global-header${compact ? ' is-compact' : ''}`}>
    <a className="bm-global-brand" href="/" aria-label="BarMisaki ホーム"><img className="bm-global-logo" src="/brand/barmisaki-cat-logo.png" width="42" height="42" alt="" />BAR MISAKI</a>
    <nav className="bm-global-nav" aria-label="メインナビゲーション">
      {siteNavigation.map(item => <a key={item.href} href={item.href} title={item.title} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</a>)}
    </nav>
    <a className="bm-global-x" href="https://x.com/BarMisaki_VRC" target="_blank" rel="noreferrer" aria-label="BarMisaki 公式X">𝕏</a>
    <button className="bm-global-menu" type="button" aria-expanded={open} aria-controls="bm-mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}<span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    {open && <nav className="bm-global-mobile-nav" id="bm-mobile-navigation" aria-label="スマートフォンのナビゲーション">
      {siteNavigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? 'page' : undefined}><small>{String(index + 1).padStart(2, '0')}</small><span>{item.label}<em>{item.title}</em></span><b aria-hidden="true">↗</b></a>)}
    </nav>}
  </header>;
}
