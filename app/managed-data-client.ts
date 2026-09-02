import type { Cast } from './data';

const endpoint = 'https://barmisaki-admin-50ff9-default-rtdb.firebaseio.com/admin/content.json';

type ManagedCast = {
  id: string; name: string; category: string; role: string; imageUrl?: string;
  xUrl?: string; favorite?: string; message?: string; isPickup?: boolean;
};

export async function loadManagedCasts(): Promise<Cast[] | null> {
  try {
    const response = await fetch(`${endpoint}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const data = await response.json() as { casts?: ManagedCast[] } | null;
    if (!data || !Array.isArray(data.casts)) return null;
    return data.casts.map((item, index) => {
      const [generation, group = ''] = item.category === 'スタッフ'
        ? ['スタッフ', '']
        : item.category.split(' ');
      return {
        id: item.id,
        name: item.name,
        generation,
        group,
        role: item.role,
        image: item.imageUrl || '',
        xUrl: item.xUrl || '',
        favorite: item.favorite || '',
        message: item.message || '',
        isPickup: Boolean(item.isPickup),
        pickupOrder: item.isPickup ? index + 1 : null,
      };
    });
  } catch {
    return null;
  }
}
