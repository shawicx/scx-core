<script setup lang="ts">
import { Button } from '../Button.vue';

/**
 * ButtonSize.demo.vue
 *
 * 展示 Button 组件的不同尺寸
 */
const title = '按钮尺寸';
const description = '按钮提供三种尺寸：小型(small)、中等(medium)和大型(large)。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="size-group">
        <div class="size-label">Small</div>
        <Button type="primary" size="small">Small Button</Button>
        <Button type="secondary" size="small">Small</Button>
      </div>

      <div class="size-group">
        <div class="size-label">Medium</div>
        <Button type="primary" size="medium">Medium Button</Button>
        <Button type="secondary" size="medium">Medium</Button>
      </div>

      <div class="size-group">
        <div class="size-label">Large</div>
        <Button type="primary" size="large">Large Button</Button>
        <Button type="secondary" size="large">Large</Button>
      </div>
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
  flex-direction: column;
  gap: 16px;
}

.size-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-label {
  min-width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}
</style>
