import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { AppBarClient } from "./components/AppBarClient";

import ToastContainerWrapper from "./toastContainer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Easy Pay",
  description: "easy payment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AppBarClient></AppBarClient>
          <div className="pt-20  h-full">
            {children}
            <ToastContainerWrapper></ToastContainerWrapper>
          </div>
        </body>
      </Providers>
    </html>
  );
}
