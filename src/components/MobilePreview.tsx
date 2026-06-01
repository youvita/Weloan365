import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { DEVICE_FRAME, DESIGN_TOKENS } from '../design-system/tokens';
import { useUiTokens } from '../app/providers/SettingsProvider';

export interface MobilePreviewProps {
  children: ReactNode;
  width?: number;
  height?: number;
  interactive?: boolean;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({
  children,
  width = DEVICE_FRAME.width,
  height = DEVICE_FRAME.height,
  interactive = true,
}) => {
  const tokens = useUiTokens();
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: `${tokens.frame.radius}px`,
        backgroundColor: tokens.frame.color,
        padding: `${tokens.frame.padding}px`,
        boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.2)',
        flexShrink: 0,
        transition: 'background-color 0.25s ease, border-radius 0.25s ease, padding 0.25s ease',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: `${Math.max(tokens.frame.radius - 8, 8)}px`,
          overflow: 'hidden',
          backgroundColor: DESIGN_TOKENS.colors.background_white,
          position: 'relative',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      >
        {tokens.frame.accentBar && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: tokens.frame.accentBar,
              zIndex: 2,
            }}
          />
        )}
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MobilePreview;
