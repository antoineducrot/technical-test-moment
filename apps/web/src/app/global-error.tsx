"use client";

import { Inter as FontSans } from "next/font/google";

import { H1, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/style/cn";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const GlobalError = ({
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) => {
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

            <div className="mt-6">
              <Button onClick={() => reset()}>Retry</Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
