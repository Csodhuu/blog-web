/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { BASEURL, imageUrl } from "@/lib/authClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

function resolveCover(cover: string) {
  if (!cover) return DEFAULT_COVER;
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  // backend-аас "/uploads/..." гэх мэт ирвэл prefix нэмнэ
  return `${imageUrl}${cover}`;
}

export default function AlbumPage() {
  const [collections, setCollections] = useState<AlbumCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Lightbox state ---
  const [open, setOpen] = useState(false);
  const [flatAlbums, setFlatAlbums] = useState<
    Array<{
      collectionTitle: string;
      collectionYearLabel: string;
      album: Album;
    }>
  >([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASEURL}/albums`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Response status: ${res.status}`);

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

  // Dialog нээхэд хэрэгтэй flat list-ээ collections өөрчлөгдөхөд үүсгэнэ
  useEffect(() => {
    const flat = collections.flatMap((c) => {
      const yearLabel = c.year ? `${c.year.getFullYear()}` : "";
      const title = c.title || yearLabel || "Цомог";
      return c.albums.map((album) => ({
        collectionTitle: title,
        collectionYearLabel: yearLabel,
        album,
      }));
    });
    setFlatAlbums(flat);
  }, [collections]);

  const hasCollections = useMemo(
    () => collections.some((collection) => collection.albums.length > 0),
    [collections]
  );

  const active = flatAlbums[activeIndex];

  const openLightboxByAlbumId = (albumId?: string) => {
    if (!flatAlbums.length) return;
    const idx = albumId
      ? flatAlbums.findIndex((x) => x.album._id === albumId)
      : -1;
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + flatAlbums.length) % flatAlbums.length);
  };

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % flatAlbums.length);
  };

  // keyboard controls (only when dialog open)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flatAlbums.length]);

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Зургийн цомгууд
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gateway-ийн мартагдашгүй мөчүүдийг дахин мэдэр
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Зургийн цомгууд улирлаар ангилагдсан тул онцлох мөчүүдийг дахин
            үзэж, зургаа хялбархан татан авч, аяллын дурсамжаа бусадтай
            хуваалцах боломжтой.
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
                    {collection.year ? (
                      <p className="text-sm text-slate-600">
                        {formatAlbumDate(collection.year)}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {collection.albums.map((album, albumIdx) => {
                      const key = album._id ?? `${sectionKey}-${albumIdx}`;
                      const coverUrl = resolveCover(album.cover);

                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => openLightboxByAlbumId(album._id)}
                          className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm text-left"
                        >
                          <div
                            className="relative h-56 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                            style={{ backgroundImage: `url(${coverUrl})` }}
                            aria-label={
                              album.name
                                ? `${album.name} цомгийн зураг`
                                : undefined
                            }
                          >
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })
        : null}

      {/* --- Lightbox Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[70%] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Зураг томоор харах</DialogTitle>
          </DialogHeader>

          <div className="relative bg-black">
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Хаах"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev/Next */}
            {flatAlbums.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            ) : null}

            {/* Image */}
            <div className="flex items-center justify-center">
              {active ? (
                // <img> ашиглавал next/image тохиргоо шаардахгүй
                <img
                  src={resolveCover(active.album.cover)}
                  alt={active.album.name || "Album image"}
                  className="max-h-[75vh] w-auto object-contain"
                  loading="eager"
                />
              ) : (
                <div className="p-10 text-white/80">Зураг олдсонгүй</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
