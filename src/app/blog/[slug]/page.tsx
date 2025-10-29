import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { getPosts, getSinglePost } from "@/lib/query";

export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const data = await getPosts();

  if (!data?.posts) {
    return [];
  }

  return data.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getSinglePost(slug);

  if (!data?.post) {
    notFound();
  }

  const { post } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            className="font-medium text-primary text-sm hover:underline"
            href="/blog"
          >
            ← Back to Blog
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="mb-4 font-bold text-4xl">{post.title}</h1>

          <div className="mb-6 flex items-center gap-4 text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            {post.author && <span>by {post.author.name}</span>}
            {post.category && (
              <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground text-sm">
                {post.category.name}
              </span>
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

        <Prose html={post.content} />
      </div>
    </div>
  );
}
