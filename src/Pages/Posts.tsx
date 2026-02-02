import React from "react";
import { getPosts } from "@/data/posts";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import PostCard from "@/components/PostCard";
import SEO from "@/components/SEO";

const BLOG_TITLE = "Blog – Chemia z Wero";
const BLOG_DESCRIPTION =
  "Porady maturalne, wskazówki do nauki chemii i krótkie wpisy o maturze rozszerzonej. Korepetycje online – Chemia z Wero.";

export default function Posts() {
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="min-h-screen bg-[#FFFBF0] py-12">
      <SEO path="/blog" title={BLOG_TITLE} description={BLOG_DESCRIPTION} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto leading-relaxed">
            Wskazówki do nauki chemii, porady maturalne i krótkie wpisy o maturze rozszerzonej.
          </p>
        </header>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-white rounded-2xl border border-[#1A3B47]/10 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="py-24 text-center border border-dashed border-red-200 rounded-2xl bg-red-50/50">
            <h3 className="text-lg font-medium text-[#1A3B47] mb-1">
              Błąd ładowania wpisów
            </h3>
            <p className="text-[#1A3B47]/60 text-sm font-mono">
              {String(error?.message ?? error)}
            </p>
          </div>
        ) : posts && posts.length > 0 ? (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        ) : (
          <div className="py-24 text-center border border-dashed border-[#D97745]/20 rounded-2xl">
            <div className="mx-auto w-16 h-16 bg-[#FFFBF0] rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-[#1A3B47]/40" />
            </div>
            <h3 className="text-lg font-medium text-[#1A3B47] mb-1">
              Brak wpisów
            </h3>
            <p className="text-[#1A3B47]/60">
              Wkrótce pojawią się pierwsze artykuły.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
