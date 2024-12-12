import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import "react-responsive-modal/styles.css";
import { Provider } from "./providers";
import Head from 'next/head';
import Script from "next/script";

const darkerGrotesque = Darker_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worker Proposal System - WPS 1.0.13",
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
          {/* Google Analytics Script */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-B62P64VLQ4"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-B62P64VLQ4');
              `,
            }}
          />
      </Head> 
      <body className={darkerGrotesque.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
