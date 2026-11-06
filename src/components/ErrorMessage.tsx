interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="error" role="alert">
            <p>{message}</p>
            {onRetry && (
                <button type="button" className="btn btn--ghost" onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    );
}