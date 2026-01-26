<script setup lang="ts">
/**
 * 侧边栏导航组件
 * 显示导航分组和链接，支持当前路由高亮
 */
import { useRoute } from 'vue-router';

interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

defineProps<{
  sections: SidebarSection[];
}>();

const route = useRoute();
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <div v-for="section in sections" :key="section.title" class="sidebar-section">
        <h3 class="sidebar-section-title">{{ section.title }}</h3>
        <ul class="list-none m-0 p-0">
          <li v-for="item in section.items" :key="item.href">
            <RouterLink
              :to="item.href"
              class="sidebar-link"
              :class="{ active: route.path === item.href }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: var(--navbar-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  background-color: var(--color-bg-primary);
  border-right: 1px solid var(--color-border);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: var(--radius-full);
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-border-hover);
}

.sidebar-nav {
  padding: var(--spacing-4) 0;
}

.sidebar-section {
  margin-bottom: var(--spacing-6);
}

.sidebar-section-title {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-link {
  display: block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
}

.sidebar-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}

.sidebar-link.active {
  color: var(--color-primary);
  background-color: rgba(66, 184, 131, 0.1);
  font-weight: var(--font-weight-medium);
}
</style>
