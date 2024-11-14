---
title: 个性化输出
order: 1
toc: content
---

## Document

```tsx
/**
 * title: 是否合法的CSS属性
 */
import { logger } from '@shawbox/util';

export default () => {
  return (
    <div>
      <div>success: {logger.info('success')}</div>
      <div>info: {logger.info('info')}</div>
      <div>error: {logger.error('error')}</div>
      <div>warn: {logger.warn('warn')}</div>
      <div>dimmed: {logger.dimmed('dimmed')}</div>
      <div>item: {logger.item('item')}</div>
    </div>
  );
};
```
