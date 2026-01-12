<script setup lang="ts">
// @ts-expect-error: vue-hooks package missing type declarations
import { useToggle } from '@scxfe/vue-hooks';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const useToggleBasicCode =
  "&lt;script setup lang=\"ts\"&gt;\nimport { useToggle } from '@scxfe/vue-hooks';\n\nconst { state, toggle } = useToggle();\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;当前状态: {{ state ? '开' : '关' }}&lt;/p&gt;\n    &lt;button @click=\"toggle\"&gt;切换&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/template&gt;";

const useToggleInitialCode =
  '&lt;script setup lang="ts"&gt;\nimport { useToggle } from \'@scxfe/vue-hooks\';\n\nconst { state, toggle, setTrue, setFalse } = useToggle({\n  initialValue: true\n});\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;当前状态: {{ state ? \'开\' : \'关\' }}&lt;/p&gt;\n    &lt;button @click="toggle"&gt;切换&lt;/button&gt;\n    &lt;button @click="setTrue"&gt;设为开&lt;/button&gt;\n    &lt;button @click="setFalse"&gt;设为关&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/template&gt;';

const { state: state1, toggle: toggle1 } = useToggle();
const {
  state: state2,
  toggle: toggle2,
  setTrue: setTrue2,
  setFalse: setFalse2,
} = useToggle({
  initialValue: true,
});
</script>

<template>
  <div>
    <h1>useToggle 切换</h1>
    <p>布尔值切换 Hook。</p>

    <DemoLayout title="基础用法" description="最简单的切换用法。">
      <PreviewContainer :code="useToggleBasicCode">
        <div>
          <p>当前状态: {{ state1 ? '开' : '关' }}</p>
          <button @click="toggle1">切换</button>
        </div>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="自定义初始值" description="设置初始值为 true。">
      <PreviewContainer :code="useToggleInitialCode">
        <div>
          <p>当前状态: {{ state2 ? '开' : '关' }}</p>
          <button @click="toggle2">切换</button>
          <button @click="setTrue2">设为开</button>
          <button @click="setFalse2">设为关</button>
        </div>
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
