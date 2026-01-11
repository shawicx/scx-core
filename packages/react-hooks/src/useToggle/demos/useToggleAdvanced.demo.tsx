import { useToggle } from '../../useToggle';

export default function UseToggleAdvancedDemo() {
  const toggle1 = useToggle({
    initialValue: true,
  });

  const toggle2 = useToggle<'light' | 'dark'>({
    initialValue: 'light',
    trueValue: 'light',
    falseValue: 'dark',
  });

  const toggle3 = useToggle<1 | 0>({
    initialValue: 0,
    trueValue: 1,
    falseValue: 0,
  });

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
          高级用法
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示 useToggle hook 的自定义初始值和自定义值类型。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '16px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#333' }}>
            默认值：true
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '12px',
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
                background: toggle1.state ? '#52c41a' : '#bfbfbf',
                transition: 'all 0.3s',
              }}
            >
              {toggle1.state ? '开' : '关'}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => toggle1.toggle()}
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
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '16px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#333' }}>
            字符串类型：light/dark
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '12px',
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
                background: toggle2.state === 'light' ? '#52c41a' : '#bfbfbf',
                transition: 'all 0.3s',
              }}
            >
              {toggle2.state}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => toggle2.toggle()}
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
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '16px',
            background: '#fafafa',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#333' }}>
            数字类型：1/0
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              marginBottom: '12px',
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
                background: toggle3.state === 1 ? '#52c41a' : '#bfbfbf',
                transition: 'all 0.3s',
              }}
            >
              {toggle3.state}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => toggle3.toggle()}
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
          </div>
        </div>
      </div>
    </div>
  );
}
