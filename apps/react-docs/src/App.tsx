import { BrowserRouter as Router } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import AppRouter from './router';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import './index.css';

export interface SidebarSection {
  title: string;
  items: { label: string; href: string }[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'UI 组件',
    items: [
      { label: 'Card', href: '/components/card' },
      { label: 'Caption', href: '/components/caption' },
      { label: 'GradientBorder', href: '/components/gradient-border' },
    ],
  },
  {
    title: 'Hooks',
    items: [
      { label: 'useCounter', href: '/hooks/use-counter' },
      { label: 'useToggle', href: '/hooks/use-toggle' },
      { label: 'useLocalStorage', href: '/hooks/use-local-storage' },
    ],
  },
];

interface MainLayoutProps {
  children?: ReactNode;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

function MainLayout({ children, sidebarOpen, onSidebarClose }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar sections={sidebarSections} />
      <div className={`sidebar-drawer ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-drawer-header">
          <button className="sidebar-drawer-close" onClick={onSidebarClose} aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 6 M6 18l12-12" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarSections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <h3 className="sidebar-section-title">{section.title}</h3>
              <ul className="list-none m-0 p-0">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="sidebar-link" onClick={onSidebarClose}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      {sidebarOpen && <div className="sidebar-drawer-overlay" onClick={onSidebarClose} />}
      <main className="content">{children}</main>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar mobileMenuOpen={sidebarOpen} onMobileMenuToggle={setSidebarOpen} />
        <MainLayout sidebarOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)}>
          <AppRouter />
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
