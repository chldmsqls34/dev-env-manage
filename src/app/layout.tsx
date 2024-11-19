import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_KR } from 'next/font/google'
 
const noto = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "To Do List",
  description: "Shadcn UI + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={noto.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
