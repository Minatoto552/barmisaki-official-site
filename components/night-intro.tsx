'use client';
import { useEffect, useRef, useState } from 'react';
import { loadSiteData } from '@/app/site-data';
import { misakiCollection } from '@/app/misaki-collection';
import './night-intro.css';

// The page always starts behind a brand-colored cover, so the content is never seen before a loading screen.
//  - Site entry (first page of the visit): the cards intro always plays in full, then the curtain opens.
//  - Any later page: the cover fades out when ready; if loading is slow, a running cat is shown meanwhile.
type Phase = 'cover' | 'show' | 'gather' | 'leave' | 'cat' | 'cat-out' | 'fade' | 'done';

const ENTRY_KEY = 'barmisaki-entered';
const CAT_SHEET = '/loading/cat-run-sheet.webp';

const LATE_MS = 800;      // later pages: show the cat only when loading takes longer than this
const MIN_ENTRY_MS = 2600; // the entry sequence always plays at least this long
const MIN_CAT_MS = 1400;  // once the cat appears, keep it long enough not to flash
const CAP_MS = 5000;      // never keep the visitor waiting longer than this
const GATHER_MS = 900;
const LEAVE_MS = 800;
const FADE_MS = 450;

const faces = misakiCollection.slice(0, 9);
const middle = (faces.length - 1) / 2;

// Has this browser tab already entered the site? (Without storage: "came from another page of the site".)
function hasEntered(): boolean {
  try {
    return Boolean(window.sessionStorage.getItem(ENTRY_KEY));
  } catch {
    return document.referrer.startsWith(window.location.origin);
  }
}

// The first screen of a visit is always the home. A link straight to a news article is left alone,
// so shared article links keep working.
function shouldStartAtHome(): boolean {
  const path = window.location.pathname;
  return !hasEntered() && path !== '/' && path !== '/index.html' && !path.startsWith('/news/detail');
}

// True once per browser tab visit. Without storage, fall back to "arrived from outside the site".
function isEntry(): boolean {
  try {
    if (window.sessionStorage.getItem(ENTRY_KEY)) return false;
    window.sessionStorage.setItem(ENTRY_KEY, '1');
    return true;
  } catch {
    return !document.referrer.startsWith(window.location.origin);
  }
}

function Backdrop({ caption = 'NOW LOADING' }: { caption?: string }) {
  return <>
    <span className="ni-moon" aria-hidden="true" />
    <p className="ni-caption" aria-hidden="true"><small className="ni-loading">{caption}</small></p>
  </>;
}

export function NightIntro() {
  // The first render (server and client alike) is the cover, so the content behind it never shows.
  const [phase, setPhase] = useState<Phase>('cover');
  const skip = useRef<() => void>(() => undefined);
  const entry = useRef<boolean | null>(null);

  useEffect(() => {
    if (entry.current === null) {
      // First visit landing on another page: go to the home first. The entry flag is not set yet,
      // so the loading sequence plays on the home itself (the cover hides the page until then).
      if (shouldStartAtHome()) { window.location.replace('/'); return; }
      entry.current = isEntry();
    }
    const isFirstVisit = entry.current;

    let ready = false;
    let shownAt = 0;
    let finished = false;
    const timers: number[] = [];
    const later = (callback: () => void, ms: number) => { timers.push(window.setTimeout(callback, ms)); };

    // Cards intro: cards gather into the logo, then the curtain opens.
    const finishEntry = () => {
      if (finished) return;
      finished = true;
      setPhase('gather');
      later(() => setPhase('leave'), GATHER_MS);
      later(() => setPhase('done'), GATHER_MS + LEAVE_MS);
    };
    // Cat screen (or a bare cover): fade away.
    const finishCat = () => {
      if (finished) return;
      finished = true;
      setPhase(shownAt ? 'cat-out' : 'fade');
      later(() => setPhase('done'), FADE_MS);
    };

    const waitFor = (min: number, finish: () => void) => {
      ready = true;
      if (shownAt) later(finish, Math.max(0, min - (Date.now() - shownAt)));
      else finish();
    };

    const loaded = Promise.all([loadSiteData().catch(() => null), document.fonts?.ready ?? Promise.resolve()]);

    if (isFirstVisit) {
      skip.current = finishEntry;
      shownAt = Date.now();
      setPhase('show');
      later(finishEntry, CAP_MS);
      loaded.then(() => waitFor(MIN_ENTRY_MS, finishEntry));
    } else {
      skip.current = finishCat;
      new Image().src = CAT_SHEET;
      const lateTimer = window.setTimeout(() => {
        shownAt = Date.now();
        setPhase('cat');
        later(finishCat, CAP_MS);
      }, LATE_MS);
      timers.push(lateTimer);
      loaded.then(() => {
        if (!shownAt) window.clearTimeout(lateTimer);
        waitFor(MIN_CAT_MS, finishCat);
      });
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  // While the intro runs, the page underneath is paused (see night-intro.css), so its entrance
  // animations start once, after the curtain opens, instead of playing hidden behind the cover.
  useEffect(() => {
    if (phase === 'done') {
      document.documentElement.removeAttribute('data-intro');
      return;
    }
    document.documentElement.setAttribute('data-intro', '1');
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [phase]);

  if (phase === 'done') return null;

  if (phase === 'cover' || phase === 'fade') {
    // Background only: no moon or caption here, so the sequence below starts from a clean frame
    // instead of showing a second, slightly different loading screen.
    return <div className={`ni is-${phase}`} role="status" aria-label="ページを準備しています" />;
  }

  if (phase === 'cat' || phase === 'cat-out') {
    return <div className={`ni is-${phase}`} role="status" aria-label="ページを準備しています">
      <Backdrop />
      <span className="ni-ground" aria-hidden="true" />
      <span className="ni-cat-run" aria-hidden="true"><span className="ni-cat" /></span>
    </div>;
  }

  return <div className={`ni is-${phase}`} role="status" aria-label="ページを準備しています">
    <span className="ni-half is-top" aria-hidden="true" />
    <span className="ni-half is-bottom" aria-hidden="true" />
    <div className="ni-stage" aria-hidden="true">
      <span className="ni-moon" />
      {[0, 1, 2, 3, 4].map((n) => <i className="ni-lamp" key={n} style={{ '--n': n } as React.CSSProperties} />)}
      <div className="ni-cards">
        {faces.map((face, n) => {
          const k = n - middle;
          return <span className="ni-card" key={face.src} style={{ '--n': n, '--k': k, '--a': Math.abs(k) } as React.CSSProperties}>
            <span className="ni-in"><span className="ni-flip">
              <span className="ni-back" />
              <span className="ni-face"><img src={face.thumb} alt="" /></span>
            </span></span>
          </span>;
        })}
        <span className="ni-mark"><img src="/brand/barmisaki-cat-logo.png" alt="" /></span>
      </div>
      <p className="ni-caption">
        <small className="ni-loading">NOW LOADING</small>
        <em className="ni-welcome">Welcome to the night</em>
      </p>
    </div>
    <button type="button" className="ni-skip" onClick={() => skip.current()}>SKIP ›</button>
  </div>;
}
