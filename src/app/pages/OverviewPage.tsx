import React from 'react';
import { Box, Typography } from '@mui/material';
import ScreenCard from '../../components/ScreenCard';
import FlowConnector from '../../components/FlowConnector';
import { SCREENS, getScreen } from '../../prototype/registry';
import { DESIGN_TOKENS } from '../../design-system/tokens';

const OverviewPage: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: DESIGN_TOKENS.colors.text_primary }}>
          Main App Overview
        </Typography>
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
          All prototype screens together. Click any screen to view its details and download the UX/UI spec.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          overflowX: 'auto',
          pb: 4,
          pr: 4,
          flexWrap: { xs: 'wrap', lg: 'nowrap' },
        }}
      >
        {SCREENS.map((screen, idx) => {
          const nextScreen = screen.next ? getScreen(screen.next) : undefined;
          return (
            <React.Fragment key={screen.id}>
              <ScreenCard screen={screen} index={idx} />
              {nextScreen && (
                <Box sx={{ alignSelf: 'center', display: { xs: 'none', lg: 'flex' } }}>
                  <FlowConnector label={screen.flowLabel ?? 'Next'} />
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default OverviewPage;
