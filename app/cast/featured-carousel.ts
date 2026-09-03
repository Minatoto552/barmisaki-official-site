export const AUTOPLAY_DELAY = 5000;
export const INTERACTION_DELAY = 8000;

// Embla needs more than a viewport of slides to loop. Repeated visual copies
// supply that space even when only a few members are selected in the admin.
// The displayed numbering always uses the original member count.
export function repeatCount(memberCount: number) {
  return memberCount > 1 ? Math.ceil(12 / memberCount) : 1;
}

export function slidePosition(index: number, active: number, count: number) {
  const next = (index - active + count) % count;
  if (next === 0) return 'active';
  if (next === 1) return 'next';
  if (next === count - 1) return 'prev';
  if (next === 2) return 'far-next';
  if (next === count - 2) return 'far-prev';
  return 'distant';
}
