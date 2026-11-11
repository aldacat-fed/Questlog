import { useLanguage } from "../hooks/useLanguage";
import { STATUSES, type StatusFilter } from "../types";

interface FilterBarProps {
  value: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const { t } = useLanguage();

  const filters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: t("filter.all") },
    ...STATUSES.map((status) => ({ value: status, label: t(`status.${status}`) })),
  ];

  return (
    <div className="filters" role="group" aria-label={t("filter.label")}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={filter.value === value ? "filter filter--active" : "filter"}
          aria-pressed={filter.value === value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}