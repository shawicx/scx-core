import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ComponentDocs from './pages/ComponentDocs';
import PreviewExample from './pages/PreviewExample';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview-example" element={<PreviewExample />} />

      <Route path="/components/:componentName" element={<ComponentDocs />} />
      <Route path="/hooks/:componentName" element={<ComponentDocs />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
