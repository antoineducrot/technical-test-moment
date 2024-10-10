import "./globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { type ReactNode } from "react";

import { cn } from "@/lib/style/cn";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Moment App",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
};

export { RootLayout as default, metadata };
