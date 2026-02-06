import { Competition } from "@/components/competitions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BASEURL, imageUrl } from "@/lib/authClient";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;
export const dynamic = "force-static";

type ApiCompetitionType =
  | "upcomingEvents"
  | "pastEvents"
  | { type?: "upcomingEvents" | "pastEvents" | null }
  | null
  | undefined;

type ApiCompetition = {
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
  type?: ApiCompetitionType;
  link?: string;
};

type CompetitionGroups = {
  upcoming: Competition[];
  past: Competition[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80";

const FALLBACK_TITLE = "Тэмцээний нэр тодорхойгүй";
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
  } catch (error) {
    // ignore JSON parse errors and fall back to splitting
  }

  // Primary split on new lines so inline hyphens stay with their sentence.
  let lines = description.replace(/\r\n/g, "\n").split("\n");

  // If there were no line breaks but bullet characters exist, split on them.
  if (lines.length === 1 && description.includes("•")) {
    lines = description.split("•");
  }

  const BULLET_PREFIX =
    /^[\s•\u2022\u2023\u25AA\u25CF\u25E6\u2043\u2219\-\*\u00b7·📌➡️👉]+/;

  return lines
    .map((line) => line.replace(BULLET_PREFIX, "").trim())
    .filter((line) => line.length > 0);
}

function parseDate(value: ApiCompetition["date"]): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getCompetitionCategory(value: ApiCompetitionType) {
  if (!value) return null;

  if (typeof value === "string") {
    return value === "upcomingEvents" || value === "pastEvents" ? value : null;
  }

  const nested = value.type;
  return nested === "upcomingEvents" || nested === "pastEvents" ? nested : null;
}

function normalizeCompetitions(data: unknown): Competition[] {
  const list = Array.isArray(data) ? data : data ? [data] : [];
  return list
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;

      const item = entry as ApiCompetition;
      const category = getCompetitionCategory(item.type);

      if (!category) return null;

      return {
        id: item._id ?? item.id,
        title: item.title?.trim() || FALLBACK_TITLE,
        sport: item.sport?.trim() || FALLBACK_SPORT,
        date: parseDate(item.date),
        endDate: parseDate(item.endDate),
        location: item.location?.trim() || FALLBACK_LOCATION,
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        descriptionType: item.descriptionType,
        image: item.image?.trim() || DEFAULT_IMAGE,
        link: item.link,
        category,
      } as Competition;
    })
    .filter((competition): competition is Competition => competition !== null);
}

async function fetchCompetitions(): Promise<CompetitionGroups> {
  const url = `${BASEURL}/competitions`;
  const response = await fetch(url, { next: { revalidate } });

  if (!response.ok) {
    throw new Error(
      `Тэмцээний мэдээлэл авахад алдаа гарлаа (${response.status})`
    );
  }

  const json = await response.json();
  const competitions = normalizeCompetitions(json);

  const upcoming = competitions
    .filter((competition) => competition.category === "upcomingEvents")
    .sort((a, b) => {
      const timeA = a.date ? a.date.getTime() : Number.MAX_SAFE_INTEGER;
      const timeB = b.date ? b.date.getTime() : Number.MAX_SAFE_INTEGER;
      return timeA - timeB;
    });

  const past = competitions
    .filter((competition) => competition.category === "pastEvents")
    .sort((a, b) => {
      const timeA = a.date ? a.date.getTime() : Number.MIN_SAFE_INTEGER;
      const timeB = b.date ? b.date.getTime() : Number.MIN_SAFE_INTEGER;
      return timeB - timeA;
    });

  return { upcoming, past };
}

function createEventKey(event: Competition, index: number) {
  if (event.id) return event.id;
  const dateLabel = event.date ? event.date.toISOString() : `no-date-${index}`;
  return `${event.title}-${dateLabel}`;
}
function formatDateRange(date: Date | null) {
  if (!date) return "Огноо тодорхойгүй";
  return date.toLocaleDateString("en-CA");
}

function renderDescription(item: Competition) {
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

function EventCard({ item }: { item: Competition }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {item.title}
            </h2>

            <div className="space-y-2 text-base text-slate-700">
              <p>
                <span className="font-semibold">Ангилал:</span> {item.sport}
              </p>
              <p>
                <span className="font-semibold">Тэмцээний эхлэх хугацаа:</span>{" "}
                {formatDateRange(item.date)}
              </p>
              <p>
                <span className="font-semibold">Тэмцээн дуусах хугацаа:</span>{" "}
                {formatDateRange(item.endDate)}
              </p>
              <p>
                <span className="font-semibold">Байршил:</span> {item.location}
              </p>
            </div>

            {renderDescription(item)}
          </div>

          {item.link && (
            <div className="mt-8">
              <Link href={item.link || ""} target="_blank">
                <Button className="gap-2 px-6 py-5 text-sm md:text-base">
                  Танилцуулга татах <Download className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[260px] md:h-full">
          <Image
            src={imageUrl + item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
            priority={false}
          />
        </div>
      </div>
    </Card>
  );
}

export default async function CompetitionsPage() {
  let upcomingEvents: Competition[] = [];
  let pastEvents: Competition[] = [];
  let error: string | null = null;

  try {
    const competitions = await fetchCompetitions();
    upcomingEvents = competitions.upcoming;
    pastEvents = competitions.past;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Тэмцээний мэдээллийг авах явцад үл мэдэгдэх алдаа гарлаа.";
    error = message;
  }
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Тэмцээнүүд
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Хөгжилд чиглэсэн тэмцээн, арга хэмжээнүүд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Бид баг, тамирчдын хөгжлийг дэмжих зорилготой олон улсын болон
            урилгат тэмцээн, спорт арга хэмжээнүүдийг санал болгож байнаг.
            Удахгүй болох тэмцээнүүдийн мэдээллийг эндээс авах боломжтой.
          </p>
        </div>
      </section>

      {error ? (
        <section className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          </div>
        </section>
      ) : null}

      {!error ? (
        <section className="border-b border-slate-200 bg-white/90">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Удахгүй болох тэмцээнүүд
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Тэмцээндээ яг одоо бүртгүүлээрэй
              </h2>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="mt-8 space-y-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={createEventKey(event, index)} item={event} />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-600">
                Одоогоор тэмцээний мэдээлэл байхгүй байна.
              </p>
            )}
          </div>
        </section>
      ) : null}

      {!error ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Өмнөх тэмцээнүүд
              </p>
            </div>
            {pastEvents.length > 0 ? (
              <div className="mt-8 space-y-8">
                {pastEvents.map((event, index) => (
                  <EventCard key={createEventKey(event, index)} item={event} />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-600">
                Өмнөх тэмцээний мэдээлэл одоогоор байхгүй байна.
              </p>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
