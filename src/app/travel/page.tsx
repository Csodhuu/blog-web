import { Header } from "@/components/header";
import { HyperText } from "@/components/ui/hyper-text";
import {
  CalendarDays,
  Camera,
  Compass,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const featuredJourneys = [
  {
    title: "Elite Training Camp: Tokyo",
    location: "Tokyo, Japan",
    description:
      "Immerse your squad in the discipline of Japanese training programs with access to national team facilities and coaches.",
    highlights: [
      "Technical clinics with J-League staff",
      "Cultural immersion day in Asakusa",
      "Friendly fixtures with partner academies",
    ],
  },
  {
    title: "Championship Quest: Barcelona",
    location: "Barcelona, Spain",
    description:
      "Compete against Europe's rising clubs while exploring the architecture, cuisine, and passion of Catalonia.",
    highlights: [
      "Tournament entry to the Mediterranean Youth Cup",
      "Camp Nou behind-the-scenes experience",
      "Recovery sessions on the Costa Brava",
    ],
  },
  {
    title: "Altitude Advantage: Denver",
    location: "Denver, USA",
    description:
      "Build endurance at elevation with sports science support, mountain excursions, and scrimmages versus elite academies.",
    highlights: [
      "Performance testing with biometric analysis",
      "Pro coaching guest lectures",
      "Adventure day in the Rockies",
    ],
  },
];

const travelHighlights = [
  {
    icon: ShieldCheck,
    title: "End-to-end safety",
    description:
      "24/7 chaperone support, vetted accommodations, and comprehensive insurance keep your team protected.",
  },
  {
    icon: Compass,
    title: "Purpose-built itineraries",
    description:
      "Every day balances competition prep with recovery, culture, and connection to the local community.",
  },
  {
    icon: Plane,
    title: "Seamless air travel",
    description:
      "Group bookings, sports equipment handling, and expedited customs clearance make departures effortless.",
  },
  {
    icon: Globe2,
    title: "Global expertise",
    description:
      "On-the-ground partners in 45+ cities mean we can pivot quickly and deliver localized solutions.",
  },
  {
    icon: Star,
    title: "Premium experiences",
    description:
      "Private stadium tours, pro-club meetups, and curated dining prove that travel can inspire as much as it informs.",
  },
  {
    icon: Camera,
    title: "Storytelling support",
    description:
      "Content crews capture highlight reels, photography, and daily recaps so families never miss a moment.",
  },
];

const upcomingDepartures = [
  {
    title: "Pacific Rim Friendship Series",
    location: "Seoul & Tokyo",
    window: "July 8 - 20, 2024",
    availability: "4 team slots left",
  },
  {
    title: "European Futsal Showcase",
    location: "Lisbon & Madrid",
    window: "September 12 - 22, 2024",
    availability: "Waitlist open",
  },
  {
    title: "Winter Classic Hockey Tour",
    location: "Stockholm & Helsinki",
    window: "December 3 - 14, 2024",
    availability: "6 team slots left",
  },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white">
      <Header />

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(5,150,105,0.15),_transparent_60%)]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <HyperText className="text-4xl font-extrabold uppercase text-[#0f172a] md:text-6xl">
              Travel engineered for athletes who dream bigger.
            </HyperText>
            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              We curate competitive journeys that keep athletes primed to perform. Every tour integrates expert coaching,
              recovery science, and unforgettable cultural immersion—because growth happens on and off the court.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 rounded-3xl bg-white/70 p-8 shadow-xl shadow-emerald-200/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-100/60 px-5 py-3 text-emerald-700">
              <Plane className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Chartered flights</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-100/60 px-5 py-3 text-emerald-700">
              <Trophy className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Tournament access</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-100/60 px-5 py-3 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Signature moments</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Featured journeys</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Signature itineraries designed for high-performing teams that want access to elite facilities and
                meaningful cultural experiences.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow hover:border-emerald-300 hover:text-emerald-800"
            >
              Request a custom tour
              <Compass className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredJourneys.map((journey) => (
              <article
                key={journey.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-200/60"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-emerald-600">
                    <MapPin className="h-4 w-4" />
                    {journey.location}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{journey.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{journey.description}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {journey.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <Star className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-20 text-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Why teams choose Gateway</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {travelHighlights.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <item.icon className="h-8 w-8 text-emerald-200" />
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-emerald-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Upcoming departures</h2>
            <p className="mt-4 text-lg text-slate-600">
              Reserve a place on our most popular tours or contact us to build a bespoke itinerary around your season.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {upcomingDepartures.map((departure) => (
              <div
                key={departure.title}
                className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-emerald-200/60"
              >
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  <CalendarDays className="h-4 w-4" />
                  {departure.window}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{departure.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{departure.location}</p>
                <p className="mt-4 text-sm font-medium text-emerald-600">{departure.availability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.14),_transparent_60%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Let&apos;s map your next victory lap</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Share your performance goals, team size, and preferred travel window. Our specialists will craft a
                proposal within 48 hours complete with budget, logistics, and competitive opportunities.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:translate-y-[-2px] hover:bg-emerald-700"
              >
                Start planning
                <Plane className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-xl shadow-emerald-200/50">
              <h3 className="text-xl font-semibold text-slate-900">Tailored proposal includes</h3>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>Competitive analysis of regional tournaments suited to your level.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>Risk management plan with health, safety, and compliance protocols.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trophy className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>Training, scrimmage, and sightseeing schedule crafted around peak performance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
