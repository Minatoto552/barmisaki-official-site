import { FittedText } from './site-elements';
import './editorial.css';

export function EditorialHero({ index, eyebrow, title, intro, word }: { index: string; eyebrow: string; title: React.ReactNode; intro: string; word: string }) {
  return <header className="editorial-hero"><span className="editorial-watermark" aria-hidden="true">{word}</span><p className="editorial-index">{index} <span>／ BAR MISAKI</span></p><p className="editorial-kicker">{eyebrow}</p><h1><FittedText>{title}</FittedText></h1><p className="editorial-intro">{intro}</p></header>;
}
export function EditorialHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return <div className="editorial-section-heading"><div><p className="editorial-kicker">{eyebrow}</p><h2 className="display">{title}</h2></div>{note && <p>{note}</p>}</div>;
}
export function StatusBadge({ state, children }: { state: 'open' | 'closed' | 'soon' | 'new' | 'important'; children?: React.ReactNode }) {
  return <span className={`editorial-status is-${state}`}>{children ?? ({ open: 'OPEN', closed: 'CLOSED', soon: 'COMING SOON', new: 'NEW', important: 'IMPORTANT' }[state])}</span>;
}
