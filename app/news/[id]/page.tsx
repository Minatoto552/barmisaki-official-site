import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getManagedData } from '../../managed-data';
import { ImageOrPlaceholder } from '@/components/site-elements';

type Props = { params: Promise<{ id: string }> };
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { id } = await params; const { news } = await getManagedData(); const item = news.find((entry) => entry.id === id); return item ? { title: `${item.title} | BarMisaki`, description: item.content, openGraph: { title: item.title, description: item.content, images: item.thumbnail ? [item.thumbnail] : [] }, twitter: { title: item.title, description: item.content, images: item.thumbnail ? [item.thumbnail] : [] } } : {}; }
export default async function NewsDetail({ params }: Props) { const { id } = await params; const { news } = await getManagedData(); const item = news.find((entry) => entry.id === id); if (!item) notFound(); return <main className="min-h-screen px-6 pb-24 pt-36"><article className="mx-auto max-w-4xl"><Link href="/news" className="inline-link mb-8"><ArrowLeft size={16} /> NEWS一覧へ</Link><div className="overflow-hidden rounded-[24px] border border-white/[.08] bg-white/[.025]"><div className="aspect-[16/7] overflow-hidden"><ImageOrPlaceholder src={item.thumbnail} alt={item.title} /></div><div className="p-7 sm:p-12"><time className="text-xs tracking-[.15em] text-[#d7b85b]">{item.date}</time><h1 className="display mt-4 text-4xl leading-tight sm:text-6xl">{item.title}</h1><p className="mt-8 whitespace-pre-wrap leading-8 text-white/62">{item.content}</p></div></div></article></main>; }
