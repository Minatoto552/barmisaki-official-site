export type NewsItem = {
  id: string; slug: string; title: string; date: string; category: string;
  summary: string; content: string; thumbnail: string; isImportant: boolean; published: boolean;
};
export const newsCategories = [
  ['ALL', 'すべて'], ['BUSINESS', '営業情報'], ['EVENT', 'イベント'], ['CAST', 'キャスト'],
  ['WORLD', 'ワールド'], ['INFORMATION', 'お知らせ'], ['IMPORTANT', '重要'],
];
export function newsDateValue(date: string) {
  const iso = date.replace(/[./]/g, '-');
  const value = Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00+09:00` : iso);
  return Number.isFinite(value) ? value : 0;
}
export function isNewNews(date: string, now = Date.now()) {
  const age = now - newsDateValue(date);
  return newsDateValue(date) > 0 && age >= 0 && age < 7 * 86400000;
}
const text = (value: unknown) => typeof value === 'string' ? value : '';
export function normalizeNews(raw: unknown): NewsItem[] {
  const records = Array.isArray(raw) ? raw : raw && typeof raw === 'object' ? Object.entries(raw).map(([id, value]) => value && typeof value === 'object' ? { ...value, id } : null) : [];
  return records.flatMap((record): NewsItem[] => {
    if (!record || typeof record !== 'object') return [];
    const item = record as Record<string, unknown>;
    if (item.published !== true && item.published !== 1) return [];
    const id = text(item.id), title = text(item.title);
    if (!id || !title.trim()) return [];
    const categoryValue = text(item.category);
    const category = newsCategories.find(([key, label]) => key === categoryValue.toUpperCase() || label === categoryValue)?.[0] || 'INFORMATION';
    const content = text(item.content);
    const thumbnail = text(item.thumbnailUrl || item.thumbnail);
    return [{ id, slug: text(item.slug) || id, title, date: text(item.date), category,
      content, summary: text(item.summary) || content.replace(/\s+/g, ' ').slice(0, 150),
      thumbnail: /^(https?:\/\/|\/(?!\/)|data:image\/(png|jpeg|webp);base64,)/i.test(thumbnail) ? thumbnail : '',
      isImportant: item.isImportant === true || category === 'IMPORTANT', published: true }];
  }).sort((a, b) => newsDateValue(b.date) - newsDateValue(a.date) || a.id.localeCompare(b.id));
}
export function newsHref(item: Pick<NewsItem, 'id'>) { return `/news/article?id=${encodeURIComponent(item.id)}`; }
export function filterNews(items: NewsItem[], category: string, query: string) {
  const search = query.normalize('NFKC').toLocaleLowerCase('ja');
  return items.filter((item) => (category === 'ALL' || (category === 'IMPORTANT' ? item.isImportant : item.category === category)) && `${item.title} ${item.content}`.normalize('NFKC').toLocaleLowerCase('ja').includes(search));
}
