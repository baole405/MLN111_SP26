import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { PrincipleSection } from "@/components/principle-section"
import { LawsSection } from "@/components/laws-section"
import { CategoriesSection } from "@/components/categories-section"
import { Footer } from "@/components/footer"
import { ArenaSection } from "@/components/arena-section"
import { MindMapSection } from "@/components/mindmap-section"

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <div id="overview">
          <OverviewSection />
        </div>
        <PrincipleSection />
        <LawsSection />
        <CategoriesSection />
        <ArenaSection />
        <MindMapSection />
        <Footer />
      </main>
    </div>
  )
}
