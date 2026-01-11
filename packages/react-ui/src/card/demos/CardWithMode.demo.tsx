import { Card, CardMode } from '../card';

export default function CardWithModeDemo() {
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
          不同模式
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示卡片的不同模式切换效果。
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Card mode={CardMode.DEFAULT}>
          <div>
            <strong>DEFAULT 模式</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>默认阴影效果</p>
          </div>
        </Card>

        <Card mode={CardMode.GRADIENT_BORDER}>
          <div>
            <strong>GRADIENT_BORDER 模式</strong>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>渐变边框效果</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
