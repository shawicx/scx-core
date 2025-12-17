export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  round?: boolean;
}

export interface CounterProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  editable?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export interface CardProps {
  title?: string;
  shadow?: 'always' | 'hover' | 'never';
  bordered?: boolean;
  size?: 'small' | 'medium' | 'large';
}
