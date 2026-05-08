"use client";

import { motion } from "framer-motion";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  color?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "Optional subtitle",
  color = "white",
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2.5,
          ease: [0.43, 0.13, 0.23, 0.96] as const,
        },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-24">
      {/* Animated SVG loop */}
      <div className="absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          <title>Gallery decoration</title>
          <motion.path
            d="M 950 90 C 1250 300, 1050 480, 600 520C 250 520, 150 480, 150 300C 150 120, 350 80, 600 80C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="10"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            style={{ opacity: 0.35 }}
          />
        </motion.svg>
      </div>

      {/* Text */}
      <div className="relative text-center z-10 flex flex-col items-center justify-center gap-3">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight"
          style={{ color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-lg md:text-xl font-display italic"
            style={{ color, opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
