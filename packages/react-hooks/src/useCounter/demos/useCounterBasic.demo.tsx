import { useCounter } from '../../useCounter';

export default function UseCounterBasicDemo() {
  const counter = useCounter({
    initial: 0,
    min: 0,
    max: 10,
    step: 1,
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
          基础用法
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示 useCounter hook 的基本用法，包括增加、减少、重置和设置功能。
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
          <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff' }}>
            {counter.count}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={counter.decrement}
            disabled={!counter.canDecrement}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: counter.canDecrement ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              ...(counter.canDecrement && {
                ':hover': { borderColor: '#1890ff', color: '#1890ff' },
              }),
            }}
          >
            减少
          </button>
          <button
            onClick={counter.reset}
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
            重置
          </button>
          <button
            onClick={counter.increment}
            disabled={!counter.canIncrement}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: '#fff',
              color: '#333',
              fontSize: '14px',
              cursor: counter.canIncrement ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
            }}
          >
            增加
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => counter.set(5)}
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
            设置为 5
          </button>
        </div>
      </div>
    </div>
  );
}
