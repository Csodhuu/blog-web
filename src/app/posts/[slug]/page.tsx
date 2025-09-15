import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <article className="prose dark:prose-invert mx-auto py-8 px-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.date).toDateString()}
      </p>
      <div className="mt-6 space-y-4">
        {post.content.split("\n\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
      <Link href="/" className="block mt-8 text-blue-600 hover:underline">
        ← Back to home
      </Link>
    </article>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
