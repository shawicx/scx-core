<script setup lang="ts">
import { ref } from 'vue';
import { Counter } from '@scxfe/vue-ui';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const counterBasicCode = `
<Counter />
`;

const counterLimitedCode = `
<Counter :min="0" :max="10" />
`;

const counterEditableCode = `
<Counter :editable="true" />
`;

const count1 = ref(0);
const count2 = ref(5);
const count3 = ref(0);
</script>

<template>
  <div>
    <h1>Counter 计数器</h1>
    <p>简单的计数器组件，支持增减操作。</p>

    <DemoLayout title="基础用法" description="最简单的计数器。">
      <PreviewContainer :code="counterBasicCode">
        <Counter v-model="count1" />
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="受限范围" description="设置最小值和最大值。">
      <PreviewContainer :code="counterLimitedCode">
        <Counter v-model="count2" :min="0" :max="10" />
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="可编辑模式" description="允许用户直接输入数值。">
      <PreviewContainer :code="counterEditableCode">
        <Counter v-model="count3" :editable="true" />
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
