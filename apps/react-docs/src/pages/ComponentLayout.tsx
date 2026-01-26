import type { ReactNode } from 'react';

interface ComponentLayoutProps {
  title: string;
  description?: string;
  category?: string;
  children: ReactNode;
}

function ComponentLayout({ title, description, category, children }: ComponentLayoutProps) {
  return (
    <div className="component-layout">
      <header className="layout-header">
        <div className="header-content">
          {category && <p className="component-category">{category}</p>}
          <h1>{title}</h1>
          {description && <p className="component-description">{description}</p>}
        </div>
      </header>

      <main className="layout-main">{children}</main>
    </div>
  );
}

export default ComponentLayout;
