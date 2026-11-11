import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import GameCover from "../components/GameCover";
import Loading from "../components/Loading";
import StarRating from "../components/StarRating";
import StatusBadge from "../components/StatusBadge";
import { useGame, useSaveGame } from "../hooks/useGames";
import { useLanguage } from "../hooks/useLanguage";
import { STATUSES, type Game } from "../types";

export default function GameDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
    if (!window.confirm(t("detail.deleteConfirm", { title: game.title }))) return;
    const removed = await remove(game.id);
    if (removed) navigate("/");
  }

  if (loading) return <Loading text={t("loading.game")} />;

  if (error || !game) {
    return (
      <div>
        <ErrorMessage message={error ?? "errors.gameNotFound"} onRetry={reload} />
        <Link to="/" className="back">
          {t("common.back")}
        </Link>
      </div>
    );
  }

  return (
    <article className="detail">
      <Link to="/" className="back">
        {t("common.back")}
      </Link>

      <div className="detail__layout">
        <GameCover title={game.title} coverUrl={game.coverUrl} />

        <div className="detail__info">
          <StatusBadge status={game.status} />
          <h1>{game.title}</h1>
          <p className="detail__platform">{game.platform}</p>

          <div className="panel">
            <h2>{t("detail.status")}</h2>
            <div className="filters">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={status === game.status ? "filter filter--active" : "filter"}
                  disabled={saving}
                  onClick={() => save({ status })}
                >
                  {t(`status.${status}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2>{t("detail.rating")}</h2>
            <StarRating value={game.rating} onChange={(rating) => save({ rating })} />
          </div>

          <div className="panel">
            <h2>{t("detail.notes")}</h2>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotesDraft(e.target.value)}
              aria-label={t("detail.notes")}
            />
            <button
              type="button"
              className="btn btn--small"
              disabled={saving || notes === (game.notes ?? "")}
              onClick={async () => {
                if (await save({ notes })) setNotesDraft(null);
              }}
            >
              {t("detail.saveNotes")}
            </button>
          </div>

          {saveError && <ErrorMessage message={saveError} />}

          <button type="button" className="btn btn--danger" disabled={saving} onClick={handleDelete}>
            {t("detail.delete")}
          </button>
        </div>
      </div>
    </article>
  );
}