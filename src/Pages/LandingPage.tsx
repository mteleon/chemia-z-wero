import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLandingBySlug } from "@/data/landings";
import { getCourses } from "@/data/courses";
import { getPosts } from "@/data/posts";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import CourseCard from "@/components/CourseCard";
import NotFound from "@/Pages/NotFound";
import { ArrowRight, CheckCircle, BookOpen } from "lucide-react";

export default function LandingPage() {
  const { landingSlug } = useParams<{ landingSlug: string }>();

  const { data: landing, isLoading } = useQuery({
    queryKey: ["landing", landingSlug],
    queryFn: () => getLandingBySlug(landingSlug!),
    enabled: !!landingSlug,
  });

  const { data: allCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    enabled: !!landing?.relatedCourseIds?.length,
  });

  const { data: allPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: !!landing?.relatedPostSlugs?.length,
  });

  const relatedCourses = React.useMemo(() => {
    if (!allCourses || !landing?.relatedCourseIds?.length) return [];
    return landing.relatedCourseIds
      .map((id) => allCourses.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => !!c);
  }, [allCourses, landing?.relatedCourseIds]);

  const relatedPosts = React.useMemo(() => {
    if (!allPosts || !landing?.relatedPostSlugs?.length) return [];
    return landing.relatedPostSlugs
      .map((slug) => allPosts.find((p) => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => !!p);
  }, [allPosts, landing?.relatedPostSlugs]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97745]" />
      </div>
    );
  }

  if (!landing) {
    return <NotFound />;
  }

  const path = `/${landing.slug}`;

  return (
    <div className="bg-[#FFFBF0] min-h-screen">
      <SEO
        path={path}
        title={landing.metaTitle}
        description={landing.metaDescription}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-12 lg:pt-20 lg:pb-16 bg-[#1A3B47] text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {landing.heroHeading}
          </h1>
          <p className="text-xl text-white/85 max-w-2xl leading-relaxed">
            {landing.heroSubheading}
          </p>
        </div>
      </section>

      {/* Benefits */}
      {landing.benefits?.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1A3B47] mb-8">
              Co zyskujesz
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {landing.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-[#F4B942]/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D97745]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#D97745]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A3B47] mb-1">
                        {benefit.title}
                      </h3>
                      {benefit.description && (
                        <p className="text-[#1A3B47]/70 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related courses */}
      {relatedCourses.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1A3B47] mb-8">
              Polecane kursy
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-[#D97745] hover:bg-[#c66535] text-white rounded-full gap-2"
                asChild
              >
                <Link to={createPageUrl("Courses")}>
                  Zobacz wszystkie kursy <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1A3B47] mb-8">
              Więcej w blogu
            </h2>
            <ul className="space-y-3">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#1A3B47] hover:text-[#D97745] font-medium transition-colors"
                  >
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    {post.title}
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                to={createPageUrl("Posts")}
                className="text-[#D97745] hover:text-[#c66535] font-medium text-sm"
              >
                Wszystkie wpisy na blogu →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[#1A3B47] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Gotowy na lekcje z chemii?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            Wybierz kurs lub skontaktuj się – dopasujemy formę i termin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#D97745] hover:bg-[#c66535] text-white font-bold px-8 h-12 rounded-full"
              asChild
            >
              <Link to={createPageUrl("Courses")}>Zapisz się na kurs</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8 h-12 rounded-full"
              asChild
            >
              <Link to={createPageUrl("Contact")}>Kontakt</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
