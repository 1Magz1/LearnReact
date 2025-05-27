import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay = 500) {
  const isThrottle = useRef(false);

  return useCallback((...args: any[]) => {
    if (!isThrottle.current) {
      callback(...args);
      isThrottle.current = true;

      setTimeout(() => {
        isThrottle.current = false;
      }, delay);
    }
  }, [callback, delay]);
}
