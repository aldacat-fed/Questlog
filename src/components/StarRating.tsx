import { useLanguage } from "../hooks/useLanguage";

interface StarRatingProps {
  value: number | null;
  // Om onChange saknas visas betyget bara (read-only)
  onChange?: (rating: number | null) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const { t } = useLanguage();
  const current = value ?? 0;
  const interactive = onChange !== undefined;

  return (
    <div
      className="stars"
      role={interactive ? "group" : "img"}
      aria-label={t("rating.label", { n: current })}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= current;

        if (!interactive) {
          return (
            <span key={star} className={filled ? "star star--on" : "star"} aria-hidden="true">
              ★
            </span>
          );
        }

        return (
          <button
            key={star}
            type="button"
            className={filled ? "star star--on" : "star"}
            aria-label={t("rating.rate", { n: star })}
            // Klick på samma stjärna igen tar bort betyget
            onClick={() => onChange?.(star === value ? null : star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}