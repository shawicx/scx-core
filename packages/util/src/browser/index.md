---
group:
  title: 浏览器相关能力
toc: content
---

# 浏览器相关能力

## 定位：getLocation

```tsx
import { getLocation } from '@scxfe/util';

import { useState } from 'react';

export default function () {
  const [position, setPosition] = useState(null);

  const onLocation = () => {
    getLocation().then((res) => {
      if (!(res instanceof Error)) {
        setPosition(res);
      }
    });
  };

  return (
    <div>
      <button onClick={onLocation}>获取定位</button>
      <div>定位信息: {position?.latitude || '-'} {position?.longitude || '-'}</div>
    </div>
  );
}
```
