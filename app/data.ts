export type Cast = {
  id: string; name: string; generation: string; group: string; role: string;
  image: string; xUrl: string; favorite: string; message: string;
  isPickup: boolean; pickupOrder: number | null;
};

export const casts: Cast[] = [
  { id: 'misaki', name: '海咲', generation: '1期生', group: '', role: 'OWNER', image: '/barmisaki-icon.png', xUrl: 'https://x.com/BarMisaki_VRC', favorite: 'おしゃべり・夜の時間', message: 'あなたに会える夜を、楽しみにしています。', isPickup: true, pickupOrder: 1 },
  { id: 'luna', name: 'るな', generation: '1期生', group: '', role: 'CAST', image: '', xUrl: '', favorite: '音楽・カクテル', message: 'ゆっくりお話ししましょう。', isPickup: true, pickupOrder: 2 },
  { id: 'yui', name: 'ゆい', generation: '2期生', group: '花組', role: 'CAST', image: '', xUrl: '', favorite: 'かわいいもの', message: '素敵な夜を一緒に。', isPickup: true, pickupOrder: 3 },
  { id: 'noa', name: 'のあ', generation: '2期生', group: '花組', role: 'CAST', image: '', xUrl: '', favorite: '写真・ワールド巡り', message: '初めての方も大歓迎です。', isPickup: true, pickupOrder: 4 },
  { id: 'mio', name: 'みお', generation: '2期生', group: '月組', role: 'CAST', image: '', xUrl: '', favorite: 'ゲーム・映画', message: '今夜の思い出をつくりましょう。', isPickup: false, pickupOrder: null },
  { id: 'rei', name: 'れい', generation: '2期生', group: '月組', role: 'CAST', image: '', xUrl: '', favorite: 'ダンス', message: 'お会いできるのを待っています。', isPickup: false, pickupOrder: null },
  { id: 'staff', name: '運営スタッフ', generation: 'スタッフ', group: '', role: 'STAFF', image: '', xUrl: '', favorite: '皆さまの笑顔', message: '安心して楽しめる夜をお届けします。', isPickup: false, pickupOrder: null },
];

export const news = [
  { id: 'opening', title: '次回営業日のお知らせ', date: '2026.08.28', thumbnail: '', content: '次回の営業日については、公式Xで最新情報をご案内します。皆さまのご来店をお待ちしています。' },
  { id: 'cast', title: '新キャストのご紹介', date: '2026.08.16', thumbnail: '', content: 'BarMisakiに新しい海咲ちゃんが加わりました。キャストページからプロフィールをご覧ください。' },
  { id: 'recruit', title: 'スタッフ募集について', date: '2026.08.02', thumbnail: '', content: '募集状況と応募方法は、RECRUITセクションからご確認いただけます。' },
  { id: 'guide', title: 'ご来店前のお願い', date: '2026.07.20', thumbnail: '', content: '快適なイベント運営のため、参加前に店舗ルールをご確認ください。' },
  { id: 'world', title: '店内ワールドを更新しました', date: '2026.07.08', thumbnail: '', content: 'さらに心地よい夜を過ごしていただけるよう、店内ワールドをアップデートしました。' },
  { id: 'thanks', title: 'ご来店ありがとうございました', date: '2026.06.28', thumbnail: '', content: '先日の営業にもたくさんのご応募、ご来店をいただきありがとうございました。' },
];

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
  lotteryUrl: '',
};

export const rules = [
  '40MB以上のアバター',
  '他のお客様やキャストへの迷惑行為',
  '版権アバターの使用',
  'イベント中のキャストへのフレンド申請',
  '過度なパーティクルや音の出るアバター',
];
