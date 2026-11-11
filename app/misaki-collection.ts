// Avatar variations of Misaki worn by the cast and staff (images in public/misaki-gallery).
export const misakiCollection = [
  ['nabechi', 'なべち！'], ['kurin', 'くりん'], ['secchan', 'セッチャン'], ['tama', 'たま'], ['bear', 'べあ'],
  ['misuzu', 'みすず'], ['yuragi-l', 'ゆらぎ・L'], ['ringoboro', 'りんごぼーろ'], ['akiyuki0721', 'akiyuki0721'],
  ['harukaze-ouka', '春風桜華'], ['kuragechannnn', 'Kuragechannnn'], ['yukito', '雪都yukito'], ['kero-2', 'けろ__'],
  ['reruch1', 'ReruCh1'], ['ayadora', 'ayadora'], ['sakuraba-rui', '桜庭ルイ'], ['mina-toto', 'みな_とと'],
  ['poyo', 'ぽよ'], ['kurotora96', 'くろとら96'],
].map(([file, name]) => ({ name, thumb: `/misaki-gallery/${file}-thumb.webp`, src: `/misaki-gallery/${file}.webp` }));

// Every optimized Misaki photo (public/misaki-gallery), including the second and third shots of one person.
export const misakiGalleryAll = [
  ['nabechi', 'なべち！'], ['kurin', 'くりん'], ['secchan', 'セッチャン'], ['tama', 'たま'], ['bear', 'べあ'],
  ['misuzu', 'みすず'], ['yuragi-l', 'ゆらぎ・L'], ['ringoboro', 'りんごぼーろ'], ['ringoboro-2', 'りんごぼーろ'],
  ['akiyuki0721', 'akiyuki0721'], ['harukaze-ouka', '春風桜華'], ['kuragechannnn', 'Kuragechannnn'],
  ['kuragechannnn-2', 'Kuragechannnn'], ['yukito', '雪都yukito'], ['yukito-2', '雪都yukito'], ['yukito-3', '雪都yukito'],
  ['kero-2', 'けろ__'], ['kero-3', 'けろ__'], ['reruch1', 'ReruCh1'], ['ayadora', 'ayadora'],
  ['sakuraba-rui', '桜庭ルイ'], ['mina-toto', 'みな_とと'], ['poyo', 'ぽよ'], ['kurotora96', 'くろとら96'],
].map(([file, name]) => ({ name, thumb: `/misaki-gallery/${file}-thumb.webp`, src: `/misaki-gallery/${file}.webp` }));
