import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Workflow from "@/components/landing/Workflow";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#030014] min-h-screen text-white scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Workflow />
      <Footer />
    </div>
  );
}
