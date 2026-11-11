import { STATUS_LABELS, STATUSES, type StatusFilter } from "../types";

interface FilterBarProps {
    value: StatusFilter;
    onChange: (newValue: StatusFilter) => void;
}

const FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    ...STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
];

export default function FilterBar({ value, onChange }: FilterBarProps) {
    return (
        <div className="filters" role="group" aria-label="Filter games by status">
           {FILTERS.map((filter) => (
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