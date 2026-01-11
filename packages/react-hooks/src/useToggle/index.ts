import { useState } from 'react';

export interface UseToggleOptions<T = boolean> {
  initialValue?: T;
  trueValue?: T;
  falseValue?: T;
}

export interface UseToggleReturn<T> {
  state: T;
  toggle: (value?: T) => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: T) => void;
}

export function useToggle<T = boolean>(options: UseToggleOptions<T> = {}): UseToggleReturn<T> {
  const { initialValue = false as T, trueValue = true as T, falseValue = false as T } = options;

  const [state, setState] = useState<T>(initialValue);

  const toggle = (value?: T) => {
    if (value !== undefined) {
      setState(value);
    } else {
      setState((prev) => (prev === trueValue ? falseValue : trueValue));
    }
  };

  const setTrue = () => {
    setState(trueValue);
  };

  const setFalse = () => {
    setState(falseValue);
  };

  const setValue = (value: T) => {
    setState(value);
  };

  return {
    state,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}
