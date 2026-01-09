<template>
  <div class="home">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1 class="title">SCX Core</h1>
        <p class="subtitle">现代化的 React & Vue 组件库</p>
      </header>

      <!-- Features -->
      <section class="features">
        <div class="feature-list">
          <div class="feature-item" v-for="item in features" :key="item.title">
            <div class="feature-content">
              <h3 class="feature-title">{{ item.title }}</h3>
              <p class="feature-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Framework Selection -->
      <section class="frameworks">
        <h2 class="section-title">组件文档</h2>
        <p class="section-description">查看 React 和 Vue 组件库的详细文档</p>
        <div class="framework-cards">
          <div class="framework-card" @click="openReactDocs">
            <h3 class="framework-name">React</h3>
            <p class="framework-description">基于 React 18 的现代化组件库</p>
            <div class="framework-link">查看文档 →</div>
          </div>

          <div class="framework-card" @click="openVueDocs">
            <h3 class="framework-name">Vue</h3>
            <p class="framework-description">基于 Vue 3.4 的现代化组件库</p>
            <div class="framework-link">查看文档 →</div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>&copy; 2025 SCX Core. Licensed under MIT.</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取文档应用 URL，支持开发和生产环境
const getDocsUrl = (app: 'react-docs' | 'vue-docs') => {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // 开发环境：使用 localhost 和对应端口
    return app === 'react-docs' ? 'http://localhost:4200/' : 'http://localhost:4100/';
  } else {
    // 生产环境：使用相对路径
    return app === 'react-docs' ? '/react-docs/' : '/vue-docs/';
  }
};

const openReactDocs = () => {
  window.open(getDocsUrl('react-docs'), '_blank', 'noopener,noreferrer');
};

const openVueDocs = () => {
  window.open(getDocsUrl('vue-docs'), '_blank', 'noopener,noreferrer');
};

const features = [
  {
    title: '类型安全',
    description: '完整的 TypeScript 支持',
  },
  {
    title: '设计统一',
    description: '跨框架一致的设计系统',
  },
  {
    title: '高性能',
    description: '优化的组件实现',
  },
  {
    title: '按需加载',
    description: '支持按需引入',
  },
];
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fef9f3 0%, #fff5eb 100%);
  color: #2d3436;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 3rem 0 3rem;
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

.features {
  margin: 1rem 0 3rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid rgba(255, 138, 92, 0.08);
  transition: all 0.2s ease;
}

.feature-item:hover {
  border-color: rgba(255, 138, 92, 0.2);
  box-shadow: 0 4px 12px rgba(255, 138, 92, 0.08);
}

.feature-content {
  flex: 1;
  min-width: 0;
}

.feature-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 0.125rem;
}

.feature-desc {
  font-size: 0.8125rem;
  color: #636e72;
  line-height: 1.4;
  font-weight: 400;
}

.frameworks {
  margin: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 0.75rem;
  color: #2d3436;
}

.section-description {
  text-align: center;
  font-size: 0.9375rem;
  color: #636e72;
  margin-bottom: 2rem;
  font-weight: 400;
}

.framework-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.framework-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 138, 92, 0.15);
  color: #2d3436;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.framework-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(255, 138, 92, 0.18);
  border-color: rgba(255, 138, 92, 0.3);
}

.framework-name {
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3436;
}

.framework-description {
  font-size: 0.875rem;
  color: #636e72;
  margin-bottom: 1.25rem;
  font-weight: 400;
}

.framework-link {
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: auto;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #ff8a5c 0%, #ff6b9d 100%);
  color: white;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.framework-card:hover .framework-link {
  background: linear-gradient(135deg, #ff7445 0%, #ff5a8f 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 138, 92, 0.3);
}

.footer {
  text-align: center;
  padding: 2rem 0 1rem;
  color: #636e72;
  font-size: 0.8125rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 1.5rem;
  }

  .title {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .framework-cards {
    grid-template-columns: 1fr;
  }
}
</style>
