import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/data/posts";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
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
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97745]" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0]">
        <h1 className="text-2xl font-bold text-[#1A3B47] mb-4">Nie znaleziono wpisu</h1>
        <Button className="bg-[#D97745] hover:bg-[#c66535]" asChild>
          <Link to="/blog">Wróć do bloga</Link>
        </Button>
      </div>
    );
  }

  const seoTitle = `${post.title} – Chemia z Wero`;
  const articleJsonLd = useMemo(() => buildArticleJsonLd(post), [post]);

  return (
    <div className="bg-[#FFFBF0] min-h-screen pb-24">
      <SEO
        path={`/blog/${post.slug}`}
        title={seoTitle}
        description={post.excerpt}
        jsonLd={articleJsonLd}
      />
      <div className="bg-[#1A3B47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do bloga
          </Link>
          <time dateTime={post.publishedAt} className="text-sm text-white/70 block mb-2">
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <article className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
          <div
            className="prose prose-slate max-w-none text-[#1A3B47]/90 prose-headings:text-[#1A3B47] prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.trim() }}
          />
        </article>
      </div>
    </div>
  );
}
