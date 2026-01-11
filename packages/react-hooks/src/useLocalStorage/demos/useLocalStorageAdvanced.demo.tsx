import { useLocalStorage } from '../../useLocalStorage';

export default function UseLocalStorageAdvancedDemo() {
  const [person, setPerson] = useLocalStorage('react-demo-person', {
    name: '张三',
    age: 25,
    city: '北京',
  });

  const [tags, setTags] = useLocalStorage('react-demo-tags', ['Vue', 'React', 'TypeScript']);

  const customSerializer = {
    read: (value: string) => {
      try {
        const parsed = JSON.parse(value);
        return parsed.timestamp;
      } catch {
        return Date.now();
      }
    },
    write: (value: number) => {
      return JSON.stringify({
        timestamp: value,
        updatedAt: new Date().toISOString(),
      });
    },
  };

  const [timestamp, setTimestamp] = useLocalStorage('react-demo-timestamp', Date.now(), {
    serializer: customSerializer,
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
          展示 useLocalStorage hook 的序列化功能和自定义序列化器。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#333' }}>
            存储对象
          </h4>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ minWidth: '40px', fontSize: '14px', color: '#666' }}>姓名:</label>
              <input
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
                type="text"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ minWidth: '40px', fontSize: '14px', color: '#666' }}>年龄:</label>
              <input
                value={person.age}
                onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })}
                type="number"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ minWidth: '40px', fontSize: '14px', color: '#666' }}>城市:</label>
              <input
                value={person.city}
                onChange={(e) => setPerson({ ...person, city: e.target.value })}
                type="text"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>对象会自动序列化为 JSON</div>
        </div>

        <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#333' }}>
            存储数组
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  background: '#e6f7ff',
                  border: '1px solid #91d5ff',
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: '#1890ff',
                }}
              >
                {tag}
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  style={{
                    marginLeft: '4px',
                    padding: '0 4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#1890ff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => setTags([...tags, 'New Tag'])}
              style={{
                padding: '4px 8px',
                border: '1px dashed #d9d9d9',
                borderRadius: '4px',
                background: '#fff',
                color: '#666',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              + 添加标签
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>数组会自动序列化为 JSON</div>
        </div>

        <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#333' }}>
            自定义序列化器
          </h4>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}
          >
            <div
              style={{
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#333',
                textAlign: 'center',
              }}
            >
              {new Date(timestamp).toLocaleString('zh-CN')}
            </div>
            <button
              onClick={() => setTimestamp(Date.now())}
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
              更新时间戳
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>使用自定义的序列化器处理时间戳</div>
        </div>
      </div>
    </div>
  );
}
