export type Cast = {
  id: string; name: string; generation: string; group: string; role: string;
  image: string; images?: string[]; xUrl: string; favorite: string; message: string;
  isPickup: boolean; pickupOrder: number | null;
};

export const casts: Cast[] = [];

export const news: Array<{ id: string; title: string; date: string; thumbnail: string; content: string }> = [];

export const gallery = [
  { id: 'entrance', image: '/atmosphere/interior-01.png', alt: 'BarMisaki エントランス' },
  { id: 'main-floor', image: '/atmosphere/interior-02.png', alt: 'メインフロア' },
  { id: 'lounge-red', image: '/atmosphere/interior-03.png', alt: 'ラウンジスペース' },
  { id: 'lounge-white', image: '/atmosphere/interior-04.png', alt: 'ボックス席' },
  { id: 'counter', image: '/atmosphere/interior-05.png', alt: 'バーカウンター' },
  { id: 'corridor', image: '/atmosphere/interior-06.png', alt: '店内通路' },
  { id: 'blue-bar', image: '/atmosphere/interior-07.png', alt: 'ブルーバー' },
  { id: 'blue-lounge', image: '/atmosphere/interior-08.png', alt: 'ブルーラウンジ' },
];

export const recruitment = {
  cast: { enabled: false, url: '' },
  staff: { enabled: false, url: '' },
};

export const externalLinks = {
  officialX: 'https://x.com/BarMisaki_VRC',
  vrcGroup: 'https://vrc.group/BARMIS.9013',
  lotteryUrl: '',
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
