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
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="min-h-screen bg-[#FFFBF0] py-12">
      <SEO path="/blog" title={BLOG_TITLE} description={BLOG_DESCRIPTION} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] mb-4">Blog</h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto">
            Wskazówki do nauki chemii, porady maturalne i krótkie wpisy o maturze rozszerzonej.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-white rounded-2xl animate-pulse border border-[#D97745]/10" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-[#D97745]/20">
                <div className="mx-auto w-16 h-16 bg-[#FFFBF0] rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#1A3B47]/40" />
                </div>
                <h3 className="text-lg font-medium text-[#1A3B47] mb-1">Brak wpisów</h3>
                <p className="text-[#1A3B47]/60">Wkrótce pojawią się pierwsze artykuły.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
