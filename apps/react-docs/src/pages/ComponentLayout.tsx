import { Link } from 'react-router-dom';
import './ComponentLayout.css';

interface ComponentLayoutProps {
  title: string;
  description?: string;
  category?: string;
  children: React.ReactNode;
}

function ComponentLayout({ title, description, category, children }: ComponentLayoutProps) {
  return (
    <div className="component-layout">
      <header className="layout-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            ← 返回首页
          </Link>
          <h1>{title}</h1>
          {category && <p className="component-category">{category}</p>}
          {description && <p className="component-description">{description}</p>}
        </div>
      </header>

      <main className="layout-main">{children}</main>
    </div>
  );
}

export default ComponentLayout;
