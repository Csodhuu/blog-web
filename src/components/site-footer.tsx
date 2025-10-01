import Link from "next/link";

const footerLinks = [
  {
    title: "Хөтөлбөрүүд",
    links: [
      { label: "Аялал", href: "/travel" },
      { label: "Тэмцээнүүд", href: "/competitions" },
      { label: "Кэмп сургалт", href: "/camps" },
      { label: "Зургийн цомог", href: "/album" },
    ],
  },
  {
    title: "Компани",
    links: [
      { label: "Бидний тухай", href: "/about" },
      { label: "Холбоо барих", href: "/contact" },
      { label: "Өмнөх арга хэмжээнүүд", href: "/past-events" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Танилцуулга хэсэг */}
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">
            Gateway Sports Travel
          </p>
          <p className="text-sm text-slate-400">
            Тамирчдын клуб, холбоодод зориулсан аялал, тэмцээн, соёлын иж бүрэн
            туршлага — Ази болон дэлхийн түвшинд.
          </p>
        </div>

        {/* Линкүүд */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              {section.title}
            </p>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Мэдээллийн товхимол
          </p>
          <p className="text-sm text-slate-400">
            Аяллын цонх, тэмцээний урилга, кэмпийн хөтөлбөрийн шинэчлэлтүүдийг
            имэйлээрээ шууд хүлээн аваарай.
          </p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="tanid@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
            >
              Бүртгүүлэх
            </button>
          </form>
        </div>
      </div>

      {/* Доод хэсэг */}
      <div className="border-t border-slate-800 bg-slate-950 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Gateway Sports Travel. Бүх эрх хуулиар
          хамгаалагдсан.
        </p>
      </div>
    </footer>
  );
}
