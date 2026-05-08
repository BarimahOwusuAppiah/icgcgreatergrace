import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import kingdomArt from "@/assets/kingdom-art.jpg";

const blocks = [
  {
    label: "01 — Foundation",
    title: "Rooted in Faith",
    body: "Built on the unshakable Word of God, our church stands as a sanctuary where Scripture is honored, taught, and lived. Every life that enters is anchored in truth.",
  },
  {
    label: "02 — Identity",
    title: "Embedded by Grace",
    body: "We are not a perfect people — we are a redeemed people. The grace of Jesus shapes who we are, how we love one another, and how we walk through every season.",
  },
  {
    label: "03 — Mission",
    title: "Called to Impact",
    body: "From Accra to the nations, we carry the Kingdom into homes, workplaces, and communities. We are sent — to serve, to heal, to declare the goodness of God.",
  },
];

// ── Desktop: fading sticky block ─────────────────────────────────────────────
function FadingBlock({
  block,
  index,
  total,
  progress,
}: {
  block: (typeof blocks)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const fadeWindow = segment * 0.2;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, end - fadeWindow, end]
      : index === total - 1
        ? [start - fadeWindow, start, 1]
        : [start - fadeWindow, start, start + fadeWindow, end - fadeWindow, end],
    index === 0
      ? [1, 1, 0]
      : index === total - 1
        ? [0, 1, 1]
        : [0, 0, 1, 1, 0],
  );

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0 flex items-center"
    >
      <div className="w-full max-w-xl">
        <span className="text-primary uppercase tracking-[0.3em] text-xs font-medium mb-6 block">
          {block.label}
        </span>
        <h3 className="font-display text-4xl md:text-5xl lg:text-7xl text-foreground font-semibold leading-[1.05] tracking-tight">
          {block.title}
        </h3>
        <p className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed max-w-md">
          {block.body}
        </p>
      </div>
    </motion.article>
  );
}

// ── Mobile: simple stacked cards ─────────────────────────────────────────────
function MobileBlocks() {
  return (
    <div className="bg-background">
      {/* Shared image banner */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={kingdomArt}
          alt="The Kingdom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Stacked blocks */}
      <div className="px-5 pb-10 space-y-10 -mt-6 relative z-10">
        {blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Accent line */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-gold/60 rounded-full mb-4" />
            <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-semibold block mb-3">
              {block.label}
            </span>
            <h3 className="font-display text-3xl font-semibold text-foreground leading-tight tracking-tight">
              {block.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {block.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Desktop: sticky scroll ────────────────────────────────────────────────────
function DesktopStickyScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [introLocked, setIntroLocked] = useState(true);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const gatedProgress = useMotionValue(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroLocked(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!introLocked) gatedProgress.set(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", (v) => {
      gatedProgress.set(introLocked ? 0 : v);
    });
    return () => unsub();
  }, [gatedProgress, introLocked, scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative bg-background h-[360vh]">
      <div className="sticky top-0 h-screen grid grid-cols-2 overflow-hidden">
        {/* Image */}
        <div className="order-2 relative h-screen overflow-hidden bg-primary-deep">
          <img
            src={kingdomArt}
            alt="The Kingdom — illustrative artwork of Christ teaching"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
        </div>

        {/* Text */}
        <div className="order-1 px-8 md:px-16 py-10 flex items-center">
          <div className="relative h-[58vh] w-full max-w-xl">
            {blocks.map((block, index) => (
              <FadingBlock
                key={block.label}
                block={block}
                index={index}
                total={blocks.length}
                progress={gatedProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export function StickyScrollSection() {
  return (
    <>
      {/* Mobile: plain flowing layout */}
      <div className="lg:hidden">
        <MobileBlocks />
      </div>

      {/* Desktop: sticky scroll experience */}
      <div className="hidden lg:block">
        <DesktopStickyScroll />
      </div>
    </>
  );
}
