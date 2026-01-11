import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/components/:name',
    name: 'ComponentDocs',
    component: () => import('./pages/ComponentDocs.vue'),
  },
  {
    path: '/preview-example',
    name: 'PreviewExample',
    component: () => import('./pages/PreviewExample.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
