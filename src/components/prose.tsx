import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProseProps = HTMLAttributes<HTMLElement> & {
  as?: "article";
  html: string;
};

function sanitizeHtml(input: string): string {
  let out = input.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/javascript:/gi, "");
  return out;
}

export function Prose({ children, html, className, ...props }: ProseProps) {
  return (
    <article
      className={cn(
        "prose dark:prose-invert mx-auto w-full max-w-4xl prose-img:rounded-xl prose-p:text-justify prose-headings:font-normal prose-a:text-primary prose-h1:text-xl",
        className
      )}
      {...props}
    >
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
      ) : (
        children
      )}
    </article>
  );
}
