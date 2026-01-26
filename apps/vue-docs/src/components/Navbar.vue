<script setup lang="ts">
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';

withDefaults(
  defineProps<{
    logo?: string;
    title?: string;
    showSearch?: boolean;
    showThemeToggle?: boolean;
    githubUrl?: string;
  }>(),
  {
    logo: '',
    title: 'SCX Core',
    showSearch: true,
    showThemeToggle: true,
    githubUrl: 'https://github.com/shawicx/scx-core',
  },
);

const mobileMenuOpen = ref(false);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="flex items-center gap-4">
        <a href="/" class="flex items-center gap-2">
          <img v-if="logo" :src="logo" alt="Logo" class="w-8 h-8" />
          <span class="text-lg font-semibold">{{ title }}</span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-4">
        <div v-if="showSearch" class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="搜索组件、Hooks..." />
          <span class="search-kbd">⌘K</span>
        </div>

        <a href="/components" class="nav-link"> 组件 </a>
        <a href="/hooks" class="nav-link"> Hooks </a>

        <a :href="githubUrl" class="nav-link" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>

        <ThemeToggle v-if="showThemeToggle" />
      </div>

      <button
        class="md:hidden theme-toggle"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 12h18 M3 6h18 M3 18h18" />
        </svg>
      </button>
    </div>

    <div
      v-if="mobileMenuOpen"
      class="md:hidden absolute top-[var(--navbar-height)] left-0 right-0 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] p-4"
    >
      <div class="flex flex-col gap-4">
        <a href="/components" class="nav-link"> 组件 </a>
        <a href="/hooks" class="nav-link"> Hooks </a>
        <a :href="githubUrl" class="nav-link"> GitHub </a>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-index-fixed);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.search-box {
  position: relative;
  width: 240px;
}

.search-box input {
  width: 100%;
  height: 36px;
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-2) 36px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.search-box input:hover {
  border-color: var(--color-border-hover);
}

.search-box input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.search-box input::placeholder {
  color: var(--color-text-tertiary);
}

.search-box svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.search-kbd {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 2px 6px;
  background-color: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 11px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: rgba(66, 184, 131, 0.1);
}
</style>
