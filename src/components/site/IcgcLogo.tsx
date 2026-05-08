import logoSrc from "@/assets/icgc-logo.png";

interface IcgcLogoProps {
  /** Pixel size — width and height are equal. Default 28. */
  size?: number;
  className?: string;
}

export function IcgcLogo({ size = 28, className = "" }: IcgcLogoProps) {
  return (
    <img
      src={logoSrc}
      alt="ICGC Greater Grace Temple"
      width={size}
      height={size}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
