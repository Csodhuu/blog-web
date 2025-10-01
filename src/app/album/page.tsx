const albumCollections = [
  {
    year: "2024",
    description: "A year of milestone tours spanning Asia and Europe with fresh cultural partnerships.",
    albums: [
      {
        name: "Hoops & Heritage Tour",
        location: "Seoul & Busan, South Korea",
        date: "April 2024",
        cover:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Gateway U18 Invitational",
        location: "Singapore",
        date: "August 2024",
        cover:
          "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    year: "2023",
    description: "Reignited travel with hybrid development programs and community outreach.",
    albums: [
      {
        name: "Island Serve Classic",
        location: "Cebu, Philippines",
        date: "December 2023",
        cover:
          "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Euro Discovery Series",
        location: "Paris & Amsterdam",
        date: "August 2023",
        cover:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Future Stars Academy",
        location: "Kuala Lumpur, Malaysia",
        date: "September 2023",
        cover:
          "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

export default function AlbumPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Albums</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Relive unforgettable Gateway experiences
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Albums are organised by season so athletes, parents, and partners can easily revisit highlights, download imagery, and share stories from the road.
          </p>
        </div>
      </section>

      {albumCollections.map((collection) => (
        <section key={collection.year} className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {collection.year}
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">{collection.description}</h2>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.albums.map((album) => (
                <div
                  key={`${collection.year}-${album.name}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="h-44 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${album.cover})` }}
                    aria-label={`${album.name} cover image`}
                  />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{album.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{album.location}</p>
                    <p className="text-sm text-slate-600">{album.date}</p>
                    <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                      View album folder
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
