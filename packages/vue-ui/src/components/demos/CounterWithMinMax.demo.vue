<script setup lang="ts">
import Counter from '../Counter.vue';
import { ref } from 'vue';

const title = '限制范围';
const description = '展示计数器的最小值和最大值限制配置。';

const count1 = ref(0);
const count2 = ref(5);
const count3 = ref(10);
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <div class="demo-item">
        <label>最小值 0，最大值 10</label>
        <Counter v-model="count1" :min="0" :max="10" />
      </div>

      <div class="demo-item">
        <label>最小值 -10，最大值 10</label>
        <Counter v-model="count2" :min="-10" :max="10" />
      </div>

      <div class="demo-item">
        <label>最小值 1，最大值 5，步长 0.5</label>
        <Counter v-model="count3" :min="1" :max="5" :step="0.5" label="步长" />
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

.demo-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-item label {
  font-size: 14px;
  color: #666;
  min-width: 180px;
}
</style>
