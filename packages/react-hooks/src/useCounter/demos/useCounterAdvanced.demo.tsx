import { useCounter } from '../../useCounter';

export default function UseCounterAdvancedDemo() {
  const counter1 = useCounter({
    initial: 0,
    min: 0,
    max: 100,
    step: 5,
  });

  const counter2 = useCounter({
    initial: 10,
    min: -10,
    max: 10,
    step: 2,
  });

  const counter3 = useCounter({
    initial: 1,
    min: 1,
    max: 10,
    step: 0.5,
  });

  const CounterItem = ({
    title,
    counter,
    incrementLabel,
    decrementLabel,
  }: {
    title: string;
    counter: ReturnType<typeof useCounter>;
    incrementLabel: string;
    decrementLabel: string;
  }) => (
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
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#333' }}>{title}</h4>
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
          }}
        >
          {decrementLabel}
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
          {incrementLabel}
        </button>
      </div>
    </div>
  );

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
          展示 useCounter hook 的自定义配置，包括步长、最小值和最大值。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CounterItem
          title="步长为 5 (0-100)"
          counter={counter1}
          incrementLabel="+5"
          decrementLabel="-5"
        />
        <CounterItem
          title="负数范围 (-10 到 10)，步长 2"
          counter={counter2}
          incrementLabel="+2"
          decrementLabel="-2"
        />
        <CounterItem
          title="小数步长 0.5 (1-10)"
          counter={counter3}
          incrementLabel="+0.5"
          decrementLabel="-0.5"
        />
      </div>
    </div>
  );
}
