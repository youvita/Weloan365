import React from 'react';
import { Box, Typography } from '@mui/material';
import ScreenCard from '../../components/ScreenCard';
import FlowConnector from '../../components/FlowConnector';
import { SCREEN_FLOWS, getScreen } from '../../prototype/registry';
import { DESIGN_TOKENS } from '../../design-system/tokens';
import { useSettings } from '../providers/SettingsProvider';

const OverviewPage: React.FC = () => {
  const { selectedFlow } = useSettings();
  const activeFlow = React.useMemo(
    () => SCREEN_FLOWS.find((f) => f.flow === selectedFlow),
    [selectedFlow],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: DESIGN_TOKENS.colors.text_primary }}>
          Main App Overview
        </Typography>
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
          Pick a user flow in the left panel. The screens for that flow appear here in order. Click any screen to view its details and download the UX/UI spec.
        </Typography>
      </Box>

      {activeFlow && activeFlow.items.length > 0 ? (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: DESIGN_TOKENS.colors.text_primary }}>
              {activeFlow.flow}
            </Typography>
            <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.25 }}>
              {activeFlow.items.length} {activeFlow.items.length === 1 ? 'screen' : 'screens'}
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
            {activeFlow.items.map((screen, idx) => {
              // Only draw the connector when the `next` screen is in THIS flow —
              // cross-flow `next` references would otherwise produce a dangling arrow.
              const nextScreen = screen.next ? getScreen(screen.next) : undefined;
              const showConnector =
                nextScreen && activeFlow.items.some((s) => s.id === nextScreen.id);
              return (
                <React.Fragment key={screen.id}>
                  <ScreenCard screen={screen} index={idx} />
                  {showConnector && (
                    <Box sx={{ alignSelf: 'center', display: { xs: 'none', lg: 'flex' } }}>
                      <FlowConnector label={screen.flowLabel ?? 'Next'} />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary }}>
          No screens registered for this flow yet. Pick a different flow in the left panel, or add screens to this one.
        </Typography>
      )}
    </Box>
  );
};

export default OverviewPage;
