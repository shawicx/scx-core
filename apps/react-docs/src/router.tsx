import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ComponentDocs from './pages/ComponentDocs';
import PreviewExample from './pages/PreviewExample';

// React UI Components
import CardPage from './pages/components/Card.page';
import CaptionPage from './pages/components/Caption.page';
import GradientBorderPage from './pages/components/GradientBorder.page';

// React Hooks
import UseCounterPage from './pages/hooks/useCounter.page';
import UseTogglePage from './pages/hooks/useToggle.page';
import UseLocalStoragePage from './pages/hooks/useLocalStorage.page';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview-example" element={<PreviewExample />} />

      {/* React UI Components */}
      <Route path="/components/card" element={<CardPage />} />
      <Route path="/components/caption" element={<CaptionPage />} />
      <Route path="/components/gradient-border" element={<GradientBorderPage />} />

      {/* React Hooks */}
      <Route path="/hooks/use-counter" element={<UseCounterPage />} />
      <Route path="/hooks/use-toggle" element={<UseTogglePage />} />
      <Route path="/hooks/use-local-storage" element={<UseLocalStoragePage />} />

      {/* Fallback for dynamic routes */}
      <Route path="/components/:componentName" element={<ComponentDocs />} />
      <Route path="/hooks/:componentName" element={<ComponentDocs />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
