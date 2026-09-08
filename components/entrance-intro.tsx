'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './entrance-intro.css';
const EMPTY='/entrance/crystal-empty.webp', FULL='/entrance/crystal-full.webp';
export function EntranceIntro() {
  const router=useRouter();
  const [elapsed,setElapsed]=useState(0);
  useEffect(()=>{
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const states=new Map<HTMLElement,boolean>();
    const lock=()=>Array.from(document.body.children).forEach(el=>{
      if(el instanceof HTMLElement && !el.classList.contains('entrance-intro') && !['SCRIPT','LINK','STYLE'].includes(el.tagName) && !states.has(el)){states.set(el,el.inert);el.inert=true;}
    });
    lock();
    const observer=new MutationObserver(lock);observer.observe(document.body,{childList:true});
    if(window.location.pathname!=='/')router.replace('/',{scroll:false});
    let frame=0,time=0,last=0,cancelled=false,started=false;
    const restore=()=>{observer.disconnect();document.body.style.overflow=overflow;states.forEach((value,el)=>{el.inert=value;});};
    const tick=(now:number)=>{if(last&&!document.hidden)time+=Math.min(now-last,100);last=now;setElapsed(time);if(time<4000)frame=requestAnimationFrame(tick);else restore();};
    const start=()=>{if(cancelled||started)return;started=true;window.clearTimeout(timeout);frame=requestAnimationFrame(tick);};
    const timeout=window.setTimeout(start,1800);
    void Promise.all([EMPTY,FULL].map(src=>{const img=new Image();img.src=src;return img.decode().catch(()=>{});})).then(start);
    return()=>{cancelled=true;window.clearTimeout(timeout);cancelAnimationFrame(frame);restore();};
  },[router]);
  if(elapsed>=4000)return null;
  // One clock for the conical liquid volume, percentage, and progress bar.
  const p=Math.min(1,Math.max(0,(elapsed-300)/2700));
  const y=526-228*Math.cbrt(p), wave=Math.sin(elapsed/160)*2;
  const stream=`M790 -20 C803 40 758 90 772 145 S${760+wave} 220 768 275 Q${773+wave} ${(275+y)/2} 768 ${y}`;
  return <div className={`entrance-intro ${p===1?'is-full':''} ${elapsed>=3500?'is-leaving':''}`} aria-label="Bar Misakiへの入店演出">
    <link rel="preload" as="image" href={EMPTY}/><link rel="preload" as="image" href={FULL}/>
    <div className="entrance-ambient"/>
    <div className="entrance-stage">
      <svg className="entrance-scene" viewBox="0 0 1536 1024" aria-hidden="true">
        <defs>
          <clipPath id="entry-fill"><path d={`M0 ${y} Q384 ${y+wave} 768 ${y} T1536 ${y} V1024 H0Z`}/></clipPath>
          <clipPath id="entry-bowl"><path d="M542 280 Q768 298 994 280 L804 518 Q768 545 732 518Z"/></clipPath>
          <linearGradient id="entry-stream"><stop stopColor="#f7bddb" stopOpacity=".2"/><stop offset=".42" stopColor="#f0a1d1"/><stop offset=".58" stopColor="#fff0f6"/><stop offset="1" stopColor="#c554be" stopOpacity=".4"/></linearGradient>
          <radialGradient id="entry-glow"><stop stopColor="#ef8bbc" stopOpacity=".3"/><stop offset="1" stopColor="#e581c0" stopOpacity="0"/></radialGradient>
        </defs>
        <image href={EMPTY} width="1536" height="1024"/>
        <g clipPath="url(#entry-fill)" opacity={p>0?1:0}><image href={FULL} width="1536" height="1024"/></g>
        <ellipse cx="768" cy="430" rx="320" ry="260" fill="url(#entry-glow)" opacity={p*.4}/>
        {p>0&&<g clipPath="url(#entry-bowl)">
          <ellipse cx="768" cy={y+2} rx={Math.max(0,(526-y)*.88)} ry="5" fill="#ef9fcf" fillOpacity=".12" stroke="#ffc8e2" strokeWidth="1.5" opacity={p===1?.2:.75}/>
          {[0,1,2,3,4,5,6,7].map(i=><circle key={i} cx={650+i*32} cy={y+15+(i*29)%105} r={i%3===0?1.8:1} fill="#ffe2f3" className="entrance-spark" style={{animationDelay:`${i*-.17}s`}}/>)}
        </g>}
        {elapsed>=300&&p<1&&<g fill="none" strokeLinecap="round">
          <path d={stream} stroke="#e775c8" strokeWidth="17" opacity=".09"/><path d={stream} stroke="url(#entry-stream)" strokeWidth="7"/><path d={stream} stroke="#fff1f8" strokeWidth="1.4" className="entrance-stream-core"/>
          {[0,1,2,3].map(i=><ellipse key={i} cx={748+(i%2)*38} cy={40+(elapsed*.19+i*57)%210} rx="2.4" ry="4" fill="#f4aed8" opacity=".7"/>)}
          <ellipse cx="768" cy={y} rx="15" ry="4" stroke="#ffd2eb" opacity=".8"/>
        </g>}
      </svg>
      <header className="entrance-brand"><p>VRCHAT BAR</p><div><i>Bar</i> Misaki<span aria-hidden="true">✿</span></div><p>海咲の夜へ、ようこそ。</p></header>
      <div className="entrance-status">
        <div className="entrance-progress" role="progressbar" aria-label="カクテルの完成度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(p*100)}><p>Pouring... <span>{Math.floor(p*100)}%</span></p><div className="entrance-track"><div style={{transform:`scaleX(${p})`}}/></div></div>
        <p className="entrance-welcome" aria-live="polite">{p===1?'Welcome to Bar Misaki':'\u00a0'}</p>
      </div>
    </div>
    <noscript><style>{'.entrance-intro{display:none!important}'}</style></noscript>
  </div>;
}
