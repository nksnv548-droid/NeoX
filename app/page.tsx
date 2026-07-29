import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhySignals from "@/components/sections/WhySignals";
import Process from "@/components/sections/Process";
import DesignEngineering from "@/components/sections/DesignEngineering";
import PreviewCTA from "@/components/sections/PreviewCTA";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative bg-ink-950">
      <Navbar />
      <Hero />
      <Services />
      <WhySignals />
      <Process />
      <DesignEngineering />
      <PreviewCTA />
      <Work />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
