import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200 z-10 ">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-indigo-500" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-2 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.png" alt="Gateway Sports" className="w-20 h-20" />
          <h2 className="text-xl font-semibold tracking-wide">
            GATEWAY SPORTS <br />
            TRAVEL MANAGEMENT
          </h2>
        </div>

        {/* Navigation */}
        <nav className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium tracking-wide">
          <Link href="/about" className="hover:text-white">
            БИДНИЙ ТУХАЙ
          </Link>
          <span className="opacity-40">|</span>

          <Link href="/competitions" className="hover:text-white">
            ТЭМЦЭЭНҮҮД
          </Link>
          <span className="opacity-40">|</span>

          <Link href="/travel" className="hover:text-white">
            АЯЛАЛ
          </Link>
          <span className="opacity-40">|</span>

          <Link href="/album" className="hover:text-white">
            ЗУРГИЙН ЦОМОГ
          </Link>
          <span className="opacity-40">|</span>

          <Link href="/camps" className="hover:text-white">
            CAMP TRAINING
          </Link>
          <span className="opacity-40">|</span>

          <Link href="/contact" className="hover:text-white">
            ХОЛБОО БАРИХ
          </Link>
        </nav>
      </div>

      {/* Contact bar */}
      <div className="bg-slate-700/60">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="space-y-1 text-center md:text-left">
            <p>
              <span className="font-semibold">Хаяг Байршил:</span> #1705, 17
              Давхар, Peace mall, 3-р хороо, Чингэлтэй дүүрэг, Улаанбаатар
            </p>
            <p>
              <span className="font-semibold">Цахим шуудан:</span>{" "}
              Gatewaycapability@gmail.com
              <span className="ml-6 font-semibold">Утас:</span> 9900-8515,
              9912-1892
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={"https://www.instagram.com/gatewaycmongolia/"}
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 transition"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href={"https://www.facebook.com/profile.php?id=100076482181492"}
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 transition"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-900 py-4 text-center text-xs text-slate-400">
        Copyright © 2026 Gateway Sports & Travel Management. All Rights
        Reserved.
      </div>
    </footer>
  );
}
