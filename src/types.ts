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

export const STATUS_LABELS: Record<Status, string> = {
  want: "Want to play",
  playing: "Playing",
  completed: "Completed",
  dropped: "Dropped",
};

export const STATUSES = Object.keys(STATUS_LABELS) as Status[];