const paragraphs = [
  "Gateway Sports Travel нь Азийн клубууд болон үндэсний хөтөлбөрүүдийг олон улсын тэмцээнд оролцох боломжийг олгож, тамирчдын сайн сайхныг хохироохгүйгээр байгуулагдсан. Бид хаалганаас хаалга хүртэл аяллын менежмент, спортын онцлогт тохирсон төлөвлөлт, соёлын уялдаа холбоог бүрдүүлж, багуудыг зөвхөн амжилтад төвлөрөхөд нь тусалдаг.",
  "2011 онд зохион байгуулсан анхны урилгат тэмцээнээс эхлээд өнөөдрийн олон улсын аяллууд хүртэл бид залуусыг өрсөлдөгч болон дэлхийн иргэн болж хөгжих боломжийг бий болгоход үнэнч хэвээр байна. Бүх аяллын хөтөлбөрийг дасгалжуулагчидтай хамтран боловсруулж, эрчимтэй бэлтгэлийн хуваарь, хичээлийн үүрэг, амралтын туршлагуудыг зөв тэнцвэржүүлдэг.",
  "Холбоод, элчин сайдын яамд болон тансаг зэрэглэлийн түншүүдтэй байгуулсан харилцааны ачаар бид логистикийг нарийн зохицуулдаг. Танай баг тивийн аваргын эрхийн төлөө тэмцэж байгаа эсвэл хөгжлийн шинэ шат руу үсрэлт хийх гэж байгаа эсэхээс үл хамааран Gateway Sports Travel нь итгэлтэй хэрэгжүүлэх бүтэц, газар дээрх дэмжлэгийг үзүүлнэ.",
];

const timeline = [
  {
    year: "2011",
    milestone:
      "Манилад зохион байгуулсан анхны сагсан бөмбөгийн урилгат тэмцээнээр Gateway Sports Travel-ийг эхлүүлж, таван бүсийн академийг хүлээн авсан.",
  },
  {
    year: "2015",
    milestone:
      "Олон спортын аяллыг өргөжүүлж, соёлын аяллуудын хамт волейбол, футзал, усан сэлэлтийн солилцоог эхлүүлсэн.",
  },
  {
    year: "2018",
    milestone:
      "Залуучуудын багуудын виз болон бичиг баримтын үйлчилгээг 12 оронд нэвтрүүлж, баримт бичгийн урсгалыг хялбаршуулсан.",
  },
  {
    year: "2021",
    milestone:
      "Gateway Performance Network-ийг байгуулж, спортын эрдэмтэн, хоол тэжээлийн мэргэжилтэн, хэлний багш нарыг бүх аялалд холбосон.",
  },
  {
    year: "2024",
    milestone:
      "Жилд 600+ тамирчныг хосолсон аяллын хөтөлбөрөөр (тэмцээн, бэлтгэл, боловсролын аялал) амжилттай зохион байгуулж тэмдэглэсэн.",
  },
];

const capabilities = [
  {
    title: "Аяллын менежмент",
    description:
      "Тэмцээний хуваарьт тохируулан нислэгийн чартераас эхлээд байр, даатгал, газар дээрх тээвэрлэлтийг цогцоор нь зохион байгуулна.",
  },
  {
    title: "Арга хэмжээ зохион байгуулалт",
    description:
      "Заал захиалах, техникийн шүүгч, тэмцээн, нөхөрсөг тоглолт, үзүүлбэрүүдийг таны зорилгод тохируулан бүрэн зохион байгуулна.",
  },
  {
    title: "Виз болон нийцэл",
    description:
      "Манай мэргэжилтнүүд оролцогч бүрийн орох нөхцөл, урилгын бичиг, асран хамгаалагчийн зохицуулалтыг хариуцан хөнгөвчилдөг.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Бидний тухай --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Бидний тухай
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gateway Sports Travel: Багуудыг дэлхийн туршлагаар хөгжилд хөтөлнө
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6 text-base text-slate-600">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div
              className="rounded-3xl border border-slate-200 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center shadow-inner"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* --- Манай аялал --- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Манай аялал
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Гол мөчүүд
            </h2>
            <p className="text-sm text-slate-600">
              Сүүлийн арван жилд бид спортын төрөл, очих газар, үйлчилгээний цар
              хүрээг өргөжүүлсэн ч анхаарал халамжийн чанарыг байнга хадгалсаар
              ирсэн.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-primary">
                  {item.year}
                </p>
                <p className="mt-3 text-base font-medium text-slate-800">
                  {item.milestone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Бид юу хийж чадна --- */}
      <section className="bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Бид юу хийж чадна
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Аялал, арга хэмжээ, визийн иж бүрэн шийдэл
            </h2>
            <p className="text-sm text-slate-600">
              Бид дасгалжуулагчид, спортын удирдлагууд болон асран
              хамгаалагчидтай хамтран, тэмцээний хуваарь болон хичээлийн
              үүрэгтэй уялдсан цогц шийдлийг санал болгодог.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-base font-semibold text-slate-900">
                  {capability.title}
                </p>
                <p className="text-sm text-slate-600">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
