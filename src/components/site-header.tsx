"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "../../public/head-logo.png";

const navigation = [
  { label: "Нүүр", href: "/" },
  { label: "Бидний тухай", href: "/about" },
  { label: "Аялал", href: "/travel" },
  { label: "Тэмцээнүүд", href: "/competitions" },
  { label: "Camp Training", href: "/camps" },
  { label: "Зургийн цомог", href: "/album" },
  { label: "Холбоо барих", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur shadow-sm">
      <div className="mx-auto  max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-primary justify-center mb-[12px]"
        >
          <div className="flex relative h-[44.09px] w-[190px] items-center justify-center rounded-2xl">
            <Image src={Logo} alt="" fill className="object-contain" />
          </div>
        </Link>
        <div className="flex justify-center">
          <nav className="hidden items-center gap-2 text-xs font-medium text-slate-600 lg:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={` px-4 py-2 transition-colors ${
                    isActive
                      ? "border-b-2 border-black font-black"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={"https://www.facebook.com/profile.php?id=100076482181492"}
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover-glow hover:bg-[#261F61]/10 hover:text-[#261F61]"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </Link>
            <Link
              href={"https://www.instagram.com/gatewaycmongolia/"}
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover-glow hover:bg-[#261F61]/10 hover:text-[#261F61]"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

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
