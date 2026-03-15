---
group:
  title: 系统工具
  order: 8
  toc: content
---

系统工具提供了一些颜色转换和处理函数。

## ColorComponents - 颜色分量类型

定义颜色分量的接口类型。

```typescript
interface ColorComponents {
  r: number; // 红色分量 (0-255)
  g: number; // 绿色分量 (0-255)
  b: number; // 蓝色分量 (0-255)
  a: number; // 透明度分量 (0-1)
}
```

---

## convertColor - 颜色转换为 RGB 分量

将十六进制或 RGBA 格式的颜色字符串转换为 RGB 分量对象。

```typescript
function convertColor(color: string): ColorComponents;
```

**参数**

- `color` - 颜色字符串，支持十六进制（`#RGB`、`#RRGGBB`）或 RGBA 格式

**返回值**

- `ColorComponents` - 包含 r、g、b、a 四个分量的对象

**说明**

- 支持十六进制格式：`#RGB`（3位）或 `#RRGGBB`（6位）
- 支持 RGBA 格式：`rgba(r, g, b, a)`
- 解析失败时返回默认值 `{ r: 0, g: 0, b: 0, a: 1 }`

**示例**

```typescript
// 十六进制格式 - 3位
console.log(convertColor('#fff'));
// { r: 255, g: 255, b: 255, a: 1 }

console.log(convertColor('#f00'));
// { r: 255, g: 0, b: 0, a: 1 }

// 十六进制格式 - 6位
console.log(convertColor('#ffffff'));
// { r: 255, g: 255, b: 255, a: 1 }

console.log(convertColor('#ff0000'));
// { r: 255, g: 0, b: 0, a: 1 }

console.log(convertColor('#3498db'));
// { r: 52, g: 152, b: 219, a: 1 }

// RGBA 格式
console.log(convertColor('rgba(255, 0, 0, 0.5)'));
// { r: 255, g: 0, b: 0, a: 0.5 }

console.log(convertColor('rgba(52, 152, 219, 1)'));
// { r: 52, g: 152, b: 219, a: 1 }

console.log(convertColor('rgba(255, 255, 255, 0)'));
// { r: 255, g: 255, b: 255, a: 0 }

// 不支持的格式 - 返回默认值
console.log(convertColor('invalid'));
// { r: 0, g: 0, b: 0, a: 1 }
```

---

## 使用场景

### 1. 动态计算对比色

```typescript
import { convertColor } from '@scxfe/util';

function getContrastColor(bgColor: string): string {
  const { r, g, b } = convertColor(bgColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

console.log(getContrastColor('#ffffff'));
// '#000000'

console.log(getContrastColor('#000000'));
// '#ffffff'

console.log(getContrastColor('#3498db'));
// '#000000'
```

### 2. 颜色透明度调整

```typescript
import { convertColor } from '@scxfe/util';

function adjustOpacity(color: string, opacity: number): string {
  const { r, g, b } = convertColor(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

console.log(adjustOpacity('#ff0000', 0.5));
// 'rgba(255, 0, 0, 0.5)'

console.log(adjustOpacity('#3498db', 0.3));
// 'rgba(52, 152, 219, 0.3)'

// 在 React 中使用
function BackgroundWithOpacity({ color, opacity }: { color: string, opacity: number }) {
  const bgColor = adjustOpacity(color, opacity);
  return <div style={{ backgroundColor: bgColor }}>Content</div>;
}
```

### 3. 颜色渐变生成

```typescript
import { convertColor } from '@scxfe/util';

function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = convertColor(color1);
  const c2 = convertColor(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  const a = c1.a + (c2.a - c1.a) * factor;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

console.log(interpolateColor('#ff0000', '#0000ff', 0.5));
// 'rgba(127, 0, 127, 1)'

console.log(interpolateColor('rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 0)', 0.5));
// 'rgba(127, 0, 127, 0.5)'

// 生成渐变色数组
function generateGradient(startColor: string, endColor: string, steps: number): string[] {
  const gradient = [];
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    gradient.push(interpolateColor(startColor, endColor, factor));
  }
  return gradient;
}

const colors = generateGradient('#ff0000', '#0000ff', 5);
// ['rgba(255, 0, 0, 1)', 'rgba(191, 0, 63, 1)', 'rgba(127, 0, 127, 1)', 'rgba(63, 0, 191, 1)', 'rgba(0, 0, 255, 1)']
```

### 4. 颜色亮度调整

```typescript
import { convertColor } from '@scxfe/util';

function adjustBrightness(color: string, percent: number): string {
  const { r, g, b, a } = convertColor(color);

  const adjust = (value: number) => {
    const adjusted = Math.round(value * (1 + percent / 100));
    return Math.max(0, Math.min(255, adjusted));
  };

  return `rgba(${adjust(r)}, ${adjust(g)}, ${adjust(b)}, ${a})`;
}

console.log(adjustBrightness('#3498db', 20));
// 'rgba(62, 182, 263, 1)'

console.log(adjustBrightness('#3498db', -20));
// 'rgba(41, 121, 175, 1)'

// 在主题系统中使用
const getThemeColors = (baseColor: string) => {
  return {
    base: baseColor,
    lighter: adjustBrightness(baseColor, 20),
    darker: adjustBrightness(baseColor, -20),
  };
};

const theme = getThemeColors('#3498db');
// {
//   base: '#3498db',
//   lighter: 'rgba(62, 182, 263, 1)',
//   darker: 'rgba(41, 121, 175, 1)'
// }
```

