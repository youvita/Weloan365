import React, { useState } from 'react';
import {
  Box,
  Drawer,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  Chip,
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SCREEN_GROUPS, USER_GROUPS } from '../../prototype/registry';
import { DESIGN_TOKENS, SIDEBAR_WIDTH } from '../../design-system/tokens';

export interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();
  const { id: activeId } = useParams();
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith('/settings');
  const [userGroup, setUserGroup] = useState(USER_GROUPS[0]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${DESIGN_TOKENS.colors.border_light}` }}>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: DESIGN_TOKENS.colors.text_tertiary, mb: 1, letterSpacing: 0.5 }}>
          USER GROUP
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
            sx={{ fontSize: 14 }}
          >
            {USER_GROUPS.map((g) => (
              <MenuItem key={g} value={g} sx={{ fontSize: 14 }}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List dense disablePadding>
          {SCREEN_GROUPS.map(({ group, items }) => (
            <Box key={group}>
              <ListSubheader
                sx={{
                  backgroundColor: 'transparent',
                  color: DESIGN_TOKENS.colors.text_tertiary,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  lineHeight: '32px',
                  px: 2,
                  pt: 1.5,
                }}
              >
                {group.toUpperCase()}
              </ListSubheader>
              {items.map((s) => {
                const selected = activeId === s.id;
                return (
                  <ListItemButton
                    key={s.id}
                    selected={selected}
                    onClick={() => navigate(`/screen/${s.id}`)}
                    sx={{
                      mx: 1,
                      borderRadius: 1.5,
                      mb: 0.25,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 82, 204, 0.08)',
                        '&:hover': { backgroundColor: 'rgba(0, 82, 204, 0.12)' },
                      },
                    }}
                  >
                    <ListItemText
                      primary={s.title}
                      secondary={s.subtitle}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: selected ? 600 : 500,
                        color: selected
                          ? DESIGN_TOKENS.colors.primary_blue
                          : DESIGN_TOKENS.colors.text_primary,
                      }}
                      secondaryTypographyProps={{ fontSize: 11 }}
                    />
                    <Chip
                      label={s.status}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 600,
                        backgroundColor:
                          s.status === 'ready'
                            ? 'rgba(40, 167, 69, 0.12)'
                            : 'rgba(255, 165, 0, 0.12)',
                        color:
                          s.status === 'ready'
                            ? DESIGN_TOKENS.colors.success_green
                            : DESIGN_TOKENS.colors.brand_logo_orange,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ borderTop: `1px solid ${DESIGN_TOKENS.colors.border_light}` }}>
        <List dense disablePadding sx={{ py: 0.5 }}>
          <ListItemButton
            selected={isSettings}
            onClick={() => navigate('/settings')}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 1.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 82, 204, 0.08)',
                '&:hover': { backgroundColor: 'rgba(0, 82, 204, 0.12)' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <SettingsOutlined
                sx={{
                  fontSize: 20,
                  color: isSettings
                    ? DESIGN_TOKENS.colors.primary_blue
                    : DESIGN_TOKENS.colors.text_secondary,
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isSettings ? 600 : 500,
                color: isSettings
                  ? DESIGN_TOKENS.colors.primary_blue
                  : DESIGN_TOKENS.colors.text_primary,
              }}
            />
          </ListItemButton>
        </List>
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_tertiary }}>
            v1.0 · WeLoan365 prototype
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const drawerSx = {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: SIDEBAR_WIDTH,
      boxSizing: 'border-box',
      borderRight: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
      backgroundColor: DESIGN_TOKENS.colors.background_white,
      top: 64,
      height: 'calc(100% - 64px)',
    },
  } as const;

  return (
    <>
      <Drawer variant="permanent" sx={{ ...drawerSx, display: { xs: 'none', md: 'block' } }} open>
        <SidebarContent />
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ ...drawerSx, display: { xs: 'block', md: 'none' } }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
