<script setup lang="ts">
import { useCounter } from '../../useCounter';

const title = '基础用法';
const description = '展示 useCounter hook 的基本用法，包括增加、减少、重置和设置功能。';

const counter = useCounter({
  initial: 0,
  min: 0,
  max: 10,
  step: 1,
});
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="counter-display">
        <span class="count-value">{{ counter.count }}</span>
      </div>

      <div class="counter-controls">
        <button class="btn" @click="counter.decrement" :disabled="!counter.canDecrement">
          减少
        </button>
        <button class="btn" @click="counter.reset">重置</button>
        <button class="btn" @click="counter.increment" :disabled="!counter.canIncrement">
          增加
        </button>
      </div>

      <div class="counter-controls">
        <button class="btn" @click="counter.set(5)">设置为 5</button>
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

.counter-display {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.count-value {
  font-size: 48px;
  font-weight: bold;
  color: #1890ff;
}

.counter-controls {
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

.btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.btn:disabled {
  background: #f5f5f5;
  color: #bfbfbf;
  cursor: not-allowed;
}
</style>
