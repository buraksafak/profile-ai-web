import { useEffect, useState } from 'react';

export function useImageAvailable(src: string): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!cancelled) {
        setAvailable(true);
      }
    };

    image.onerror = () => {
      if (!cancelled) {
        setAvailable(false);
      }
    };

    image.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return available;
}