### 5. 颜色格式转换

```typescript
import { convertColor } from '@scxfe/util';

function hexToRgba(hex: string, alpha: number = 1): string {
  const { r, g, b } = convertColor(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbaToHex(rgba: string): string {
  const { r, g, b } = convertColor(rgba);
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

console.log(hexToRgba('#3498db', 0.5));
// 'rgba(52, 152, 219, 0.5)'

console.log(rgbaToHex('rgba(52, 152, 219, 1)'));
// '#3498db'

console.log(rgbaToHex('rgba(255, 0, 0, 0.5)'));
// '#ff0000'
```

### 6. 在 React 中使用

```typescript
import { convertColor } from '@scxfe/util';
import { useMemo } from 'react';

function ColorCard({ bgColor }: { bgColor: string }) {
  const textColor = useMemo(() => {
    const { r, g, b } = convertColor(bgColor);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }, [bgColor]);

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, padding: '16px' }}>
      <h3>Color Card</h3>
      <p>Background: {bgColor}</p>
      <p>Text: {textColor}</p>
    </div>
  );
}
```

### 7. 在 Vue 中使用

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { convertColor } from '@scxfe/util';

interface Props {
  color: string;
}

const props = defineProps<Props>();

const rgbaColor = computed(() => {
  const { r, g, b } = convertColor(props.color);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
});

const textColor = computed(() => {
  const { r, g, b } = convertColor(props.color);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
});
</script>

<template>
  <div
    :style="{
      backgroundColor: color,
      color: textColor,
      padding: '16px',
    }"
  >
    <h3>Color Display</h3>
    <p>Original: {{ color }}</p>
    <p>RGBA: {{ rgbaColor }}</p>
  </div>
</template>
```

### 8. 验证颜色格式

```typescript
import { convertColor } from '@scxfe/util';

function isValidColor(color: string): boolean {
  const { r, g, b } = convertColor(color);
  return r !== 0 || g !== 0 || b !== 0 || color === '#000000' || color === 'rgba(0,0,0,1)';
}

// 更简单的验证方式
function isSupportedFormat(color: string): boolean {
  if (color.startsWith('#')) {
    return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(color.slice(1));
  }
  if (color.startsWith('rgba')) {
    return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*\d*\.?\d+\s*\)$/.test(color);
  }
  return false;
}

console.log(isValidColor('#3498db'));
// true

console.log(isValidColor('rgba(52, 152, 219, 1)'));
// true

console.log(isValidColor('invalid'));
// false
```

### 9. 颜色混合

```typescript
import { convertColor } from '@scxfe/util';

function blendColors(color1: string, color2: string, weight: number = 0.5): string {
  const c1 = convertColor(color1);
  const c2 = convertColor(color2);

  const r = Math.round(c1.r * weight + c2.r * (1 - weight));
  const g = Math.round(c1.g * weight + c2.g * (1 - weight));
  const b = Math.round(c1.b * weight + c2.b * (1 - weight));
  const a = c1.a * weight + c2.a * (1 - weight);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

console.log(blendColors('#ff0000', '#0000ff'));
// 'rgba(127, 0, 127, 1)'

console.log(blendColors('#ff0000', '#0000ff', 0.7));
// 'rgba(178, 0, 76, 1)'

// 创建半透明叠加
function createOverlay(baseColor: string, overlayColor: string): string {
  const base = convertColor(baseColor);
  const overlay = convertColor(overlayColor);

  const r = Math.round(base.r * (1 - overlay.a) + overlay.r * overlay.a);
  const g = Math.round(base.g * (1 - overlay.a) + overlay.g * overlay.a);
  const b = Math.round(base.b * (1 - overlay.a) + overlay.b * overlay.a);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

console.log(createOverlay('#ffffff', 'rgba(255, 0, 0, 0.5)'));
// 'rgba(255, 127, 127, 1)'
```

### 10. 主题色生成

```typescript
import { convertColor } from '@scxfe/util';

interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryAlpha: string;
}

function generateThemeColors(primaryColor: string): ThemeColors {
  const base = convertColor(primaryColor);

  const lighten = (factor: number) => {
    return `rgba(${Math.round(base.r + (255 - base.r) * factor)}, ${Math.round(base.g + (255 - base.g) * factor)}, ${Math.round(base.b + (255 - base.b) * factor)}, 1)`;
  };

  const darken = (factor: number) => {
    return `rgba(${Math.round(base.r * (1 - factor))}, ${Math.round(base.g * (1 - factor))}, ${Math.round(base.b * (1 - factor))}, 1)`;
  };

  return {
    primary: primaryColor,
    primaryLight: lighten(0.2),
    primaryDark: darken(0.2),
    primaryAlpha: `rgba(${base.r}, ${base.g}, ${base.b}, 0.1)`,
  };
}

const theme = generateThemeColors('#3498db');
console.log(theme);
// {
//   primary: '#3498db',
//   primaryLight: 'rgba(85, 169, 228, 1)',
//   primaryDark: 'rgba(41, 121, 175, 1)',
//   primaryAlpha: 'rgba(52, 152, 219, 0.1)'
// }
```
