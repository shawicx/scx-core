---
toc: content
---

```tsx
import { GradientBorder, GradientBorderPlacement } from '@shawbox/ui';

export default function () {
  return (
    <div>
      <GradientBorder width={'100%'} height={100} gradientColor={'#1996ff'} />
      <div style={{ height: 20 }} />
      <GradientBorder
        placement={GradientBorderPlacement.BOTTOM_LEFT}
        width={'100%'}
        height={100}
        gradientColor={'#1996ff'}
      >
        左下渐变：BOTTOM_LEFT
      </GradientBorder>
    </div>
  );
}
```
