import { BrowserRouter as Router } from 'react-router-dom';
import type { ReactNode } from 'react';
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
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar sections={sidebarSections} />
      <main className="content">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
