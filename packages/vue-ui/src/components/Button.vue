<template>
  <button :class="buttonClass" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="btn-loading">
      <svg class="btn-spinner" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="62.83"
          stroke-dashoffset="62.83"
        />
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  round?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  round: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClass = computed(() => [
  'scx-btn',
  `scx-btn--${props.type}`,
  `scx-btn--${props.size}`,
  {
    'scx-btn--disabled': props.disabled,
    'scx-btn--loading': props.loading,
    'scx-btn--block': props.block,
    'scx-btn--round': props.round,
  },
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.scx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.scx-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 169, 255, 0.2);
}

/* Size variants */
.scx-btn--small {
  padding: 4px 8px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
}

.scx-btn--medium {
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
}

.scx-btn--large {
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 8px;
}

/* Type variants */
.scx-btn--primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.scx-btn--primary:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.scx-btn--secondary {
  color: #1890ff;
  background-color: transparent;
  border-color: #1890ff;
}

.scx-btn--secondary:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  background-color: #f0f9ff;
}

.scx-btn--success {
  color: #fff;
  background-color: #52c41a;
  border-color: #52c41a;
}

.scx-btn--success:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  background-color: #73d13d;
  border-color: #73d13d;
}

.scx-btn--warning {
  color: #fff;
  background-color: #faad14;
  border-color: #faad14;
}

.scx-btn--warning:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  background-color: #ffc53d;
  border-color: #ffc53d;
}

.scx-btn--danger {
  color: #fff;
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.scx-btn--danger:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  background-color: #ff7875;
  border-color: #ff7875;
}

.scx-btn--ghost {
  color: #000;
  background-color: transparent;
  border-color: #d9d9d9;
}

.scx-btn--ghost:hover:not(.scx-btn--disabled):not(.scx-btn--loading) {
  color: #1890ff;
  border-color: #1890ff;
}

/* Modifiers */
.scx-btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.scx-btn--loading {
  cursor: default;
}

.scx-btn--block {
  width: 100%;
}

.scx-btn--round {
  border-radius: 999px;
}

/* Loading spinner */
.btn-loading {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
}

.btn-spinner circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 62.83;
  }
  50% {
    stroke-dashoffset: 15.71;
  }
  100% {
    stroke-dashoffset: 62.83;
  }
}
</style>
