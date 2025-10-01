const paragraphs = [
  "Gateway Sports Travel was established to ensure clubs and national programs across Asia could access international competition without sacrificing athlete welfare. We deliver door-to-door travel management, sport-specific planning, and cultural integration that keep teams focused on performance while we handle the rest.",
  "From our first invitational tournament in 2011 to today’s multi-country tours, we have stayed committed to building opportunities for young people to grow as competitors and global citizens. Every itinerary is co-created with coaches to balance intense training blocks, academic responsibilities, and restorative experiences.",
  "Our relationships with federations, embassies, and premium hospitality partners allow us to navigate logistics with precision. Whether your team is chasing continental qualification or taking a developmental leap, Gateway Sports Travel provides the structure and on-site support to make it happen with confidence.",
];

const timeline = [
  {
    year: "2011",
    milestone:
      "Launched Gateway Sports Travel with our first basketball invitational in Manila, hosting five regional academies.",
  },
  {
    year: "2015",
    milestone:
      "Expanded into multi-sport offerings, introducing volleyball, futsal, and swimming exchanges alongside cultural tours.",
  },
  {
    year: "2018",
    milestone:
      "Opened visa facilitation and compliance services, streamlining documentation for youth teams across 12 countries.",
  },
  {
    year: "2021",
    milestone:
      "Launched the Gateway Performance Network connecting sports scientists, nutritionists, and language specialists to every tour.",
  },
  {
    year: "2024",
    milestone:
      "Celebrated 600+ athletes managed annually with hybrid travel programs that combine competition, camps, and academic visits.",
  },
];

const capabilities = [
  {
    title: "Travel Management",
    description:
      "Chartered flights, accommodation sourcing, insurance, and on-ground transportation coordinated to match sporting schedules.",
  },
  {
    title: "Event Production",
    description:
      "From arena booking to technical officiating, we stage tournaments, friendlies, and showcases tailored to your objectives.",
  },
  {
    title: "Visa & Compliance",
    description:
      "Dedicated specialists handle entry requirements, letters of invitation, and guardian coordination for every participant.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            About Us
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gateway Sports Travel: elevating teams through global experiences
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6 text-base text-slate-600">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div
              className="rounded-3xl border border-slate-200 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center shadow-inner"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Our Journey
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Timeline of key moments
            </h2>
            <p className="text-sm text-slate-600">
              Strategic growth over the past decade has allowed us to broaden
              disciplines, destinations, and service depth while maintaining
              boutique attention to detail.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-primary">
                  {item.year}
                </p>
                <p className="mt-3 text-base font-medium text-slate-800">
                  {item.milestone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              What we can do
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Comprehensive travel, event, and visa execution
            </h2>
            <p className="text-sm text-slate-600">
              We partner with coaches, athletic directors, and guardians to
              deliver turnkey solutions that align with competitive calendars
              and academic priorities.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-base font-semibold text-slate-900">
                  {capability.title}
                </p>
                <p className="text-sm text-slate-600">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
