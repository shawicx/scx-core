---
group:
  title: 浏览器相关能力
toc: content
---

# 浏览器相关能力

## 定位：getLocation

```tsx
import { getLocation } from '@scxfe/util';

export default function () {
  return (
    <div>
      <button onClick={getLocation}>获取定位</button>
    </div>
  );
}
```
