<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="scx-card__header">
      <slot name="header" />
    </div>

    <div v-if="$slots.cover" class="scx-card__cover">
      <slot name="cover" />
    </div>

    <div class="scx-card__body">
      <div v-if="title" class="scx-card__title">{{ title }}</div>
      <div v-if="$slots.default" class="scx-card__content">
        <slot />
      </div>
    </div>

    <div v-if="$slots.actions" class="scx-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  shadow?: 'always' | 'hover' | 'never';
  bordered?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  shadow: 'always',
  bordered: true,
  size: 'medium',
});

const cardClass = computed(() => [
  'scx-card',
  `scx-card--${props.shadow}`,
  `scx-card--${props.size}`,
  {
    'scx-card--bordered': props.bordered,
  },
]);
</script>

<style scoped>
.scx-card {
  background: #fff;
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.scx-card--bordered {
  border: 1px solid #f0f0f0;
}

/* Shadow variants */
.scx-card--always {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}

.scx-card--hover {
  box-shadow: none;
}

.scx-card--hover:hover {
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
}

.scx-card--never {
  box-shadow: none;
}

/* Size variants */
.scx-card--small {
  padding: 12px;
}

.scx-card--small .scx-card__title {
  font-size: 16px;
  margin-bottom: 8px;
}

.scx-card--small .scx-card__content {
  font-size: 14px;
}

.scx-card--medium {
  padding: 20px;
}

.scx-card--medium .scx-card__title {
  font-size: 18px;
  margin-bottom: 12px;
}

.scx-card--medium .scx-card__content {
  font-size: 14px;
}

.scx-card--large {
  padding: 24px;
}

.scx-card--large .scx-card__title {
  font-size: 20px;
  margin-bottom: 16px;
}

.scx-card--large .scx-card__content {
  font-size: 16px;
}

/* Card sections */
.scx-card__header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.scx-card--small .scx-card__header {
  padding: 12px;
}

.scx-card--large .scx-card__header {
  padding: 20px 24px;
}

.scx-card__cover {
  width: 100%;
  overflow: hidden;
}

.scx-card__cover img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.scx-card__body {
  padding: 0;
}

.scx-card__title {
  font-weight: 600;
  color: #000;
  line-height: 1.4;
}

.scx-card__content {
  color: #666;
  line-height: 1.6;
}

.scx-card__actions {
  padding: 12px 20px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.scx-card--small .scx-card__actions {
  padding: 8px 12px 0;
  margin-top: 12px;
}

.scx-card--large .scx-card__actions {
  padding: 16px 24px 0;
  margin-top: 20px;
}
</style>
