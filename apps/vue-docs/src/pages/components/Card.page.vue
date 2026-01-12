<script setup lang="ts">
import { Card } from '@scxfe/vue-ui';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const cardBasicCode = `
<Card title="基础卡片">
  <p>这是一个基础的卡片组件。</p>
</Card>
`;

const cardSizesCode = `
<Card title="小卡片" size="small">
  <p>小尺寸卡片</p>
</Card>

<Card title="中卡片" size="medium">
  <p>中尺寸卡片</p>
</Card>

<Card title="大卡片" size="large">
  <p>大尺寸卡片</p>
</Card>
`;

const cardShadowCode = `
<Card title="总是显示阴影" shadow="always">
  <p>总是显示阴影</p>
</Card>

<Card title="悬停显示阴影" shadow="hover">
  <p>悬停时显示阴影</p>
</Card>

<Card title="从不显示阴影" shadow="never">
  <p>从不显示阴影</p>
</Card>
`;
</script>

<template>
  <div>
    <h1>Card 卡片</h1>
    <p>灵活的内容组织卡片组件。</p>

    <DemoLayout title="基础用法" description="包含标题和内容的基础卡片。">
      <PreviewContainer :code="cardBasicCode">
        <Card title="基础卡片">
          <p>这是一个基础的卡片组件。</p>
        </Card>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="不同尺寸" description="卡片提供三种尺寸：small、medium、large。">
      <PreviewContainer :code="cardSizesCode">
        <Card title="小卡片" size="small">
          <p>小尺寸卡片</p>
        </Card>
        <Card title="中卡片" size="medium">
          <p>中尺寸卡片</p>
        </Card>
        <Card title="大卡片" size="large">
          <p>大尺寸卡片</p>
        </Card>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="阴影配置" description="不同的阴影显示方式。">
      <PreviewContainer :code="cardShadowCode">
        <Card title="总是显示阴影" shadow="always">
          <p>总是显示阴影</p>
        </Card>
        <Card title="悬停显示阴影" shadow="hover">
          <p>悬停时显示阴影</p>
        </Card>
        <Card title="从不显示阴影" shadow="never">
          <p>从不显示阴影</p>
        </Card>
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
