<script setup lang="ts">
import Card from '../Card.vue';
import Button from '../Button.vue';

const title = '带操作按钮';
const description = '展示卡片头部、封面和操作按钮区域的用法。';
</script>

<template>
  <div class="demo-container">
    <div class="demo-title">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="demo-content">
      <Card title="带头部的卡片">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>卡片标题</span>
            <span style="font-size: 12px; color: #999">2024-01-01</span>
          </div>
        </template>
        <p>这是卡片的内容区域，可以放置任意内容。</p>
        <template #actions>
          <Button size="small">取消</Button>
          <Button size="small" type="primary">确定</Button>
        </template>
      </Card>

      <Card shadow="hover">
        <template #cover>
          <div
            style="
              width: 100%;
              height: 120px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
              font-weight: bold;
            "
          >
            封面图片
          </div>
        </template>
        <p>这是带有封面图片的卡片。</p>
        <template #actions>
          <Button size="small" type="primary">查看详情</Button>
        </template>
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
