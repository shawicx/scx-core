import { useParams, Link } from 'react-router-dom';
import './ComponentDocs.css';

function ComponentDocs() {
  const { componentName } = useParams();
  const name = componentName || 'Component';
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="component-docs">
      <header className="docs-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            ← 返回首页
          </Link>
          <h1>{displayName}</h1>
          <p className="component-description">组件文档和示例</p>
        </div>
      </header>

      <main className="docs-main">
        <section className="docs-section">
          <h2>使用方法</h2>
          <div className="code-block">
            <pre>
              <code>{`import { ${displayName} } from '@scxfe/react-ui';

function App() {
  return <${displayName}>示例</${displayName}>;
}`}</code>
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
          <div className="api-placeholder">
            <p>属性和事件文档</p>
            <p className="note">API 元数据将自动提取</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ComponentDocs;
