import { ref, type Ref } from 'vue';

export interface UseToggleOptions<T = boolean> {
  initialValue?: T;
  trueValue?: T;
  falseValue?: T;
}

export interface UseToggleReturn<T> {
  state: Ref<T>;
  toggle: (value?: T) => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: T) => void;
}

export function useToggle<T = boolean>(options: UseToggleOptions<T> = {}): UseToggleReturn<T> {
  const { initialValue = false as T, trueValue = true as T, falseValue = false as T } = options;

  const state = ref<T>(initialValue);

  const toggle = (value?: T) => {
    if (value !== undefined) {
      state.value = value;
    } else {
      state.value = state.value === trueValue ? falseValue : trueValue;
    }
  };

  const setTrue = () => {
    state.value = trueValue;
  };

  const setFalse = () => {
    state.value = falseValue;
  };

  const setValue = (value: T) => {
    state.value = value;
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}
