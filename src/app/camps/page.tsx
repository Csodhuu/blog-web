const camps = [
  {
    title: "Gateway Өндөр Гүйцэтгэлийн Кэмп",
    sport: "Сагсан бөмбөг",
    date: "July 4 – 10, 2024",
    location: "Clark, Philippines",
    description:
      "Хүч ба биеийн бэлтгэлийн оношилгоо, байрлалын ур чадварын лаборатори, PBA менторуудтай манлайллын сессүүд.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Serve & Soar Волейболын Клиник",
    sport: "Волейбол",
    date: "August 14 – 20, 2024",
    location: "Chiang Mai, Thailand",
    description:
      "Олон улсын дасгалжуулагчдын бүрэлдэхүүн—приемийн систем, сэтгэлзүйн тэсвэр, йогийн сэргэлтэд төвлөрсөн сургалт.",
    image:
      "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Ирээдүйн Одод Олон Төрөлтийн Академи",
    sport: "Олон төрөлт",
    date: "September 9 – 15, 2024",
    location: "Kuala Lumpur, Malaysia",
    description:
      "Ур чадвар олж авах сургалт, хоол тэжээлийн воркшоп, сурагч-спортчдод зориулсан унших/сурах lounge-уудыг нэгтгэсэн цогц хөтөлбөр.",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Элит Хаалгачдын Эрчимжүүлсэн Курс",
    sport: "Хөлбөмбөг",
    date: "October 22 – 27, 2024",
    location: "Seoul, South Korea",
    description:
      "Байрлалд суурилсан тусгай бэлтгэл, өгөгдөлд тулгуурласан буцаан холбоо, K-League-ийн тоглолтын гүн шинжилгээтэй сессүүд.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CampsPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Кэмп сургалт
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ур чадвар, сэтгэлзүйг түргэвчилж ахиулах эрчимжүүлсэн хөтөлбөрүүд
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Gateway кэмп бүр техникийн ур чадвар, соёлын туршлага, сайн сайхныг
            тэнцвэржүүлж, тамирчдыг урам зоригтой, бэлтгэлтэйгээр гэрт нь
            буцаахыг зорьдог.
          </p>
        </div>
      </section>

      {/* --- Кэмпүүдийн жагсаалт --- */}
      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {camps.map((camp) => (
              <div
                key={camp.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${camp.image})` }}
                  aria-label={`${camp.title} кэмпийн зураг`}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary/80">
                    <span>{camp.sport}</span>
                    <span>{camp.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {camp.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {camp.location}
                  </p>
                  <p className="text-sm text-slate-600">{camp.description}</p>
                  <div className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Кэмпийн танилцуулга авах
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
