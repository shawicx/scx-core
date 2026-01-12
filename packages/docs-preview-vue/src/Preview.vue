<script setup lang="ts">
import { computed } from 'vue';
import type { PreviewProps } from './types';
import './styles/Preview.css';

const props = withDefaults(defineProps<PreviewProps>(), {
  width: 'full',
  background: 'white',
  bordered: false,
});

const className = computed(() => {
  return `preview preview--${props.width} preview--${props.background}${props.bordered ? ' preview--bordered' : ''}`;
});
</script>

<template>
  <div :class="className">
    <div class="preview__content">
      <slot />
    </div>
  </div>
</template>
