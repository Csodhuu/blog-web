const upcomingEvents = [
  {
    title: "Gateway U18 Сагсан Бөмбөгийн Урилгат Тэмцээн",
    sport: "Сагсан бөмбөг",
    date: "2024-08-15",
    location: "Singapore Sports Hub, Сингапур",
    description:
      "Шилдэг академиудын хүрээнд тойргийн тоглолтууд зохион байгуулж, өгөгдөл-аналитик дэмжлэг, сэргэлтийн станцууд, соёлын хөтөлбөрт хамруулна.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "ASEAN Эмэгтэйчүүдийн Волейболын Классик",
    sport: "Волейбол",
    date: "2024-09-02",
    location: "Bangkok Arena, Тайланд",
    description:
      "FIVB-ийн гэрчилгээтэй шүүгчидтэй, телевизийн шууд дамжуулалттай найман багийн урилгат тэмцээн. Төлөөлөгчдөд зориулсан аяллын тусгай хөтөлбөртэй.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gateway Футзал Мастерс",
    sport: "Футзал",
    date: "2024-10-05",
    location: "Куала Лумпур, Малайз",
    description:
      "Залуучууд болон насанд хүрэгчдийн ангилалтай, хурдтай өрнөх танхимын тэмцээн. Дасгалжуулагчдын мастер-класс дагалдана.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  },
];

const pastEvents = [
  {
    title: "Дананг Найрамдлын Цом",
    sport: "Сагсан бөмбөг",
    date: "2023-10-12",
    location: "Дананг, Вьетнам",
    description:
      "Хөвгүүд, охидын хамтарсан тэмцээнийг лидершип воркшоп, эргийн экосистемийн сайн дурын үйл ажиллагаатай уялдуулан зохион байгуулсан.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Токио Ур Чадварын Фестиваль",
    sport: "Волейбол",
    date: "2023-07-28",
    location: "Токио, Япон",
    description:
      "Японы их сургуулийн багуудтай гурван өдрийн үзүүлэх тоглолт, хоёр хэл дээрх шагнал гардуулах ёслолоор өндөрлөсөн.",
    image:
      "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Бали Нэгдлийн Тоглолтууд",
    sport: "Олон төрөлт",
    date: "2022-11-18",
    location: "Бали, Индонез",
    description:
      "Сагсан бөмбөг, волейбол, футзалын арга хэмжээг гар урлал, олон нийттэй уулзалт, төгсөгчдийн уулзалтуудтай хослуулсан.",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
  },
];

function formatDisplayDate(date: string) {
  return new Date(date).toLocaleDateString("en-CA");
}

function EventCard({
  event,
}: {
  event: {
    title: string;
    sport: string;
    date: string;
    location: string;
    description: string;
    image: string;
  };
}) {
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
        <div className="mt-auto pt-4 text-sm font-semibold text-primary">
          Хүсэлт илгээх
        </div>
      </div>
    </div>
  );
}

export default function CompetitionsPage() {
  const sortedUpcoming = [...upcomingEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
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

      {/* --- Ирэх тэмцээнүүд --- */}
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
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedUpcoming.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Өмнөх тэмцээнүүд --- */}
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
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
