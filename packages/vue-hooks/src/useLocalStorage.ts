import { ref, watchEffect, type Ref } from 'vue';

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
): Ref<T> {
  const {
    serializer = JSON,
    onError = () => {
      // 默认错误处理静默
    },
  } = options;

  const storedValue = ref<T>(initialValue);

  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? serializer.read(item) : initialValue;
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  };

  const writeValue = (value: T): void => {
    try {
      window.localStorage.setItem(key, serializer.write(value));
    } catch (error) {
      onError(error as Error);
    }
  };

  // Initialize value from localStorage
  storedValue.value = readValue();

  // Watch for changes and update localStorage
  watchEffect(() => {
    writeValue(storedValue.value);
  });

  return storedValue;
}
