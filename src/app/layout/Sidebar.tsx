import React from 'react';
import {
  Box,
  Drawer,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SCREEN_FLOWS, USER_FLOWS } from '../../prototype/registry';
import { DESIGN_TOKENS, SIDEBAR_WIDTH } from '../../design-system/tokens';
import { useSettings } from '../providers/SettingsProvider';

export interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();
  const { id: activeId } = useParams();
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith('/settings');
  const { selectedFlow, setSelectedFlow } = useSettings();

  // Only show flow options that actually have at least one registered screen.
  const populatedFlowNames = React.useMemo(() => {
    const populated = new Set(SCREEN_FLOWS.map((f) => f.flow));
    return USER_FLOWS.filter((name) => populated.has(name));
  }, []);

  // Resolve the active flow object so we can iterate its screens.
  const activeFlow = React.useMemo(
    () => SCREEN_FLOWS.find((f) => f.flow === selectedFlow),
    [selectedFlow],
  );

  // Changing the flow while viewing a specific screen would otherwise leave the
  // user looking at a screen that's no longer in the selected flow's list.
  // Bounce them to /overview so they immediately see the new flow's screens.
  const handleFlowChange = React.useCallback(
    (next: string) => {
      setSelectedFlow(next);
      if (pathname.startsWith('/screen/')) navigate('/overview');
    },
    [navigate, pathname, setSelectedFlow],
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${DESIGN_TOKENS.colors.border_light}` }}>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: DESIGN_TOKENS.colors.text_tertiary, mb: 1, letterSpacing: 0.5 }}>
          USER FLOW
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={selectedFlow}
            onChange={(e) => handleFlowChange(e.target.value)}
            sx={{ fontSize: 14 }}
          >
            {populatedFlowNames.map((f) => (
              <MenuItem key={f} value={f} sx={{ fontSize: 14 }}>
                {f}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', pt: 1 }}>
        <List dense disablePadding>
          {(activeFlow?.items ?? []).map((s) => {
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
              </ListItemButton>
            );
          })}
          {!activeFlow?.items.length && (
            <Typography sx={{ px: 2, py: 1.5, fontSize: 12, color: DESIGN_TOKENS.colors.text_tertiary }}>
              No screens registered for this flow yet.
            </Typography>
          )}
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
