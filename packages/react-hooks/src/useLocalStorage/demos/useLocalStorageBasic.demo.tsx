import { useLocalStorage } from '../../useLocalStorage';

export default function UseLocalStorageBasicDemo() {
  const [name, setName] = useLocalStorage('react-demo-name', '张三');
  const [count, setCount] = useLocalStorage('react-demo-count', 0);

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
          展示 useLocalStorage hook 的基本用法，自动将数据保存到 localStorage。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#333' }}>
            存储字符串
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="输入姓名"
              style={{
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
            <span style={{ fontSize: '14px', color: '#666' }}>当前值: {name}</span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
            刷新页面后值会保持
          </div>
        </div>

        <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#333' }}>
            存储数字
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <button
              onClick={() => setCount(count - 1)}
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
              -
            </button>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                minWidth: '40px',
                textAlign: 'center',
              }}
            >
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
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
              +
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>刷新页面后计数器值会保持</div>
        </div>
      </div>
    </div>
  );
}
