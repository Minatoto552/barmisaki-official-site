import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { rules } from '../data';
import { PageHero } from '@/components/site-elements';

export const metadata: Metadata = { title: 'RULE | BarMisaki', description: '皆さまに安心して楽しんでいただくためのBarMisaki店舗ルールです。' };
export default function RulePage() { return <main><PageHero eyebrow="RULE" title={<>店舗<em className="text-[#c8a4ff]">ルール</em></>} intro="皆様に安心してイベントを楽しんでいただくため、以下のルールをお守りください。" /><section className="content-section bg-[#0c0a16]"><div className="mx-auto max-w-4xl"><h2 className="mb-5 text-sm font-semibold tracking-[.2em] text-[#d7b85b]">禁止事項</h2><div className="divide-y divide-white/[.07] rounded-[22px] border border-white/[.08] bg-white/[.025] px-5 sm:px-8">{rules.map((rule, index) => <div key={rule} className="flex items-center gap-4 py-5"><span className="display w-8 shrink-0 text-xl italic text-[#d7b85b]/75">0{index + 1}</span><AlertTriangle size={18} className="shrink-0 text-[#d7b85b]" strokeWidth={1.5} /><p className="text-sm text-white/72 sm:text-base">{rule}</p></div>)}</div></div></section></main>; }
