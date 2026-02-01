import { Affiliate } from "@/components/affiliate";
import { ClubCard } from "@/components/club-card";
import { Competitions } from "@/components/competitions";
import { HeroSection } from "@/components/hero-selection";
import { NoteCard } from "@/components/note-card";
import Image from "next/image";
import Logo from "../../public/head-logo.png";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="fixed uppercase  text-gray-500 opacity-10 z-10 w-full h-screen flex justify-center items-center ">
        <div className="flex items-center gap-3 text-primary justify-center mb-[12px]">
          <div className="flex relative h-[450px] w-[950px] items-center justify-center rounded-2xl">
            <Image src={Logo} alt="" fill className="object-contain" />
          </div>
        </div>
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
