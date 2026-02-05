/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { BASEURL, imageUrl } from "@/lib/authClient";
import { Button } from "../ui/button";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

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
  pdfUrl?: string;
  fileUrl?: string;
  attachmentUrl?: string;
};

export type Competition = {
  id?: string;
  title: string;
  sport: string;
  date: Date | null;
  descriptionType?: string;
  location: string;
  description: string;
  endDate: Date | null;
  image: string;
  category: "upcomingEvents" | "pastEvents";
  link?: string;
};

type CompetitionGroups = {
  upcoming: Competition[];
  past: Competition[];
};

const DEFAULT_IMAGE = "/images/image1.jpg";

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
  } catch {}

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

function pickLink(item: ApiCompetition): string | undefined {
  const raw =
    item.link ?? item.pdfUrl ?? item.fileUrl ?? item.attachmentUrl ?? undefined;

  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return undefined;
  if (trimmed.startsWith("/")) return `${BASEURL}${trimmed}`;
  return trimmed;
}

function normalizeCompetitions(data: unknown): Competition[] {
  const list = Array.isArray(data) ? data : data ? [data] : [];

  return list
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;

      const item = entry as ApiCompetition;
      const category = getCompetitionCategory(item.type);
      if (!category) return null;

      const link = pickLink(item);

      return {
        id: item._id ?? item.id,
        title: item.title?.trim() || FALLBACK_TITLE,
        sport: item.sport?.trim() || FALLBACK_SPORT,
        date: parseDate(item.date),
        endDate: parseDate(item.endDate), // ✅ энд endDate-г зөв parse хийе
        location: item.location?.trim() || FALLBACK_LOCATION,
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        descriptionType: item.descriptionType,
        image: item.image?.trim() || DEFAULT_IMAGE,
        category,
        link,
      } as Competition;
    })
    .filter((competition): competition is Competition => competition !== null);
}

async function fetchCompetitions(): Promise<CompetitionGroups> {
  const url = `${BASEURL}/competitions`;
  const response = await fetch(url, { cache: "no-store" });

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

function CompetitionCard({ item }: { item: Competition }) {
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

          <div className="mt-8">
            {item.link ? (
              <Link href={item.link} target="_blank">
                <Button className="gap-2 px-6 py-5 text-sm md:text-base">
                  Танилцуулга татах <Download className="h-4 w-4" />
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[260px] md:h-full">
          <Image
            src={
              item.image?.startsWith("http")
                ? item.image
                : imageUrl + item.image
            }
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

/**
 * ✅ Preview хувилбар: эхний 2-г харуулна + "Бүгдийг үзэх" товч.
 * - Хэрвээ яг /competitions page дээр бүрэн жагсаалт харуулах бол тусдаа component болгож болно.
 */
export async function Competitions() {
  let items: Competition[] = [];
  let error: string | null = null;

  try {
    const { upcoming, past } = await fetchCompetitions();
    items = [...upcoming, ...past];
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Тэмцээний мэдээллийг авах явцад үл мэдэгдэх алдаа гарлаа.";
  }

  const previewItems = items.slice(0, 2); // ✅ эхний 2-г л үзүүлнэ

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold text-card-foreground md:text-5xl">
            Тэмцээнүүд
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Ур чадвараа шалгаж, өөрийнхөө хязгаарыг даван туулахад зориулагдсан
            сонирхолтой тэмцээн, сорилтууд таныг хүлээж байна.
          </p>
        </div>

        {/* Error */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {/* List */}
        {!error ? (
          <div className="space-y-8">
            {previewItems.length > 0 ? (
              previewItems.map((item, index) => (
                <CompetitionCard
                  key={createEventKey(item, index)}
                  item={item}
                />
              ))
            ) : (
              <p className="text-sm text-slate-600">
                Одоогоор тэмцээний мэдээлэл байхгүй байна.
              </p>
            )}

            <div className="pt-6 flex justify-center">
              <Link href="/competitions">
                <Button className="gap-2 h-12 w-[200px] text-lg">
                  Бүгдийг үзэх <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
