<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@scxfe/vue-ui';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const buttonBasicCode = `
<Button type="primary">主要按钮</Button>
<Button type="secondary">次要按钮</Button>
<Button type="success">成功按钮</Button>
`;

const buttonTypesCode = `
<Button type="primary">Primary</Button>
<Button type="secondary">Secondary</Button>
<Button type="success">Success</Button>
<Button type="warning">Warning</Button>
<Button type="danger">Danger</Button>
<Button type="ghost">Ghost</Button>
`;

const buttonSizesCode = `
<Button type="primary" size="small">小按钮</Button>
<Button type="primary" size="medium">中按钮</Button>
<Button type="primary" size="large">大按钮</Button>
`;

const buttonStateCode = `
<Button type="primary" disabled>禁用按钮</Button>
<Button type="primary" loading>加载中</Button>
`;

const loading = ref(false);
const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div>
    <h1>Button 按钮</h1>
    <p>功能多样的按钮组件，支持多种样式。</p>

    <DemoLayout title="基础用法" description="不同类型的按钮。">
      <PreviewContainer :code="buttonBasicCode">
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="success">成功按钮</Button>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="不同类型" description="所有支持的按钮类型。">
      <PreviewContainer :code="buttonTypesCode">
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="ghost">Ghost</Button>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="不同尺寸" description="按钮提供三种尺寸：small、medium、large。">
      <PreviewContainer :code="buttonSizesCode">
        <Button type="primary" size="small">小按钮</Button>
        <Button type="primary" size="medium">中按钮</Button>
        <Button type="primary" size="large">大按钮</Button>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="状态" description="禁用状态和加载状态。">
      <PreviewContainer :code="buttonStateCode">
        <Button type="primary" disabled>禁用按钮</Button>
        <Button type="primary" :loading="loading" @click="handleClick">
          {{ loading ? '加载中...' : '点击加载' }}
        </Button>
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
