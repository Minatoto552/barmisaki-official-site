import { castNames, staffNames } from '../content-data';
import { castImages } from './cast-images';
export type CastMember={id:string;no:string;name:string;nameEn:string;nameJp:string;generation:string;role:string;birthday:string;favoriteDrink:string;profile:string;message:string;x:string;vrchat:string;signatureDrink:{name:string;type:string;comment:string}};
const firstGeneration = new Set([...castNames.slice(0,9), '桜庭ルイ', 'みな_とと', 'ぽよ']);
const make=(name:string,i:number,role:string):CastMember=>({id:`member-${i+1}`,no:String(i+1).padStart(2,'0'),name,nameEn:name.toUpperCase(),nameJp:name,generation:firstGeneration.has(name)?'1期生':'2期生',role,birthday:'—',favoriteDrink:'—',profile:'BarMisakiで、心地よい会話と特別な夜をお届けします。',message:'ここでお会いできる夜を楽しみにしています。',x:'@BarMisaki_VRC',vrchat:'BarMisaki',signatureDrink:{name:'TO BE ANNOUNCED',type:'SIGNATURE DRINK',comment:'詳細は今後ご案内します。'}});
export const castMembers=[...castNames.map((n,i)=>make(n,i,'CAST')),...staffNames.map((n,i)=>make(n,castNames.length+i,'STAFF'))];
export function memberImages(name: string): string[] {
  const images = castImages[name];
  return Array.isArray(images) ? images : images ? [images] : [];
}
