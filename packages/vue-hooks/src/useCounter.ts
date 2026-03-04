import { ref, computed, type Ref, type ComputedRef } from 'vue';

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
}

export interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
  canIncrement: ComputedRef<boolean>;
  canDecrement: ComputedRef<boolean>;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { min = 0, max = 100, step = 1, initial = min } = options;

  const count = ref(initial);

  const increment = () => {
    const newValue = count.value + step;
    if (newValue <= max) {
      count.value = newValue;
    }
  };

  const decrement = () => {
    const newValue = count.value - step;
    if (newValue >= min) {
      count.value = newValue;
    }
  };

  const reset = () => {
    count.value = initial;
  };

  const set = (value: number) => {
    if (value >= min && value <= max) {
      count.value = value;
    }
  };

  const canIncrement = computed(() => count.value + step <= max);
  const canDecrement = computed(() => count.value - step >= min);

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
