import { Header } from "@/components/header";
import { HyperText } from "@/components/ui/hyper-text";
import {
  CalendarRange,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const milestones = [
  {
    year: "2016",
    title: "Our Journey Begins",
    description:
      "Gateway Sports Travel was founded to connect athletes with global opportunities to train, compete, and grow.",
  },
  {
    year: "2019",
    title: "Global Partnerships",
    description:
      "We expanded our network to include 30+ partner clubs and training facilities across Asia, Europe, and North America.",
  },
  {
    year: "2022",
    title: "Community Impact",
    description:
      "Launched scholarship and mentorship programs that have supported more than 400 rising athletes.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Excellence First",
    description:
      "We elevate every detail—from travel logistics to on-the-ground support—so athletes can focus on performing their best.",
  },
  {
    icon: HeartHandshake,
    title: "People Over Itineraries",
    description:
      "Behind every itinerary is a dedicated team that listens, adapts, and delivers human-centered experiences.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Mindset",
    description:
      "Cutting-edge technology and data-backed planning keep our travelers ahead of the game and ahead of the competition.",
  },
];

const teamMembers = [
  {
    name: "Batsukh Erdene",
    role: "Founder & Head of Strategy",
    bio: "Sports agent turned travel strategist with 15+ years connecting athletes to international platforms.",
  },
  {
    name: "Chimgee Tsetseg",
    role: "Experience Director",
    bio: "Designs immersive, culturally rich programs that keep performance and wellbeing in balance.",
  },
  {
    name: "Boldbaatar Gan",
    role: "Operations Lead",
    bio: "The mastermind behind logistics, visas, and ensuring every team arrives ready to win.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <Header />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <HyperText className="text-4xl font-extrabold uppercase text-[#0f172a] md:text-6xl">
              We build pathways for athletes to see the world.
            </HyperText>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              From youth clubs to professional teams, Gateway Sports Travel blends elite sports logistics with
              storytelling-worthy travel moments. Every itinerary is crafted to inspire confidence, spark curiosity, and
              celebrate cultural exchange.
            </p>
          </div>
          <div className="mt-16 grid gap-6 rounded-3xl bg-white/70 p-8 shadow-xl shadow-emerald-200/40 backdrop-blur-xl md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-emerald-600">
                <Globe2 className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wide">Destinations</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">45+ cities</p>
              <p className="text-sm text-slate-500">Across five continents and growing every season.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-emerald-600">
                <Users className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wide">Athletes served</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">3,500+</p>
              <p className="text-sm text-slate-500">Teams, academies, and solo competitors we proudly support.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-emerald-600">
                <Trophy className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-wide">Championships</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">120+</p>
              <p className="text-sm text-slate-500">Tours that ended with medals, trophies, and new career milestones.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Our mission and story</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              We believe that talent blooms when athletes are exposed to the world. Our mission is to remove barriers to
              international competition by managing every logistical detail—from travel visas to tournament registrations
              and training camps—while keeping athlete wellbeing at the center.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              What began as a small collective of sports enthusiasts has evolved into a full-service travel partner for
              federations, clubs, and families. We operate with the agility of a boutique agency and the reliability of a
              global operator.
            </p>
          </div>
          <div className="space-y-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-emerald-50 shadow-lg">
            <h3 className="text-xl font-semibold">What guides us</h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <CalendarRange className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-200" />
                <span>Meticulous planning that anticipates the needs of athletes, coaches, and families.</span>
              </li>
              <li className="flex gap-3">
                <HeartHandshake className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-200" />
                <span>Long-term partnerships with clubs, federations, and schools built on trust and shared goals.</span>
              </li>
              <li className="flex gap-3">
                <Globe2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-200" />
                <span>Responsible travel practices that respect local cultures and leave a positive footprint.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Our core values</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-3xl border border-emerald-100 bg-white/70 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-emerald-200/60"
              >
                <value.icon className="h-10 w-10 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-20 text-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold md:text-4xl">Milestones we celebrate</h2>
              <p className="mt-4 text-lg text-emerald-100">
                Every year we welcome new teams into our family and chart bold travel plans. Here are some highlights that
                continue to shape our story.
              </p>
            </div>
            <div className="flex-1 space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-widest text-emerald-200">{milestone.year}</span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100">
                      <Trophy className="h-4 w-4" />
                      Highlight
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-100">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Meet the leadership</h2>
            <p className="mt-4 text-lg text-slate-600">
              A collective of strategists, coordinators, and storytellers dedicated to unlocking unforgettable sports
              travel experiences.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/80 p-8 text-left shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Leadership</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">{member.role}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{member.bio}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-emerald-400">
                  <span>Connect</span>
                  <span className="h-0.5 w-8 bg-emerald-300" />
                  <span>Inspire</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
