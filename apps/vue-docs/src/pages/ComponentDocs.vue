<template>
  <div class="component-docs">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在加载组件文档...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <h2>未找到组件</h2>
      <p>{{ error }}</p>
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    </div>

    <!-- Documentation Content -->
    <div v-else-if="componentData" class="docs-content">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
          <h1 class="title">{{ componentData.name }} 组件</h1>
          <p v-if="componentData.category" class="category">
            {{ componentData.category }}
          </p>
        </div>
      </header>

      <main class="main">
        <!-- Usage Section -->
        <section class="section">
          <h2 class="section-title">使用方法</h2>
          <div class="code-block">
            <div class="code-header">
              <span>typescript</span>
              <button class="copy-btn" @click="copyCode(importCode)" title="复制代码">
                {{ copied ? '✓ 已复制' : '📋 复制' }}
              </button>
            </div>
            <pre><code>{{ importCode }}</code></pre>
          </div>
        </section>

        <!-- Demos Section -->
        <section v-if="demos.length > 0" class="section">
          <h2 class="section-title">示例</h2>
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
            <h3 class="subsection-title">属性</h3>
            <PropsTable :meta="componentMeta" />
          </div>

          <!-- Events -->
          <div
            v-if="componentMeta.events && componentMeta.events.length > 0"
            class="api-subsection"
          >
            <h3 class="subsection-title">事件</h3>
            <EventsTable :events="componentMeta.events" />
          </div>

          <!-- Slots -->
          <div v-if="componentMeta.slots && componentMeta.slots.length > 0" class="api-subsection">
            <h3 class="subsection-title">插槽</h3>
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

/**
 * 将 kebab-case 转换为 PascalCase
 * 例如: a-map -> AMap, button -> Button
 */
function kebabToPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const pascalName = kebabToPascalCase(componentName);

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
  return `import { ${pascalName} } from '@scxfe/vue-ui';`;
});

// Methods
async function loadComponentData() {
  loading.value = true;
  error.value = null;

  try {
    // Get component from registry using PascalCase name
    const component = registry.getComponent(pascalName);

    if (!component) {
      error.value = `Component "${pascalName}" is not registered in the docs system.`;
      return;
    }

    componentData.value = component.config;

    // Get component meta
    const meta = await registry.getComponentMeta(pascalName);
    componentMeta.value = meta;

    // Get component demos
    const demoList = registry.getComponentDemos(pascalName);
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
  if (pascalName) {
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
  background: linear-gradient(180deg, #fef9f3 0%, #fff5eb 100%);
}

/* Loading State */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #636e72;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 138, 92, 0.1);
  border-top-color: #ff8a5c;
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
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255, 138, 92, 0.08);
}

.error h2 {
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error p {
  color: #636e72;
  margin-bottom: 1.5rem;
}

/* Header */
.header {
  background: white;
  border-bottom: 1px solid rgba(255, 138, 92, 0.1);
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(255, 138, 92, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #ff8a5c;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #ff6b9d;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3436;
  margin: 0;
}

.category {
  color: #636e72;
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
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(255, 138, 92, 0.08);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3436;
  border-bottom: 2px solid rgba(255, 138, 92, 0.1);
  padding-bottom: 0.5rem;
}

/* Code Block */
.code-block {
  background: #1a202c;
  border-radius: 8px;
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
  color: #2d3436;
}
</style>
