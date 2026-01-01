import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';
import Home from './pages/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});

// 处理路由错误，防止外部链接被拦截
router.onError((error) => {
  console.error('Router error:', error);
});

const app = createApp(App);

app.use(router);
app.mount('#app');
