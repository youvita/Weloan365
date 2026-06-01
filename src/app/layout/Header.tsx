import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { GridView, ViewAgenda, MenuRounded, SettingsOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { DESIGN_TOKENS, SIDEBAR_WIDTH } from '../../design-system/tokens';

export interface HeaderProps {
  onToggleSidebar?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, showMenuButton = false }) => {
  const { pathname } = useLocation();
  const isOverview = pathname.startsWith('/overview');
  const isSettings = pathname.startsWith('/settings');

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: DESIGN_TOKENS.colors.background_white,
        color: DESIGN_TOKENS.colors.text_primary,
        borderBottom: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 64, gap: 2 }}>
        {showMenuButton && (
          <IconButton
            edge="start"
            aria-label="open navigation"
            onClick={onToggleSidebar}
            sx={{ display: { md: 'none' } }}
          >
            <MenuRounded />
          </IconButton>
        )}

        <Box sx={{ width: { md: SIDEBAR_WIDTH - 16 }, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              backgroundColor: DESIGN_TOKENS.colors.primary_blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            W
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>WeLoan365</Typography>
          <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_tertiary, ml: 0.5 }}>
            Prototype Viewer
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Main Overview">
            <IconButton
              component={Link}
              to="/overview"
              aria-label="overview"
              sx={{
                color: isOverview
                  ? DESIGN_TOKENS.colors.primary_blue
                  : DESIGN_TOKENS.colors.text_secondary,
              }}
            >
              <GridView />
            </IconButton>
          </Tooltip>
          <Tooltip title="Single Screen View">
            <IconButton
              component={Link}
              to="/screen/home"
              aria-label="single screen view"
              sx={{
                color: !isOverview && !isSettings
                  ? DESIGN_TOKENS.colors.primary_blue
                  : DESIGN_TOKENS.colors.text_secondary,
              }}
            >
              <ViewAgenda />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              component={Link}
              to="/settings"
              aria-label="settings"
              sx={{
                color: isSettings
                  ? DESIGN_TOKENS.colors.primary_blue
                  : DESIGN_TOKENS.colors.text_secondary,
              }}
            >
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
