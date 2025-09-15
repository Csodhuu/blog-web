export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2024-01-01",
    excerpt: "Learn how to set up a project with Next.js and Tailwind CSS.",
    content: `Next.js makes it easy to build full-stack React applications. This starter blog demonstrates how to use the app router along with Tailwind CSS for styling.`
  },
  {
    slug: "designing-a-blog",
    title: "Designing a Blog with Tailwind",
    date: "2024-02-15",
    excerpt: "Use utility-first classes to craft a clean and responsive blog layout.",
    content: `Tailwind CSS provides a rich set of utilities that let you build modern interfaces without leaving your HTML. This post walks through creating reusable components for your posts.`
  }
];
