import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import "react-responsive-modal/styles.css";
import { Provider } from "./providers";

const darkerGrotesque = Darker_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worker Proposal System - WPS 1.0.2",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={darkerGrotesque.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
