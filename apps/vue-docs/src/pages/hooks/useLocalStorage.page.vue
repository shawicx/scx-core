<script setup lang="ts">
// @ts-expect-error: vue-hooks package missing type declarations
import { useLocalStorage } from '@scxfe/vue-hooks';
import { ref } from 'vue';
import { PreviewContainer } from '@scxfe/docs-preview-vue';
import { DemoLayout } from '@scxfe/docs-ui-vue';

const useLocalStorageBasicCode =
  "&lt;script setup lang=\"ts\"&gt;\nimport { useLocalStorage } from '@scxfe/vue-hooks';\n\nconst [value, setValue] = useLocalStorage('key', 'default');\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;当前值: {{ value }}&lt;/p&gt;\n    &lt;input v-model=\"value\" /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;";

const useLocalStorageObjectCode =
  "&lt;script setup lang=\"ts\"&gt;\nimport { useLocalStorage } from '@scxfe/vue-hooks';\n\nconst [data, setData] = useLocalStorage('user', {\n  name: '',\n  age: 0\n});\n\nconst updateName = (name: string) =&gt; {\n  setData({ ...data.value, name });\n};\n&lt;/script&gt;\n\n&lt;template&gt;\n  &lt;div&gt;\n    &lt;p&gt;姓名: {{ data.name }}&lt;/p&gt;\n    &lt;p&gt;年龄: {{ data.age }}&lt;/p&gt;\n    &lt;input v-model=\"data.name\" /&gt;\n  &lt;/div&gt;\n&lt;/template&gt;";

const [value1, setValue1] = useLocalStorage('demo-key-vue', 'default');
const [data2, setData2] = useLocalStorage('demo-user-vue', {
  name: '',
  age: 0,
});
</script>

<template>
  <div>
    <h1>useLocalStorage 本地存储</h1>
    <p>本地存储同步 Hook。</p>

    <DemoLayout title="基础用法" description="存储和读取简单值。">
      <PreviewContainer :code="useLocalStorageBasicCode">
        <div>
          <p>当前值: {{ value1 }}</p>
          <input v-model="value1" />
        </div>
      </PreviewContainer>
    </DemoLayout>

    <DemoLayout title="复杂对象" description="存储和读取复杂对象。">
      <PreviewContainer :code="useLocalStorageObjectCode">
        <div>
          <p>姓名: {{ data2.name }}</p>
          <p>年龄: {{ data2.age }}</p>
          <input v-model="data2.name" />
        </div>
      </PreviewContainer>
    </DemoLayout>
  </div>
</template>
