import { ArenaSection } from "@/components/arena-section";
import { CategoriesSection } from "@/components/categories-section";
import { Footer } from "@/components/footer";
import { GameSection } from "@/components/game";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { InteractiveSection } from "@/components/interactive";
import { LawsSection } from "@/components/laws-section";
import { MatcherSection } from "@/components/matcher";
import { MindMapSection } from "@/components/mindmap-section";
import { OverviewSection } from "@/components/overview-section";
import { PrincipleSection } from "@/components/principle-section";

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
        <InteractiveSection />
        <GameSection />
        <MatcherSection />
        <ArenaSection />
        <MindMapSection />
        <Footer />
      </main>
    </div>
  );
}
