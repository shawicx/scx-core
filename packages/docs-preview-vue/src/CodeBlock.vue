<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CodeBlockProps } from './types';
import './styles/CodeBlock.css';

const props = withDefaults(defineProps<CodeBlockProps>(), {
  language: 'vue',
  showLineNumbers: false,
  showCopy: true,
  title: '',
});

const copied = ref(false);

const handleCopy = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  });
};

const lines = computed(() => {
  return props.code.split('\n');
});
</script>

<template>
  <div class="code-block">
    <div v-if="title" class="code-block__title">
      {{ title }}
    </div>
    <div class="code-block__wrapper">
      <div v-if="showLineNumbers" class="code-block__lines">
        <div v-for="(_, index) in lines" :key="index" class="code-block__line-number">
          {{ index + 1 }}
        </div>
      </div>
      <div class="code-block__content">
        <pre>
          <code :class="`language-${language}`">{{ code }}</code>
        </pre>
      </div>
      <button
        v-if="showCopy"
        class="code-block__copy"
        type="button"
        :aria-label="copied ? '已复制' : '复制代码'"
        @click="handleCopy"
      >
        {{ copied ? '✓' : '复制' }}
      </button>
    </div>
  </div>
</template>
