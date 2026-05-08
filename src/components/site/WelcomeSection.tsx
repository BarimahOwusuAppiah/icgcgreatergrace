import { IcgcLogo } from "@/components/site/IcgcLogo";

export function WelcomeSection() {
  return (
    <section className="relative bg-background py-16 md:py-28 lg:py-40 px-4 sm:px-6 z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold" />
          <IcgcLogo size={28} />
          <span className="h-px w-10 bg-gold" />
        </div>

        <p className="text-primary uppercase tracking-[0.3em] text-xs font-medium mb-4">
          Welcome Home
        </p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-foreground font-semibold leading-tight text-balance">
          Welcome to{" "}
          <span className="text-primary italic">Greater Grace Temple</span>
        </h2>

        <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
          Whether you're searching, returning, or stepping in for the very first time —
          you belong here. This is a family rooted in the love of Christ, where every
          story matters and grace meets you exactly where you are.
        </p>

        <p className="mt-5 text-sm md:text-lg text-muted-foreground/90 italic font-display max-w-2xl mx-auto">
          "Come, taste and see that the Lord is good." — Psalm 34:8
        </p>
      </div>
    </section>
  );
}
