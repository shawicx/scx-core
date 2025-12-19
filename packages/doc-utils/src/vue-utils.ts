/**
 * Vue 工具 - Vue 组件专用工具函数
 */

import type { ComponentMeta, PropMeta, EventMeta, SlotMeta } from '@scxfe/doc-schema';

/**
 * Vue SFC 解析结果
 */
export interface VueSFCParseResult {
  /**
   * 模板内容
   */
  template?: VueTemplateInfo;
  /**
   * 脚本内容
   */
  script?: VueScriptInfo;
  /**
   * 样式内容
   */
  styles: VueStyleInfo[];
}

/**
 * Vue 模板信息
 */
export interface VueTemplateInfo {
  content: string;
  bindings: VueBinding[];
  directives: VueDirective[];
  slots: string[];
  emits: string[];
}

/**
 * Vue 脚本信息
 */
export interface VueScriptInfo {
  content: string;
  language: 'js' | 'ts';
  setup?: boolean;
  imports: string[];
  exports: string[];
  props: VuePropDefinition[];
  emits: VueEmitDefinition[];
  slots: VueSlotDefinition[];
}

/**
 * Vue 样式信息
 */
export interface VueStyleInfo {
  content: string;
  language: 'css' | 'scss' | 'sass' | 'less' | 'stylus';
  scoped?: boolean;
  module?: string;
}

/**
 * Vue 绑定信息
 */
export interface VueBinding {
  type: 'text' | 'html' | 'attr' | 'prop' | 'event' | 'class' | 'style';
  name: string;
  value: string;
}

/**
 * Vue 指令信息
 */
export interface VueDirective {
  name: string;
  argument?: string;
  modifiers: string[];
  value: string;
}

/**
 * Vue 属性定义
 */
export interface VuePropDefinition {
  name: string;
  type: string;
  required?: boolean;
  default?: any;
  validator?: string;
  description?: string;
}

/**
 * Vue 事件定义
 */
export interface VueEmitDefinition {
  name: string;
  payload?: string;
  description?: string;
}

/**
 * Vue 插槽定义
 */
export interface VueSlotDefinition {
  name: string;
  props?: string;
  description?: string;
}

/**
 * Vue SFC 解析器
 */
export class VueSFCParser {
  /**
   * 解析 Vue SFC
   */
  parse(content: string): VueSFCParseResult {
    const result: VueSFCParseResult = {
      styles: [],
    };

    // 解析模板
    const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/);
    if (templateMatch) {
      result.template = this.parseTemplate(templateMatch[1]);
    }

    // 解析脚本
    const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
      const scriptContent = scriptMatch[1];
      const setupAttr = scriptMatch[0].match(/setup\b/) ? true : false;
      const langAttr = scriptMatch[0].match(/lang="(\w+)"/);
      const language = (langAttr?.[1] as 'js' | 'ts') || 'js';

