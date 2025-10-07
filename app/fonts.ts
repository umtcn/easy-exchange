/**
 * Proxima Nova Font Family
 */

import localFont from 'next/font/local';

export const proximaNova = localFont({
    src: [
        {
            path: '../public/fonts/ProximaNova-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/ProximaNova-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/ProximaNova-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-proxima-nova',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});
