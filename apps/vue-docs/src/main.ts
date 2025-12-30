import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeRegistry } from './lib/registry';
import './index.css';

// 初始化组件注册表
initializeRegistry().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to initialize component registry:', error);
});

const app = createApp(App);
app.use(router);
app.mount('#app');
