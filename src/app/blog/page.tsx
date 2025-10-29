import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/query";

// Revalidate this page every hour
export const revalidate = 3600;
export const dynamic = "force-static";

export default async function BlogPage() {
  const data = await getPosts();

  if (!data?.posts) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-bold text-3xl">Blog</h1>
        <p>No posts found. Please check your Marble CMS configuration.</p>
      </div>
    );
  }

  const { posts } = data;

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <div className="flex items-center gap-3">
        <Button asChild size={"icon"} variant={"outline"}>
          <Link href="/">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight">Blog</h1>
      </div>
      <section className="space-y-6">
        {posts.map((post) => (
          <article
            className="border-border border-b pb-6 last:border-b-0"
            key={post.id}
          >
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl transition-colors hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                {post.author && <span>by {post.author.name}</span>}
                {post.category && (
                  <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground text-xs">
                    {post.category.name}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
