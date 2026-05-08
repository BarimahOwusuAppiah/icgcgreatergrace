import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IcgcLogo } from "@/components/site/IcgcLogo";
import { MenuVertical } from "@/components/ui/menu-vertical";

const links = [
  { label: "Home",       to: "/"           },
  { label: "Who We Are", to: "/who-we-are"  },
  { label: "Our Pastor", to: "/pastors"     },
  { label: "Services",   to: "/services"    },
  { label: "Events",     to: "/events"      },
  { label: "Gallery",    to: "/gallery"     },
];

type NavbarProps = { revealAfterVh?: number };

// ── Tiny hamburger icon (3 lines → X) ────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] w-5 bg-current rounded-full origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[1.5px] w-5 bg-current rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] w-5 bg-current rounded-full origin-center"
      />
    </div>
  );
}

export function Navbar({ revealAfterVh = 0 }: NavbarProps) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible]   = useState(revealAfterVh <= 0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (revealAfterVh > 0) {
        setVisible(window.scrollY >= window.innerHeight * revealAfterVh);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealAfterVh]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-soft border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-14 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50 relative">
            <IcgcLogo size={32} className="drop-shadow-sm" />
            <span className={cn(
              "font-display text-lg md:text-2xl font-bold tracking-tight transition-colors",
              open ? "text-white" : scrolled ? "text-primary" : "text-white"
            )}>
              Greater Grace
              <span className={cn(
                "ml-1 text-[10px] uppercase tracking-[0.2em] font-sans font-medium",
                open ? "text-gold" : scrolled ? "text-gold-foreground/70" : "text-gold"
              )}>
                ICGC
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary-glow story-link",
                  scrolled ? "text-foreground" : "text-white/90"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile trigger — small icon top-right */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "lg:hidden relative z-50 p-2 rounded-md transition-colors",
              open ? "text-white" : scrolled ? "text-primary" : "text-white"
            )}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay — slides down like a new page ───────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: "0%"    }}
            exit={{    y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-primary-deep flex flex-col overflow-hidden"
          >
            {/* Faint ICGC logo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05]">
              <IcgcLogo size={320} />
            </div>

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

            {/* Content — staggered fade-up after panel arrives */}
            <div className="relative z-10 flex flex-col justify-center flex-1 px-8 pt-20 pb-10">

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-gold/50 uppercase tracking-[0.32em] text-[10px] font-semibold mb-8"
              >
                Menu
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.35, duration: 0.45 }}
              >
                <MenuVertical
                  menuItems={links}
                  color="#c8b97a"
                  skew={-3}
                  onItemClick={() => setOpen(false)}
                />
              </motion.div>

              {/* Bottom strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="mt-auto pt-10 border-t border-white/10"
              >
                <p className="text-white/30 text-[10px] uppercase tracking-[0.28em] font-medium mb-2">
                  Join us
                </p>
                <p className="text-white/55 text-sm font-display italic">
                  Sunday 7:00 AM &amp; 9:30 AM — Accra, Ghana
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
