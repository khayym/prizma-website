import * as React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="8" fill="#1d4ed8" />
      <path
        d="M9 7v14M9 7h6.5a4 4 0 010 8H9"
        stroke="#7dd3fc"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-lg font-semibold tracking-tight text-ink-900">
      Prizma <span className="text-brand-700">Flow</span>
    </span>
  </div>
);

export default Logo;
