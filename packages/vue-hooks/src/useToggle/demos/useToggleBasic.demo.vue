<script setup lang="ts">
import { useToggle } from '../../useToggle';

const title = '基础用法';
const description = '展示 useToggle hook 的基本用法，包括切换、设置为 true 和设置为 false 功能。';

const toggle = useToggle();
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="toggle-display">
        <div class="toggle-indicator" :class="{ active: toggle.state }">
          {{ toggle.state ? '开' : '关' }}
        </div>
      </div>

      <div class="toggle-controls">
        <button class="btn" @click="toggle.toggle">切换</button>
        <button class="btn" @click="toggle.setTrue">设为开</button>
        <button class="btn" @click="toggle.setFalse">设为关</button>
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

.toggle-display {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.toggle-indicator {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background: #bfbfbf;
  transition: all 0.3s;
}

.toggle-indicator.active {
  background: #52c41a;
}

.toggle-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}
</style>
