import { useState, useCallback } from "react";

export const useLoader = () => {
  const [loading, setLoading] = useState(false);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  return { loading, showLoader, hideLoader };
};
