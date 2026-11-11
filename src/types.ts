export type Status = "want" | "playing" | "completed" | "dropped";
export type StatusFilter = "all" | Status;

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: Status;
  rating: number | null;
  coverUrl: string;
  notes: string;
}

// Det som skickas vid POST: title, platform och status krävs
export interface NewGame {
  title: string;
  platform: string;
  status: Status;
  rating?: number;
  coverUrl?: string;
  notes?: string;
}

export const STATUSES: Status[] = ["want", "playing", "completed", "dropped"];