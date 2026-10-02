type WordmarkProps = {
  className?: string;
  decorative?: boolean;
};

export function Wordmark({ className = "", decorative = false }: WordmarkProps) {
  return (
    <span
      className={`brand-wordmark ${className}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Flowy"}
      aria-hidden={decorative || undefined}
    />
  );
}

export function WaveMark({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-wave ${className}`}
      src="/brand/flowy-wave.svg"
      alt=""
      aria-hidden="true"
      width="400"
      height="400"
      loading="lazy"
    />
  );
}