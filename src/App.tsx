import { Routes, Route } from "react-router-dom";
import Layout from "@/Utilities/Layout";
import Home from "@/Pages/Home";
import About from "@/Pages/About";
import Contact from "@/Pages/Contact";
import Courses from "@/Pages/Courses";
import CourseDetails from "@/Pages/CourseDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/Courses" element={<Layout><Courses /></Layout>} />
      <Route path="/About" element={<Layout><About /></Layout>} />
      <Route path="/Contact" element={<Layout><Contact /></Layout>} />
      <Route path="/course/:id" element={<Layout><CourseDetails /></Layout>} />
    </Routes>
  );
}
