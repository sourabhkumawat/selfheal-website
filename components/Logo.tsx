import Image from "next/image";

type Props = {
  className?: string;
  size?: number;
  /**
   * Kept for API compatibility with the previous inline-SVG version.
   * No effect now — the supplied PNG already has its own backdrop.
   */
  withBackground?: boolean;
};

/**
 * HealOps mark — renders the official brand image from /public/logo.webp.
 * Drop a replacement file at /public/logo.webp (any square aspect ratio,
 * ≥64×64 recommended) and the entire site picks it up automatically.
 */
export default function Logo({ className, size = 32 }: Props) {
  return (
    <Image
      src="/logo.webp"
      alt="HealOps"
      width={size}
      height={size}
      priority
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
