import { ArenaSection } from "@/components/arena-section";
import { CategoriesSection } from "@/components/categories-section";
import { Footer } from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeroSection } from "@/components/hero-section";
import { InteractiveSection } from "@/components/interactive";
import { LawsSection } from "@/components/laws-section";
import { MatcherSection } from "@/components/matcher";
import { MindMapSection } from "@/components/mindmap-section";
import { OverviewSection } from "@/components/overview-section";
import { PrincipleSection } from "@/components/principle-section";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-background">


          <main className="min-h-screen">
            <HeroSection />
            <div id="overview">
              <OverviewSection />
            </div>
            <PrincipleSection />
            <LawsSection />
            <CategoriesSection />
            <InteractiveSection />
            <MatcherSection />
            <ArenaSection />
            <MindMapSection />
            <Footer />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
