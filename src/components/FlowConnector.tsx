import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DESIGN_TOKENS } from '../design-system/tokens';

export interface FlowConnectorProps {
  label?: string;
  length?: number;
}

const FlowConnector: React.FC<FlowConnectorProps> = ({ label = 'Next', length = 80 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        minWidth: length,
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: DESIGN_TOKENS.colors.text_tertiary,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ position: 'relative', width: length, height: 24 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: length - 12 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            height: 2,
            transform: 'translateY(-50%)',
            backgroundColor: DESIGN_TOKENS.colors.primary_blue,
            borderRadius: 2,
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderLeft: `10px solid ${DESIGN_TOKENS.colors.primary_blue}`,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
          }}
        />
      </Box>
    </Box>
  );
};

export default FlowConnector;
