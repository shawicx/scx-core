---
toc: content
---

```tsx
import { SeamlessCarousel } from '@shawbox/ui';

const data = new Array(5).fill(0).map((item, index) => {
  return { num: index };
});

const itemStyle = {
  border: '1px solid #ccc',
  background: '#fff',
  height: '250px',
  color: 'red',
};

const Item = (item: any) => {
  return <div style={itemStyle}>{item.num}</div>;
};

export default function () {
  return (
    <div style={{ width: '300px', height: '200px', overflow: 'hidden' }}>
      <SeamlessCarousel
        duration={3000}
        gap={20}
        autoplay
        // vertical
      >
        <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>1</div>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'green' }}>2</div>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>3</div>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'yellow' }}>4</div>
      </SeamlessCarousel>
    </div>
  );
}
```
