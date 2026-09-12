export type Cast = {
  id: string; name: string; generation: string; group: string; role: string;
  image: string; images?: string[]; xUrl: string; favorite: string; message: string;
  isPickup: boolean; pickupOrder: number | null;
};

export const casts: Cast[] = [];

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
