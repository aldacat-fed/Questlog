import { useLanguage } from "../hooks/useLanguage";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useLanguage();

  return (
    <div className="error" role="alert">
      <p>{t(message)}</p>
      {onRetry && (
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}