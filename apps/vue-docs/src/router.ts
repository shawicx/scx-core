import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/preview-example',
    name: 'PreviewExample',
    component: () => import('./pages/PreviewExample.vue'),
  },
  // Vue UI Components
  {
    path: '/components/button',
    name: 'Button',
    component: () => import('./pages/components/Button.page.vue'),
  },
  {
    path: '/components/card',
    name: 'Card',
    component: () => import('./pages/components/Card.page.vue'),
  },
  {
    path: '/components/counter',
    name: 'Counter',
    component: () => import('./pages/components/Counter.page.vue'),
  },
  // Vue Hooks
  {
    path: '/hooks/use-counter',
    name: 'useCounter',
    component: () => import('./pages/hooks/useCounter.page.vue'),
  },
  {
    path: '/hooks/use-toggle',
    name: 'useToggle',
    component: () => import('./pages/hooks/useToggle.page.vue'),
  },
  {
    path: '/hooks/use-local-storage',
    name: 'useLocalStorage',
    component: () => import('./pages/hooks/useLocalStorage.page.vue'),
  },
  // Fallback for dynamic routes
  {
    path: '/components/:name',
    name: 'ComponentDocs',
    component: () => import('./pages/ComponentDocs.vue'),
  },
  {
    path: '/hooks/:name',
    name: 'HookDocs',
    component: () => import('./pages/ComponentDocs.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
