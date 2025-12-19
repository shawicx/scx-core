<template>
  <div v-if="hasHooks" class="hooks-panel">
    <h4>Related Hooks</h4>
    <ul class="hooks-list">
      <li v-for="hook in hooks" :key="hook" class="hook-item">
        <code>{{ hook }}</code>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HooksPanelProps } from './types';

const props = defineProps<HooksPanelProps>();

const hasHooks = computed(() => {
  return props.hooks && props.hooks.length > 0;
});
</script>
