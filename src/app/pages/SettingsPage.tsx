import React from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ArrowBack, Tune } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DESIGN_TOKENS } from '../../design-system/tokens';
import { useSettings } from '../providers/SettingsProvider';

const SettingsPage: React.FC = () => {
  const { devMode, setDevMode } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/overview"
          startIcon={<ArrowBack />}
          sx={{ color: DESIGN_TOKENS.colors.primary_blue, mb: 1 }}
        >
          Back to overview
        </Button>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Tune sx={{ color: DESIGN_TOKENS.colors.primary_blue }} />
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Settings</Typography>
        </Stack>
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
          Tune the prototype viewer and pick the UI direction you want to evaluate.
        </Typography>
      </Box>

      <SectionCard
        title="Developer mode"
        subtitle="Reveals metadata, specification markdown and the spec download on the UI tab — using your selected style."
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Show specification panel
            </Typography>
            <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary }}>
              Off keeps every preview clean. On reveals the spec & download on the UI tab.
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={devMode}
                onChange={(e) => setDevMode(e.target.checked)}
                inputProps={{ 'aria-label': 'Developer mode toggle' }}
              />
            }
            label={
              <Chip
                size="small"
                label={devMode ? 'ON' : 'OFF'}
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 700,
                  ml: 0.5,
                  backgroundColor: devMode
                    ? 'rgba(40, 167, 69, 0.12)'
                    : 'rgba(0,0,0,0.06)',
                  color: devMode
                    ? DESIGN_TOKENS.colors.success_green
                    : DESIGN_TOKENS.colors.text_secondary,
                }}
              />
            }
            sx={{ ml: 0 }}
          />
        </Stack>
      </SectionCard>

      <Alert
        severity="info"
        sx={{
          mt: 1,
          borderRadius: 1.5,
          backgroundColor: 'rgba(0, 82, 204, 0.06)',
          color: DESIGN_TOKENS.colors.text_primary,
          '& .MuiAlert-icon': { color: DESIGN_TOKENS.colors.primary_blue },
        }}
      >
        Settings are stored locally in this browser only — nothing is shared with the server.
      </Alert>
    </motion.div>
  );
};

const SectionCard: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <Box
    sx={{
      mb: 3,
      backgroundColor: DESIGN_TOKENS.colors.background_white,
      border: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
      borderRadius: 2,
      p: { xs: 2, sm: 3 },
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 700, mb: subtitle ? 0.5 : 2 }}>{title}</Typography>
    {subtitle && (
      <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mb: 2 }}>
        {subtitle}
      </Typography>
    )}
    {children}
  </Box>
);

export default SettingsPage;