      result.script = {
        ...this.parseScript(scriptContent),
        language,
        setup: setupAttr,
      };
    }

    // 解析样式
    const styleMatches = content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g);
    for (const match of styleMatches) {
      const styleTag = match[0];
      const styleContent = match[1];

      const scoped = styleTag.includes('scoped');
      const moduleMatch = styleTag.match(/module="([^"]+)"/);
      const module = moduleMatch?.[1];
      const langMatch = styleTag.match(/lang="(\w+)"/);
      const language = (langMatch?.[1] as VueStyleInfo['language']) || 'css';

      result.styles.push({
        content: styleContent,
        language,
        scoped,
        module,
      });
    }

    return result;
  }

  /**
   * 解析模板内容
   */
  private parseTemplate(content: string): VueTemplateInfo {
    const bindings: VueBinding[] = [];
    const directives: VueDirective[] = [];
    const slots: string[] = [];
    const emits: string[] = [];

    // 解析绑定
    const bindingPatterns = [
      { regex: /v-text="([^"]+)"/, type: 'text' as const },
      { regex: /v-html="([^"]+)"/, type: 'html' as const },
      { regex: /:([^=]+)="([^"]+)"/, type: 'prop' as const },
      { regex: /@([^=]+)="([^"]+)"/, type: 'event' as const },
      { regex: /v-bind:([^=]+)="([^"]+)"/, type: 'prop' as const },
      { regex: /v-on:([^=]+)="([^"]+)"/, type: 'event' as const },
      { regex: /v-model="([^"]+)"/, type: 'prop' as const },
    ];

    bindingPatterns.forEach(({ regex, type }) => {
      let match;
      while ((match = regex.exec(content)) !== null) {
        bindings.push({
          type,
          name: match[1],
          value: match[2],
        });
      }
    });

    // 解析指令
    const directiveMatch = content.matchAll(
      /v-([^:\s\]]+)(?::([^:\s\]]+))?((?:\.[^:\s\]]+)*)?(?:="([^"]+)")?/g,
    );
    for (const match of directiveMatch) {
      directives.push({
        name: match[1],
        argument: match[2],
        modifiers: match[3] ? match[3].split('.').filter(Boolean) : [],
        value: match[4] || '',
      });
    }

    // 解析插槽
    const slotMatch = content.matchAll(/<slot[^>]*name="([^"]+)"[^>]*>/g);
    for (const match of slotMatch) {
      slots.push(match[1]);
    }

    // 默认插槽
    if (content.includes('<slot>') && !slots.includes('default')) {
      slots.push('default');
    }

    return {
      content: content.trim(),
      bindings,
      directives,
      slots,
      emits,
    };
  }

  /**
   * 解析脚本内容
   */
  private parseScript(content: string): Omit<VueScriptInfo, 'language' | 'setup'> {
    const imports = this.extractImports(content);
    const exports = this.extractExports(content);
    const props = this.extractProps(content);
    const emits = this.extractEmits(content);
    const slots = this.extractSlots(content);

    return {
      content: content.trim(),
      imports,
      exports,
      props,
      emits,
      slots,
    };
  }

  /**
   * 提取导入
   */
  private extractImports(content: string): string[] {
    const imports: string[] = [];
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  /**
   * 提取导出
   */
  private extractExports(content: string): string[] {
    const exports: string[] = [];
    const exportRegex =
      /export\s+(?:default\s+)?(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  /**
   * 提取属性定义
   */
  private extractProps(content: string): VuePropDefinition[] {
    const props: VuePropDefinition[] = [];

    // 解析 defineProps
    const definePropsMatch = content.match(/defineProps<\{([^}]+)\}>/);
    if (definePropsMatch) {
      const propsContent = definePropsMatch[1];
      const propMatches = propsContent.matchAll(/(\w+)\s*:\s*([^;]+);?/g);

      for (const match of propMatches) {
        props.push({
          name: match[1],
          type: match[2].trim(),
        });
      }
    }

    // 解析 props 选项
    const propsOptionMatch = content.match(/props:\s*\{([^}]+)\}/);
    if (propsOptionMatch) {
      const propsContent = propsOptionMatch[1];
      const propMatches = propsContent.matchAll(/(\w+)\s*:\s*\{([^}]+)\}/g);

      for (const match of propMatches) {
        const propDef = match[2];
        const typeMatch = propDef.match(/type:\s*(\w+)/);
        const requiredMatch = propDef.match(/required:\s*(true|false)/);
        const defaultMatch = propDef.match(/default:\s*([^,}]+)/);

        props.push({
          name: match[1],
          type: typeMatch?.[1] || 'any',
          required: requiredMatch?.[1] === 'true',
          default: defaultMatch?.[1]?.trim(),
        });
      }
    }

    return props;
  }

  /**
   * 提取事件定义
   */
  private extractEmits(content: string): VueEmitDefinition[] {
    const emits: VueEmitDefinition[] = [];

    // 解析 defineEmits
    const defineEmitsMatch = content.match(/defineEmits<\{([^}]+)\}>/);
    if (defineEmitsMatch) {
      const emitsContent = defineEmitsMatch[1];
      const emitMatches = emitsContent.matchAll(/\(([^)]+)\):\s*([^;]+);?/g);

      for (const match of emitMatches) {
        emits.push({
          name: match[1],
          payload: match[2].trim(),
        });
      }
    }

    // 解析 emits 选项
    const emitsOptionMatch = content.match(/emits:\s*\[([^\]]+)\]/);
    if (emitsOptionMatch) {
      const emitsContent = emitsOptionMatch[1];
      const emitNames = emitsContent.split(',').map((s) => s.trim().replace(/['"]/g, ''));

      for (const name of emitNames) {
        emits.push({ name });
      }
    }

    return emits;
  }

  /**
   * 提取插槽定义
   */
  private extractSlots(content: string): VueSlotDefinition[] {
    const slots: VueSlotDefinition[] = [];

    // 解析 defineSlots
    const defineSlotsMatch = content.match(/defineSlots<\{([^}]+)\}>/);
    if (defineSlotsMatch) {
      const slotsContent = defineSlotsMatch[1];
      const slotMatches = slotsContent.matchAll(/(\w+)(?:\(([^)]+)\))?:\s*([^;]+);?/g);

      for (const match of slotMatches) {
        slots.push({
          name: match[1],
          props: match[2],
        });
      }
    }

    return slots;
  }
}

