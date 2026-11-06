interface StarRatingProps {
    value: number | null;
    onChange: (rating: number | null) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
    const current = value ?? 0;

    return (
        <div className="stars" role={onChange ? "group" : "img"} aria-label={`Rating: ${current} av 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= current;
        if (!onChange) {
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
            aria-label={`${star} stars`}
            // Clicking the same star again removes the rating
            onClick={() => onChange(star === value ? null : star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}