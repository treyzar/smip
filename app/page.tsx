import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { ProcessSection } from "@/components/process-section"
import { BenefitsSection } from "@/components/benefits-section"
import { CatchAnalyticsGame } from "@/components/catch-analytics-game"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
        <FeaturesSection />
        <ProcessSection />
        <BenefitsSection />
        <CatchAnalyticsGame />
        <FaqSection />
        <CtaSection />
        <Footer />
      </div>
      <ChatWidget />
    </main>
  )
}
