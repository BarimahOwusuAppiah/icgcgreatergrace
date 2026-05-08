import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import img1 from "@/assets/fellowship-1.jpg";
import img2 from "@/assets/fellowship-2.jpg";
import img3 from "@/assets/fellowship-3.jpg";
import img4 from "@/assets/fellowship-4.jpg";
import img5 from "@/assets/hero-worship.jpg";

const photos = [
  { src: img1, caption: "Sunday Service", h: "h-[70vh]" },
  { src: img2, caption: "The Word", h: "h-[60vh]" },
  { src: img3, caption: "Worship Nights", h: "h-[75vh]" },
  { src: img4, caption: "Youth Fellowship", h: "h-[65vh]" },
  { src: img5, caption: "Community Outreach", h: "h-[72vh]" },
];

export function PhotoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-65%"]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#f0f7f1" }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-14 md:mb-20">
        <p className="text-primary uppercase tracking-[0.3em] text-xs font-medium mb-4">
          In the Frame
        </p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground font-semibold text-balance max-w-3xl">
          Moments from our <span className="italic text-primary">house</span>
        </h2>
      </div>

      {/* Desktop: horizontal scroll-linked strip */}
      <motion.div
        style={{ x }}
        className="hidden md:flex gap-8 will-change-transform"
      >
        {photos.map((p, i) => (
          <figure key={i} className="shrink-0 w-[28vw] min-w-[320px]">
            <div className={`relative overflow-hidden rounded-sm ${p.h}`}>
              <img
                src={p.src}
                alt={p.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm uppercase tracking-[0.25em] text-foreground/70">
              {String(i + 1).padStart(2, "0")} — {p.caption}
            </figcaption>
          </figure>
        ))}
      </motion.div>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col gap-8 px-6">
        {photos.map((p, i) => (
          <figure key={i}>
            <div className="relative overflow-hidden rounded-sm h-[55vh]">
              <img
                src={p.src}
                alt={p.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/70">
              {String(i + 1).padStart(2, "0")} — {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
