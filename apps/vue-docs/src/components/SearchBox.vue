<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  placeholder?: string;
}>();

const emit = defineEmits<{
  search: [query: string];
}>();

const query = ref('');
const isOpen = ref(false);

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    inputRef.value?.focus();
    isOpen.value = true;
  }
  if (e.key === 'Escape') {
    isOpen.value = false;
    inputRef.value?.blur();
  }
};

const handleSearch = (value: string) => {
  query.value = value;
  emit('search', value);
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
};

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="search-box">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      ref="inputRef"
      type="text"
      :placeholder="placeholder"
      v-model="query"
      @input="handleSearch(($event.target as HTMLInputElement).value)"
      @focus="isOpen = true"
      @blur="handleBlur"
    />
    <span class="search-kbd">⌘K</span>
  </div>
</template>

<style scoped>
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
</style>
