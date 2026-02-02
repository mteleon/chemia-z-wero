import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Post } from "@/Utilities/Post";

type Props = { post: Post };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({ post }: Props) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300"
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-xs text-[#1A3B47]/60 mb-3">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className="text-xl font-bold text-[#1A3B47] mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[#1A3B47]/70 text-sm mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-[#D97745]/10">
          <Button size="sm" className="bg-[#1A3B47] hover:bg-[#2c505e] text-white gap-2" asChild>
            <Link to={`/blog/${post.slug}`}>
              Czytaj więcej <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
