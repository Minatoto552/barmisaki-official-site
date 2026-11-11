import { casts, type Cast } from './data';

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
  'Daphne_ダフネ': '/cast/staff/daphne.png',
  'フジジ_Ge': '/cast/staff/fujiji-ge.png',
  'J1R0K3N': '/cast/staff/j1r0k3n.webp',
  'vimヲ': '/cast/staff/vimwo.png',
  '春風桜華': '/cast/hana/harukaze-ouka.jpg',
  'Kuragechannnn': ['/cast/hana/kuragechannnn.png', '/cast/hana/kuragechannnn-2.png'],
  '雪都yukito': ['/cast/hana/yukito-3.png', '/cast/hana/yukito-2.png'],
  'けろ__': ['/cast/hana/kero-3.png', '/cast/hana/kero-2.png'],
  'ReruCh1': '/cast/hana/reruch1.png',
  'ayadora': '/cast/hana/ayadora.png',
  'papiko papi': '/cast/hana/papiko-papi.png',
  'はとたろ': '/cast/hana/hatotaro.png',
  'はとたろ　': '/cast/hana/hatotaro.png',
  'Slium': '/cast/hana/slium.webp',
  '・ニーナ・': '/cast/hana/nina.webp',
  'usagi210': '/cast/hana/usagi210.webp',
  'ビタミンC不足': '/cast/hana/vitamin-c.png',
  '辻_tsuji': '/cast/hana/tsuji.png',
  '眠猫なつね': '/cast/hana/nemuri-neko-natsune.png',
  '雪空すばる': '/cast/hana/yukisora-subaru.png',
  'りゅー16': '/cast/hana/ryu-16.png',
};

export async function loadManagedCasts(): Promise<Cast[] | null> {
  return casts;
}
