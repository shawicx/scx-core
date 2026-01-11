import { Caption } from '../caption';

export default function CaptionWithTextDemo() {
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
          带操作按钮
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示带有操作按钮的 Caption 组件。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Caption
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                编辑
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: 'none',
                  borderRadius: '4px',
                  background: '#1890ff',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                更多
              </button>
            </div>
          }
        >
          带操作按钮的标题
        </Caption>

        <Caption
          shape="square"
          signBackground="#52c41a"
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                刷新
              </button>
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: 'none',
                  borderRadius: '4px',
                  background: '#52c41a',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                添加
              </button>
            </div>
          }
        >
          方形绿色标题
        </Caption>
      </div>
    </div>
  );
}
