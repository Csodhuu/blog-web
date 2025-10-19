"use client";

import { BASEURL } from "@/lib/authClient";
import { useEffect, useState } from "react";

type Camp = {
  title: string;
  sport: string;
  date: string;
  location: string;
  description: string;
  image: string;
  _id?: string;
};

type CampsApiResponse = Camp[] | Camp | null;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80";

export default function CampsPage() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamps = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASEURL}/camps`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const json: CampsApiResponse = await res.json();
        const normalized = Array.isArray(json)
          ? json
          : json
            ? [json]
            : [];
        setCamps(normalized);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Өгөгдөл татахад алдаа гарлаа";
        setError(message);
        setCamps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-white via-slate-50 to-white">
        <section className="border-b border-slate-200 bg-white/80">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="mt-4 h-8 w-1/2 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-2/3 rounded bg-slate-100" />
          </div>
        </section>
        <section className="bg-white/90">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:px-8">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-44 w-full bg-slate-100" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="h-4 w-32 rounded bg-slate-100" />
                  <div className="h-4 w-48 rounded bg-slate-100" />
                  <div className="h-4 w-40 rounded bg-slate-100" />
                  <div className="h-20 w-full rounded bg-slate-50" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (camps.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-slate-600">Кэмпийн мэдээлэл одоогоор алга байна.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Кэмп сургалт
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ур чадвар, сэтгэлзүйг түргэвчилж ахиулах эрчимжүүлсэн хөтөлбөрүүд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Gateway кэмп бүр техникийн ур чадвар, соёлын туршлага, сайн сайхныг
            тэнцвэржүүлж, тамирчдыг урам зоригтой, бэлтгэлтэйгээр гэрт нь
            буцаахыг зорьдог.
          </p>
        </div>
      </section>

      {/* --- Кэмпүүдийн жагсаалт --- */}
      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {camps.map((camp) => (
              <div
                key={camp._id ?? camp.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${camp.image || FALLBACK_IMAGE})`,
                  }}
                  aria-label={`${camp.title} кэмпийн зураг`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
                    <span>{camp.sport}</span>
                    <span>{camp.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {camp.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {camp.location}
                  </p>
                  <p className="text-sm text-slate-600">{camp.description}</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Кэмпийн танилцуулга авах
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
