"use client";

import { Inter as FontSans } from "next/font/google";
import Link from "next/link";

import { H1, P } from "@/components/typography";
import { cn } from "@/lib/style/cn";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const GlobalError = () => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto h-12 w-12 text-primary" />
            <H1 className="mt-4">Oops, something went wrong!</H1>
            <P className="mt-4">
              We are sorry, but an unexpected error occurred. Please try again
              later.
            </P>

            <Link
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              href="/"
              prefetch={false}
            >
              Return to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
