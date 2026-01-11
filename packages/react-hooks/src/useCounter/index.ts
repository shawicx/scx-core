import { useState, useMemo } from 'react';

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { min = 0, max = 100, step = 1, initial = min } = options;

  const [count, setCount] = useState(initial);

  const increment = () => {
    const newValue = count + step;
    if (newValue <= max) {
      setCount(newValue);
    }
  };

  const decrement = () => {
    const newValue = count - step;
    if (newValue >= min) {
      setCount(newValue);
    }
  };

  const reset = () => {
    setCount(initial);
  };

  const set = (value: number) => {
    if (value >= min && value <= max) {
      setCount(value);
    }
  };

  const canIncrement = useMemo(() => count + step <= max, [count, step, max]);
  const canDecrement = useMemo(() => count - step >= min, [count, step, min]);

  return {
    count,
    increment,
    decrement,
    reset,
    set,
    canIncrement,
    canDecrement,
  };
}
