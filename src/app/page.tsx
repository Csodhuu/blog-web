import Link from "next/link";
import { posts } from "@/data/posts";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toDateString()}
            </p>
            <p className="mt-2 text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
