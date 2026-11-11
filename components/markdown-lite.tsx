import type { ReactNode } from 'react';

// Small Markdown renderer for news bodies written in the admin console (links, bold, lists, headings,
// line breaks). It builds React elements only, so nothing from the text is ever inserted as HTML.
const INLINE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s<>)\]]+)/g;

function inline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(INLINE)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const key = `${keyBase}-${index++}`;
    if (match[2]) nodes.push(<a key={key} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>);
    else if (match[3]) nodes.push(<strong key={key}>{match[3]}</strong>);
    else if (match[4]) nodes.push(<a key={key} href={match[4]} target="_blank" rel="noopener noreferrer">{match[4]}</a>);
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function lines(block: string[], keyBase: string): ReactNode[] {
  return block.flatMap((line, i) => (i === 0 ? [] : [<br key={`${keyBase}-br${i}`} />]).concat(inline(line, `${keyBase}-l${i}`) as never[]));
}

export function MarkdownLite({ text }: { text: string }) {
  const rows = text.replace(/\r\n?/g, '\n').split('\n');
  const out: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let n = 0;
  const flushParagraph = () => { if (paragraph.length) { out.push(<p key={`p${n++}`}>{lines(paragraph, `p${n}`)}</p>); paragraph = []; } };
  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    out.push(<Tag key={`l${n++}`}>{list.items.map((item, i) => <li key={i}>{inline(item, `li${n}-${i}`)}</li>)}</Tag>);
    list = null;
  };
  for (const row of rows) {
    const line = row.trimEnd();
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const bullet = /^\s*[-*]\s+(.+)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    if (heading) { flushParagraph(); flushList(); out.push(<h3 key={`h${n++}`}>{inline(heading[2], `h${n}`)}</h3>); continue; }
    if (bullet || numbered) {
      flushParagraph();
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) { flushList(); list = { ordered, items: [] }; }
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return <>{out}</>;
}
