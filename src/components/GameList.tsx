import { Link } from "react-router-dom";
import type { Game } from "../types";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
}

export default function GameList({ games }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="empty">
        <p>No games found.</p>
        <Link to="/games/new" className="btn">
          Add a new game
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );
}
