<script setup lang="ts">
import Card from '../Card.vue';
import Button from '../Button.vue';

const title = '基础用法';
const description = '展示卡片的基本用法，包括标题、内容和边框样式。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Card title="默认卡片">
        <p>这是一个基本的卡片组件，包含标题和内容区域。</p>
      </Card>

      <Card title="无标题卡片" shadow="hover">
        <p>这是一个悬浮时显示阴影的卡片。</p>
      </Card>
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
  gap: 20px;
  flex-wrap: wrap;
}
</style>
