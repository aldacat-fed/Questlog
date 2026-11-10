import { useEffect, useState } from "react";

interface FetchState<T> {
  key: string | null; // vilket anrop resultatet hör till
  data: T | null;
  error: string | null;
}

// Generisk hook: hämtar data, håller koll på laddning och fel
export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[]) {
  const [reloadCount, setReloadCount] = useState(0);
  const [state, setState] = useState<FetchState<T>>({ key: null, data: null, error: null });

  // Ny nyckel varje gång deps ändras eller reload() anropas
  const requestKey = `${JSON.stringify(deps)}#${reloadCount}`;

  useEffect(() => {
    let cancelled = false; // ignorerar svar från gamla anrop

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ key: requestKey, data, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Something went wrong.";
          setState({ key: requestKey, data: null, error: message });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  // Har vi inget svar för det aktuella anropet än, laddar vi
  const loading = state.key !== requestKey;
  const error = loading ? null : state.error;

  // Används på spelsidan för att uppdatera spelet lokalt efter en ändring
  function setData(data: T) {
    setState({ key: requestKey, data, error: null });
  }

  function reload() {
    setReloadCount((n) => n + 1);
  }

  return { data: state.data, setData, loading, error, reload };
}