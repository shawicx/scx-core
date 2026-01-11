<template>
  <div class="component-docs">
    <header class="docs-header">
      <div class="header-content">
        <router-link to="/" class="back-link"> ← 返回首页 </router-link>
        <h1>预览容器组件示例</h1>
      </div>
    </header>

    <main class="docs-main">
      <section class="docs-section">
        <h2>Preview 组件</h2>
        <p>Preview 组件提供一个统一的预览容器样式。</p>
        <Preview>
          <div style="padding: '1rem', border: '1px dashed #ccc'">预览内容</div>
        </Preview>
      </section>

      <section class="docs-section">
        <h2>CodeBlock 组件</h2>
        <p>CodeBlock 组件用于展示代码，支持复制功能和行号。</p>
        <CodeBlock
          :code="codeExample"
          language="vue"
          :show-line-numbers="true"
          :show-copy="true"
          title="示例代码"
        />
      </section>

      <section class="docs-section">
        <h2>PreviewContainer 组件</h2>
        <p>PreviewContainer 组件组合了 Preview 和 CodeBlock，是文档中最常用的组件。</p>
        <PreviewContainer
          :code="containerCode"
          language="vue"
          :show-line-numbers="true"
          :show-copy="true"
          code-title="完整示例"
        >
          <div style="padding: '1rem'">
            <button
              style="
                padding: 0.5rem 1rem;
                background: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              "
            >
              Click me
            </button>
          </div>
        </PreviewContainer>
      </section>

      <section class="docs-section">
        <h2>不同的 Preview 配置</h2>
        <h3>灰色背景</h3>
        <Preview background="gray">
          <div>灰色背景预览</div>
        </Preview>
        <h3>带边框</h3>
        <Preview :bordered="true">
          <div>带边框预览</div>
        </Preview>
        <h3>窄宽度</h3>
        <Preview width="narrow">
          <div>窄宽度预览</div>
        </Preview>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import Preview from '@scxfe/docs-preview-vue/Preview.vue';
import CodeBlock from '@scxfe/docs-preview-vue/CodeBlock.vue';
import PreviewContainer from '@scxfe/docs-preview-vue/PreviewContainer.vue';

const codeExample = `import { Button } from '@scxfe/vue-ui';

function App() {
  return <Button>Click me</Button>;
}`;

const containerCode = `import { Button } from '@scxfe/vue-ui';

function App() {
  return <Button>Click me</Button>;
}`;
</script>
