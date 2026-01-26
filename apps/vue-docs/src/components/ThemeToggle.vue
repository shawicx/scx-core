<script setup lang="ts">
/**
 * 主题切换组件
 * 支持亮色/暗色主题切换，自动检测系统主题，并保存用户偏好
 */
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  'theme-change': [theme: 'light' | 'dark'];
}>();

const props = withDefaults(
  defineProps<{
    defaultTheme?: 'light' | 'dark';
  }>(),
  {
    defaultTheme: 'light',
  },
);

const theme = ref<'light' | 'dark'>(props.defaultTheme);

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light';
  theme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  emit('theme-change', newTheme);
};

onMounted(() => {
  theme.value = getInitialTheme();
  document.documentElement.setAttribute('data-theme', theme.value);
});
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
    <svg
      v-if="theme === 'light'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41"
      />
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-text-primary);
}

.theme-toggle:hover {
  background-color: var(--color-bg-secondary);
  border-color: var(--color-border);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
}
</style>
