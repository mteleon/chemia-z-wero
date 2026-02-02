import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Post } from "@/Utilities/Post";

type Props = { post: Post };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({ post }: Props) {
  const meta = [formatDate(post.publishedAt)];
  if (post.readTimeMinutes) meta.push(`${post.readTimeMinutes} min`);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-[#1A3B47]/10 p-6 hover:border-[#D97745]/25 hover:shadow-md transition-all duration-200"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-[#1A3B47]/50 mb-3">
        {meta.join(" · ")}
      </p>
      <h2 className="text-xl font-bold text-[#1A3B47] mb-2 group-hover:text-[#D97745] transition-colors line-clamp-2">
        {post.title}
      </h2>
      <p className="text-[#1A3B47]/70 text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
        {post.excerpt}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#D97745] group-hover:gap-2 transition-all mt-auto">
        Czytaj artykuł
        <ChevronRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
