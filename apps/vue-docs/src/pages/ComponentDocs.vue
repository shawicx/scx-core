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
  background-color: var(--color-bg-primary);
}

/* Loading State */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: var(--color-text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-bg-tertiary);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--spacing-4);
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
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-base);
}

.error h2 {
  color: var(--color-error);
  margin-bottom: var(--spacing-4);
}

.error p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-6);
}

/* Header */
.header {
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-12) 0;
}

.header-content {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-4);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary-hover);
}

.title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-4) 0;
  line-height: var(--line-height-tight);
}

.category {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-2);
}

/* Main Content */
.main {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

.section {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-6);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-3);
}

/* Code Block */
.code-block {
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-base);
  overflow: hidden;
  margin-top: var(--spacing-4);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-family: var(--font-family-mono);
  text-transform: uppercase;
}

.copy-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-tertiary);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background-color: var(--color-border);
  color: var(--color-text-primary);
}

.code-block pre {
  margin: 0;
  padding: var(--spacing-6);
  overflow-x: auto;
}

.code-block code {
  color: var(--color-text-primary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

/* Demo Items */
.demo-item {
  margin-bottom: var(--spacing-8);
}

.demo-item:last-child {
  margin-bottom: 0;
}

/* API Subsection */
.api-subsection {
  margin-bottom: var(--spacing-8);
}

.api-subsection:last-child {
  margin-bottom: 0;
}

.subsection-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .header {
    padding: var(--spacing-8) 0;
  }

  .title {
    font-size: var(--font-size-3xl);
  }

  .main {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .section {
    padding: var(--spacing-6);
  }

  .section-title {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 640px) {
  .header {
    padding: var(--spacing-6) 0;
  }

  .title {
    font-size: var(--font-size-2xl);
  }

  .section {
    padding: var(--spacing-4);
  }

  .code-block pre {
    padding: var(--spacing-4);
  }

  .code-block code {
    font-size: var(--font-size-xs);
  }
}
</style>
