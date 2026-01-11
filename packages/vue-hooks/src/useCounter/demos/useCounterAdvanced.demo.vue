<script setup lang="ts">
import { useCounter } from '../../useCounter';

const title = '高级用法';
const description = '展示 useCounter hook 的自定义配置，包括步长、最小值和最大值。';

const counter1 = useCounter({
  initial: 0,
  min: 0,
  max: 100,
  step: 5,
});

const counter2 = useCounter({
  initial: 10,
  min: -10,
  max: 10,
  step: 2,
});

const counter3 = useCounter({
  initial: 1,
  min: 1,
  max: 10,
  step: 0.5,
});
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="counter-item">
        <h4>步长为 5 (0-100)</h4>
        <div class="counter-display">
          <span class="count-value">{{ counter1.count }}</span>
        </div>
        <div class="counter-controls">
          <button class="btn" @click="counter1.decrement" :disabled="!counter1.canDecrement">
            -5
          </button>
          <button class="btn" @click="counter1.increment" :disabled="!counter1.canIncrement">
            +5
          </button>
        </div>
      </div>

      <div class="counter-item">
        <h4>负数范围 (-10 到 10)，步长 2</h4>
        <div class="counter-display">
          <span class="count-value">{{ counter2.count }}</span>
        </div>
        <div class="counter-controls">
          <button class="btn" @click="counter2.decrement" :disabled="!counter2.canDecrement">
            -2
          </button>
          <button class="btn" @click="counter2.increment" :disabled="!counter2.canIncrement">
            +2
          </button>
        </div>
      </div>

      <div class="counter-item">
        <h4>小数步长 0.5 (1-10)</h4>
        <div class="counter-display">
          <span class="count-value">{{ counter3.count }}</span>
        </div>
        <div class="counter-controls">
          <button class="btn" @click="counter3.decrement" :disabled="!counter3.canDecrement">
            -0.5
          </button>
          <button class="btn" @click="counter3.increment" :disabled="!counter3.canIncrement">
            +0.5
          </button>
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
  gap: 20px;
}

.counter-item h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.counter-display {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
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
