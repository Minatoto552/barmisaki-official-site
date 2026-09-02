export type Cast = {
  id: string; name: string; generation: string; group: string; role: string;
  image: string; xUrl: string; favorite: string; message: string;
  isPickup: boolean; pickupOrder: number | null;
};

export const casts: Cast[] = [];

export const news: Array<{ id: string; title: string; date: string; thumbnail: string; content: string }> = [];

export const gallery = [
  { id: 'lounge', image: '', alt: 'BarMisaki ラウンジ' },
  { id: 'counter', image: '', alt: 'カウンターでの接客風景' },
  { id: 'room', image: '', alt: '個室の雰囲気' },
  { id: 'event', image: '', alt: 'イベント当日の様子' },
];

export const recruitment = {
  cast: { enabled: false, url: '' },
  staff: { enabled: false, url: '' },
};

export const externalLinks = {
  officialX: 'https://x.com/BarMisaki_VRC',
  vrcGroup: 'https://vrc.group/BARMIS.9013',
  lotteryUrl: '',
};

export const rules = [
  '40MB以上のアバター',
  '他のお客様やキャストへの迷惑行為',
  '版権アバターの使用',
  'イベント中のキャストへのフレンド申請',
  '過度なパーティクルや音の出るアバター',
];
