import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { Reveal } from "../components/ui/Reveal";
import { fetchBlogPosts } from "../services/content";
import type { BlogPostSummary } from "../types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBlogPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Seo
        title="IT & Cybersecurity Blog"
        description="Practical, technically accurate guides on network security, backup, monitoring and IT strategy for small and mid-sized businesses in Armenia."
        path="/blog"
      />

      <section className="mx-auto max-w-5xl px-5 lg:px-8 py-16 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">Blog</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black text-[var(--color-mist-100)] tracking-tight">
            IT guides for growing businesses
          </h1>
          <p className="mt-4 text-[var(--color-mist-400)] leading-relaxed">
            Practical, technically grounded articles on network security, backup, monitoring and IT strategy — no
            filler, no vendor hype.
          </p>
        </Reveal>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
          </div>
        )}

        {!loading && (error || posts.length === 0) && (
          <p className="mt-10 text-sm text-[var(--color-mist-500)]">New articles are on the way — check back soon.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {posts.map((post, i) => (
              <Reveal key={post.slug} index={i}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block h-full rounded-xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-6 flex flex-col hover:border-[var(--color-signal-500)] hover:-translate-y-0.5 transition-[border-color,transform] duration-200"
                >
                  {post.category && (
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">{post.category.name}</span>
                  )}
                  <h2 className="mt-2 text-base font-semibold text-[var(--color-mist-100)] leading-snug">{post.title}</h2>
                  <p className="mt-2 text-sm text-[var(--color-mist-500)] leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-mist-600)]">{formatDate(post.created_at)}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-mist-500)] group-hover:text-[var(--color-signal-400)]">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
