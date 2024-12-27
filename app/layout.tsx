import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import "react-responsive-modal/styles.css";
import { Provider } from "./providers";
import Head from 'next/head';
import GoogleAnalytics from './GoogleAnalytics';

const darkerGrotesque = Darker_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worker Proposal System - WPS 1.0.17",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <Head>
        <meta name="color-scheme" content="only light" />
      </Head>
      <GoogleAnalytics />

      <body className={darkerGrotesque.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
