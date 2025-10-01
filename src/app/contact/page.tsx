import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Head Office",
    value: "Unit 1204, Gateway Tower, Ortigas Center, Pasig City, Philippines",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 2 8891 5560",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@gatewaysportstravel.com",
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/gatewaysportstravel", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/gatewaysportstravel", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/gatewaysportstravel", icon: Linkedin },
];

const adminContacts = [
  {
    role: "Competitions Director",
    name: "Miguel Santos",
    email: "competitions@gatewaysportstravel.com",
  },
  {
    role: "Travel Operations",
    name: "Aya Nakamura",
    email: "travel@gatewaysportstravel.com",
  },
  {
    role: "Camp Programs",
    name: "Ravi Kumar",
    email: "camps@gatewaysportstravel.com",
  },
  {
    role: "Media & Albums",
    name: "Tara Villanueva",
    email: "albums@gatewaysportstravel.com",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="border-b border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact Us</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Connect with Gateway Sports Travel
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600">
            We’re ready to design the next chapter of your team’s journey. Reach out for proposals, visa assistance, or to access our event calendars and brochures.
          </p>
        </div>
      </section>

      <section className="bg-white/90">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Office Hours</p>
              <p className="mt-3 text-sm text-slate-600">
                Monday – Friday, 9:00 AM to 6:00 PM (GMT+8). Weekend appointments available upon request for touring teams and guardians.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Social</p>
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
          <div className="flex flex-col gap-6">
            <div
              className="h-64 w-full overflow-hidden rounded-3xl border border-slate-200 bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1000&q=80)",
              }}
              aria-label="Gateway Sports Travel office map"
            />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Admin Contacts
              </p>
              <div className="mt-4 grid gap-4">
                {adminContacts.map((contact) => (
                  <div key={contact.email}>
                    <p className="text-sm font-semibold text-slate-900">{contact.role}</p>
                    <p className="text-sm text-slate-600">{contact.name}</p>
                    <p className="text-sm font-medium text-primary">{contact.email}</p>
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
