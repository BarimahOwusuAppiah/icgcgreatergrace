import { Facebook, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

// ── Tape SVG decoration ───────────────────────────────────────────────────────
const Tape = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="28"
    viewBox="0 0 95 30"
    fill="none"
    aria-hidden
  >
    <rect x="0" y="4" width="95" height="22" rx="4" fill="oklch(0.42 0.10 158 / 0.55)" />
    <rect x="0" y="4" width="95" height="22" rx="4" fill="url(#tape-shine)" />
    <defs>
      <linearGradient id="tape-shine" x1="0" y1="4" x2="0" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18" />
        <stop offset="100%" stopColor="white" stopOpacity="0.04" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/61582326988507/posts/1407793797437584/?substory_index=1407793797437584&mibextid=rS40aB7S9Ucbxw6v",
    icon: <Facebook size={15} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/icgcgreatergracetemple?igsh=NHl6eWdubWdsbW8y&utm_source=qr",
    icon: <Instagram size={15} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@icgc.greater.grac",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home",       to: "/"           },
  { label: "Who We Are", to: "/who-we-are"  },
  { label: "Our Pastor", to: "/pastors"     },
  { label: "Services",   to: "/services"    },
  { label: "Events",     to: "/events"      },
  { label: "Gallery",    to: "/gallery"     },
];

const SERVICE_TIMES = [
  "Sunday — 7:00 AM",
  "Sunday — 9:30 AM",
  "Wednesday — 6:30 PM",
  "Friday — 7:00 PM",
];

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-deep px-4 sm:px-6 py-10 sm:py-14">
      {/* ── White card with tape corners ── */}
      <div className="relative max-w-5xl mx-auto bg-white rounded-3xl px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)]">

        {/* Tape — top-left */}
        <Tape className="absolute -top-3 left-6 sm:left-10 rotate-[-2deg]" />
        {/* Tape — top-right */}
        <Tape className="absolute -top-3 right-6 sm:right-10 rotate-[2deg]" />

        {/* ── Main content grid ── */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-2">

          {/* Brand column */}
          <div className="flex-1 min-w-0">
            <Link to="/" className="inline-block">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
                Greater Grace
                <span className="block text-primary italic">Temple</span>
              </h3>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              A Place of Grace. A House of Power.<br />
              ICGC — International Central Gospel Church, Accra.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-4">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="flex gap-8 sm:gap-12 flex-wrap">

            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-semibold mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-semibold mb-3">
                Service Times
              </h4>
              <ul className="space-y-2">
                {SERVICE_TIMES.map((t) => (
                  <li key={t} className="text-sm text-foreground/70 font-medium whitespace-nowrap">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="max-w-5xl mx-auto mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 px-2">
        <p className="text-[11px] text-white/40 text-center sm:text-left">
          © {year} ICGC Greater Grace Temple. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/next-steps" className="text-[11px] text-white/40 hover:text-white/70 transition-colors">
            Plan a Visit
          </Link>
        </div>
      </div>
    </footer>
  );
}
