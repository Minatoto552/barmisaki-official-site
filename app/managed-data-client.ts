import type { Cast } from './data';

const endpoint = 'https://barmisaki-admin-50ff9-default-rtdb.firebaseio.com/admin/content.json';

type ManagedCast = {
  id: string; name: string; category: string; role: string; imageUrl?: string;
  xUrl?: string; favorite?: string; message?: string; isPickup?: boolean;
};

export const localCastImages: Record<string, string | string[]> = {
  'くりん': '/cast/1st/kurin.png',
  'セッチャン': '/cast/1st/secchan.png',
  'たま': '/cast/1st/tama.png',
  'なべち！': '/cast/1st/nabechi.png',
  'べあ': '/cast/1st/bear.png',
  'みすず': '/cast/1st/misuzu.png',
  'ゆらぎ・L': '/cast/1st/yuragi-l.png',
  'りんごぼーろ': ['/cast/1st/ringoboro.png', '/cast/1st/ringoboro-2.png'],
  'akiyuki0721': '/cast/1st/akiyuki0721.png',
  '桜庭ルイ': '/cast/staff/sakuraba-rui.png',
  'みな_とと': '/cast/staff/mina-toto.png',
  'ぽよ': '/cast/staff/poyo.png',
  'くろとら96': '/cast/staff/kurotora96.png',
  '春風桜華': '/cast/hana/harukaze-ouka.jpg',
  'Kuragechannnn': ['/cast/hana/kuragechannnn.png', '/cast/hana/kuragechannnn-2.png'],
  '雪都yukito': ['/cast/hana/yukito-3.png', '/cast/hana/yukito-2.png'],
  'けろ__': ['/cast/hana/kero-3.png', '/cast/hana/kero-2.png'],
  'あおみつししぇる': '/cast/hana/aomitsu-shishel.png',
  'ReruCh1': '/cast/hana/reruch1.png',
  'ayadora': '/cast/hana/ayadora.png',
};

const localStaffNames = new Set(['桜庭ルイ', 'みな_とと', 'ぽよ', 'くろとら96']);

export async function loadManagedCasts(): Promise<Cast[] | null> {
  try {
    const response = await fetch(`${endpoint}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const data = await response.json() as { casts?: ManagedCast[] } | null;
    if (!data || !Array.isArray(data.casts)) return null;
    return data.casts.map((item, index) => {
      const [rawGeneration, rawGroup = ''] = item.category === 'スタッフ'
        ? ['スタッフ', '']
        : item.category.split(' ');
      const isSecondGeneration = rawGeneration === '2期生' || rawGeneration === '２期生';
      const generation = isSecondGeneration ? '２期生' : rawGeneration;
      const group = isSecondGeneration ? '' : rawGroup;
      const localImage = localCastImages[item.name];
      const images = Array.isArray(localImage) ? localImage : localImage ? [localImage] : [];
      return {
        id: item.id,
        name: item.name,
        generation,
        group,
        role: localStaffNames.has(item.name) ? 'STAFF' : item.role,
        image: item.imageUrl || images[0] || '',
        images: item.imageUrl ? [item.imageUrl] : images,
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
