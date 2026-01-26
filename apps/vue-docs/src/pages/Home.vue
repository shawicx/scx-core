<template>
  <div class="home">
    <header class="header">
      <h1 class="title">SCX Core - Vue 组件库</h1>
      <p class="subtitle">组件库文档</p>
    </header>

    <main class="main">
      <section class="section">
        <h2 class="section-title">UI 组件</h2>
        <div class="component-grid">
          <RouterLink
            v-for="component in uiComponents"
            :key="component.name"
            :to="component.path"
            class="component-card"
          >
            <h3 class="component-name">{{ component.displayName }}</h3>
            <p class="component-description">{{ component.description }}</p>
          </RouterLink>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Hooks</h2>
        <div class="component-grid">
          <RouterLink v-for="hook in hooks" :key="hook.name" :to="hook.path" class="component-card">
            <h3 class="component-name">{{ hook.displayName }}</h3>
            <p class="component-description">{{ hook.description }}</p>
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
  path: string;
}

const uiComponents: Component[] = [
  {
    name: 'preview-example',
    displayName: '预览容器示例',
    description: '文档预览容器组件的使用示例',
    path: '/preview-example',
  },
  {
    name: 'Button',
    displayName: 'Button 按钮',
    description: '功能多样的按钮组件，支持多种样式',
    path: '/components/button',
  },
  {
    name: 'Card',
    displayName: 'Card 卡片',
    description: '灵活的内容组织卡片组件',
    path: '/components/card',
  },
  {
    name: 'Counter',
    displayName: 'Counter 计数器',
    description: '简单的计数器组件，支持增减操作',
    path: '/components/counter',
  },
];

const hooks: Component[] = [
  {
    name: 'use-counter',
    displayName: 'useCounter 计数器',
    description: '简单的计数器 Hook',
    path: '/hooks/use-counter',
  },
  {
    name: 'use-toggle',
    displayName: 'useToggle 切换',
    description: '布尔值切换 Hook',
    path: '/hooks/use-toggle',
  },
  {
    name: 'use-local-storage',
    displayName: 'useLocalStorage 本地存储',
    description: '本地存储同步 Hook',
    path: '/hooks/use-local-storage',
  },
];
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: var(--spacing-12) 0;
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

.header {
  padding: var(--spacing-12) 0;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-normal);
}

.main {
  flex: 1;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  width: 100%;
}

.section {
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-8);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-6);
  color: var(--color-text-primary);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
}

.component-card {
  display: block;
  padding: var(--spacing-6);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.component-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
  color: var(--color-text-primary);
}

.component-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

@media (max-width: 768px) {
  .title {
    font-size: var(--font-size-4xl);
  }

  .subtitle {
    font-size: var(--font-size-base);
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
