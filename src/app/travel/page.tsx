import { BASEURL, imageUrl } from "@/lib/authClient";

export const revalidate = 60;
export const dynamic = "force-static";

type ApiTravelProgram = {
  _id?: string;
  id?: string;
  title?: string;
  destination?: string;
  date?: string | Date | null;
  description?: string;
  image?: string;
};

type TravelProgram = {
  id: string | undefined;
  title: string;
  destination: string;
  date: Date | null;
  description: string;
  image: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80";

const FALLBACK_TITLE = "Аяллын нэр тодорхойгүй";
const FALLBACK_DESTINATION = "Байршил тодорхойгүй";
const FALLBACK_DESCRIPTION = "Тайлбар бэлэн болоход шинэчлэгдэнэ.";

function parseDate(value: ApiTravelProgram["date"]): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
        description: item.description?.trim() || FALLBACK_DESCRIPTION,
        image: item.image?.trim() || DEFAULT_IMAGE,
      } satisfies TravelProgram;
    })
    .filter((program): program is TravelProgram => program !== null);
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

function formatDisplayDate(date: Date | null) {
  if (!date) return "Огноо тодорхойгүй";

  try {
    return date.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date.toLocaleDateString("en-CA");
  }
}

function createProgramKey(program: TravelProgram, index: number) {
  if (program.id) return program.id;
  const dateLabel = program.date
    ? program.date.toISOString()
    : `no-date-${index}`;
  return `${program.title}-${dateLabel}`;
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
            🚀 Чиний дараагийн аялал эндээс эхэлнэ
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Шинэ улс орон, шинэ хүмүүс, шинэ туршлага чамайг хүлээж байна.
            Зөвхөн аялж зугаалаад зогсохгүй, өөрийгөө нэг шат ахиулах аялалд
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
            <div className="grid gap-8 sm:grid-cols-2">
              {travelPrograms.map((program, index) => (
                <div
                  key={createProgramKey(program, index)}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${imageUrl + program.image})`,
                    }}
                    aria-label={`${program.destination} аяллын зураг`}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                      {formatDisplayDate(program.date)}
                    </p>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {program.title}
                    </h2>
                    <p className="text-sm font-medium text-slate-500">
                      {program.destination}
                    </p>
                    <p className="text-sm text-slate-600">
                      {program.description}
                    </p>
                    {/* <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                      Өөрийн хуваарьт захиалга хийх
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
