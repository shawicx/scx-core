<template>
  <div class="app">
    <Navbar />
    <div class="main-layout">
      <Sidebar :sections="sidebarSections" />
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

interface SidebarItem {
  label: string;
  href: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'UI 组件',
    items: [
      { label: 'Card', href: '/components/card' },
      { label: 'Caption', href: '/components/caption' },
      { label: 'GradientBorder', href: '/components/gradient-border' },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { label: 'useCounter', href: '/hooks/use-counter' },
      { label: 'useToggle', href: '/hooks/use-toggle' },
      { label: 'useLocalStorage', href: '/hooks/use-local-storage' },
    ],
  },
];
</script>

<style>
@import '@scxfe/docs-design-system/dist/index.css';

.app {
  width: 100%;
  min-height: 100vh;
}
</style>
