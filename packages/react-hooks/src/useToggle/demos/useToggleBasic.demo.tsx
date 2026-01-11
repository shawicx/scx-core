import { useToggle } from '../../useToggle';

export default function UseToggleBasicDemo() {
  const toggle = useToggle();

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
          展示 useToggle hook 的基本用法，包括切换、设置为 true 和设置为 false 功能。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fff',
              background: toggle.state ? '#52c41a' : '#bfbfbf',
              transition: 'all 0.3s',
            }}
          >
            {toggle.state ? '开' : '关'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => toggle.toggle()}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            切换
          </button>
          <button
            onClick={toggle.setTrue}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            设为开
          </button>
          <button
            onClick={toggle.setFalse}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            设为关
          </button>
        </div>
      </div>
    </div>
  );
}
