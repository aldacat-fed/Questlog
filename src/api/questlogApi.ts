import { HANDLE } from "../config";
import type { Game, NewGame, StatusFilter } from "../types";

const BASE_URL = `https://questlog-two-orcin.vercel.app/${HANDLE}`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Game not found (404).");
    }
    throw new Error(`Something went wrong (status ${response.status}).`);
  }

  // DELETE kan svara utan innehåll
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

const jsonOptions = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export function getGames(status: StatusFilter): Promise<Game[]> {
  const query = status === "all" ? "" : `?status=${status}`;
  return request<Game[]>(`/games${query}`);
}

export function getGame(id: string): Promise<Game> {
  return request<Game>(`/games/${id}`);
}

export function createGame(game: NewGame): Promise<Game> {
  return request<Game>("/games", jsonOptions("POST", game));
}

export function updateGame(id: string, changes: Partial<Omit<Game, "id">>): Promise<Game> {
  return request<Game>(`/games/${id}`, jsonOptions("PATCH", changes));
}

export function deleteGame(id: string): Promise<void> {
  return request<void>(`/games/${id}`, { method: "DELETE" });
}
