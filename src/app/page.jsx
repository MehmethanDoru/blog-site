import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/hero/Hero";
import TechReviews from "../components/tech-reviews/TechReviews";
import EditorsSection from "../components/editors-section/EditorsSection";

export default function Home() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div>
          <HeroSection />
          <EditorsSection />
          <TechReviews />
        </div>
      </div>
    </main>
  );
}
