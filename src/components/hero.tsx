import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
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
    </div>
  );
}
