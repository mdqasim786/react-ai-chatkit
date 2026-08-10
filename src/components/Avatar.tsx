import type { ReactNode } from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: ReactNode;
  background: string;
  color: string;
  border: string;
  size?: number;
}

export default function Avatar({
  src,
  alt,
  fallback,
  background,
  color,
  border,
  size = 32,
}: AvatarProps) {
  const baseStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    flexShrink: 0,
  } as const;

  if (src) {
    return <img src={src} alt={alt} style={{ ...baseStyle, objectFit: "cover" }} />;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        ...baseStyle,
        display: "grid",
        placeItems: "center",
        background,
        color,
        fontSize: "11px",
        fontWeight: 700,
        border: `1px solid ${border}`,
      }}
    >
      {fallback}
    </div>
  );
}