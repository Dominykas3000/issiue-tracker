import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.variable} suppressHydrationWarning={true}>
        <Theme appearance="light" accentColor="teal" panelBackground="solid" radius="large" scaling="105%">
          <NavBar />
          <main className="p-5">{children}</main>
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}