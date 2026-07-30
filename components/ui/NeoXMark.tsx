export function NeoXMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Neo X"
    >
      <path
        d="M14 12L32 32L14 52H22L32 40L42 52H50L32 32L50 12H42L32 24L22 12H14Z"
        fill="currentColor"
      />
      <path
        d="M40 24L54 10M54 10L46 12M54 10L52 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.35" stroke="currentColor" strokeWidth="0.6">
        <line x1="32" y1="6" x2="32" y2="58" />
        <line x1="6" y1="32" x2="58" y2="32" />
      </g>
      <circle cx="32" cy="32" r="1.4" fill="currentColor" />
    </svg>
  );
}
