<script setup lang="ts">
import Preview from './Preview.vue';
import CodeBlock from './CodeBlock.vue';
import type { PreviewContainerProps } from './types';
import './styles/PreviewContainer.css';

const props = withDefaults(defineProps<PreviewContainerProps>(), {
  language: 'vue',
  showLineNumbers: false,
  showCopy: true,
  codeTitle: '',
  width: 'full',
  background: 'white',
  bordered: false,
});
</script>

<template>
  <div class="preview-container">
    <Preview :width="width" :background="background" :bordered="bordered">
      <slot />
    </Preview>
    <CodeBlock
      :code="code"
      :language="language"
      :show-line-numbers="showLineNumbers"
      :show-copy="showCopy"
      :title="codeTitle"
    />
  </div>
</template>
