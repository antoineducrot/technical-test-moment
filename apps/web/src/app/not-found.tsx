import Link from "next/link";

import { H1, P } from "@/components/typography";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <H1 className="mt-4">404</H1>
        <P className="mt-4">Page not found</P>
        <P className="mt-6">The page you requested does not exist</P>
        <div className="mt-8">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href="/"
            prefetch={false}
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
