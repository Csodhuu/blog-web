const camps = [
  {
    title: "Gateway High Performance Camp",
    sport: "Basketball",
    date: "July 4 – 10, 2024",
    location: "Clark, Philippines",
    description:
      "Strength & conditioning diagnostics, positional skills labs, and leadership sessions with PBA mentors.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Serve & Soar Volleyball Clinic",
    sport: "Volleyball",
    date: "August 14 – 20, 2024",
    location: "Chiang Mai, Thailand",
    description:
      "International coaching roster focusing on serve receive systems, mental resilience, and yoga recovery.",
    image:
      "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Future Stars Multi-Sport Academy",
    sport: "Multi-sport",
    date: "September 9 – 15, 2024",
    location: "Kuala Lumpur, Malaysia",
    description:
      "Holistic curriculum combining skill acquisition, nutrition workshops, and study lounges for student-athletes.",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Elite Goalkeeper Intensive",
    sport: "Football",
    date: "October 22 – 27, 2024",
    location: "Seoul, South Korea",
    description:
      "Position-specific training, data-driven feedback, and immersive K-League match analysis sessions.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CampsPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Camp Training
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Intensives designed to accelerate skills and mindset
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Every Gateway camp balances technical mastery, cultural immersion, and wellness to ensure athletes return home inspired and prepared.
          </p>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {camps.map((camp) => (
              <div
                key={camp.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${camp.image})` }}
                  aria-label={`${camp.title} photo`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
                    <span>{camp.sport}</span>
                    <span>{camp.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{camp.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{camp.location}</p>
                  <p className="text-sm text-slate-600">{camp.description}</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Request camp deck
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
