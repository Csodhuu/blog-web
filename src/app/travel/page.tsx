const travelPrograms = [
  {
    title: "Токио Элит Туршлага",
    destination: "Токио, Япон",
    date: "2024 оны 7-р сарын 18 – 25",
    description:
      "Сагсан бөмбөгийн багууд Японы шилдэг академиудтай нөхөрсөг тоглолт хийж, спорт шинжлэх ухааны лабораториудтай танилцан, Олимпын өвийн талбайг үзнэ.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Каталоны Соёлын Аялал",
    destination: "Барселона, Испани",
    date: "2024 оны 8-р сарын 21 – 30",
    description:
      "Олон спортын төлөөлөгчид хөлбөмбөгийн нөхөрсөг тоглолтыг Ла Масиа академийн сургалт болон ЮНЕСКО-гийн өвийн аяллуудтай хослуулна.",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Номхон Далайн Бүсийн Нээлт",
    destination: "Окланд ба Роторуа, Шинэ Зеланд",
    date: "2024 оны 10-р сарын 8 – 17",
    description:
      "Волейболын багууд нутгийн клубуудтай хамтран бэлтгэл хийж, газар доорх халуун рашааны эмчилгээ эдэлж, Маори удирдагчдаас соёлын хичээл авна.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Альпийн Өндрийн Эрчимжүүлсэн Хөтөлбөр",
    destination: "Люцерн, Швейцарь",
    date: "2024 оны 11-р сарын 3 – 11",
    description:
      "Тэсвэрийн спортод зориулсан өндөрлөгийн бэлтгэл болон Европын тэмцээний тоглолтуудыг багтаасан өндөр гүйцэтгэлийн цогц хөтөлбөр.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TravelPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Гарчиг хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Аялал
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Спорт, соёл, хамтын ажиллагааг нэгтгэсэн аяллын хөтөлбөрүүд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Бүх аяллын хөтөлбөрийг багийн хэмжээ, төсөв, гүйцэтгэлийн зорилгод
            тохируулан өөрчлөх боломжтой. Бид байр, нислэг, нөхөн сэргээх
            үйлчилгээ, эцэг эхийн мэдээллийн урсгалыг бүрэн зохион байгуулж,
            дасгалжуулагчдыг зөвхөн тамирчдад төвлөрөхөд нь дэмждэг.
          </p>
        </div>
      </section>

      {/* --- Програмуудын жагсаалт --- */}
      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {travelPrograms.map((program) => (
              <div
                key={program.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                  aria-label={`${program.destination} аяллын зураг`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                    {program.date}
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
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Өөрийн хуваарьт захиалга хийх
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
