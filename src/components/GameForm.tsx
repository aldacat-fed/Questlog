import { useState, type FormEvent } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { STATUSES, type NewGame, type Status } from "../types";
import StarRating from "./StarRating";

interface GameFormProps {
  onSubmit: (game: NewGame) => void;
  submitting: boolean;
  error: string | null;
}

const PLATFORMS = ["PC", "PlayStation 5", "Xbox", "Switch", "Mobile"];

export default function GameForm({ onSubmit, submitting, error }: GameFormProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState<Status>("want");
  const [rating, setRating] = useState<number | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [missingFields, setMissingFields] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim() || !platform.trim()) {
      setMissingFields(true);
      return;
    }
    setMissingFields(false);

    const game: NewGame = { title: title.trim(), platform: platform.trim(), status };
    if (rating !== null) game.rating = rating;
    if (coverUrl.trim()) game.coverUrl = coverUrl.trim();
    if (notes.trim()) game.notes = notes.trim();
    onSubmit(game);
  }

  const message = missingFields ? t("form.required") : error ? t(error) : null;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        <span>{t("form.title")}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Hollow Knight" />
      </label>

      <div className="form__row">
        <label className="field">
          <span>{t("form.platform")}</span>
          <input
            list="platforms"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Switch"
          />
          <datalist id="platforms">
            {PLATFORMS.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>

        <label className="field">
          <span>{t("form.status")}</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="field">
        <span>{t("form.rating")}</span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <label className="field">
        <span>{t("form.coverUrl")}</span>
        <input
          type="url"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="field">
        <span>{t("form.notes")}</span>
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      {message && (
        <p className="form__error" role="alert">
          {message}
        </p>
      )}

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? t("form.saving") : t("form.save")}
      </button>
    </form>
  );
}