import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/Utilities/Layout";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/Pages/Home"));
const About = lazy(() => import("@/Pages/About"));
const Contact = lazy(() => import("@/Pages/Contact"));
const Courses = lazy(() => import("@/Pages/Courses"));
const CourseDetails = lazy(() => import("@/Pages/CourseDetails"));
const NotFound = lazy(() => import("@/Pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97745]"></div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
<Route path="/kursy" element={<Layout><Courses /></Layout>} />
        <Route path="/kursy/:id" element={<Layout><CourseDetails /></Layout>} />
        <Route path="/o-mnie" element={<Layout><About /></Layout>} />
        <Route path="/kontakt" element={<Layout><Contact /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Suspense>
  );
}
