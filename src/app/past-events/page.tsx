const recaps = [
  {
    title: "Hoops & Heritage Tour",
    date: "April 2024",
    location: "Seoul & Busan, South Korea",
    summary:
      "U16 development squads combined friendlies with university campus visits and a K-League fixture, concluding with a bilingual leadership forum.",
    highlight:
      "72 athletes, 5 academic partners, 1 documentary short film",
    album: "Gateway-Hoops-Heritage-2024",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Island Serve Classic",
    date: "December 2023",
    location: "Cebu, Philippines",
    summary:
      "Women’s volleyball showcase featuring ASEAN clubs with beach conditioning, youth clinics, and a coastal clean-up initiative.",
    highlight: "48 players, 3 televised matches, 12 community scholarships",
    album: "Island-Serve-Classic-2023",
    image:
      "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Euro Discovery Series",
    date: "August 2023",
    location: "Paris & Amsterdam",
    summary:
      "Hybrid program for student-athletes combining basketball clinics, museum residencies, and exchanges with local clubs.",
    highlight: "56 participants, 4 cultural labs, 2 signature victories",
    album: "Euro-Discovery-Series-2023",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
  },
];

export default function PastEventsPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Past Events</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Recaps that celebrate learning beyond the scoreboard
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Explore our previous tours and camps, including links to albums, highlight reels, and impact numbers your stakeholders can share.
          </p>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {recaps.map((recap) => (
              <div
                key={recap.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${recap.image})` }}
                  aria-label={`${recap.title} album image`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{recap.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{recap.date} • {recap.location}</p>
                  <p className="text-sm text-slate-600">{recap.summary}</p>
                  <p className="text-sm font-semibold text-primary/80">{recap.highlight}</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Album: {recap.album}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
