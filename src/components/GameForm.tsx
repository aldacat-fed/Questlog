import { useState, type FormEvent } from "react";
import { STATUS_LABELS, STATUSES, type NewGame, type Status } from "../types";
import StarRating from "./StarRating";

interface GameFormProps {
  onSubmit: (game: NewGame) => void;
  submitting: boolean;
  error: string | null;
}

const PLATFORMS = ["PC", "PlayStation 5", "Xbox", "Switch", "Mobil"];

export default function GameForm({ onSubmit, submitting, error }: GameFormProps) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState<Status>("want");
  const [rating, setRating] = useState<number | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [validation, setValidation] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim() || !platform.trim()) {
      setValidation("Titel och plattform måste fyllas i.");
      return;
    }
    setValidation(null);

    const game: NewGame = { title: title.trim(), platform: platform.trim(), status };
    if (rating !== null) game.rating = rating;
    if (coverUrl.trim()) game.coverUrl = coverUrl.trim();
    if (notes.trim()) game.notes = notes.trim();
    onSubmit(game);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Titel *</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Hollow Knight" />
      </label>

      <div className="form__row">
        <label className="field">
          <span>Plattform *</span>
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
          <span>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="field">
        <span>Betyg</span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <label className="field">
        <span>Länk till omslag</span>
        <input
          type="url"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <label className="field">
        <span>Anteckningar</span>
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      {(validation || error) && (
        <p className="form__error" role="alert">
          {validation ?? error}
        </p>
      )}

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? "Sparar..." : "Spara spel"}
      </button>
    </form>
  );
}