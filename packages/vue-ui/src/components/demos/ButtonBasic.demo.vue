<script setup lang="ts">
import Button from '../Button.vue';

/**
 * ButtonBasic.demo.vue
 *
 * 展示 Button 组件的基础用法和不同类型
 */
const title = '基础用法';
const description =
  '展示不同类型的按钮，包括主要按钮、次要按钮、成功按钮、警告按钮、危险按钮和幽灵按钮。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Button type="primary">Primary Button</Button>
      <Button type="secondary">Secondary Button</Button>
      <Button type="success">Success Button</Button>
      <Button type="warning">Warning Button</Button>
      <Button type="danger">Danger Button</Button>
      <Button type="ghost">Ghost Button</Button>
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
