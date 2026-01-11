import { useState, useEffect } from 'react';

export interface UseLocalStorageOptions<T> {
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
  onError?: (error: Error) => void;
}

export function useLocalStorage<T = string>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): [T, (value: T | ((val: T) => T)) => void] {
  const { serializer = JSON as any, onError = () => {} } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? serializer.read(item) : initialValue;
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, serializer.write(storedValue));
    } catch (error) {
      onError(error as Error);
    }
  }, [key, storedValue, serializer, onError]);

  return [storedValue, setStoredValue];
}
