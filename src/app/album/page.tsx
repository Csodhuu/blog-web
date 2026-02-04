"use client";

import { useEffect, useMemo, useState } from "react";

import { BASEURL, imageUrl } from "@/lib/authClient";

type AlbumApiAlbum = {
  _id?: string;
  name?: string;
  location?: string;
  date?: string | Date | null;
  cover?: string;
};

type AlbumApiCollection = {
  _id?: string;
  title?: string;
  description?: string;
  year?: string | Date | null;
  albums?: AlbumApiAlbum[];
};

type AlbumApiResponse = AlbumApiCollection | AlbumApiCollection[] | null;

type Album = {
  _id?: string;
  name: string;
  location: string;
  date: Date | null;
  cover: string;
};

type AlbumCollection = {
  _id?: string;
  title: string;
  description: string;
  year: Date | null;
  albums: Album[];
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80";

const parseDate = (
  value: AlbumApiAlbum["date"] | AlbumApiCollection["year"]
) => {
  if (!value) return null;
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? null : value;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatAlbumDate = (date: Date | null) => {
  if (!date) return "Огноо тодорхойгүй";
  const month = date.getMonth() + 1;
  return `${date.getFullYear()} оны ${month}-р сар`;
};

export default function AlbumPage() {
  const [collections, setCollections] = useState<AlbumCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASEURL}/albums`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const json: AlbumApiResponse = await res.json();
        const list = Array.isArray(json) ? json : json ? [json] : [];
        const normalized = list.map<AlbumCollection>((collection) => ({
          _id: collection._id,
          title: collection.title ?? "",
          description: collection.description ?? "",
          year: parseDate(collection.year),
          albums: Array.isArray(collection.albums)
            ? collection.albums.map<Album>((album) => ({
                _id: album._id,
                name: album.name ?? "",
                location: album.location ?? "",
                date: parseDate(album.date),
                cover: album.cover ?? DEFAULT_COVER,
              }))
            : [],
        }));
        setCollections(normalized);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Алдаа гарлаа";
        setError(message);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const hasCollections = useMemo(
    () => collections.some((collection) => collection.albums.length > 0),
    [collections]
  );

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

      {/* --- UI States --- */}
      {loading ? (
        <section className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="h-44 w-full bg-slate-100" aria-hidden />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="h-5 w-3/4 rounded bg-slate-100" />
                    <div className="h-4 w-1/2 rounded bg-slate-100" />
                    <div className="h-4 w-1/3 rounded bg-slate-100" />
                    <div className="mt-auto h-4 w-1/4 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {!loading && error ? (
        <section className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          </div>
        </section>
      ) : null}

      {!loading && !error && !hasCollections ? (
        <section className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-slate-600">
              Зургийн цомгийн мэдээлэл олдсонгүй.
            </p>
          </div>
        </section>
      ) : null}

      {/* --- Жилээр цомгууд --- */}
      {!loading && !error
        ? collections.map((collection, idx) => {
            if (collection.albums.length === 0) return null;

            const yearLabel = collection.year?.getFullYear() ?? "";
            const sectionKey = collection._id ?? `${yearLabel}-${idx}`;

            return (
              <section
                key={sectionKey}
                className="border-b border-slate-200 bg-white/90"
              >
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                  <div className="flex flex-col gap-2">
                    {collection.title ? (
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {collection.title}
                      </h2>
                    ) : null}
                    {collection.description ? (
                      <p className="text-sm text-slate-600">
                        {collection.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {collection.albums.map((album, albumIdx) => {
                      const key = album._id ?? `${sectionKey}-${albumIdx}`;
                      return (
                        <div
                          key={key}
                          className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                        >
                          <div
                            className="h-44 w-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${imageUrl + album.cover})`,
                            }}
                            aria-label={
                              album.name
                                ? `${album.name} цомгийн зураг`
                                : undefined
                            }
                          />
                          <div className="flex flex-1 flex-col gap-2 p-6">
                            {album.name ? (
                              <h3 className="text-lg font-semibold text-slate-900">
                                {album.name}
                              </h3>
                            ) : null}
                            {album.location ? (
                              <p className="text-sm font-medium text-slate-500">
                                {album.location}
                              </p>
                            ) : null}
                            <p className="text-sm text-slate-600">
                              {formatAlbumDate(album.date)}
                            </p>
                            <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                              Цомгийн хавтасыг үзэх
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })
        : null}
    </div>
  );
}
