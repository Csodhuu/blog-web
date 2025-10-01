// import { HeroSection } from "@/components/hero-section";
// import { ClubSection } from "@/components/club-section";
// import { ActivitySection } from "@/components/activity-section";
// import { PartnersSection } from "@/components/partners-section";

import { Affiliate } from "@/components/affiliate";
import { ClubCard } from "@/components/club-card";
import { Competitions } from "@/components/competitions";
import { HeroSection } from "@/components/hero-selection";
import { NoteCard } from "@/components/note-card";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="relative overflow-hidden">
        <HeroSection />
        <ClubCard />
        <NoteCard />
        <Affiliate />
        <Competitions />
      </section>
    </div>
  );
}
