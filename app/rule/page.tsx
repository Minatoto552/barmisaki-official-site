import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { rules } from '../data';
import { EditorialHero } from '@/components/editorial';

export const metadata: Metadata = { title: 'RULE | BarMisaki', description: '皆さまに安心して楽しんでいただくためのBarMisaki店舗ルールです。' };
export default function RulePage() {
  return <main className="editorial-page">
    <EditorialHero index="05" eyebrow="RULE" word="RESPECT" title={<>店舗<em>ルール</em></>} intro="皆様に安心してイベントを楽しんでいただくため、以下のルールをお守りください。" />
    <section className="editorial-content rule-book"><div className="rule-book-heading"><p className="editorial-kicker">HOUSE RULES</p><h2 className="display">With respect.</h2><p>心地よい夜を、皆様と。</p><span className="rule-book-count">{String(rules.length).padStart(2, '0')} RULES</span></div>
      <div><h2 className="rule-list-label">禁止事項</h2><ol className="rule-list">{rules.map((rule, index) => <li key={rule}><span className="editorial-number">{String(index + 1).padStart(2, '0')}</span><p>{rule}</p><AlertTriangle size={18} strokeWidth={1} aria-hidden="true" /></li>)}</ol></div>
    </section>
  </main>;
}
