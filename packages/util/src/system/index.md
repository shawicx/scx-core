---
group:
  title: 系统方法
toc: content
---

## Document

```tsx
/**
 * title: 是否合法的CSS属性
 */
import { isBrowserEnvironment } from '@shawbox/util';

export default () => {
  return <div>isBrowserEnvironment: {isBrowserEnvironment() ? '是' : '否'}</div>;
};
```
