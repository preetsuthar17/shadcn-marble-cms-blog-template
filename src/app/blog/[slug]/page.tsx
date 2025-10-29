import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { Prose } from "@/components/prose";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPosts, getSinglePost } from "@/lib/query";

export const revalidate = 3600;

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const data = await getPosts();

  if (!data?.posts) {
    return [];
  }

  return data.posts.map((post) => ({
    slug: post.slug,
  }));
}

async function highlightCodeBlocks(html: string): Promise<string> {
  // Match <pre><code class="language-xxx">...</code></pre> blocks
  const codeBlockRegex =
    /<pre>\s*<code\s+class="language-([\w+-]+)">([\s\S]*?)<\/code>\s*<\/pre>/gim;

  // Minimal HTML entity decode for typical code content
  const decodeEntities = (input: string) =>
    input
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

  let result = html;
  const matches = Array.from(html.matchAll(codeBlockRegex));

  for (const match of matches) {
    const fullMatch = match[0];
    const lang = match[1];
    const rawCode = match[2] ?? "";
    const code = decodeEntities(rawCode);

    let highlighted = fullMatch;
    try {
      highlighted = await codeToHtml(code, {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
    } catch {
      // If highlighting fails, keep the original block
    }

    result = result.replace(fullMatch, highlighted);
  }

  return result;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getSinglePost(slug);

  if (!data?.post) {
    notFound();
  }

  const { post } = data;

  const highlightedHtml = await highlightCodeBlocks(post.content);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto flex w-full flex-col gap-8">
        <Button asChild className="w-fit" variant="outline">
          <Link href="/blog">
            <ArrowLeft />
            Back to Blog
          </Link>
        </Button>

        <header className="flex flex-col gap-6">
          <h1 className="font-bold text-4xl">{post.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground">
            <time className="font-mono text-sm" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            {post.author && <span>by {post.author.name}</span>}
            {post.category && (
              <Badge variant="secondary">{post.category.name}</Badge>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  className="rounded-md bg-muted px-2 py-1 text-muted-foreground text-sm"
                  key={tag.id}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        <Prose html={highlightedHtml} />
      </div>
    </div>
  );
}
