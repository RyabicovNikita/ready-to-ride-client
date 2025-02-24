import { useState, useCallback } from "react";

export const useError = () => {
  const [error, setError] = useState("");

  const handleError = useCallback((err) => {
    if (typeof err === "string") setError(err);
    else if (err instanceof Error) setError(err.message);
    else if (typeof err === "object") setError(Object.values(err)?.[0]?.message ?? "");
    else setError("Произошла неизвестная ошибка");
  }, []);

  const resetError = useCallback(() => setError(""), []);

  return { error, handleError, resetError };
};
