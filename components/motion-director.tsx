'use client';
import { useEffect, useRef, useState } from 'react';
import './motion.css';

// Site-wide motion layer. It decorates existing elements instead of changing every page:
//  - reveal: blocks fade up (and big headings wipe in) as they scroll into view, staggered per group
//  - tilt: cards lean toward the pointer
//  - a reading-progress line, a "TOP" button, and small hearts where you tap
// Everything waits for the loading screen to finish and stays still with reduced motion.

const REVEAL = [
  '.sp-section-head', '.sp-card', '.sp-list li', '.sp-note', '.sp-actions', '.sp-pair-copy', '.sp-pair .sp-media',
  '.mk-two > *', '.mk-gallery-head', '.mk-thanks > *', '.ms-show',
  '.nc-info', '.nc-visual', '.nc-selector-head', '.nc-directory-tools', '.nc-card', '.nc-next',
  '.nh-fact', '.nh-guide-steps a', '.nh-news-list li', '.nh-news-feature', '.nh-gallery-grid .nh-media',
].join(',');
const WIPE = ['.sp-section-head h2', '.nh-heading h2', '.mk-gallery-head h2', '.mk-two h2', '.mk-thanks h2', '.nc-selector-head h2', '.nh-collection-head h2', '.nh-counter h2', '.nh-pickup h2'].join(',');
const TILT = ['.sp-card', '.nh-fact', '.nh-guide-steps a', '.nc-card'].join(',');

export function MotionDirector() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const hearts = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Reveal and tilt markers
    let observer: IntersectionObserver | null = null;
    // A wiped heading is clipped to nothing at first, which the browser treats as "not visible",
    // so headings are watched through their parent block instead of themselves.
    const watchers = new Map<Element, Set<HTMLElement>>();
    const watch = (element: HTMLElement) => {
      const target = element.dataset.rv === 'wipe' ? (element.parentElement ?? element) : element;
      const group = watchers.get(target) ?? new Set<HTMLElement>();
      group.add(element);
      watchers.set(target, group);
      observer?.observe(target);
    };
    const reveal = (element: HTMLElement) => {
      element.dataset.rvIn = '1';
      // Once played, hand the element back to its own styles (hover transitions etc.).
      const delay = parseFloat(element.style.getPropertyValue('--rv-d')) || 0;
      window.setTimeout(() => {
        delete element.dataset.rv;
        delete element.dataset.rvIn;
        element.dataset.rvDone = '1';
        element.style.removeProperty('--rv-d');
      }, delay + 1600);
    };

    const mark = () => {
      document.querySelectorAll<HTMLElement>(`${REVEAL},${WIPE}`).forEach((element) => {
        if (element.dataset.rv || element.dataset.rvDone || element.closest('.ni')) return;
        const isWipe = element.matches(WIPE);
        const parent = element.parentElement;
        const group = parent ? Array.from(parent.children).filter((child) => child.matches(isWipe ? WIPE : REVEAL)) : [];
        element.style.setProperty('--rv-d', `${Math.min(Math.max(group.indexOf(element), 0), 6) * 80}ms`);
        element.dataset.rv = isWipe ? 'wipe' : 'up';
        watch(element);
      });
      document.querySelectorAll<HTMLElement>(TILT).forEach((element) => { element.dataset.tilt = '1'; });
    };

    const start = () => {
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = watchers.get(entry.target);
        watchers.delete(entry.target);
        observer?.unobserve(entry.target);
        group?.forEach(reveal);
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      watchers.forEach((_, target) => observer?.observe(target));
      mark();
    };

    // Mark right away (hidden under the loading screen), start revealing once the intro is gone.
    mark();
    let started = false;
    const tryStart = () => { if (!started && !document.documentElement.hasAttribute('data-intro')) { started = true; start(); } };
    const introWatch = new MutationObserver(tryStart);
    introWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] });
    tryStart();

    // Fast scrolling or jumping to an anchor can skip past a block between observer callbacks:
    // anything already above the bottom of the screen is revealed on the next frame.
    let catchFrame = 0;
    const catchUp = () => {
      catchFrame = 0;
      if (!started) return;
      watchers.forEach((group, target) => {
        if (target.getBoundingClientRect().top > window.innerHeight * 0.94) return;
        watchers.delete(target);
        observer?.unobserve(target);
        group.forEach(reveal);
      });
    };
    const onScrollCatch = () => { if (!catchFrame) catchFrame = window.requestAnimationFrame(catchUp); };
    window.addEventListener('scroll', onScrollCatch, { passive: true });

    // Content that arrives later (Firebase data) gets marked too.
    let pending = 0;
    const domWatch = new MutationObserver(() => {
      if (pending) return;
      pending = window.requestAnimationFrame(() => { pending = 0; mark(); });
    });
    domWatch.observe(document.body, { childList: true, subtree: true });

    // Tilt toward the pointer
    let tilted: HTMLElement | null = null;
    const release = () => { if (tilted) { tilted.classList.remove('is-tilting'); tilted.style.removeProperty('--tx'); tilted.style.removeProperty('--ty'); tilted = null; } };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (card !== tilted) release();
      if (!card) return;
      tilted = card;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.setProperty('--tx', `${(x * 10).toFixed(2)}deg`);
      card.style.setProperty('--ty', `${(-y * 10).toFixed(2)}deg`);
      card.classList.add('is-tilting');
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', release);

    // Small hearts where you tap or click
    let lastHeart = 0;
    const onTap = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!hearts.current || target?.closest('input, textarea, select, iframe, .ni') || event.button > 0) return;
      const now = performance.now();
      if (now - lastHeart < 120) return;
      lastHeart = now;
      for (let i = 0; i < 3; i += 1) {
        const heart = document.createElement('i');
        heart.className = 'mo-heart';
        heart.textContent = '♥';
        heart.style.left = `${event.clientX}px`;
        heart.style.top = `${event.clientY}px`;
        heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 70}px`);
        heart.style.setProperty('--dr', `${(Math.random() - 0.5) * 60}deg`);
        heart.style.animationDelay = `${i * 60}ms`;
        heart.addEventListener('animationend', () => heart.remove());
        hearts.current.appendChild(heart);
      }
    };
    document.addEventListener('pointerdown', onTap, { passive: true });

    return () => {
      observer?.disconnect();
      introWatch.disconnect();
      domWatch.disconnect();
      if (pending) window.cancelAnimationFrame(pending);
      if (catchFrame) window.cancelAnimationFrame(catchFrame);
      window.removeEventListener('scroll', onScrollCatch);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', release);
      document.removeEventListener('pointerdown', onTap);
    };
  }, []);

  // Reading progress and the TOP button
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return <>
    <div className="mo-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    <button type="button" className={`mo-top${showTop ? ' is-shown' : ''}`} onClick={toTop} aria-label="ページの先頭へ戻る" tabIndex={showTop ? 0 : -1}>
      <span aria-hidden="true">♥</span>TOP
    </button>
    <div className="mo-hearts" ref={hearts} aria-hidden="true" />
  </>;
}
