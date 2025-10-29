import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <h1 className="flex flex-wrap items-center justify-center gap-2 text-center font-bold text-4xl tracking-tight">
        Marble&nbsp;CMS
        <span className="inline-flex items-center gap-2">
          with
          <span className="-space-x-2 inline-flex items-center">
            <Image
              alt="Marble CMS logo"
              className="rounded-full border"
              height={40}
              src="https://github.com/usemarble.png"
              width={40}
            />
            <Image
              alt="shadcn avatar"
              className="rounded-full"
              height={40}
              src="https://github.com/shadcn.png"
              width={40}
            />
          </span>
          shadcn
        </span>
        blog template
      </h1>

      <p className="max-w-2xl text-center text-lg text-muted-foreground">
        A blog template using Next.js, Marble CMS, and shadcn/ui.
      </p>

      <div className="flex gap-2">
        <Button asChild className="h-11">
          <Link href="/blog">View Blog</Link>
        </Button>
        <Button asChild className="h-11" variant="outline">
          <Link
            href="https://marblecms.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}
