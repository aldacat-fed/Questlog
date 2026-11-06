interface LoadingProps {
  text: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="loading" role="status">
      <span className="loading__dot" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}