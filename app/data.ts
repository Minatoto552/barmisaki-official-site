export type Cast = {
  id: string; name: string; generation: string; group: string; role: string;
  image: string; images?: string[]; xUrl: string; favorite: string; message: string;
  isPickup: boolean; pickupOrder: number | null;
};

const cast = (
  id: string,
  name: string,
  generation: string,
  role: string,
  image: string,
  options: Partial<Pick<Cast, 'group' | 'images' | 'isPickup' | 'pickupOrder'>> = {},
): Cast => ({
  id,
  name,
  generation,
  group: options.group ?? '',
  role,
  image,
  images: options.images ?? [image],
  xUrl: '',
  favorite: '',
  message: '',
  isPickup: options.isPickup ?? false,
  pickupOrder: options.pickupOrder ?? null,
});

export const casts: Cast[] = [
  cast('kurin', 'くりん', '1期生', 'CAST', '/cast/1st/kurin.png', { isPickup: true, pickupOrder: 1 }),
  cast('secchan', 'セッチャン', '1期生', 'CAST', '/cast/1st/secchan.png', { isPickup: true, pickupOrder: 2 }),
  cast('tama', 'たま', '1期生', 'CAST', '/cast/1st/tama.png', { isPickup: true, pickupOrder: 3 }),
  cast('nabechi', 'なべち！', '1期生', 'CAST', '/cast/1st/nabechi.png'),
  cast('bear', 'べあ', '1期生', 'CAST', '/cast/1st/bear.png'),
  cast('misuzu', 'みすず', '1期生', 'CAST', '/cast/1st/misuzu.png'),
  cast('yuragi-l', 'ゆらぎ・L', '1期生', 'CAST', '/cast/1st/yuragi-l.png'),
  cast('ringoboro', 'りんごぼーろ', '1期生', 'CAST', '/cast/1st/ringoboro.png', { images: ['/cast/1st/ringoboro.png', '/cast/1st/ringoboro-2.png'] }),
  cast('akiyuki0721', 'akiyuki0721', '1期生', 'CAST', '/cast/1st/akiyuki0721.png'),
  cast('harukaze-ouka', '春風桜華', '２期生', 'CAST', '/cast/hana/harukaze-ouka.jpg'),
  cast('kuragechannnn', 'Kuragechannnn', '２期生', 'CAST', '/cast/hana/kuragechannnn.png', { images: ['/cast/hana/kuragechannnn.png', '/cast/hana/kuragechannnn-2.png'] }),
  cast('yukito', '雪都yukito', '２期生', 'CAST', '/cast/hana/yukito-3.png', { images: ['/cast/hana/yukito-3.png', '/cast/hana/yukito-2.png'] }),
  cast('kero', 'けろ__', '２期生', 'CAST', '/cast/hana/kero-3.png', { images: ['/cast/hana/kero-3.png', '/cast/hana/kero-2.png'] }),
  cast('reruch1', 'ReruCh1', '２期生', 'CAST', '/cast/hana/reruch1.png'),
  cast('ayadora', 'ayadora', '２期生', 'CAST', '/cast/hana/ayadora.png'),
  cast('papiko-papi', 'papiko papi', '２期生', 'CAST', '/cast/hana/papiko-papi.png'),
  cast('hatotaro', 'はとたろ', '２期生', 'CAST', '/cast/hana/hatotaro.png'),
  cast('slium', 'Slium', '２期生', 'CAST', '/cast/hana/slium.webp'),
  cast('nina', '・ニーナ・', '２期生', 'CAST', '/cast/hana/nina.webp'),
  cast('usagi210', 'usagi210', '２期生', 'CAST', '/cast/hana/usagi210.webp'),
  cast('vitamin-c', 'ビタミンC不足', '２期生', 'CAST', '/cast/hana/vitamin-c.png'),
  cast('tsuji', '辻_tsuji', '２期生', 'CAST', '/cast/hana/tsuji.png'),
  cast('nemuri-neko-natsune', '眠猫なつね', '２期生', 'CAST', '/cast/hana/nemuri-neko-natsune.png'),
  cast('yukisora-subaru', '雪空すばる', '２期生', 'CAST', '/cast/hana/yukisora-subaru.png'),
  cast('ryu-16', 'りゅー16', '２期生', 'CAST', '/cast/hana/ryu-16.png'),
  cast('sakuraba-rui', '桜庭ルイ', 'スタッフ', 'STAFF', '/cast/staff/sakuraba-rui.png'),
  cast('mina-toto', 'みな_とと', 'スタッフ', 'STAFF', '/cast/staff/mina-toto.png'),
  cast('poyo', 'ぽよ', 'スタッフ', 'STAFF', '/cast/staff/poyo.png'),
  cast('kurotora96', 'くろとら96', 'スタッフ', 'STAFF', '/cast/staff/kurotora96.png'),
  cast('daphne', 'Daphne_ダフネ', 'スタッフ', 'STAFF', '/cast/staff/daphne.png'),
  cast('fujiji-ge', 'フジジ_Ge', 'スタッフ', 'STAFF', '/cast/staff/fujiji-ge.png'),
  cast('j1r0k3n', 'J1R0K3N', 'スタッフ', 'STAFF', '/cast/staff/j1r0k3n.webp'),
  cast('vimwo', 'vimヲ', 'スタッフ', 'STAFF', '/cast/staff/vimwo.png'),
];

export const news: Array<{ id: string; title: string; date: string; thumbnail: string; content: string }> = [];

export const gallery = [
  { id: 'atmosphere-01', image: '/atmosphere/interior-01.png', alt: 'BarMisaki 店内写真 01' },
  { id: 'atmosphere-02', image: '/atmosphere/interior-02.png', alt: 'BarMisaki 店内写真 02' },
  { id: 'atmosphere-03', image: '/atmosphere/interior-03.png', alt: 'BarMisaki 店内写真 03' },
  { id: 'atmosphere-04', image: '/atmosphere/interior-04.png', alt: 'BarMisaki 店内写真 04' },
  { id: 'atmosphere-05', image: '/atmosphere/interior-05.png', alt: 'BarMisaki 店内写真 05' },
  { id: 'atmosphere-06', image: '/atmosphere/interior-06.png', alt: 'BarMisaki 店内写真 06' },
  { id: 'atmosphere-07', image: '/atmosphere/interior-07.png', alt: 'BarMisaki 店内写真 07' },
];

export const recruitment = {
  cast: { enabled: false, url: '' },
  staff: { enabled: true, url: 'https://x.com/BarMisaki_VRC' },
};

export const externalLinks = {
  officialX: 'https://x.com/BarMisaki_VRC',
  vrcGroup: 'https://vrc.group/BARMIS.9013',
  lotteryUrl: 'https://minatoto552.github.io/bar-misaki-lottery/?release=e30fde0#/lottery',
  visionTokyoX: 'https://x.com/VisionTokyo2026?s=20',
  visionTokyoBooth: 'https://t.co/7qxahXM2OC',
  misakiBooth: 'https://visiontokyo.booth.pm/items/8325804',
  hashtagBarMisaki: 'https://x.com/search?q=%23VRC_BarMisaki&src=hashtag_click',
  hashtagMisaki3D: 'https://x.com/search?q=%23%E6%B5%B7%E5%92%B23D&src=hashtag_click',
  hashtagVisionTokyo: 'https://x.com/search?q=%23VISIONTOKYO&src=hashtag_click',
};

export const rules = [
  '40MB以上のアバター',
  '他のお客様やキャストへの迷惑行為',
  '版権アバターの使用',
  'イベント中のキャストへのフレンド申請',
  '過度なパーティクルや音の出るアバター',
];
