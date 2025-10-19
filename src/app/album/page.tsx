import { albumCollections } from "@/data/albums";

const formatAlbumDate = (date: Date) => {
  const month = date.getMonth() + 1;
  return `${date.getFullYear()} оны ${month}-р сар`;
};

export default function AlbumPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Зургийн цомгууд
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gateway-ийн мартагдашгүй мөчүүдийг дахин эргэн санаарай
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Зургийн цомгууд улирлаар ангилагдсан тул тамирчид, эцэг эхчүүд,
            түншүүд онцлох мөчүүдийг дахин үзэж, зургуудыг татан авч, аяллын
            түүхийг хуваалцахад хялбар.
          </p>
        </div>
      </section>

      {/* --- Жилээр цомгууд --- */}
      {albumCollections.map((collection) => (
        <section
          key={collection.year.toISOString()}
          className="border-b border-slate-200 bg-white/90"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {collection.year.getFullYear()}
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                {collection.title}
              </h2>
              <p className="text-sm text-slate-600">{collection.description}</p>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.albums.map((album) => (
                <div
                  key={`${collection.year.getFullYear()}-${album.name}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="h-44 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${album.cover})` }}
                    aria-label={`${album.name} цомгийн зураг`}
                  />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {album.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {album.location}
                    </p>
                    <p className="text-sm text-slate-600">
                      {formatAlbumDate(album.date)}
                    </p>
                    <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                      Цомгийн хавтасыг үзэх
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
