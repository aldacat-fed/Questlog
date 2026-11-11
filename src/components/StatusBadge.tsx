import { useLanguage } from "../hooks/useLanguage";
import type { Status } from "../types";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();
  return <span className={`badge badge--${status}`}>{t(`status.${status}`)}</span>;
}