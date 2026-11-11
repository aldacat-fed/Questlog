import { HANDLE } from "../config";
import type { Game, NewGame, StatusFilter } from "../types";

const BASE_URL = `https://questlog-api.vercel.app/api/${HANDLE}`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new Error("errors.network");
  }

  if (!response.ok) {
    throw new Error(response.status === 404 ? "errors.notFound" : "errors.generic");
  }

  // DELETE kan svara utan innehåll
  const text = await response.text();
  try {
    return (text ? JSON.parse(text) : undefined) as T;
  } catch {
    throw new Error("errors.generic");
  }
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
