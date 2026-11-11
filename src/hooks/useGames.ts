import { useState } from "react";
import { createGame, deleteGame, getGame, getGames, updateGame } from "../api/questlogApi";
import type { Game, NewGame, StatusFilter } from "../types";
import { useFetch } from "./useFetch";

// Listan med spel, filtrerad på status. Hämtas om när filtret ändras.
export function useGames(status: StatusFilter) {
  return useFetch(() => getGames(status), [status]);
}

// Ett enskilt spel. Hämtas om när id ändras.
export function useGame(id: string) {
  return useFetch(() => getGame(id), [id]);
}

// POST, PATCH och DELETE. Varje funktion returnerar resultatet,
// eller null om något gick fel (felet finns då i `error`).
export function useSaveGame() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run<T>(action: () => Promise<T>): Promise<T | null> {
    setSaving(true);
    setError(null);
    try {
      return await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "errors.generic");
      return null;
    } finally {
      setSaving(false);
    }
  }

  return {
    saving,
    error,
    create: (game: NewGame) => run(() => createGame(game)),
    update: (id: string, changes: Partial<Omit<Game, "id">>) => run(() => updateGame(id, changes)),
    remove: (id: string) =>
      run(async () => {
        await deleteGame(id);
        return true;
      }),
  };
}
