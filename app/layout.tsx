import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { NightIntro } from '@/components/night-intro';
import { MotionDirector } from '@/components/motion-director';
import './globals.css';
import './design-tokens.css';
import './animations.css';
import './brand-refresh.css';
import './page-system.css';
import './title-scale.css';
import './moon.css';
import './rose-soft.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? 'https://barmisaki-official-site.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  return <html lang="ja" data-intro="1">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Great+Vibes&family=Shippori+Mincho:wght@500;700&family=Zen+Maru+Gothic:wght@500;700&display=swap" />
    </head>
    <body><NightIntro /><MotionDirector /><SiteHeader />{children}<SiteFooter /></body>
  </html>;
}
