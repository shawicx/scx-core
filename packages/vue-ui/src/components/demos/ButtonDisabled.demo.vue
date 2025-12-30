<script setup lang="ts">
import Button from '../Button.vue';

/**
 * ButtonDisabled.demo.vue
 *
 * 展示 Button 组件的禁用状态
 */
const title = '禁用状态';
const description = '按钮可以被禁用，禁用状态下按钮不可点击且样式变淡。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Button type="primary" disabled>Primary Disabled</Button>
      <Button type="secondary" disabled>Secondary Disabled</Button>
      <Button type="success" disabled>Success Disabled</Button>
      <Button type="warning" disabled>Warning Disabled</Button>
      <Button type="danger" disabled>Danger Disabled</Button>
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
