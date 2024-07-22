import { MouseEventHandler } from "react";

export default function YearButton({
  year,
  currentYear,
  onClick,
}: {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-center px-4 py-2 border border-transparent border-zinc-700 duration-100 text-sm font-medium ${
        year === currentYear
          ? "hover:border-transparent"
          : "bg-[#12151e] hover:bg-[#1e212d] hover:border-zinc-700"
      }`}
      title={`View Graph for the year ${year}`}
    >
      {year}
    </button>
  );
}