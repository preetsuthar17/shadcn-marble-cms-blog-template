import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link className="font-bold text-xl" href="/">
            Marble Blog
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="https://marblecms.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Marble CMS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
