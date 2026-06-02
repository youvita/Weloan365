import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobilePreview from './MobilePreview';
import { ScreenConfig } from '../prototype/types';
import { DESIGN_TOKENS } from '../design-system/tokens';
import { StyleOverrideProvider } from '../app/providers/SettingsProvider';
import { DEFAULT_UI_STYLE } from '../design-system/variants';

export interface ScreenCardProps {
  screen: ScreenConfig;
  index?: number;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ screen, index = 0 }) => {
  const navigate = useNavigate();
  const Component = screen.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      style={{ flexShrink: 0 }}
    >
      <Box
        role="button"
        tabIndex={0}
        aria-label={`Open ${screen.title}`}
        onClick={() => navigate(`/screen/${screen.id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/screen/${screen.id}`);
          }
        }}
        sx={{
          cursor: 'pointer',
          outline: 'none',
          '&:focus-visible': {
            boxShadow: `0 0 0 3px ${DESIGN_TOKENS.colors.primary_blue}33`,
            borderRadius: 4,
          },
        }}
      >
        <Box sx={{ mb: 1.5, px: 0.5 }}>
          <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_tertiary, fontWeight: 600 }}>
            {String(index + 1).padStart(2, '0')} · {screen.flow}
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: DESIGN_TOKENS.colors.text_primary }}>
            {screen.title}
          </Typography>
        </Box>

        <StyleOverrideProvider styleId={DEFAULT_UI_STYLE}>
          <MobilePreview interactive={false}>
            <Component />
          </MobilePreview>
        </StyleOverrideProvider>

        <Typography
          sx={{
            mt: 1.5,
            fontSize: 12,
            color: DESIGN_TOKENS.colors.text_secondary,
            textAlign: 'center',
          }}
        >
          {screen.subtitle}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default ScreenCard;
