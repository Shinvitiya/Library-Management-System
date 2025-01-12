import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

import "../styles/globals.css";

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
      path: "../styles/fonts/IBMPlexSans-SemiBOld.ttf",
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
      path: "../styles/fonts/IBMPlexSans-Bold.ttf",
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={` antialiased ${imbPlexSans.className} ${bebasNeue.variable}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
