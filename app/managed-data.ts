import 'server-only';
import { casts as fallbackCasts, news as fallbackNews, type Cast } from './data';

const adminOrigin = 'https://barmisaki-admin.yuuki-n-yugichu400.chatgpt.site';
type ManagedCast = { id: string; name: string; category: string; role: string; imageUrl: string; xUrl: string; favorite: string; message: string; isPickup: boolean; pickupOrder: number | null };
type ManagedNews = { id: string; title: string; date: string; thumbnailUrl: string; content: string; published: boolean };

export async function getManagedData(): Promise<{ casts: Cast[]; news: typeof fallbackNews }> {
  const token = process.env.ADMIN_DATA_API_TOKEN;
  if (!token) return { casts: fallbackCasts, news: fallbackNews };
  try {
    const response = await fetch(`${adminOrigin}/api/public/data`, { headers: { 'OAI-Sites-Authorization': `Bearer ${token}` }, cache: 'no-store' });
    if (!response.ok) throw new Error('Managed data unavailable');
    const payload = await response.json() as { casts: ManagedCast[]; news: ManagedNews[] };
    return {
      casts: payload.casts.map((item) => { const [generation, group = ''] = item.category.includes(' ') ? [item.category.split(' ')[0], item.category.split(' ').slice(1).join(' ')] : [item.category, '']; return { id: item.id, name: item.name, generation, group, role: item.role, image: absoluteImage(item.imageUrl), xUrl: item.xUrl, favorite: item.favorite, message: item.message, isPickup: item.isPickup, pickupOrder: item.pickupOrder }; }),
      news: payload.news.map((item) => ({ id: item.id, title: item.title, date: item.date.replaceAll('-', '.'), thumbnail: absoluteImage(item.thumbnailUrl), content: item.content })),
    };
  } catch { return { casts: fallbackCasts, news: fallbackNews }; }
}

function absoluteImage(value: string) { return value.startsWith('/') ? `${adminOrigin}${value}` : value; }
