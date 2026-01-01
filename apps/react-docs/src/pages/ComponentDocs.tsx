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
            ← Back to Home
          </Link>
          <h1>{displayName}</h1>
          <p className="component-description">Component documentation and examples</p>
        </div>
      </header>

      <main className="docs-main">
        <section className="docs-section">
          <h2>Usage</h2>
          <div className="code-block">
            <pre>
              <code>{`import { ${displayName} } from '@scxfe/react-ui';

function App() {
  return <${displayName}>Example</${displayName}>;
}`}</code>
            </pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>Examples</h2>
          <div className="demo-placeholder">
            <p>Demo content will be rendered here</p>
            <p className="note">Documentation system integration coming soon</p>
          </div>
        </section>

        <section className="docs-section">
          <h2>API</h2>
          <div className="api-placeholder">
            <p>Props and events documentation</p>
            <p className="note">API metadata will be extracted automatically</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ComponentDocs;
