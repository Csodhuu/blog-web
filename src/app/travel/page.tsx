/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { BASEURL, imageUrl } from "@/lib/authClient";

export const revalidate = 60;
export const dynamic = "force-static";

type ApiTravelProgram = {
  _id?: string;
  id?: string;
  title?: string;
  destination?: string;
  date?: string | Date | null;
  endDate?: string | Date | null;
  descriptionType?: string;
  description?: string;
  image?: string;
};

type TravelProgram = {
  id?: string;
  title: string;
  destination: string;
  date: Date | null;
  endDate: Date | null;
  descriptionType?: string;
  description: string;
  image: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=max&w=900&q=80";

const FALLBACK_TITLE = "Аяллын нэр тодорхойгүй";
const FALLBACK_DESTINATION = "Байршил тодорхойгүй";
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

function parseDate(value: ApiTravelProgram["date"]): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function resolveImageSrc(raw?: string | null) {
  const trimmed = typeof raw === "string" ? raw.trim() : "";

  if (!trimmed) return DEFAULT_IMAGE;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) return `${imageUrl}${trimmed}`;

  return `${imageUrl}/${trimmed}`;
}

function normalizePrograms(data: unknown): TravelProgram[] {
  const list = Array.isArray(data) ? data : data ? [data] : [];

  return list
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;

      const item = entry as ApiTravelProgram;

      return {
        id: item._id ?? item.id,
        title: item.title?.trim() || FALLBACK_TITLE,
        destination: item.destination?.trim() || FALLBACK_DESTINATION,
        date: parseDate(item.date),
        endDate: parseDate(item.endDate),
        descriptionType: item.descriptionType,
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        image: resolveImageSrc(item.image),
      } satisfies TravelProgram;
    })
    .filter((program): program is any => program !== null);
}

async function fetchTravelPrograms(): Promise<TravelProgram[]> {
  const url = `${BASEURL}/travel`;
  const response = await fetch(url, { next: { revalidate } });

  if (!response.ok) {
    throw new Error(
      `Аяллын мэдээллийг авахад алдаа гарлаа (${response.status})`
    );
  }

  const json = await response.json();
  return normalizePrograms(json);
}

function formatDateRange(date: Date | null) {
  if (!date) return "Огноо тодорхойгүй";
  return date.toLocaleDateString("en-CA");
}

function createProgramKey(program: TravelProgram, index: number) {
  if (program.id) return program.id;
  const dateLabel = program.date
    ? program.date.toISOString()
    : `no-date-${index}`;
  return `${program.title}-${dateLabel}`;
}

function renderDescription(item: TravelProgram) {
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

function TravelCard({ program }: { program: TravelProgram }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {program.title}
            </h2>
            <div className="space-y-2 text-base text-slate-700">
              <p>
                <span className="font-semibold">Чиглэл:</span>{" "}
                {program.destination}
              </p>
              <p>
                <span className="font-semibold">Аяллын эхлэх хугацаа:</span>{" "}
                {formatDateRange(program.date)}
              </p>
              <p>
                <span className="font-semibold">Аялал дуусах хугацаа:</span>{" "}
                {formatDateRange(program.endDate)}
              </p>
            </div>
            {renderDescription(program)}
          </div>
        </div>

        <div className="relative h-[260px] md:h-full">
          <img
            src={program.image}
            alt={program.title}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        </div>
      </div>
    </Card>
  );
}

export default async function TravelPage() {
  let travelPrograms: TravelProgram[] = [];
  let error: string | null = null;

  try {
    travelPrograms = await fetchTravelPrograms();
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Аяллын мэдээллийг авах явцад үл мэдэгдэх алдаа гарлаа.";
    error = message;
  }

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Гарчиг хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Аялал
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Таны дараагийн аялал эндээс эхэлнэ
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Шинэ улс орон, шинэ хүмүүс, шинэ туршлага таныг хүлээж байна. Зөвхөн
            аялж зугаалаад зогсохгүй, мартагдашгүй дурсамж бүтээх аялалд
            бидэнтэй нэгдээрэй.
          </p>
        </div>
      </section>

      {/* --- Програмуудын жагсаалт --- */}
      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          ) : travelPrograms.length === 0 ? (
            <p className="text-sm text-slate-600">
              Аяллын хөтөлбөр одоогоор байхгүй байна. Удахгүй дахин шалгана уу.
            </p>
          ) : (
            <div className="space-y-8">
              {travelPrograms.map((program, index) => (
                <TravelCard
                  key={createProgramKey(program, index)}
                  program={program}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
