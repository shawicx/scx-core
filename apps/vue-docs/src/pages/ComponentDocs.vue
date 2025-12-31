<template>
  <div class="component-docs">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading component documentation...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <h2>Component Not Found</h2>
      <p>{{ error }}</p>
      <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
    </div>

    <!-- Documentation Content -->
    <div v-else-if="componentData" class="docs-content">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
          <h1 class="title">{{ componentData.name }} Component</h1>
          <p v-if="componentData.category" class="category">
            {{ componentData.category }}
          </p>
        </div>
      </header>

      <main class="main">
        <!-- Usage Section -->
        <section class="section">
          <h2 class="section-title">Usage</h2>
          <div class="code-block">
            <div class="code-header">
              <span>typescript</span>
              <button class="copy-btn" @click="copyCode(importCode)" title="Copy code">
                {{ copied ? '✓ Copied' : '📋 Copy' }}
              </button>
            </div>
            <pre><code>{{ importCode }}</code></pre>
          </div>
        </section>

        <!-- Demos Section -->
        <section v-if="demos.length > 0" class="section">
          <h2 class="section-title">Examples</h2>
          <div v-for="(demo, index) in demos" :key="demo.id" class="demo-item">
            <DemoLayout :title="demo.title" :description="demo.description">
              <component :is="getDemoComponent(demo.id)" />
            </DemoLayout>
          </div>
        </section>

        <!-- API Section -->
        <section class="section">
          <h2 class="section-title">API</h2>

          <!-- Props -->
          <div v-if="componentMeta.props && componentMeta.props.length > 0" class="api-subsection">
            <h3 class="subsection-title">Props</h3>
            <PropsTable :meta="componentMeta" />
          </div>

          <!-- Events -->
          <div
            v-if="componentMeta.events && componentMeta.events.length > 0"
            class="api-subsection"
          >
            <h3 class="subsection-title">Events</h3>
            <EventsTable :events="componentMeta.events" />
          </div>

          <!-- Slots -->
          <div v-if="componentMeta.slots && componentMeta.slots.length > 0" class="api-subsection">
            <h3 class="subsection-title">Slots</h3>
            <SlotsTable :slots="componentMeta.slots" />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { registry } from '../lib/registry';
import { DemoLayout, PropsTable, EventsTable, SlotsTable } from '@scxfe/docs-ui-vue';
import type { ComponentMeta } from '@scxfe/doc-schema';

const route = useRoute();
const componentName = (route.params.name as string) || '';

// State
const loading = ref(true);
const error = ref<string | null>(null);
const componentData = ref<any>(null);
const componentMeta = ref<ComponentMeta>({ name: '', props: [], events: [], slots: [] });
const demos = ref<any[]>([]);
const copied = ref(false);

// Dynamically loaded demo components
const demoComponents = shallowRef<Record<string, any>>({});

// Computed
const importCode = computed(() => {
  const name = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  return `import { ${name} } from '@scxfe/vue-ui';`;
});

// Methods
async function loadComponentData() {
  loading.value = true;
  error.value = null;

  try {
    // Get component from registry
    const component = registry.getComponent(componentName);

    if (!component) {
      error.value = `Component "${componentName}" is not registered in the docs system.`;
      return;
    }

    componentData.value = component.config;

    // Get component meta
    const meta = await registry.getComponentMeta(componentName);
    componentMeta.value = meta;

    // Get component demos
    const demoList = registry.getComponentDemos(componentName);
    demos.value = demoList;

    // Load demo components
    demoComponents.value = {};
    for (const demo of demoList) {
      if (!demo.id) {
        // eslint-disable-next-line no-console
        console.warn('Demo missing id:', demo);
        continue;
      }

      const demoLoader = registry.getDemoComponent(demo.id);
      if (demoLoader) {
        try {
          const module = await demoLoader();
          const component = (module as any)?.default || module;
          demoComponents.value[demo.id] = component;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`Failed to load demo component: ${demo.id}`, err);
        }
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to load component documentation:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    loading.value = false;
  }
}

function getDemoComponent(demoId: string) {
  return demoComponents.value[demoId];
}

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to copy code:', err);
  }
}

// Lifecycle
onMounted(() => {
  if (componentName) {
    loadComponentData();
  } else {
    error.value = 'No component specified';
    loading.value = false;
  }
});
</script>

<style scoped>
.component-docs {
  min-height: 100vh;
  background: #f7fafc;
}

/* Loading State */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #718096;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error h2 {
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error p {
  color: #718096;
  margin-bottom: 1.5rem;
}

/* Header */
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
  margin: 0;
}

.category {
  color: #718096;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Main Content */
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

/* Code Block */
.code-block {
  background: #1a202c;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 1rem;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2d3748;
  border-bottom: 1px solid #4a5568;
  font-size: 0.75rem;
  color: #a0aec0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  text-transform: uppercase;
}

.copy-btn {
  background: transparent;
  border: 1px solid #4a5568;
  color: #a0aec0;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: #4a5568;
  color: white;
}

.code-block pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-block code {
  color: #48bb78;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Demo Items */
.demo-item {
  margin-bottom: 2rem;
}

.demo-item:last-child {
  margin-bottom: 0;
}

/* API Subsection */
.api-subsection {
  margin-bottom: 2rem;
}

.api-subsection:last-child {
  margin-bottom: 0;
}

.subsection-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}
</style>
