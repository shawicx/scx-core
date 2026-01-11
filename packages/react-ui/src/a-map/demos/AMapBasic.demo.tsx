import { AMap } from '../a-map';

export default function AMapBasicDemo() {
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
          基础地图
        </h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
          展示高德地图组件的基本用法。
        </p>
      </div>

      <div style={{ marginBottom: '12px', fontSize: '14px', color: '#999' }}>
        注意：需要提供有效的 API Key 才能显示地图。
      </div>

      <AMap container="amap-basic-demo" apiKey="YOUR_API_KEY" width="100%" height="400px" />
    </div>
  );
}
