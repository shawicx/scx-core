---
toc: content
group:
  title: 地图
  order: 1
---

### 基本使用

```tsx
import { AMap } from '@scxfe/ui';
import { AMapConstant } from '@scxfe/util';

export default function () {
  return <AMap apiKey={AMapConstant.API_KEY} width={'100%'} height={500} />;
}
```
