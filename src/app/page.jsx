import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/hero/Hero";

export default function Home() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div>
          <HeroSection />
        </div>
      </div>
    </main>
  );
}
