import { motion } from "framer-motion";

export function QuoteBreak() {
  return (
    <section className="relative bg-background py-32 md:py-48 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2
          className="font-display font-bold text-primary leading-[0.85] tracking-tighter"
          style={{ fontSize: "clamp(2.2rem, 14vw, 22rem)" }}
        >
          GRACE
        </h2>
        <p className="mt-4 md:mt-6 text-lg md:text-2xl lg:text-4xl font-display text-foreground max-w-3xl mx-auto leading-snug text-balance px-4">
          is not just what we preach —{" "}
          <span className="italic">it's how we live.</span>
        </p>
        <p
          className="mt-8 text-foreground/70 text-lg"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          — Pastor of ICGC Greater Grace Temple
        </p>
      </motion.div>
    </section>
  );
}
