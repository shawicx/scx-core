<template>
  <div class="home">
    <header class="header">
      <h1 class="title">SCX Core - Vue Components</h1>
      <p class="subtitle">Component Library Documentation</p>
    </header>

    <main class="main">
      <section class="section">
        <h2 class="section-title">Components</h2>
        <div class="component-grid">
          <RouterLink
            v-for="component in components"
            :key="component.name"
            :to="`/components/${component.name}`"
            class="component-card"
          >
            <h3 class="component-name">{{ component.displayName }}</h3>
            <p class="component-description">{{ component.description }}</p>
          </RouterLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Component {
  name: string;
  displayName: string;
  description: string;
}

const components: Component[] = [
  { name: 'Button', displayName: 'Button', description: 'A clickable button component' },
  { name: 'Input', displayName: 'Input', description: 'A text input field component' },
  { name: 'Modal', displayName: 'Modal', description: 'A modal dialog component' },
];
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.component-card {
  display: block;
  padding: 1.5rem;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.component-card:hover {
  border-color: #667eea;
  background: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.component-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.component-description {
  font-size: 0.875rem;
  color: #718096;
  line-height: 1.5;
}
</style>
