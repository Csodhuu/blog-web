import { BASEURL } from "@/lib/authClient";

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

function formatDisplayDate(date: Date | null) {
  if (!date) return "Огноо тодорхойгүй";
  return date.toLocaleDateString("en-CA");
}

function createEventKey(event: Competition, index: number) {
  if (event.id) return event.id;
  const dateLabel = event.date ? event.date.toISOString() : `no-date-${index}`;
  return `${event.title}-${dateLabel}`;
}

function EventCard({ event }: { event: Competition }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div
        className="h-44 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
        aria-label={`${event.title} зургийн төсөө`}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
          <span>{event.sport}</span>
          <span>{formatDisplayDate(event.date)}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
        <p className="text-sm font-medium text-slate-500">{event.location}</p>
        <p className="text-sm text-slate-600">{event.description}</p>
        {/* <div className="mt-auto pt-4 text-sm font-semibold text-primary">
          Хүсэлт илгээх
        </div> */}
      </div>
    </div>
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

  console.log({ upcomingEvents, pastEvents, error });

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Тэмцээнүүд
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Хөгжилд чиглэсэн ирэх болон өмнөх арга хэмжээнүүд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Бид танай багийн хөгжлийн үе шатанд тохирсон урилгат тэмцээн, шоу
            тоглолтуудыг шүүн бүрдүүлдэг. Ирэх арга хэмжээнүүдийг ойрын гарах
            огноогоор нь эрэмбэлсэн тул урьдчилан оролцох эрхээ баталгаажуулахад
            хялбар.
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
                Ирэх тэмцээнүүд
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Дараагийн тэмцээндээ эрхээ баталгаажуулаарай
              </h2>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={createEventKey(event, index)} event={event} />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-600">
                Одоогоор ирэх тэмцээний мэдээлэл байхгүй байна.
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
              <h2 className="text-2xl font-semibold text-slate-900">
                Өмнөх аяллуудын онцлох агшин
              </h2>
              <p className="max-w-3xl text-sm text-slate-600">
                Өмнөх арга хэмжээнүүдийн тайлан, бичлэгийн дүгнэлт, тусгай фото
                цомгууд нь тамирчдыг урамшуулж, оролцоог нь хадгалдаг.
              </p>
            </div>
            {pastEvents.length > 0 ? (
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event, index) => (
                  <EventCard key={createEventKey(event, index)} event={event} />
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
