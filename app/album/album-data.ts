export type AlbumPhoto = {
  id: string;
  date: string;
  imageUrl: string;
  createdAt: string;
  width?: number;
  height?: number;
};

const firebaseEndpoint = 'https://barmisaki-admin-50ff9-default-rtdb.firebaseio.com/admin/content/albums.json';
const endpoint = () => typeof window === 'undefined' ? firebaseEndpoint : '/api/content/albums';
const validImage = /^(https?:\/\/|\/(?!\/)|data:image\/(png|jpeg|webp);base64,)/i;
const browserFallback: AlbumPhoto[] = [{
  id: 'latest-album-fallback',
  date: '2026-09-18',
  imageUrl: '/album/latest-album-fallback.jpg',
  createdAt: '2026-09-18T00:00:00+09:00',
}];

export function normalizeAlbums(raw: unknown): AlbumPhoto[] {
  const records = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? Object.entries(raw).map(([id, value]) => value && typeof value === 'object' ? { ...value, id } : null)
      : [];

  return records.flatMap((record): AlbumPhoto[] => {
    if (!record || typeof record !== 'object') return [];
    const item = record as Record<string, unknown>;
    const id = typeof item.id === 'string' ? item.id : '';
    const date = typeof item.date === 'string' ? item.date : '';
    const imageUrl = typeof item.imageUrl === 'string' ? item.imageUrl : '';
    if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !validImage.test(imageUrl)) return [];
    return [{
      id,
      date,
      imageUrl,
      createdAt: typeof item.createdAt === 'string' ? item.createdAt : '',
      width: typeof item.width === 'number' ? item.width : undefined,
      height: typeof item.height === 'number' ? item.height : undefined,
    }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.createdAt.localeCompare(b.createdAt));
}

export async function loadAlbums(): Promise<AlbumPhoto[]> {
  try {
    const response = await fetch(`${endpoint()}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return typeof window === 'undefined' ? [] : browserFallback;
    const albums = normalizeAlbums(await response.json());
    return albums.length || typeof window === 'undefined' ? albums : browserFallback;
  } catch {
    return typeof window === 'undefined' ? [] : browserFallback;
  }
}

export function latestAlbumPhotos(albums: AlbumPhoto[]): string[] {
  const latestDate = albums[0]?.date;
  return latestDate ? albums.filter((photo) => photo.date === latestDate).map((photo) => photo.imageUrl) : [];
}

export function groupAlbumsByDate(albums: AlbumPhoto[]) {
  const groups = new Map<string, AlbumPhoto[]>();
  for (const photo of albums) groups.set(photo.date, [...(groups.get(photo.date) ?? []), photo]);
  return [...groups.entries()].map(([date, photos]) => ({ date, photos }));
}
