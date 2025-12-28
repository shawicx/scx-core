<template>
  <div class="home">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1 class="title">SCX Core</h1>
        <p class="subtitle">现代化的 React & Vue 组件库</p>
      </header>

      <!-- Design Philosophy -->
      <section class="philosophy">
        <h2 class="section-title">设计理念</h2>
        <div class="philosophy-cards">
          <div class="card" v-for="item in philosophies" :key="item.title">
            <div class="card-icon">{{ item.icon }}</div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
          </div>
        </div>
      </section>

      <!-- Framework Selection -->
      <section class="frameworks">
        <h2 class="section-title">选择框架</h2>
        <p class="section-description">选择您偏好的框架查看组件文档</p>
        <div class="framework-cards">
          <a href="/react-docs/" class="framework-card" target="_blank" rel="noopener noreferrer">
            <div class="framework-icon react">⚛️</div>
            <h3 class="framework-name">React</h3>
            <p class="framework-description">React 18+ 组件库文档</p>
            <div class="framework-link">查看文档 →</div>
          </a>

          <a href="/vue-docs/" class="framework-card" target="_blank" rel="noopener noreferrer">
            <div class="framework-icon vue">💚</div>
            <h3 class="framework-name">Vue</h3>
            <p class="framework-description">Vue 3.4+ 组件库文档</p>
            <div class="framework-link">查看文档 →</div>
          </a>
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
const philosophies = [
  {
    icon: '🔧',
    title: '类型安全',
    description: '完整的 TypeScript 类型定义，提供优秀的开发体验和类型提示',
  },
  {
    icon: '🎨',
    title: '设计统一',
    description: '跨框架共享统一的设计系统，保证视觉和交互的一致性',
  },
  {
    icon: '⚡',
    title: '高性能',
    description: '优化的组件实现和打包策略，确保最佳运行时性能',
  },
  {
    icon: '📦',
    title: '按需加载',
    description: '支持按需引入，最小化打包体积，提升加载速度',
  },
];
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 4rem 0;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin: 3rem 0 1rem;
}

.section-description {
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.philosophy {
  margin: 2rem 0;
}

.philosophy-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
}

.frameworks {
  margin: 4rem 0;
}

.framework-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.framework-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.framework-card:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.framework-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.framework-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.framework-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.framework-link {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: auto;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  transition: background 0.3s ease;
}

.framework-card:hover .framework-link {
  background: rgba(255, 255, 255, 0.3);
}

.footer {
  text-align: center;
  padding: 2rem;
  opacity: 0.8;
  margin-top: auto;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .philosophy-cards,
  .framework-cards {
    grid-template-columns: 1fr;
  }
}
</style>
