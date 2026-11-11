import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";
import { useSaveGame } from "../hooks/useGames";
import { useLanguage } from "../hooks/useLanguage";
import type { NewGame } from "../types";

export default function NewGamePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { create, saving, error } = useSaveGame();

  async function handleSubmit(game: NewGame) {
    const created = await create(game);
    if (created) navigate(`/games/${created.id}`);
  }

  return (
    <section className="narrow">
      <h1>{t("form.heading")}</h1>
      <GameForm onSubmit={handleSubmit} submitting={saving} error={error} />
    </section>
  );
}