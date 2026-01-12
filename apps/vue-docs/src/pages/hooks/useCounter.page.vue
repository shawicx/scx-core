<script setup lang="ts">
// @ts-expect-error: vue-hooks package missing type declarations
import { useCounter } from '@scxfe/vue-hooks';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const useCounterBasicCode =
  '&lt;script setup lang="ts"&gt;\nimport { useCounter } from \'@scxfe/vue-hooks\';\n\nconst { count, increment, decrement, reset } = useCounter();\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;当前值: {{ count }}&lt;/p&gt;\n    &lt;button @click="decrement"&gt;-&lt;/button&gt;\n    &lt;button @click="increment"&gt;+&lt;/button&gt;\n    &lt;button @click="reset"&gt;重置&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/template&gt;';

const useCounterInitialCode =
  '&lt;script setup lang="ts"&gt;\nimport { useCounter } from \'@scxfe/vue-hooks\';\n\nconst { count, increment, decrement, reset } = useCounter({\n  initial: 10,\n  min: 0,\n  max: 20\n});\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;当前值: {{ count }}&lt;/p&gt;\n    &lt;p&gt;范围: 0 - 20&lt;/p&gt;\n    &lt;button @click="decrement"&gt;-&lt;/button&gt;\n    &lt;button @click="increment"&gt;+&lt;/button&gt;\n    &lt;button @click="reset"&gt;重置&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/template&gt;';

const { count: count1, increment: inc1, decrement: dec1, reset: reset1 } = useCounter();
const {
  count: count2,
  increment: inc2,
  decrement: dec2,
  reset: reset2,
} = useCounter({
  initial: 10,
  min: 0,
  max: 20,
});
</script>

<template>
  <div>
    <h1>useCounter 计数器</h1>
    <p>简单的计数器 Hook。</p>

    <DemoLayout title="基础用法" description="最简单的计数器用法。">
      <PreviewContainer :code="useCounterBasicCode">
        <div>
          <p>当前值: {{ count1 }}</p>
          <button @click="dec1">-</button>
          <button @click="inc1">+</button>
          <button @click="reset1">重置</button>
        </div>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="自定义初始值" description="设置初始值和范围限制。">
      <PreviewContainer :code="useCounterInitialCode">
        <div>
          <p>当前值: {{ count2 }}</p>
          <p>范围: 0 - 20</p>
          <button @click="dec2">-</button>
          <button @click="inc2">+</button>
          <button @click="reset2">重置</button>
        </div>
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
