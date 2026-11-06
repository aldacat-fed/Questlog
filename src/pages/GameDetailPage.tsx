import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import GameCover from "../components/GameCover";
import Loading from "../components/Loading";
import StarRating from "../components/StarRating";
import StatusBadge from "../components/StatusBadge";
import { useGame, useSaveGame } from "../hooks/useGames";
import { STATUS_LABELS, STATUSES, type Game } from "../types";

export default function GameDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data: game, setData: setGame, loading, error, reload } = useGame(id);
  const { update, remove, saving, error: saveError } = useSaveGame();

  // Det användaren har skrivit men inte sparat än. null = inget utkast.
  const [notesDraft, setNotesDraft] = useState<string | null>(null);
  const notes = notesDraft ?? game?.notes ?? "";

  async function save(changes: Partial<Omit<Game, "id">>): Promise<boolean> {
    if (!game) return false;
    const result = await update(game.id, changes);
    if (result !== null) setGame({ ...game, ...changes });
    return result !== null;
  }

  async function handleDelete() {
    if (!game) return;
    if (!window.confirm(`Are you sure you want to delete "${game.title}"?`)) return;
    const removed = await remove(game.id);
    if (removed) navigate("/");
  }

  if (loading) return <Loading text="Loading game..." />;

  if (error || !game) {
    return (
      <div>
        <ErrorMessage message={error ?? "Game not found"} onRetry={reload} />
        <Link to="/" className="back">
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <article className="detail">
      <Link to="/" className="back">
        ← Back to list
      </Link>

      <div className="detail__layout">
        <GameCover title={game.title} coverUrl={game.coverUrl} />

        <div className="detail__info">
          <StatusBadge status={game.status} />
          <h1>{game.title}</h1>
          <p className="detail__platform">{game.platform}</p>

          <div className="panel">
            <h2>Status</h2>
            <div className="filters">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={status === game.status ? "filter filter--active" : "filter"}
                  disabled={saving}
                  onClick={() => save({ status })}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2>Rating</h2>
            <StarRating value={game.rating} onChange={(rating) => save({ rating })} />
          </div>

          <div className="panel">
            <h2>Notes</h2>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotesDraft(e.target.value)}
              aria-label="Notes"
            />
            <button
              type="button"
              className="btn btn--small"
              disabled={saving || notes === (game.notes ?? "")}
              onClick={async () => {
                if (await save({ notes })) setNotesDraft(null);
              }}
            >
              Save notes
            </button>
          </div>

          {saveError && <ErrorMessage message={saveError} />}

          <button type="button" className="btn btn--danger" disabled={saving} onClick={handleDelete}>
            Delete game
          </button>
        </div>
      </div>
    </article>
  );
}