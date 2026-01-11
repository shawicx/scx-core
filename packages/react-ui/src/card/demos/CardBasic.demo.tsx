import { Card, CardMode } from '../card';

export default function CardBasicDemo() {
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
          展示卡片的基本用法，包括默认模式和渐变边框模式。
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Card mode={CardMode.DEFAULT}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>默认模式卡片</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>这是一个默认模式的卡片组件。</p>
        </Card>

        <Card mode={CardMode.GRADIENT_BORDER}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>渐变边框卡片</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            这是一个带有渐变边框的卡片组件。
          </p>
        </Card>
      </div>
    </div>
  );
}
