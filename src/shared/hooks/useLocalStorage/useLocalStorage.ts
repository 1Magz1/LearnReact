import { useState, useEffect, useCallback } from 'react';
import { STORAGE_EVENT } from 'shared/constants';

type SetValue<T> = (value: T) => void;
type RemoveValue = () => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>, RemoveValue] {
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // eslint-disable-next-line
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);

        window.dispatchEvent(new Event(STORAGE_EVENT));
      } catch (error) {
        // eslint-disable-next-line
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  const removeValue: RemoveValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch (error) {
      // eslint-disable-next-line
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleLocalChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener(STORAGE_EVENT, handleLocalChange);
    return () => window.removeEventListener(STORAGE_EVENT, handleLocalChange);
  }, [readValue]);

  return [storedValue, setValue, removeValue];
}
