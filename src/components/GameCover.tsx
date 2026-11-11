import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface GameCoverProps {
  title: string;
  coverUrl: string;
}

export default function GameCover({ title, coverUrl }: GameCoverProps) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  // Saknas omslaget (eller går det inte att ladda) visas en platshållare
  if (!coverUrl || failed) {
    return (
      <div className="cover cover--empty" aria-label={t("cover.none", { title })}>
        <span>{title.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    <img
      className="cover"
      src={coverUrl}
      alt={t("cover.alt", { title })}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}