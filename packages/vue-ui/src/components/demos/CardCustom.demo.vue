<script setup lang="ts">
import Card from '../Card.vue';

const title = '自定义样式';
const description = '展示卡片的不同尺寸、阴影模式和边框样式配置。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Card title="小号卡片" size="small" shadow="never" :bordered="false">
        <p>这是小号卡片，没有阴影和边框。</p>
      </Card>

      <Card title="中号卡片" size="medium" shadow="always">
        <p>这是中号卡片，始终显示阴影。</p>
      </Card>

      <Card title="大号卡片" size="large" shadow="hover">
        <p>这是大号卡片，悬浮时显示阴影。</p>
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
