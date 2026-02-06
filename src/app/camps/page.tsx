/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { BASEURL, imageUrl } from "@/lib/authClient";
import { useEffect, useState } from "react";

type ApiCamp = {
  _id?: string;
  id?: string;
  title?: string;
  sport?: string;
  date?: string | Date | null;
  endDate?: string | Date | null;
  location?: string;
  descriptionType?: string;
  description?: string;
  image?: string;
};

type Camp = {
  id?: string;
  title: string;
  sport: string;
  date: Date | null;
  endDate: Date | null;
  location: string;
  description: string;
  descriptionType?: string;
  image: string;
};

type CampsApiResponse = ApiCamp[] | ApiCamp | null;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=max&w=900&q=80";

const FALLBACK_TITLE = "Кэмпийн нэр тодорхойгүй";
const FALLBACK_SPORT = "Спорт төрөл тодорхойгүй";
const FALLBACK_LOCATION = "Байршил тодорхойгүй";
const FALLBACK_DESCRIPTION = "Тайлбар бэлэн болоход шинэчлэгдэнэ.";

function toListItems(description: string): string[] {
  try {
    const parsed = JSON.parse(description);
    if (Array.isArray(parsed)) {
      return parsed
        .map((entry) => String(entry).trim())
        .filter((entry) => entry.length > 0);
    }
  } catch (error) {}

  let lines = description.replace(/\r\n/g, "\n").split("\n");

  if (lines.length === 1 && description.includes("•")) {
    lines = description.split("•");
  }

  const BULLET_PREFIX =
    /^[\s•\u2022\u2023\u25AA\u25CF\u25E6\u2043\u2219\-\*\u00b7·📌➡️👉]+/;

  return lines
    .map((line) => line.replace(BULLET_PREFIX, "").trim())
    .filter((line) => line.length > 0);
}

function parseDate(value: ApiCamp["date"]): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function resolveImageSrc(raw?: string | null) {
  const trimmed = typeof raw === "string" ? raw.trim() : "";

  if (!trimmed) return FALLBACK_IMAGE;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) return `${imageUrl}${trimmed}`;

  return `${imageUrl}/${trimmed}`;
}

function normalizeCamps(data: CampsApiResponse): Camp[] {
  const list = Array.isArray(data) ? data : data ? [data] : [];

  return list
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;

      const item = entry as ApiCamp;

      return {
        id: item._id ?? item.id,
        title: item.title?.trim() || FALLBACK_TITLE,
        sport: item.sport?.trim() || FALLBACK_SPORT,
        date: parseDate(item.date),
        endDate: parseDate(item.endDate),
        location: item.location?.trim() || FALLBACK_LOCATION,
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        descriptionType: item.descriptionType,
        image: resolveImageSrc(item.image),
      } satisfies Camp;
    })
    .filter((camp): camp is any => camp !== null);
}

function formatDateRange(date: Date | null) {
  if (!date) return "Огноо тодорхойгүй";
  return date.toLocaleDateString("en-CA");
}

function renderDescription(item: Camp) {
  const isList = item.descriptionType?.toLowerCase?.() === "list";
  if (isList) {
    const lines = toListItems(item.description);
    if (lines.length > 0) {
      return (
        <ul className="max-w-md list-disc space-y-1 pl-5 text-sm md:text-base text-slate-600">
          {lines.map((line, index) => (
            <li key={`${item.id ?? item.title}-desc-${index}`}>{line}</li>
          ))}
        </ul>
      );
    }
  }

  return (
    <p className="max-w-md text-sm md:text-base text-slate-600 break-words">
      {item.description}
    </p>
  );
}

function createCampKey(camp: Camp, index: number) {
  if (camp.id) return camp.id;
  const dateLabel = camp.date ? camp.date.toISOString() : `no-date-${index}`;
  return `${camp.title}-${dateLabel}`;
}

function CampCard({ camp }: { camp: Camp }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
      <div className="flex h-full flex-col">
        <div
          className="h-44 w-full bg-cover bg-center md:h-56 rounded-lg"
          style={{ backgroundImage: `url(${camp.image})` }}
          aria-label={`${camp.title} кэмпийн зураг`}
        />

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
            <span>{camp.sport}</span>
            <span>{formatDateRange(camp.date)}</span>
          </div>

          <h3 className="text-lg font-semibold text-slate-900">{camp.title}</h3>
          <p className="text-sm font-medium text-slate-500">{camp.location}</p>
          <p className="max-w-md text-sm md:text-base text-slate-600 break-words">
            {renderDescription(camp)}
          </p>
        </div>
      </div>
    </Card>
  );
}

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
        const normalized = normalizeCamps(json);
        setCamps(normalized);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Өгөгдөл татахад алдаа гарлаа";
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
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="space-y-4 p-8 md:p-10">
                      <div className="h-6 w-2/3 rounded bg-slate-100" />
                      <div className="space-y-2">
                        <div className="h-4 w-1/2 rounded bg-slate-100" />
                        <div className="h-4 w-2/3 rounded bg-slate-100" />
                        <div className="h-4 w-1/2 rounded bg-slate-100" />
                      </div>
                      <div className="h-20 w-full rounded bg-slate-50" />
                    </div>
                    <div className="h-[220px] w-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
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
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Кэмп сургалт
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ур чадвар, сэтгэлзүйг дараагийн түвшинд хүргэх сургалтууд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Олон улсын сагсан бөмбөгийн кэмпт нэгдэж, ур чадвараа дараагийн
            түвшинд хөгжүүлээрэй. Манай хөтөлбөр мэргэжлийн дасгалжуулагчдын
            удирдлага дор техникийн бэлтгэл, тоглолтын ойлголт, бие бялдрын
            хөгжил болон багийн ажиллагааг цогцоор нь хөгжүүлэхэд чиглэнэ.
            Тамирчид зөвхөн талбай дээр төдийгүй соёлын солилцоогоор дамжуулан
            бие даах чадвар, хариуцлага, өөртөө итгэх итгэлээ нэмэгдүүлдэг.
          </p>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-8 grid gap-4  grid-cols-1 md:grid-cols-2 ">
            {camps.map((camp, index) => (
              <CampCard key={createCampKey(camp, index)} camp={camp} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
