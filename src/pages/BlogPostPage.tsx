import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { ArticleStructuredData } from "../components/seo/StructuredData";
import { ButtonLink } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { RichText } from "../components/ui/RichText";
import { fetchBlogPost } from "../services/content";
import type { BlogPostDetail } from "../types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchBlogPost(slug)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-black text-[var(--color-mist-100)]">Article not found</h1>
        <div className="mt-6">
          <ButtonLink to="/blog">Back to blog</ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <ArticleStructuredData
        headline={post.title}
        description={post.excerpt}
        datePublished={post.created_at}
        dateModified={post.updated_at}
        path={`/blog/${post.slug}`}
      />

      <article className="mx-auto max-w-2xl px-5 lg:px-8 py-16 lg:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-mist-500)] hover:text-[var(--color-mist-100)]"
        >
          <ArrowLeft size={14} /> All articles
        </Link>

        {post.category && (
          <p className="mt-6 text-xs font-mono uppercase tracking-wider text-[var(--color-signal-400)]">{post.category.name}</p>
        )}
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black leading-[1.15] tracking-tight text-[var(--color-mist-100)]">
          {post.title}
        </h1>
        <p className="mt-4 text-xs text-[var(--color-mist-600)]">
          {formatDate(post.created_at)}
          {post.author_name ? ` · ${post.author_name}` : ""}
        </p>

        <Reveal className="mt-10 pt-10 border-t border-[var(--color-line-800)]">
          <RichText text={post.content} />
        </Reveal>

        <Reveal index={1} className="mt-14 rounded-2xl border border-[var(--color-line-800)] bg-[var(--color-ink-800)] p-8 text-center">
          <h2 className="text-lg font-semibold text-[var(--color-mist-100)]">Want a second opinion on your own setup?</h2>
          <p className="mt-2 text-sm text-[var(--color-mist-500)] max-w-md mx-auto">
            A free IT audit reviews your actual infrastructure — no obligation to continue.
          </p>
          <div className="mt-5 flex justify-center">
            <ButtonLink to="/it-audit" icon={<ArrowRight size={16} />}>
              Get Free IT Audit
            </ButtonLink>
          </div>
        </Reveal>
      </article>
    </>
  );
}
