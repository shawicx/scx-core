import { Caption } from '../caption';

export default function CaptionBasicDemo() {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>
          基础用法
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示 Caption 组件的基本用法。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Caption>默认标题</Caption>

        <Caption shape="square">方形标题</Caption>

        <Caption shape="circle">圆形标题</Caption>

        <Caption line>线形标题</Caption>

        <Caption signBackground="#ff4d4f">自定义颜色</Caption>
      </div>
    </div>
  );
}
