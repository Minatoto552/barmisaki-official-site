import type { Metadata } from 'next';
import { Cabin, Instrument_Serif, Inter, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
const cabin = Cabin({ variable: '--font-cabin', subsets: ['latin'] });
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const instrument = Instrument_Serif({ variable: '--font-instrument', subsets: ['latin'], weight: '400', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'BarMisaki | VRChat Bar Event',
  description: 'キャスト＆スタッフ全員が海咲ちゃん。VRChatで月2回開催するBarイベント「BarMisaki」の公式サイトです。',
  icons: { icon: '/barmisaki-icon.png' },
  openGraph: {
    title: 'BarMisaki | VRChat Bar Event',
    description: 'キャスト＆スタッフ全員が海咲ちゃん。VRChatで過ごす、特別な夜を。',
    type: 'website',
    images: [{ url: '/barmisaki-logo.png', width: 1536, height: 1024, alt: 'BarMisaki' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BarMisaki | VRChat Bar Event',
    description: 'キャスト＆スタッフ全員が海咲ちゃん。VRChatで過ごす、特別な夜を。',
    images: ['/barmisaki-logo.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body className={`${manrope.variable} ${cabin.variable} ${inter.variable} ${instrument.variable}`}>{children}</body></html>;
}
