"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Travel", href: "/travel" },
  { label: "Competitions", href: "/competitions" },
  { label: "Camp Training", href: "/camps" },
  { label: "Past Events", href: "/past-events" },
  { label: "Album", href: "/album" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg">
            <span className="text-xl font-black">GT</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-500">Gateway Sports</p>
            <p className="text-lg font-bold text-slate-900">Travel Management</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white/90 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
