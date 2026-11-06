import { Link } from "react-router-dom";
import type { Game } from "../types";
import GameCover from "./GameCover";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <li className={`card card--${game.status}`}>
      <Link to={`/games/${game.id}`} className="card__link">
        <GameCover title={game.title} coverUrl={game.coverUrl} />
        <div className="card__body">
          <h3 className="card__title">{game.title}</h3>
          <p className="card__platform">{game.platform}</p>
          <div className="card__meta">
            <StatusBadge status={game.status} />
            {game.rating !== null && <StarRating value={game.rating} onChange={function (): void {throw new Error("Function not implemented.");}} />}
          </div>
        </div>
      </Link>
    </li>
  );
}