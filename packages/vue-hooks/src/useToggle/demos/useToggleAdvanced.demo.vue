<script setup lang="ts">
import { useToggle } from '../../useToggle';

const title = '高级用法';
const description = '展示 useToggle hook 的自定义初始值和自定义值类型。';

const toggle1 = useToggle({
  initialValue: true,
});

const toggle2 = useToggle({
  initialValue: 'light',
  trueValue: 'light',
  falseValue: 'dark',
});

const toggle3 = useToggle({
  initialValue: 0,
  trueValue: 1,
  falseValue: 0,
});
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="toggle-item">
        <h4>默认值：true</h4>
        <div class="toggle-display">
          <div class="toggle-indicator" :class="{ active: toggle1.state }">
            {{ toggle1.state ? '开' : '关' }}
          </div>
        </div>
        <div class="toggle-controls">
          <button class="btn" @click="toggle1.toggle">切换</button>
        </div>
      </div>

      <div class="toggle-item">
        <h4>字符串类型：light/dark</h4>
        <div class="toggle-display">
          <div class="toggle-indicator" :class="{ active: toggle2.state === 'light' }">
            {{ toggle2.state }}
          </div>
        </div>
        <div class="toggle-controls">
          <button class="btn" @click="toggle2.toggle">切换</button>
        </div>
      </div>

      <div class="toggle-item">
        <h4>数字类型：1/0</h4>
        <div class="toggle-display">
          <div class="toggle-indicator" :class="{ active: toggle3.state === 1 }">
            {{ toggle3.state }}
          </div>
        </div>
        <div class="toggle-controls">
          <button class="btn" @click="toggle3.toggle">切换</button>
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

.toggle-item h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.toggle-display {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
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
