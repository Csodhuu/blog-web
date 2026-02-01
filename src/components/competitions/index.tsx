/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { BASEURL } from "@/lib/authClient";
import { Button } from "../ui/button";
import Image from "next/image";
import { Download } from "lucide-react";

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
  location?: string;
  description?: string;
  image?: string;
  type?: ApiCompetitionType;
};

type Competition = {
  id?: string;
  title: string;
  sport: string;
  date: Date | null;
  location: string;
  description: string;
  image: string;
  category: "upcomingEvents" | "pastEvents";
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
        location: item.location?.trim() || FALLBACK_LOCATION,
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        image: item.image?.trim() || DEFAULT_IMAGE,
        category,
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
function CompetitionCard({ item }: { item: Competition }) {
  console.log(item.image);
  return (
    <Card className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-0">
      {/* LEFT CONTENT */}
      <div className="flex flex-col justify-between p-10">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">{item.title}</h2>

          <div className="space-y-3 text-lg text-slate-700">
            <p>
              <span className="font-semibold">Ангилал:</span> {item.sport}
            </p>

            <p>
              <span className="font-semibold">Тэмцээний хугацаа:</span>{" "}
              {formatDateRange(item.date)}
            </p>

            <p>
              <span className="font-semibold">Байршил:</span> {item.location}
            </p>
          </div>

          <p className="max-w-md text-slate-600">{item.description}</p>
        </div>

        {/* BUTTON */}
        <div className="mt-10">
          <Button className=" px-8 py-6 text-base">
            Танилцуулга татах <Download />
          </Button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative min-h-[320px] bg-slate-200">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
      </div>
    </Card>
  );
}

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

        {/* Grid */}
        {!error ? (
          <div>
            {items.length > 0 ? (
              items.map((item, index) => (
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
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Ирээдүйд олон тэмцээнүүд зохиогдох болно. Сонирхолтой мэдээллүүдэд
            анхаарлаа хандуулаарай !
          </p>
        </div>
      </div>
    </section>
  );
}
