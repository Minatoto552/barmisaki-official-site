import type { ReactNode } from 'react';

export function SectionHeading({ index, label, title, children }: { index: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <header className="bm-section-heading">
    <div className="bm-section-meta"><span>{index}</span><p>{label}</p></div>
    <h2>{title}</h2>
    {children && <div className="bm-section-heading-copy">{children}</div>}
  </header>;
}
