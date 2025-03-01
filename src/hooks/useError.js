import { useState, useCallback } from "react";

export const useError = () => {
  const [error, setError] = useState("");

  const handleError = useCallback((err) => {
    if (typeof err === "string") setError(err);
    else if (err instanceof Error) setError(err.message);
    else if (typeof err === "object") {
      if (Object.keys(err).length === 0) return;
      if (err.code) {
        const { code, error: message, ...props } = err;
        setError({ code: err.code, message: err.error, ...props });
        return;
      }
      setError(err.error ?? "Произошла неизвестная ошибка");
    }
  }, []);

  const resetError = useCallback(() => setError(""), []);

  return { error, handleError, resetError };
};
