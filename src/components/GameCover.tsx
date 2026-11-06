import { useState } from "react";

interface GameCoverProps {
  title: string;
  coverUrl: string;
}

export default function GameCover({ title, coverUrl }: GameCoverProps) {
  const [failed, setFailed] = useState(false);

  if (!coverUrl || failed) {
    return (
      <div className="cover cover--empty" aria-label={`No cover for ${title}`}>
        <span>{title.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    <img
      className="cover"
      src={coverUrl}
      alt={`Omslag för ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}