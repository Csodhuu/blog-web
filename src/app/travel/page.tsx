const travelPrograms = [
  {
    title: "Tokyo Elite Experience",
    destination: "Tokyo, Japan",
    date: "July 18 – 25, 2024",
    description:
      "Basketball teams scrimmage top Japanese academies, explore sport science labs, and visit the Olympic legacy venues.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Catalonia Cultural Tour",
    destination: "Barcelona, Spain",
    date: "August 21 – 30, 2024",
    description:
      "Multi-sport delegations combine football friendlies with La Masia workshops and UNESCO heritage excursions.",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pacific Rim Discovery",
    destination: "Auckland & Rotorua, New Zealand",
    date: "October 8 – 17, 2024",
    description:
      "Volleyball squads train with local clubs, enjoy geothermal wellness, and learn from indigenous Maori leaders.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Alps Altitude Intensive",
    destination: "Lucerne, Switzerland",
    date: "November 3 – 11, 2024",
    description:
      "High-performance camp tailored for endurance sports with altitude training and European competition fixtures.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TravelPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Travel
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Travel programs curated for performance, culture, and connection
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Each itinerary is customisable to your roster size, budget, and
            performance goals. Our team manages lodging, flights, recovery
            services, and parent communications so coaches can remain
            athlete-focused.
          </p>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {travelPrograms.map((program) => (
              <div
                key={program.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                  aria-label={`${program.destination} travel highlight`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                    {program.date}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {program.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {program.destination}
                  </p>
                  <p className="text-sm text-slate-600">
                    {program.description}
                  </p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Reserve custom slots
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
