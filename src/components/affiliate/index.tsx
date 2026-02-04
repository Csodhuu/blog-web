"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import { BASEURL, imageUrl } from "@/lib/authClient";

type PartnerEntity = {
  _id: string;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

const FALLBACK_LOGO =
  "https://placehold.co/400x400/png?text=Partner&font=roboto";

function ReviewCard({ image, name }: { image: string; name: string }) {
  return (
    <figure
      className={cn(
        "relative w-[190px] h-[190px] shrink-0 overflow-hidden rounded-2xl border",
        "border-black/10 bg-white hover:bg-slate-50 transition"
      )}
    >
      <img
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
        src={imageUrl + image || FALLBACK_LOGO}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK_LOGO;
        }}
      />
    </figure>
  );
}

export function Affiliate() {
  const [partners, setPartners] = useState<PartnerEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const fetchPartners = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASEURL}/partner`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Response status: ${res.status}`);

        const json = (await res.json()) as PartnerEntity[];

        const normalized = (Array.isArray(json) ? json : [])
          .filter((p) => p && p._id)
          .map((p) => ({
            _id: p._id,
            name: (p.name ?? "").trim() || "Partner",
            image: (p.image ?? "").trim() || FALLBACK_LOGO,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }));

        if (alive) setPartners(normalized);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Алдаа гарлаа";
        if (alive) {
          setError(msg);
          setPartners([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchPartners();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-[40px] mb-[50px] font-bold">
          Хамтрагч Байгууллагууд
        </h2>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-[190px] h-[190px] rounded-2xl border border-black/10 bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium">{error}</div>
        ) : partners.length === 0 ? (
          <div className="text-center text-slate-500">
            Одоогоор хамтрагч байгууллага алга байна.
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1-р мөр */}
            <Marquee pauseOnHover className="[--duration:16s]">
              {partners.map((p, idx) => (
                <ReviewCard
                  key={`${p._id}-${idx}`}
                  name={p.name}
                  image={p.image}
                />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
}
