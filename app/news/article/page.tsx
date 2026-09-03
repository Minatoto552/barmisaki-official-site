import type { Metadata } from 'next';
import { NewsArticle } from '../news-client';
export const metadata: Metadata = { title: 'NEWS | BarMisaki', description: 'BarMisakiからのお知らせです。' };
export default function ArticlePage() { return <NewsArticle />; }
