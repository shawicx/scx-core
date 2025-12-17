<template>
  <div :class="counterClass">
    <Button
      :class="['scx-counter__btn', 'scx-counter__decrement']"
      :disabled="!canDecrement"
      size="small"
      @click="handleDecrement"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13H5v-2h14v2z" />
      </svg>
    </Button>

    <div class="scx-counter__content">
      <input
        v-if="editable"
        :class="['scx-counter__input']"
        :value="currentValue"
        type="number"
        :min="min"
        :max="max"
        @input="handleInput"
        @blur="handleBlur"
        @keyup.enter="handleBlur"
      />
      <span v-else class="scx-counter__value">{{ currentValue }}</span>

      <label v-if="label" class="scx-counter__label">{{ label }}</label>
    </div>

    <Button
      :class="['scx-counter__btn', 'scx-counter__increment']"
      :disabled="!canIncrement"
      size="small"
      @click="handleIncrement"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './Button.vue';

interface Props {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  editable?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  label: '',
  editable: false,
  size: 'medium',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
  change: [value: number];
  decrement: [value: number];
  increment: [value: number];
}>();

const internalValue = ref(props.modelValue);
const inputValue = ref(props.modelValue.toString());

const currentValue = computed({
  get: () => props.modelValue ?? internalValue.value,
  set: (value) => {
    const clampedValue = Math.max(props.min, Math.min(props.max, value));
    internalValue.value = clampedValue;
    inputValue.value = clampedValue.toString();
    emit('update:modelValue', clampedValue);
    emit('change', clampedValue);
  },
});

const canIncrement = computed(() => currentValue.value + props.step <= props.max);
const canDecrement = computed(() => currentValue.value - props.step >= props.min);

const counterClass = computed(() => [
  'scx-counter',
  `scx-counter--${props.size}`,
  {
    'scx-counter--disabled': props.disabled,
    'scx-counter--editable': props.editable,
  },
]);

const handleIncrement = () => {
  if (canIncrement.value && !props.disabled) {
    const newValue = currentValue.value + props.step;
    currentValue.value = newValue;
    emit('increment', newValue);
  }
};

const handleDecrement = () => {
  if (canDecrement.value && !props.disabled) {
    const newValue = currentValue.value - props.step;
    currentValue.value = newValue;
    emit('decrement', newValue);
  }
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;

  const numValue = parseInt(target.value, 10);
  if (!isNaN(numValue)) {
    currentValue.value = numValue;
  }
};

const handleBlur = () => {
  const numValue = parseInt(inputValue.value, 10);
  if (isNaN(numValue)) {
    inputValue.value = currentValue.value.toString();
  } else {
    currentValue.value = numValue;
  }
};

// Watch for external model value changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      internalValue.value = newValue;
      inputValue.value = newValue.toString();
    }
  },
);
</script>

<style scoped>
.scx-counter {
  display: inline-flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.scx-counter:focus-within {
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgba(64, 169, 255, 0.2);
}

/* Size variants */
.scx-counter--small {
  height: 24px;
}

.scx-counter--small .scx-counter__input {
  font-size: 12px;
  padding: 2px 4px;
}

.scx-counter--medium {
  height: 32px;
}

.scx-counter--medium .scx-counter__input {
  font-size: 14px;
  padding: 4px 8px;
}

.scx-counter--large {
  height: 40px;
}

.scx-counter--large .scx-counter__input {
  font-size: 16px;
  padding: 6px 12px;
}

/* Counter buttons */
.scx-counter__btn {
  border: none;
  border-radius: 0;
  background: #fafafa;
  color: #000;
  height: 100%;
  min-width: 32px;
  flex-shrink: 0;
}

.scx-counter__btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.scx-counter__btn:disabled {
  background: #f5f5f5;
  color: #bfbfbf;
}

.scx-counter__increment {
  border-left: 1px solid #d9d9d9;
}

.scx-counter__decrement {
  border-right: 1px solid #d9d9d9;
}

/* Content area */
.scx-counter__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 40px;
  gap: 4px;
}

.scx-counter__input {
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  width: 100%;
  font-family: inherit;
}

.scx-counter__input::-webkit-inner-spin-button,
.scx-counter__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.scx-counter__value {
  font-weight: 500;
  color: #000;
  user-select: none;
}

.scx-counter__label {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
}

/* Disabled state */
.scx-counter--disabled {
  background: #f5f5f5;
  border-color: #d9d9d9;
}

.scx-counter--disabled .scx-counter__input {
  color: #999;
}

.scx-counter--disabled .scx-counter__value {
  color: #999;
}
</style>
