import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ComponentDocs from './pages/ComponentDocs';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components/:componentName" element={<ComponentDocs />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
