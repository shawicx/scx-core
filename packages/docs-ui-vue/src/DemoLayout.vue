<template>
  <div class="demo-layout">
    <h3 v-if="title" class="demo-title">
      {{ title }}
    </h3>
    <p v-if="description" class="demo-description">
      {{ description }}
    </p>
    <div class="demo-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DemoLayoutProps } from './types';

defineProps<DemoLayoutProps>();
</script>
