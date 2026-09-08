'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './entrance-intro.css';

export function EntranceIntro() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const elements = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && !el.classList.contains('entrance-intro') && el.tagName !== 'SCRIPT');
    const inert = elements.map(el => el.inert);
    elements.forEach(el => { el.inert = true; });
    if (window.location.pathname !== '/') router.replace('/', { scroll: false });
    let frame = 0, time = 0, last = performance.now();
    const restore = () => { document.body.style.overflow = overflow; elements.forEach((el,i) => { el.inert = inert[i]; }); };
    const tick = (now: number) => {
      if (!document.hidden) time += Math.min(now-last,100);
      last = now;
      setElapsed(time);
      if (time < 4000) frame = requestAnimationFrame(tick);
      else restore();
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); restore(); };
  }, [router]);
  if (elapsed >= 4000) return null;
  // One clock for all three indicators. Cone volume increases with height cubed.
  const p = Math.min(1, Math.max(0, (elapsed-300)/2700));
  const y = 260-140*Math.cbrt(p);
  return <div className={`entrance-intro ${p===1?'is-full':''} ${elapsed>=3500?'is-leaving':''}`} aria-label="Bar Misakiへの入店演出">
    <img className="entrance-background" src="/atmosphere/interior-07-display.webp" alt="" fetchPriority="high"/>
    <div className="entrance-shade"/>
    <div className="entrance-composition">
      <header className="entrance-brand"><p>VRCHAT BAR</p><div>BAR MISAKI <span>✿</span></div><p>海咲の夜へ、ようこそ。</p></header>
      <svg className="entrance-glass" viewBox="0 0 360 440" aria-hidden="true">
        <defs>
          <linearGradient id="entry-liquid" x2="1" y2="1"><stop stopColor="#ffb9d7" stopOpacity=".85"/><stop offset=".5" stopColor="#d35c9f" stopOpacity=".65"/><stop offset="1" stopColor="#8756df" stopOpacity=".9"/></linearGradient>
          <linearGradient id="entry-crystal"><stop stopColor="#e3b9d7"/><stop offset=".28" stopColor="#fff" stopOpacity=".15"/><stop offset=".54" stopColor="#fff1da"/><stop offset=".76" stopColor="#fff" stopOpacity=".2"/><stop offset="1" stopColor="#f3a8d9"/></linearGradient>
          <clipPath id="entry-bowl"><path d="M42 104 Q180 124 318 104 L188 264 Q180 272 172 264Z"/></clipPath>
        </defs>
        <path d="M202 -12 H233 L200 26 L184 30 L178 22Z" fill="url(#entry-crystal)" stroke="#c9a96e"/>
        <ellipse cx="183" cy="26" rx="8" ry="3" fill="#2a182d" stroke="#ecc6c9"/>
        <g clipPath="url(#entry-bowl)">
          <path d="M42 104 H318 L180 274Z" fill="#bca0ed" opacity=".06"/>
          {p>0 && <g>
            <path d={`M20 ${y} Q100 ${y-4} 180 ${y} T340 ${y} V280 H20Z`} fill="url(#entry-liquid)"/>
            <ellipse className="entrance-wave" cx="180" cy={y} rx={(260-y)*.88} ry="4" fill="#ffbfdc" fillOpacity=".5" stroke="#ffe3eb" strokeOpacity=".7"/>
            {[0,1,2,3,4,5].map(i=><circle key={i} className="entrance-bubble" cx={145+i*13} cy={246-i*15} r={1+i%2} fill="#ffe8f4" style={{animationDelay:`${i*-.23}s`}}/>)}
            <text x="164" y={Math.max(y+28,208)} fontSize="24" fill="#ffd0e1">✿</text><text x="198" y={Math.max(y+45,226)} fontSize="13" fill="#ffc5de">✿</text>
          </g>}
        </g>
        {elapsed>=300 && p<1 && <g className="entrance-stream" fill="none" strokeLinecap="round"><path d={`M183 30 C174 60 188 80 180 104 S184 ${y-15} 180 ${y}`} stroke="#d674cb" strokeWidth="7" opacity=".35"/><path d={`M183 30 C174 60 188 80 180 104 S184 ${y-15} 180 ${y}`} stroke="#ffd0e5" strokeWidth="2.5"/><circle cx="192" cy="81" r="2" fill="#ffc0e4"/></g>}
        <g fill="none" stroke="url(#entry-crystal)" strokeWidth="2"><path d="M40 104 L171 264 Q180 275 189 264 L320 104"/><ellipse cx="180" cy="104" rx="140" ry="12"/><path d="M176 272 V362 Q176 386 110 402 Q180 420 250 402 Q184 386 184 362 V272"/><ellipse cx="180" cy="404" rx="72" ry="10"/><path d="M58 119 L166 247 M295 129 L207 239" strokeWidth="3" opacity=".45"/></g>
        <ellipse cx="180" cy="422" rx="92" ry="7" fill="#ed92d0" opacity={.06+p*.12}/>
      </svg>
      <div className="entrance-progress" role="progressbar" aria-label="カクテルの完成度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(p*100)}><p>Pouring... <span>{Math.floor(p*100)}%</span></p><div className="entrance-track"><div style={{transform:`scaleX(${p})`}}/></div></div>
      <p className="entrance-welcome" aria-live="polite">{p===1?'Welcome to Bar Misaki':'\u00a0'}</p>
    </div>
    <noscript><style>{`.entrance-intro{display:none!important}`}</style></noscript>
  </div>;
}
