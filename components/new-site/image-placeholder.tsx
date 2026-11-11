export function ImagePlaceholder({ label, ratio, size, className = '' }: { label: string; ratio: string; size?: string; className?: string }) {
  return <div className={`cast-image-placeholder ${className}`} data-ratio={ratio} aria-label={`${label} image placeholder`}>
    <i>＋</i><span>IMG / {ratio}</span><div><b>{label}</b><small>IMAGE TO BE ADDED</small>{size && <em>{size}</em>}</div><u>00 — 100</u>
  </div>;
}
