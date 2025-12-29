<script setup lang="ts">
import { Button } from '../Button.vue';

/**
 * ButtonModifiers.demo.vue
 *
 * 展示 Button 组件的其他变体：块级按钮和圆角按钮
 */
const title = '其他变体';
const description = '按钮可以设置为块级(block)占满父容器宽度，或者设置为圆角(round)样式。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="modifier-group">
        <div class="modifier-label">块级按钮 (Block)</div>
        <div class="block-buttons">
          <Button type="primary" block>Primary Block Button</Button>
          <Button type="secondary" block>Secondary Block Button</Button>
        </div>
      </div>

      <div class="modifier-group">
        <div class="modifier-label">圆角按钮 (Round)</div>
        <div class="round-buttons">
          <Button type="primary" round>Primary Round</Button>
          <Button type="success" round>Success Round</Button>
          <Button type="warning" round>Warning Round</Button>
          <Button type="danger" round>Danger Round</Button>
        </div>
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
  gap: 24px;
}

.modifier-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modifier-label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.block-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

.round-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
