import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeSection } from "@/components/marquee-section"
import { FeaturesSection } from "@/components/features-section"
import { ProcessSection } from "@/components/process-section"
import { PricingSection } from "@/components/pricing-section"
import { StatsSection } from "@/components/stats-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Floating3DObjects } from "@/components/floating-3d-objects"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Floating3DObjects />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
        <ProcessSection />
        <PricingSection />
        <StatsSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  )
}
