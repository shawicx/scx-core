import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { registry } from '../lib/registry';
import './ComponentDocs.css';

/**
 * 将 kebab-case 转换为 PascalCase
 * 例如: a-map -> AMap, button -> Button
 */
function kebabToPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function ComponentDocs() {
  const { componentName } = useParams();
  const name = componentName || 'Component';
  const pascalName = kebabToPascalCase(name);
  const displayName = pascalName;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [componentData, setComponentData] = useState<any>(null);
  const [componentMeta, setComponentMeta] = useState<any>({
    name: '',
    props: [],
    events: [],
    slots: [],
  });

  useEffect(() => {
    const loadComponentData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if registry has components, if not, wait a bit more
        let attempts = 0;
        while (registry.getComponents().length === 0 && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          attempts++;
        }

        // Get component from registry using PascalCase name
        const component = registry.getComponent(pascalName);
        if (!component) {
          setError(`Component "${pascalName}" is not registered in the docs system.`);
          setLoading(false);
          return;
        }

        setComponentData(component.config);

        // Get component meta
        const meta = await registry.getComponentMeta(pascalName);
        setComponentMeta(meta);
      } catch (err) {
        console.error('Failed to load component documentation:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (pascalName) {
      loadComponentData();
    } else {
      setError('No component specified');
      setLoading(false);
    }
  }, [pascalName]);

  if (loading) {
    return (
      <div className="component-docs">
        <div className="loading">
          <div className="spinner"></div>
          <p>正在加载组件文档...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="component-docs">
        <div className="error">
          <h2>未找到组件</h2>
          <p>{error}</p>
          <Link to="/" className="back-link">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const importCode = `import { ${displayName} } from '@scxfe/react-ui';`;

  return (
    <div className="component-docs">
      <header className="docs-header">
        <div className="header-content">
          {componentData?.category && (
            <p className="component-category">{componentData.category}</p>
          )}
          <h1>{displayName} 组件</h1>
        </div>
      </header>

      <main className="docs-main">
        <section className="docs-section">
          <h2>使用方法</h2>
          <div className="code-block">
            <div className="code-header">
              <span>typescript</span>
            </div>
            <pre>
              <code>{importCode}</code>
            </pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>示例</h2>
          <div className="demo-placeholder">
            <p>演示内容将在此处渲染</p>
            <p className="note">文档系统集成即将推出</p>
          </div>
        </section>

        <section className="docs-section">
          <h2>API</h2>

          {/* Props */}
          {componentMeta.props && componentMeta.props.length > 0 && (
            <div className="api-subsection">
              <h3>属性</h3>
              <div className="table-container">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>属性名</th>
                      <th>类型</th>
                      <th>默认值</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentMeta.props.map((prop: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <code>{prop.name}</code>
                        </td>
                        <td>
                          <code>{prop.type.raw || prop.type.name}</code>
                        </td>
                        <td>
                          <code>{prop.default || '-'}</code>
                        </td>
                        <td>{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events */}
          {componentMeta.events && componentMeta.events.length > 0 && (
            <div className="api-subsection">
              <h3>事件</h3>
              <div className="table-container">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>事件名</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentMeta.events.map((event: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <code>{event.name}</code>
                        </td>
                        <td>{event.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Slots */}
          {componentMeta.slots && componentMeta.slots.length > 0 && (
            <div className="api-subsection">
              <h3>插槽</h3>
              <div className="table-container">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th>插槽名</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {componentMeta.slots.map((slot: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <code>{slot.name}</code>
                        </td>
                        <td>{slot.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ComponentDocs;