/**
 * Vue 组件元数据提取器
 */
export class VueComponentMetaExtractor {
  private parser = new VueSFCParser();

  /**
   * 从 Vue SFC 内容提取组件元数据
   */
  extractFromSFC(content: string, fileName?: string): ComponentMeta {
    const sfc = this.parser.parse(content);
    const name = this.extractComponentName(fileName) || 'VueComponent';

    // 转换属性
    const props = (sfc.script?.props || []).map(this.convertProp);

    // 转换事件
    const events = (sfc.script?.emits || []).map(this.convertEmit);

    // 转换插槽
    const slots = (sfc.template?.slots || []).map(this.convertSlot);

    return {
      name,
      props,
      events,
      slots,
    };
  }

  /**
   * 提取组件名称
   */
  private extractComponentName(fileName?: string): string | undefined {
    if (!fileName) return undefined;

    const basename = fileName.split('/').pop()?.split('.')[0];
    if (!basename) return undefined;

    // 移除文件名中的特殊字符，转换为 PascalCase
    return basename
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/\s/g, '');
  }

  /**
   * 转换属性定义
   */
  private convertProp(prop: VuePropDefinition): PropMeta {
    return {
      name: prop.name,
      type: { name: prop.type },
      required: prop.required ?? false,
      default: prop.default,
      description: prop.description,
    };
  }

  /**
   * 转换事件定义
   */
  private convertEmit(emit: VueEmitDefinition): EventMeta {
    return {
      name: emit.name,
      description: emit.description,
      ...(emit.payload && {
        payload: {
          name: emit.payload,
          raw: emit.payload,
        },
      }),
    };
  }

  /**
   * 转换插槽定义
   */
  private convertSlot(slotName: string): SlotMeta {
    return {
      name: slotName,
      props: {}, // Vue 插槽默认可能是作用域插槽，需要更复杂的检测逻辑
    };
  }
}

/**
 * Vue Demo 组件生成器
 */
export class VueDemoGenerator {
  /**
   * 生成基础 Demo 模板
   */
  generateBasicDemo(componentName: string, props: Record<string, any> = {}): string {
    const propsStr = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'boolean' && value) {
          return `  ${key}`;
        } else {
          return `  :${key}="${JSON.stringify(value)}"`;
        }
      })
      .join('\n');

    return `<template>
  <div class="demo-container">
    <${componentName}${propsStr ? '\n' + propsStr + '\n' : ''} />
  </div>
</template>

<script setup lang="ts">
import { ${componentName} } from './${componentName}.vue'
</script>

<style scoped>
.demo-container {
  padding: 16px;
}
</style>`;
  }

  /**
   * 生成交互式 Demo 模板
   */
  generateInteractiveDemo(componentName: string, interactiveProps: string[]): string {
    const reactiveData = interactiveProps
      .map((prop) => `const ${prop} = ref(${this.getDefaultValue(prop)})`)
      .join('\n');

    const propsBinding = interactiveProps.map((prop) => `  :${prop}="${prop}"`).join('\n');

    return `<template>
  <div class="demo-container">
    <${componentName}${propsBinding ? '\n' + propsBinding + '\n' : ''} />

    <div class="demo-controls">
${interactiveProps
  .map(
    (prop) => `      <label>
        ${prop}:
        <input v-model="${prop}" type="${this.getInputType(prop)}" />
      </label>`,
  )
  .join('\n')}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ${componentName} } from './${componentName}.vue'

${reactiveData}
</script>

<style scoped>
.demo-container {
  padding: 16px;
}

.demo-controls {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.demo-controls label {
  display: block;
  margin-bottom: 8px;
}

.demo-controls input {
  margin-left: 8px;
}
</style>`;
  }

  private getDefaultValue(propName: string): any {
    // 根据属性名推断默认值
    if (propName.includes('disabled') || propName.includes('checked')) {
      return false;
    }
    if (propName.includes('count') || propName.includes('size')) {
      return 1;
    }
    if (propName.includes('text') || propName.includes('title') || propName.includes('label')) {
      return '""';
    }
    return 'null';
  }

  private getInputType(propName: string): string {
    if (propName.includes('disabled') || propName.includes('checked')) {
      return 'checkbox';
    }
    if (propName.includes('count') || propName.includes('size')) {
      return 'number';
    }
    return 'text';
  }
}
