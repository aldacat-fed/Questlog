import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import type { Game } from "../types";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
}

export default function GameList({ games }: GameListProps) {
  const { t } = useLanguage();

  if (games.length === 0) {
    return (
      <div className="empty">
        <p>{t("list.empty")}</p>
        <Link to="/games/new" className="btn">
          {t("list.add")}
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
