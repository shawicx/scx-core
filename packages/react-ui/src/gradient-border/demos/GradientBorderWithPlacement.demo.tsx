import { GradientBorder, GradientBorderPlacement } from '../gradient-border';

export default function GradientBorderWithPlacementDemo() {
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
          不同位置
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示渐变边框在不同位置的显示效果。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <GradientBorder
          width="100%"
          height="80px"
          gradientColor="linear-gradient(to right, #667eea, #764ba2)"
          gradientWidth={3}
          placement={GradientBorderPlacement.TOP_BOTTOM}
        >
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <strong>上下渐变边框 (TOP_BOTTOM)</strong>
          </div>
        </GradientBorder>

        <GradientBorder
          width="100%"
          height="80px"
          gradientColor="linear-gradient(to right, #f093fb, #f5576c)"
          gradientWidth={3}
          placement={GradientBorderPlacement.LEFT_RIGHT}
        >
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <strong>左右渐变边框 (LEFT_RIGHT)</strong>
          </div>
        </GradientBorder>
      </div>
    </div>
  );
}
