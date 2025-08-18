import { useEffect, useRef } from "react";

export const useSafeTimeout = () => {
  const timeoutsRef = useRef<number[]>([]);

  const setSafeTimeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return { setSafeTimeout };
};
