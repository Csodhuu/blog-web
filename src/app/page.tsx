import { Affiliate } from "@/components/affiliate";
import { ClubCard } from "@/components/club-card";
import { Competitions } from "@/components/competitions";
import { HeroSection } from "@/components/hero-selection";
import { NoteCard } from "@/components/note-card";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="fixed uppercase  text-gray-500 opacity-10 z-10 w-full h-screen flex justify-center items-center ">
        <p className="font-black text-[222px]">gateway</p>
      </div>
      <section className="relative overflow-hidden z-20">
        <HeroSection />
        <ClubCard />
        <NoteCard />
        <Competitions />
        <Affiliate />
      </section>
    </div>
  );
}
