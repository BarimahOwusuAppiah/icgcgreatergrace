import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/kingdom-art.jpg";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.85, 1], [1.12, 1.03, 0.9]);
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.95], [0, 1, 1]);
  const leftTitleX = useTransform(scrollYProgress, [0.08, 0.72], ["-120%", "0%"]);
  const rightTitleX = useTransform(scrollYProgress, [0.08, 0.72], ["120%", "0%"]);

  return (
    <section ref={sectionRef} className="relative h-[340vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden group">
        <motion.img
          src={heroImage}
          alt="ICGC Greater Grace Kingdom artwork"
            style={{ scale: imageScale }}
          whileHover={{ scale: 1.14 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/80" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          <motion.div
            style={{ opacity: titleOpacity }}
            className="w-full overflow-hidden"
          >
            <motion.h1
              style={{ x: leftTitleX }}
              className="font-display text-white uppercase font-bold leading-[0.82] tracking-[0.08em] text-center drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]"
            >
              <span className="text-[clamp(2rem,12vw,18rem)]">ICGC</span>
            </motion.h1>
            <motion.h1
              style={{ x: rightTitleX }}
              className="font-display text-white uppercase font-bold leading-[0.82] tracking-[0.04em] text-center drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)]"
            >
              <span className="text-[clamp(1.6rem,8vw,12.5rem)]">GREATER GRACE</span>
            </motion.h1>
          </motion.div>

          <p className="mt-8 text-center font-display text-xl italic text-white/95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)] md:text-3xl">
            A Place of Grace. A House of Power.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-10 text-white/75"
          >
            <ChevronDown size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
