import type { ReactNode } from "react";
import type { SolutionId } from "../data/content";

type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-down"
  | "chevron-down"
  | "close"
  | "menu"
  | "check"
  | "send"
  | "reset"
  | "download"
  | "copy"
  | "lock"
  | "plus"
  | "spark"
  | "play";

const paths: Record<IconName, ReactNode> = {
  "arrow-up-right": <><path d="M6 18 18 6M6 6h12v12" /></>,
  "arrow-right": <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
  "arrow-down": <><path d="M12 4v15m-6-6 6 6 6-6" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  check: <path d="m5 12 4 4L19 6" />,
  send: <><path d="m4 4 17 8-17 8 3-8-3-8Z" /><path d="M7 12h14" /></>,
  reset: <><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H4v13h4" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  spark: <path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z" />,
  play: <path d="m8 4 12 8-12 8V4Z" />,
};

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function SolutionIllustration({ id }: { id: SolutionId }) {
  return (
    <svg
      className="solution-illustration"
      viewBox="0 0 160 110"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {id === "conversa" && (
        <>
          <path d="M34 29C34 20 41 16 52 16H104C115 16 122 22 122 33V63C122 74 115 80 105 80H66L44 94V79C37 78 34 72 34 63Z" fill="#e7ede6" stroke="#47756b" strokeWidth="1.7" />
          <path d="M48 37h39m-39 13h54M48 63h25" stroke="#47756b" strokeWidth="1.7" />
          <path d="M101 55c1-9 7-14 15-14h16c8 0 12 5 12 12v18c0 8-4 11-12 12h-6l-11 9V81c-9-2-14-6-14-14" fill="#fcfaf5" stroke="#47756b" strokeWidth="1.7" />
          <path d="m17 26 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z" fill="#bf9963" stroke="none" />
          <path d="M116 57h14m-14 10h8" stroke="#47756b" strokeWidth="1.5" />
        </>
      )}
      {id === "rotina" && (
        <>
          <path d="M29 74C44 74 48 74 48 56V38C48 22 62 18 78 18H102C131 18 139 50 112 58H84C55 58 56 87 83 89H130" stroke="#47756b" strokeWidth="1.8" />
          <path d="m76 48 8 10-9 8M119 80l11 9-10 8" stroke="#47756b" strokeWidth="1.8" />
          <circle cx="28" cy="74" r="12" fill="#e7ede6" stroke="#47756b" strokeWidth="1.7" />
          <circle cx="102" cy="18" r="8" fill="#c6a170" stroke="#fcfaf5" strokeWidth="3" />
          <circle cx="83" cy="89" r="8" fill="#e7ede6" stroke="#47756b" strokeWidth="1.7" />
          <path d="m24 74 3 3 5-6" stroke="#47756b" strokeWidth="1.5" />
          <path d="M48 15V7m-4 4h8" stroke="#c6a170" strokeWidth="1.5" />
        </>
      )}
      {id === "companhia" && (
        <>
          <path d="M17 94c1-19 12-29 30-29 16 0 28 10 29 29M89 94c0-19 11-29 29-29 17 0 29 10 30 29" fill="#e7ede6" stroke="#47756b" strokeWidth="1.7" />
          <circle cx="46" cy="46" r="17" fill="#fcfaf5" stroke="#47756b" strokeWidth="1.7" />
          <circle cx="118" cy="46" r="17" fill="#fcfaf5" stroke="#47756b" strokeWidth="1.7" />
          <path d="M52 94c0-21 12-36 31-36 18 0 30 15 30 36" fill="#fcfaf5" stroke="#47756b" strokeWidth="1.7" />
          <circle cx="82" cy="34" r="19" fill="#e7ede6" stroke="#47756b" strokeWidth="1.7" />
          <path d="M76 38c3 3 8 3 11-1m-46 14c3 3 7 3 10 0m62 0c3 3 7 3 10 0" stroke="#47756b" strokeWidth="1.5" />
          <path d="m141 9 1.7 6.3L149 17l-6.3 1.7L141 25l-1.7-6.3L133 17l6.3-1.7L141 9Z" fill="#bf9963" stroke="none" />
          <path d="M77 78h10m-5-5v10" stroke="#bf9963" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}