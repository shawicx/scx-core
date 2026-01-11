<script setup lang="ts">
import Counter from '../Counter.vue';
import { ref } from 'vue';

const title = '自定义样式';
const description = '展示计数器的不同尺寸和禁用状态。';

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
        <label>小号计数器</label>
        <Counter v-model="count1" size="small" label="数量" />
      </div>

      <div class="demo-item">
        <label>中号计数器</label>
        <Counter v-model="count2" size="medium" label="数量" />
      </div>

      <div class="demo-item">
        <label>大号计数器</label>
        <Counter v-model="count3" size="large" label="数量" />
      </div>

      <div class="demo-item">
        <label>禁用状态</label>
        <Counter v-model="count1" size="medium" :disabled="true" />
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
  min-width: 80px;
}
</style>
