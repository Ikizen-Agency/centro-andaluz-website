import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="140"
      height="35"
      {...props}
      className="text-primary"
    >
      <g fill="currentColor">
        <path d="M25 5 C13.95 5 5 13.95 5 25 C5 36.05 13.95 45 25 45 C36.05 45 45 36.05 45 25 C45 13.95 36.05 5 25 5 Z M25 41 C16.16 41 9 33.84 9 25 C9 16.16 16.16 9 25 9 C33.84 9 41 16.16 41 25 C41 33.84 33.84 41 25 41 Z" />
        <path d="M25 12 C18.37 12 13 17.37 13 24 L17 24 C17 19.58 20.58 16 25 16 C29.42 16 33 19.58 33 24 L37 24 C37 17.37 31.63 12 25 12 Z" />
        <rect x="23" y="24" width="4" height="13" />
      </g>
      <text
        x="55"
        y="32"
        fontFamily="Playfair Display, serif"
        fontSize="24"
        fill="hsl(var(--foreground))"
        className="font-headline"
      >
        Centro Andaluz
      </text>
    </svg>
  );
}
