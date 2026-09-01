import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getManagedData } from '../managed-data';
import { ImageOrPlaceholder, PageHero } from '@/components/site-elements';

export const metadata: Metadata = { title: 'NEWS | BarMisaki', description: 'BarMisakiからの最新のお知らせです。' };
export const dynamic = 'force-dynamic';
export default async function NewsPage() { const { news } = await getManagedData(); return <main><PageHero eyebrow="LATEST NEWS" title={<>お知らせ</>} intro="営業日、イベント情報、キャストやワールドに関する最新情報をお届けします。" /><section className="content-section"><div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{news.map((item) => <Link key={item.id} href={`/news/${item.id}`} className="group overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.025] transition hover:-translate-y-1 hover:border-[#9d69ff]/45"><div className="aspect-[4/3] overflow-hidden"><ImageOrPlaceholder src={item.thumbnail} alt={item.title} className="transition duration-500 group-hover:scale-105" /></div><div className="p-4"><time className="text-[10px] tracking-[.13em] text-[#d7b85b]">{item.date}</time><h2 className="mt-2 text-sm font-semibold leading-6">{item.title}</h2><ArrowRight size={15} className="mt-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-white" /></div></Link>)}</div></section></main>; }
