<template>
  <div class="app">
    <Navbar v-model:mobile-menu-open="sidebarOpen" />
    <div class="main-layout">
      <Sidebar :sections="sidebarSections" />
      <div v-if="sidebarOpen" class="sidebar-drawer-overlay" @click="closeSidebar" />
      <div class="sidebar-drawer" :class="{ open: sidebarOpen }">
        <div class="sidebar-drawer-header">
          <button class="sidebar-drawer-close" @click="closeSidebar" aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 6 M6 18l12-12" />
            </svg>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div v-for="section in sidebarSections" :key="section.title" class="sidebar-section">
            <h3 class="sidebar-section-title">{{ section.title }}</h3>
            <ul class="list-none m-0 p-0">
              <li v-for="item in section.items" :key="item.href">
                <a :href="item.href" class="sidebar-link" @click="closeSidebar">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const sidebarOpen = ref(false);

const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>

<style>
@import '@scxfe/docs-design-system/dist/index.css';

.app {
  width: 100%;
  min-height: 100vh;
}

.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-base);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-menu-toggle:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.sidebar-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal-backdrop);
}

.sidebar-drawer {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: var(--sidebar-width);
  max-width: 80vw;
  height: calc(100vh - var(--navbar-height));
  background-color: var(--color-bg-primary);
  border-right: 1px solid var(--color-border);
  z-index: var(--z-index-modal);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform var(--transition-base);
}

.sidebar-drawer.open {
  transform: translateX(0);
}

.sidebar-drawer-header {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-base);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.sidebar-drawer-close:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* Tablet Optimization (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .search-box {
    width: 180px;
  }

  .nav-link {
    padding: var(--spacing-2);
    font-size: var(--font-size-sm);
  }

  .main-layout .content {
    padding: var(--spacing-6) var(--spacing-8);
  }
}

/* Mobile Optimization (<768px) */
@media (min-width: 768px) {
  .sidebar-drawer {
    display: none;
  }
}

@media (max-width: 767px) {
  .sidebar-drawer {
    display: block;
  }

  .main-layout .sidebar {
    display: none;
  }

  .main-layout .content {
    padding: var(--spacing-6) var(--spacing-4);
  }
}
</style>
