import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";
import { useSaveGame } from "../hooks/useSaveGame";
import type { NewGame } from "../types";

export default function NewGamePage() {
    const navigate = useNavigate();
    const { createGame, saving, error } = useSaveGame();

    async function handleSubmit(game: NewGame) {
        const created = await create(game);
        if (created) navigate(`/games/${created.id}`);
    }

    return (
        <section>
            <h1>Add new game</h1>
            <GameForm onSubmit={handleSubmit} submitting={saving} error={error} />
        </section>
    );
}