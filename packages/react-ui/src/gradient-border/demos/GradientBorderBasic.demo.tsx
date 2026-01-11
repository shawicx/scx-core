import { GradientBorder } from '../gradient-border';

export default function GradientBorderBasicDemo() {
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
          展示渐变边框组件的基本用法。
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <GradientBorder
          width="200px"
          height="100px"
          gradientColor="linear-gradient(to right, #667eea, #764ba2)"
          gradientWidth={2}
        >
          <div style={{ padding: '16px' }}>
            <strong>蓝色渐变</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>渐变边框容器</p>
          </div>
        </GradientBorder>

        <GradientBorder
          width="200px"
          height="100px"
          gradientColor="linear-gradient(to right, #f093fb, #f5576c)"
          gradientWidth={2}
        >
          <div style={{ padding: '16px' }}>
            <strong>粉色渐变</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>渐变边框容器</p>
          </div>
        </GradientBorder>
      </div>
    </div>
  );
}
