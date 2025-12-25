<template>
  <div class="component-docs">
    <header class="header">
      <div class="header-content">
        <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
        <h1 class="title">{{ displayName }} Component</h1>
      </div>
    </header>

    <main class="main">
      <section class="section">
        <h2 class="section-title">Usage</h2>
        <div class="code-block">
          <pre><code>{{ importCode }}</code></pre>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Examples</h2>
        <p class="placeholder-text">Examples will be displayed here</p>
      </section>

      <section class="section">
        <h2 class="section-title">API</h2>
        <p class="placeholder-text">API documentation will be displayed here</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
const componentName = (route.params.name as string) || 'Component';

const displayName = computed(() => {
  return componentName.charAt(0).toUpperCase() + componentName.slice(1);
});

const importCode = computed(() => {
  return `import { ${displayName.value} } from '@scxfe/vue-ui';`;
});
</script>

<style scoped>
.component-docs {
  min-height: 100vh;
  background: #f7fafc;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #764ba2;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.code-block {
  background: #1a202c;
  border-radius: 6px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #48bb78;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.placeholder-text {
  color: #718096;
  font-style: italic;
  text-align: center;
  padding: 2rem;
}
</style>
