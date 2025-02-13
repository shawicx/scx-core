---
group:
  title: 系统方法
toc: content
---

## Document

```tsx
/**
 * title: 是否浏览器环境
 */
import { isBrowserEnvironment, isCSSPropertySupported } from '@scxfe/util';

export default () => {
  return <div>
    <div>是否浏览器环境 isBrowserEnvironment: {isBrowserEnvironment() ? '是' : '否'}</div>
    <div>是否CSS属性
      isCSSPropertySupported: margin-top {isCSSPropertySupported('margin-top') ? '是' : '否'}</div>
    <div>是否CSS属性
      isCSSPropertySupported: margin-Top {isCSSPropertySupported('margin-Top') ? '是' : '否'}</div>
  </div>;
};
```
