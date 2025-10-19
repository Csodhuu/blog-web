"use client";
import { BASEURL } from "@/lib/authClient";
import { useEffect, useState } from "react";

type AboutTimelineItem = {
  year: string;
  milestone: string;
};

type AboutCapability = {
  title: string;
  description: string;
};
type AboutPayload = {
  paragraphImage: string;
  title: string;
  content: string;
  timeline: AboutTimelineItem[];
  achievements: string[];
  paragraphs: string[];
  capabilities: AboutCapability[];
};

export default function AboutPage() {
  const [data, setData] = useState<AboutPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASEURL}/about`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        const json: AboutPayload = await res.json();
        setData(json ?? null);
      } catch (e: any) {
        setError(e?.message || "Алдаа гарлаа");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // ——— UI States
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="mt-4 h-8 w-3/4 rounded bg-slate-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-11/12 rounded bg-slate-100" />
            <div className="h-4 w-10/12 rounded bg-slate-100" />
          </div>
          <div className="h-64 rounded-3xl border border-slate-200 bg-slate-100" />
        </div>
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

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-slate-600">Өгөгдөл олдсонгүй.</p>
      </div>
    );
  }

  const {
    paragraphImage,
    title,
    content,
    paragraphs = [],
    timeline = [],
    capabilities = [],
    achievements = [],
  } = data[0];

  console.log("About data:", data);

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Бидний тухай --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Бидний тухай
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            {title || "Gateway Sports Travel"}
          </h1>

          {/* content (товч танилцуулга) */}
          {content ? (
            <p className="mt-4 max-w-3xl text-slate-700">{content}</p>
          ) : null}

          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6 text-base text-slate-600">
              {paragraphs.map((p: any, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div
              className="rounded-3xl border border-slate-200 bg-cover bg-center shadow-inner"
              style={{
                minHeight: 280,
                backgroundImage: paragraphImage
                  ? `url('${paragraphImage}')`
                  : "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80')",
              }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* --- Манай аялал --- */}
      {timeline.length > 0 && (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Манай аялал
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Гол мөчүүд
              </h2>
              <p className="text-sm text-slate-600">
                Сүүлийн жилүүдэд үйлчилгээгээ өргөжүүлэхийн зэрэгцээ чанарыг
                тогтвортой баримталсаар ирсэн.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {timeline.map((item: any, idx: number) => (
                <div
                  key={`${item.year}-${idx}`}
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
      )}

      {/* --- Амжилтууд (байвал) --- */}
      {achievements.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-slate-900">Амжилтууд</h3>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-700">
              {achievements.map((a: any, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --- Бид юу хийж чадна --- */}
      {capabilities.length > 0 && (
        <section className="bg-white/90">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Бид юу хийж чадна
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Аялал, арга хэмжээ, визийн иж бүрэн шийдэл
              </h2>
              <p className="text-sm text-slate-600">
                Дасгалжуулагчид болон асран хамгаалагчидтай нягт уялдуулсан цогц
                шийдлүүдийг санал болгодог.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {capabilities.map((c: any, i: number) => (
                <div
                  key={`${c.title}-${i}`}
                  className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-base font-semibold text-slate-900">
                    {c.title}
                  </p>
                  <p className="text-sm text-slate-600">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
