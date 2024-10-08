import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Session from '@/src/app/Session';
import { GoogleAnalytics } from '@next/third-parties/google';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Session>{children}</Session>
        {process.env.NEXT_PUBLIC_GAID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GAID} />
        ) : null}
      </body>
    </html>
  );
}
