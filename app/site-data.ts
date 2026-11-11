// Shared content for the site, read from the Firebase Realtime Database that the admin console edits.
// Keep this module free of 'use client' so both server rendering and the browser can import it.
import { castPhotos } from './cast/cast-photos';

const database = 'https://barmisaki-admin-50ff9-default-rtdb.firebaseio.com/admin/content';
const validImage = /^(https?:\/\/|\/(?!\/)|data:image\/(png|jpeg|webp);base64,)/i;

export type SiteCast = {
  id: string;
  name: string;
  generation: string;
  role: 'CAST' | 'STAFF';
  card: string;
  full: string;
  photos: { card: string; full: string }[];
  xUrl: string;
  favorite: string;
  message: string;
  isPickup: boolean;
};

export type SiteNews = {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  thumbnail: string;
  isImportant: boolean;
};

export type SitePhoto = { id: string; date: string; imageUrl: string };

export type SiteData = { casts: SiteCast[]; news: SiteNews[]; albums: SitePhoto[] };

const text = (value: unknown) => (typeof value === 'string' ? value : '');

// Firebase returns arrays as objects when entries were removed, so accept both shapes.
function records(raw: unknown): Record<string, unknown>[] {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? Object.entries(raw as Record<string, unknown>).map(([id, value]) => (value && typeof value === 'object' ? { ...(value as object), id } : null))
      : [];
  return list.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object');
}

// Some news thumbnails were uploaded before the admin console stored URLs, so map them by id.
const localNewsImages: Record<string, string> = {
  '2a24e646-1c60-4630-9b4c-73ef6cec4960': '/news/second-generation-introduction.png',
  'bb4820a6-e6f1-4b4d-a0e4-6ed18f3a898f': '/news/open-today-2026-09-18.png',
};

// Category key and the Japanese label shown on the site (the admin may store either one).
export const newsCategoryLabels: [string, string][] = [
  ['BUSINESS', '営業情報'], ['EVENT', 'イベント'], ['CAST', 'キャスト'],
  ['WORLD', 'ワールド'], ['INFORMATION', 'お知らせ'], ['IMPORTANT', '重要'],
];

export function normalizeCasts(raw: unknown): SiteCast[] {
  return records(raw).flatMap((item): SiteCast[] => {
    const id = text(item.id);
    const name = text(item.name).trim();
    if (!id || !name) return [];
    const category = text(item.category);
    const isStaff = category === 'スタッフ' || text(item.role) === 'STAFF';
    const generation = isStaff ? 'スタッフ' : category.normalize('NFKC') === '2期生' ? '２期生' : category;
    const local = castPhotos[name] ?? [];
    const remote = validImage.test(text(item.imageUrl)) ? text(item.imageUrl) : '';
    const card = remote || local[0]?.card || '';
    const full = remote || local[0]?.full || card;
    return [{
      id,
      name,
      generation,
      role: isStaff ? 'STAFF' : 'CAST',
      card,
      full,
      photos: !remote && local.length > 1 ? local : [{ card, full }],
      xUrl: text(item.xUrl),
      favorite: text(item.favorite),
      message: text(item.message),
      isPickup: item.isPickup === true,
    }];
  });
}

export function normalizeNews(raw: unknown): SiteNews[] {
  return records(raw).flatMap((item): SiteNews[] => {
    if (item.published !== true && item.published !== 1) return [];
    const id = text(item.id);
    const title = text(item.title).trim();
    if (!id || !title) return [];
    const rawCategory = text(item.category);
    const category = newsCategoryLabels.find(([key, label]) => key === rawCategory.toUpperCase() || label === rawCategory)?.[0] ?? 'INFORMATION';
    const content = text(item.content);
    const thumbnail = localNewsImages[id] || text(item.thumbnailUrl || item.thumbnail);
    return [{
      id,
      title,
      date: text(item.date),
      category,
      content,
      summary: text(item.summary) || content.replace(/\s+/g, ' ').slice(0, 120),
      thumbnail: validImage.test(thumbnail) ? thumbnail : '',
      isImportant: item.isImportant === true || category === 'IMPORTANT',
    }];
  }).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id.localeCompare(b.id)));
}

export function normalizeAlbums(raw: unknown): SitePhoto[] {
  return records(raw).flatMap((item): SitePhoto[] => {
    const id = text(item.id);
    const date = text(item.date);
    const imageUrl = text(item.imageUrl);
    if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !validImage.test(imageUrl)) return [];
    return [{ id, date, imageUrl }];
  }).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

async function readCollection(name: 'casts' | 'news' | 'albums'): Promise<unknown> {
  const response = await fetch(`${database}/${name}.json`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${name} を読み込めませんでした。`);
  return response.json();
}

export async function fetchSiteData(): Promise<SiteData> {
  const [casts, news, albums] = await Promise.all([readCollection('casts'), readCollection('news'), readCollection('albums')]);
  return { casts: normalizeCasts(casts), news: normalizeNews(news), albums: normalizeAlbums(albums) };
}

// The first load is shared between the intro screen and the page, so the content is requested once.
let firstLoad: Promise<SiteData> | null = null;
export function loadSiteData(): Promise<SiteData> {
  if (!firstLoad) firstLoad = fetchSiteData().catch((error) => { firstLoad = null; throw error; });
  return firstLoad;
}
