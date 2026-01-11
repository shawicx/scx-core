import { Card, CardMode } from '../card';

export default function CardCustomDemo() {
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
          自定义样式
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示如何自定义卡片样式。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card mode={CardMode.DEFAULT}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>自定义内容布局</h4>
            <span style={{ fontSize: '12px', color: '#999' }}>2024-01-01</span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
            可以在卡片中放置任意内容，包括文本、图片、按钮等。
          </p>
          <div
            style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
          >
            <button
              style={{
                padding: '6px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              取消
            </button>
            <button
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                background: '#1890ff',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              确定
            </button>
          </div>
        </Card>

        <Card mode={CardMode.GRADIENT_BORDER}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 600 }}>居中标题</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              渐变边框卡片可以用于强调重要内容或特殊场景。
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
