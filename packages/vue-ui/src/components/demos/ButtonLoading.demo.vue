<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '../Button.vue';

/**
 * ButtonLoading.demo.vue
 *
 * 展示 Button 组件的加载状态
 */
const title = '加载状态';
const description = '按钮可以显示加载状态，加载时会显示旋转的加载图标并禁止点击。';

const loading = ref(false);

const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Button type="primary" :loading="loading">Loading Button</Button>
      <Button type="secondary" :loading="loading">Loading Button</Button>
      <Button type="success" :loading="loading">Loading Button</Button>
      <Button @click="handleLoading">点击测试 (2秒)</Button>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: #fff;
}

.demo-title {
  margin-bottom: 20px;
}

.demo-title h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.demo-title p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.demo-content {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
