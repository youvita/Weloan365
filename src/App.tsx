import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Header from './app/layout/Header';
import Sidebar from './app/layout/Sidebar';
import AppRoutes from './app/routes';
import { theme } from './design-system/theme';
import { DESIGN_TOKENS, SIDEBAR_WIDTH } from './design-system/tokens';
import { SettingsProvider } from './app/providers/SettingsProvider';

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: DESIGN_TOKENS.colors.background_light }}>
          <Header onToggleSidebar={() => setMobileOpen((v) => !v)} showMenuButton />
          <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: '64px',
              pl: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
              minHeight: '100vh',
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <AppRoutes />
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
