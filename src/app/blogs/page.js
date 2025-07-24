import Link from 'next/link';

const blogPosts = [
  { slug: 'blog-1', title: 'First Blog Post' },
  { slug: 'blog-2', title: 'Second Blog Post' },
  { slug: 'blog-3', title: 'Third Blog Post' },
  { slug: 'blog-4', title: 'Fourth Blog Post' },
];

export default function Blogs() {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
