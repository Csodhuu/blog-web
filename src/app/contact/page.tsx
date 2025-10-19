'use client';

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FormEvent, useState } from "react";

import { BASEURL } from "@/lib/authClient";

const contactDetails = [
  {
    icon: MapPin,
    label: "Төв оффис",
    value: "Unit 1204, Gateway Tower, Ortigas Center, Pasig City, Philippines",
  },
  {
    icon: Phone,
    label: "Утас",
    value: "+63 2 8891 5560",
  },
  {
    icon: Mail,
    label: "Имэйл",
    value: "hello@gatewaysportstravel.com",
  },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/gatewaysportstravel",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/gatewaysportstravel",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/gatewaysportstravel",
    icon: Linkedin,
  },
];

const adminContacts = [
  {
    role: "Тэмцээний захирал",
    name: "Miguel Santos",
    email: "competitions@gatewaysportstravel.com",
  },
  {
    role: "Аяллын үйл ажиллагаа",
    name: "Aya Nakamura",
    email: "travel@gatewaysportstravel.com",
  },
  {
    role: "Кэмп хөтөлбөрүүд",
    name: "Ravi Kumar",
    email: "camps@gatewaysportstravel.com",
  },
  {
    role: "Медиа ба цомгууд",
    name: "Tara Villanueva",
    email: "albums@gatewaysportstravel.com",
  },
];

export default function ContactPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!phone.trim() || !email.trim()) {
      setStatus({
        type: "error",
        message: "Утас болон имэйлээ оруулна уу.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus(null);

      const url = `${BASEURL}/contact`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone.trim(),
          email: email.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Хүсэлт илгээх явцад алдаа гарлаа.");
      }

      setStatus({
        type: "success",
        message: "Таны хүсэлтийг амжилттай хүлээн авлаа.",
      });
      setPhone("");
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Түр зуурын алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      {/* --- Толгой хэсэг --- */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Холбоо барих
          </p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gateway Sports Travel-тай холбогдоорой
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            Танай багийн дараагийн аяллын бүлгийг бид хамтдаа бичихэд бэлэн.
            Санал, төсөв, визийн зөвлөгөө авах эсвэл арга хэмжээний хуанли,
            танилцуулга материалуудаа авахын тулд бидэнтэй холбогдоно уу.
          </p>
        </div>
      </section>

      {/* --- Гол контент --- */}
      <section className="bg-white/90">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          {/* Зүүн тал — холбоо барих мэдээлэл, ажлын цаг, сошиал */}
          <div className="space-y-8">
            {/* Холбоо барих мэдээлэл */}
            <div className="grid gap-6 sm:grid-cols-2">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <item.icon className="min-h-5 min-w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-600 ">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ажлын цаг */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Ажлын цаг
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Даваа – Баасан, 9:00 – 18:00 (GMT+8). Аяллын багууд болон асран
                хамгаалагчдад зориулсан амралтын өдрийн уулзалтыг урьдчилан
                хүсэлтээр зохион байгуулна.
              </p>
            </div>

            {/* Сошиал сувгууд */}
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Сошиал
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary/50 hover:text-primary"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Баруун тал — байршлын зураг ба админ холбогдох хүмүүс */}
          <div className="flex flex-col gap-6">
            <div
              className="h-64 w-full overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1000&q=80)",
              }}
              aria-label="Gateway Sports Travel оффисын байршлын зураг"
            />
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Холбоо барих хүсэлт илгээх
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Доорх мэдээллийг бөглөснөөр бид тантай холбогдох болно.
              </p>

              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Утасны дугаар
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+976 9911 2233"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Имэйл хаяг
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="name@example.com"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Илгээж байна..." : "Хүсэлт илгээх"}
              </button>

              {status ? (
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              ) : null}
            </form>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Админ холбогдох хүмүүс
              </p>
              <div className="mt-4 grid gap-4">
                {adminContacts.map((contact) => (
                  <div key={contact.email}>
                    <p className="text-sm font-semibold text-slate-900">
                      {contact.role}
                    </p>
                    <p className="text-sm text-slate-600">{contact.name}</p>
                    <p className="text-sm font-medium text-primary">
                      {contact.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
