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
  background: linear-gradient(180deg, #fef9f3 0%, #fff5eb 100%);
  display: flex;
  flex-direction: column;
}

.header {
  padding: 3rem 2rem 2rem;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #ff8a5c 0%, #ff6b9d 50%, #c44569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.125rem;
  color: #636e72;
  font-weight: 400;
}

.main {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(255, 138, 92, 0.08);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3436;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.component-card {
  display: block;
  padding: 1.75rem;
  background: white;
  border: 1px solid rgba(255, 138, 92, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(255, 138, 92, 0.15);
  border-color: rgba(255, 138, 92, 0.2);
}

.component-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3436;
}

.component-description {
  font-size: 0.875rem;
  color: #636e72;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
