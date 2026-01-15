import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { PrincipleSection } from "@/components/principle-section"
import { LawsSection } from "@/components/laws-section"
import { CategoriesSection } from "@/components/categories-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <OverviewSection />
      <PrincipleSection />
      <LawsSection />
      <CategoriesSection />
      <Footer />
    </main>
  )
}
