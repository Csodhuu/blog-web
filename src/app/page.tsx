import Link from "next/link";

const quickLinks = [
  {
    title: "Competitions",
    description: "International tournaments and invitational showcases",
    href: "/competitions",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Camp Training",
    description: "High-performance clinics led by elite coaches",
    href: "/camps",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    title: "Gallery",
    description: "Travel diaries and memories captured on tour",
    href: "/album",
    accent: "bg-amber-100 text-amber-700",
  },
];

const latestEvents = [
  {
    title: "Asia-Pacific Hoops Showcase",
    location: "Singapore",
    date: "August 15, 2024",
    blurb: "U18 boys teams from five federations competing in a four-day round robin.",
  },
  {
    title: "Volleyball Champions Cup",
    location: "Bangkok, Thailand",
    date: "September 2, 2024",
    blurb: "Elite women’s clubs meet for a high-energy invitational with cultural excursions.",
  },
  {
    title: "Danang Discovery Tour",
    location: "Danang, Vietnam",
    date: "October 12, 2024",
    blurb: "Combined training and friendly fixtures supported by seaside recovery sessions.",
  },
];

const partners = [
  "FIBA Asia",
  "ASEAN Sports Council",
  "Nike Journey Fund",
  "Emirates",
  "Courtside Analytics",
  "Playmakers Travel",
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Gateway Sports Travel
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Elite travel logistics for teams chasing their next breakthrough.
              </h1>
              <p className="text-lg text-slate-600">
                We combine competition access, immersive cultural exchange, and tailored
                training environments so your athletes can perform at their peak wherever the
                schedule takes them.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/travel"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
                >
                  View travel windows
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
                >
                  Plan with us
                </Link>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Highlights
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    28
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Countries hosted</p>
                    <p>Trusted handling for federations across Asia, Europe, and the Middle East.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    620
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Athletes moved in 2023</p>
                    <p>Custom itineraries balancing performance, study, and cultural discovery.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    95%
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">Client retention</p>
                    <p>Multi-year partnerships with national programs and academies.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Quick Navigation
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Jump straight to the programs that matter most to your club.
              </h2>
            </div>
            <p className="max-w-2xl text-sm text-slate-600">
              From arena bookings to visas and wellness, Gateway orchestrates every moving
              piece so your staff can focus on developing players and strengthening team
              culture.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${link.accent}`}>
                  {link.title}
                </span>
                <p className="text-base font-semibold text-slate-900">{link.description}</p>
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Explore {link.title.toLowerCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Latest Event Spotlight
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Upcoming departures and showcase fixtures
            </h2>
            <p className="max-w-2xl text-sm text-slate-600">
              Each program includes pro-level competition, immersive tourism, and curated
              mentoring that ties every experience back to your development plan.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestEvents.map((event) => (
              <div
                key={event.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                    {event.date}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{event.location}</p>
                  <p className="text-sm text-slate-600">{event.blurb}</p>
                </div>
                <Link
                  href="/competitions"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Secure a slot
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Trusted By
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-center text-sm font-semibold text-slate-500 shadow-sm"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
