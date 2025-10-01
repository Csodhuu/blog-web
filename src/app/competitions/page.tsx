const upcomingEvents = [
  {
    title: "Gateway U18 Basketball Invitational",
    sport: "Basketball",
    date: "2024-08-15",
    location: "Singapore Sports Hub",
    description:
      "Round robin featuring elite academies with analytics support, recovery stations, and cultural immersion days.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "ASEAN Women’s Volleyball Classic",
    sport: "Volleyball",
    date: "2024-09-02",
    location: "Bangkok Arena, Thailand",
    description:
      "Eight-team invitational with FIVB-certified officials, televised matches, and tailored sightseeing for delegates.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gateway Futsal Masters",
    sport: "Futsal",
    date: "2024-10-05",
    location: "Kuala Lumpur, Malaysia",
    description:
      "Fast-paced indoor futsal tournament with youth and senior divisions plus coaching masterclasses.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  },
];

const pastEvents = [
  {
    title: "Danang Friendship Cup",
    sport: "Basketball",
    date: "2023-10-12",
    location: "Danang, Vietnam",
    description:
      "Combined boys and girls competition culminating in leadership workshops and coastal restoration volunteering.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tokyo Skills Festival",
    sport: "Volleyball",
    date: "2023-07-28",
    location: "Tokyo, Japan",
    description:
      "Three-day showcase with Japanese university squads, culminating in a bilingual awards gala.",
    image:
      "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Bali Unity Games",
    sport: "Multi-sport",
    date: "2022-11-18",
    location: "Bali, Indonesia",
    description:
      "Basketball, volleyball, and futsal events paired with cultural crafts, community visits, and alumni networking.",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
  },
];

function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function EventCard({
  event,
}: {
  event: {
    title: string;
    sport: string;
    date: string;
    location: string;
    description: string;
    image: string;
  };
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div
        className="h-44 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
        aria-label={`${event.title} photo`}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
          <span>{event.sport}</span>
          <span>{formatDisplayDate(event.date)}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
        <p className="text-sm font-medium text-slate-500">{event.location}</p>
        <p className="text-sm text-slate-600">{event.description}</p>
        <div className="mt-auto pt-4 text-sm font-semibold text-primary">Request full brief</div>
      </div>
    </div>
  );
}

export default function CompetitionsPage() {
  const sortedUpcoming = [...upcomingEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Competitions
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Upcoming and legacy events designed for growth
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            We curate invitational tournaments and showcase fixtures that match your team’s development stage. All upcoming events are listed in order of the nearest departure so you can secure slots early.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Upcoming Events
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">Secure your next competition</h2>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedUpcoming.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Past Events
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">Highlights from previous tours</h2>
            <p className="max-w-3xl text-sm text-slate-600">
              Our past events feature post-tour reports, film sessions, and curated photo albums to keep your athletes motivated and engaged.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
