import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import ScreenPreviewPage from './pages/ScreenPreviewPage';
import DownloadsPage from './pages/DownloadsPage';
import SettingsPage from './pages/SettingsPage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/overview" replace />} />
    <Route path="/overview" element={<OverviewPage />} />
    <Route path="/screen/:id" element={<ScreenPreviewPage />} />
    <Route path="/downloads" element={<DownloadsPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/overview" replace />} />
  </Routes>
);

export default AppRoutes;
