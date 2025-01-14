import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import { auth } from "@/auth";

const imbPlexSans = localFont({
  src: [
    {
      path: "../styles/fonts/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../styles/fonts/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: "../styles/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "Book Wise",
  description: "BookWise is a book burrowing university library management",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={` antialiased ${imbPlexSans.className} ${bebasNeue.variable}`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
