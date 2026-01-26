import { Link, useLocation } from 'react-router-dom';
import type { SidebarProps } from '@scxfe/docs-design-system';

export function Sidebar({ sections }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.title} className="sidebar-section">
            <h3 className="sidebar-section-title">{section.title}</h3>
            <ul className="list-none m-0 p-0">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`sidebar-link ${location.pathname === item.href ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
