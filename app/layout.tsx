import type { Metadata } from 'next';
import { proximaNova } from './fonts';
import './globals.scss';

export const metadata: Metadata = {
  title: 'EasyExchange - Currency Exchange Made Easy',
  description: 'Best source for currency conversion, sending money online and tracking exchange rates. Live tracking and notifications + flexible delivery and payment options.',

  // Viewport settings for mobile safe areas
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover', // iOS safe area support
  },

  // Favicon and Icons
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/favicon/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/favicon/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/favicon/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/favicon/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/favicon/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicon/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Web App Manifest
  manifest: '/favicon/manifest.json',

  // Theme Color
  themeColor: '#87c241',

  // Microsoft Tiles
  other: {
    'msapplication-TileColor': '#87c241',
    'msapplication-TileImage': '/favicon/ms-icon-144x144.png',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={proximaNova.variable}>{children}</body>
    </html>
  );
}
