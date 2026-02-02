import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/data/posts";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/utils/constants";
import type { Post } from "@/Utilities/Post";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildArticleJsonLd(post: Post): Record<string, unknown> {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url,
    author: {
      "@type": "Organization",
      name: "Chemia z Wero",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Chemia z Wero",
      url: SITE_URL,
    },
  };
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });
  const articleJsonLd = useMemo(
    () => (post ? buildArticleJsonLd(post) : null),
    [post]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#D97745] border-t-transparent" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-[#1A3B47] mb-4">
          Nie znaleziono wpisu
        </h1>
        <Button className="bg-[#D97745] hover:bg-[#c66535]" asChild>
          <Link to="/blog">Wróć do bloga</Link>
        </Button>
      </div>
    );
  }

  const seoTitle = `${post.title} – Chemia z Wero`;
  const metaParts = [formatDate(post.publishedAt)];
  if (post.readTimeMinutes) metaParts.push(`${post.readTimeMinutes} min czytania`);

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO
        path={`/blog/${post.slug}`}
        title={seoTitle}
        description={post.excerpt}
        jsonLd={articleJsonLd ?? undefined}
      />
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-[#1A3B47]/60 hover:text-[#D97745] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do bloga
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A3B47] tracking-tight leading-tight mb-3">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-[#1A3B47]/70 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="border-b border-[#1A3B47]/15 pb-4 mb-4" aria-hidden />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#1A3B47]/60 pb-4 mb-4 border-b border-[#1A3B47]/15">
            <span className="font-semibold uppercase tracking-wider text-[#1A3B47]/80">
              Chemia z Wero
            </span>
            <span>{metaParts.join(" · ")}</span>
          </div>
        </header>

        <div className="blog-article">
          <ReactMarkdown>{post.content?.trim() ?? ""}</ReactMarkdown>
        </div>

        <footer className="mt-10 pt-6 border-t border-[#1A3B47]/10">
          <Button variant="outline" className="border-[#1A3B47]/20" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> Wszystkie wpisy
            </Link>
          </Button>
        </footer>
      </article>
    </div>
  );
}
