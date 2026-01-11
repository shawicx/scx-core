<script setup lang="ts">
import { useLocalStorage } from '../../useLocalStorage';

const title = '基础用法';
const description = '展示 useLocalStorage hook 的基本用法，自动将数据保存到 localStorage。';

const name = useLocalStorage('demo-name', '张三');
const count = useLocalStorage('demo-count', 0);
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="storage-item">
        <h4>存储字符串</h4>
        <div class="input-group">
          <input v-model="name" type="text" placeholder="输入姓名" class="input" />
          <span class="value-display">当前值: {{ name }}</span>
        </div>
        <div class="hint">刷新页面后值会保持</div>
      </div>

      <div class="storage-item">
        <h4>存储数字</h4>
        <div class="counter-group">
          <button class="btn" @click="count--">-</button>
          <span class="count-value">{{ count }}</span>
          <button class="btn" @click="count++">+</button>
        </div>
        <div class="hint">刷新页面后计数器值会保持</div>
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

.storage-item h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #1890ff;
}

.value-display {
  font-size: 14px;
  color: #666;
}

.counter-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.count-value {
  font-size: 24px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
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

.hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}
</style>
