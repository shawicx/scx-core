<template>
  <div class="component-layout">
    <header class="layout-header">
      <div class="header-content">
        <p v-if="category" class="category">{{ category }}</p>
        <h1 class="title">{{ title }}</h1>
        <p v-if="description" class="description">{{ description }}</p>
      </div>
    </header>

    <main class="layout-main">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  category?: string;
}

withDefaults(defineProps<Props>(), {
  description: '',
  category: '',
});
</script>

<style scoped>
.component-layout {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

.layout-header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-12) 0;
  margin-bottom: var(--spacing-8);
}

.header-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.category {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-2) 0;
}

.title {
  font-size: var(--font-size-4xl);
  margin: 0 0 var(--spacing-4) 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.layout-main {
  flex: 1;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  width: 100%;
}

@media (max-width: 768px) {
  .title {
    font-size: var(--font-size-3xl);
  }

  .description {
    font-size: var(--font-size-base);
  }

  .layout-header {
    padding: var(--spacing-8) 0;
  }
}

@media (max-width: 640px) {
  .title {
    font-size: var(--font-size-2xl);
  }

  .description {
    font-size: var(--font-size-sm);
  }

  .layout-header {
    padding: var(--spacing-6) 0;
  }
}
</style>
