import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type MenuItem = {
  label: string;
  to: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
  onItemClick?: () => void;
}

export const MenuVertical = ({
  menuItems = [],
  color = "#c8b97a",
  skew = -3,
  onItemClick,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-fit flex-col gap-1.5">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.to}-${index}`}
          className="flex items-center gap-2 cursor-pointer"
          initial="initial"
          whileHover="hover"
        >
          {/* Arrow slides in from left on hover */}
          <motion.div
            variants={{
              initial: { x: "-100%", opacity: 0 },
              hover:   { x: 0,       opacity: 1  },
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ color }}
          >
            <ArrowRight strokeWidth={2} className="size-4" />
          </motion.div>

          {/* Link slides right and turns gold on hover */}
          <motion.div
            variants={{
              initial: { x: -20, color: "rgba(255,255,255,0.75)" },
              hover:   { x: 0,   color, skewX: skew              },
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Link
              to={item.to}
              onClick={onItemClick}
              className="font-display font-medium text-2xl tracking-wide leading-tight"
            >
              {item.label}
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default MenuVertical;
