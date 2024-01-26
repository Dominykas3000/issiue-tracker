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
  title: 'Issue Tracker',
  description: 'A simple issue tracker built with Next.js and Prisma.',
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
          <main className="flex pb-[40px] justify-center max-w-[650px] w-[100%] m-auto">
            {children}
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}