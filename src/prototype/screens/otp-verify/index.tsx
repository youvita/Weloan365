import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const BACK_ICON_URL = '/assets/icons/Back%20Icon.png';

const OtpVerifyScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [remaining, setRemaining] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;
  const isSample2 = variant === 'sample-2';
  const isSample3 = variant === 'sample-3';

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  // Auto-focus the first cell on mount so the user can start typing immediately
  // without a tap. Saves a step on the most-used path.
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setDigit = (i: number, value: string) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (clean.length === 0) {
      // User cleared this cell (e.g. backspace on a filled cell).
      setDigits((prev) => {
        const next = [...prev];
        next[i] = '';
        return next;
      });
      return;
    }
    if (clean.length === 1) {
      setDigits((prev) => {
        const next = [...prev];
        next[i] = clean;
        return next;
      });
      if (i < 5) inputsRef.current[i + 1]?.focus();
      return;
    }
    // Paste / multi-character entry: distribute across cells starting at i.
    // This is how users typically interact with OTP fields (paste from SMS).
    setDigits((prev) => {
      const next = [...prev];
      for (let j = 0; j < clean.length && i + j < 6; j++) {
        next[i + j] = clean[j];
      }
      return next;
    });
    const lastFilled = Math.min(i + clean.length - 1, 5);
    inputsRef.current[lastFilled]?.focus();
  };

  const onKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const code = digits.join('');
  const isFull = code.length === 6;

  // Auto-verify when the code is complete. Brief delay so the user sees the
  // last digit register and the Verify button enable before we navigate away.
  useEffect(() => {
    if (!isFull) return;
    const t = setTimeout(() => onNavigate?.(SCREEN_IDS.DASHBOARD), 400);
    return () => clearTimeout(t);
  }, [isFull, onNavigate]);

  const cellStyle = (filled: boolean): React.CSSProperties => {
    if (isSample2) {
      return {
        width: 36,
        height: 56,
        borderBottom: '2px solid #1A1A1A',
        background: 'transparent',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 700,
        color: '#1A1A1A',
        outline: 'none',
        border: 'none',
        borderRadius: 0,
        padding: 0,
      };
    }
    if (isSample3) {
      // Smaller than Sample 1 because Sample 3 wraps the row in a card,
      // which eats another 24px of horizontal space.
      return {
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: `2px solid ${filled ? ui.primary : `${ui.primary}33`}`,
        background: ui.cardBg,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        color: '#1A1A1A',
        outline: 'none',
        padding: 0,
      };
    }
    return {
      width: 44,
      height: 44,
      borderRadius: `${ui.radius.card}px`,
      border: `1px solid ${filled ? ui.primary : DESIGN_TOKENS.colors.border_light}`,
      background: ui.cardBg,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 700,
      color: '#1A1A1A',
      outline: 'none',
      padding: 0,
    };
  };

  const cells = digits.map((d, i) => (
    <input
      key={i}
      ref={(el) => {
        inputsRef.current[i] = el;
      }}
      value={d}
      onChange={(e) => setDigit(i, e.target.value)}
      onKeyDown={onKeyDown(i)}
      type="tel"
      inputMode="numeric"
      maxLength={1}
      placeholder={isSample2 && !d ? '—' : ''}
      style={cellStyle(Boolean(d))}
    />
  ));

  const cellsRow = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: isSample3 ? 0.75 : 1,
        mt: 2.5,
      }}
    >
      {cells}
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <IconButton size="small" onClick={() => onNavigate?.(SCREEN_IDS.LOGIN)} aria-label="back">
          <Box
            component="img"
            src={BACK_ICON_URL}
            alt="back"
            sx={{ width: 22, height: 22, objectFit: 'contain' }}
          />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, mt: 1 }}>
        <Typography
          sx={{
            fontSize: isSample3 ? 26 : isSample2 ? 22 : 24,
            fontWeight: isSample3 ? 800 : 700,
            color: '#1A1A1A',
            textAlign: isSample3 ? 'center' : 'left',
            letterSpacing: isSample2 ? -0.5 : 0,
            mb: 0.5,
          }}
        >
          Enter the code
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: DESIGN_TOKENS.colors.text_secondary,
            textAlign: isSample3 ? 'center' : 'left',
          }}
        >
          We sent a 6-digit code to +855 93 *** 333
        </Typography>

        {isSample3 ? (
          <Box
            sx={{
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card + 4}px`,
              p: 1.5,
              boxShadow: ui.cardShadow,
              mt: 2.5,
            }}
          >
            {cellsRow}
          </Box>
        ) : (
          cellsRow
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {remaining > 0 ? (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: isSample2 ? 700 : 500,
                letterSpacing: isSample2 ? 0.5 : 0,
                color: DESIGN_TOKENS.colors.text_secondary,
                textTransform: isSample2 ? 'uppercase' : 'none',
              }}
            >
              {isSample2 ? `Resend code in ${remaining}s` : `Resend code in ${remaining}s`}
            </Typography>
          ) : (
            <Typography
              onClick={() => setRemaining(30)}
              sx={{ fontSize: 12, fontWeight: 700, color: ui.primary, cursor: 'pointer' }}
            >
              Resend code
            </Typography>
          )}
          <Typography
            onClick={() => onNavigate?.(SCREEN_IDS.LOGIN)}
            sx={{ fontSize: 12, fontWeight: 600, color: ui.primary, cursor: 'pointer' }}
          >
            Wrong number?
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ px: 2, pb: 2.5 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!isFull}
          onClick={() => onNavigate?.(SCREEN_IDS.DASHBOARD)}
          sx={{
            backgroundColor: ui.primary,
            color: ui.onPrimary,
            height: isSample3 ? 56 : 52,
            borderRadius: isSample3 ? 999 : `${ui.radius.button}px`,
            fontSize: isSample3 ? 16 : 15,
            fontWeight: isSample3 ? 700 : 600,
            textTransform: 'none',
            boxShadow: isSample3 ? ui.cardShadow : 'none',
            '&:hover': { backgroundColor: ui.primaryHover },
            '&.Mui-disabled': { backgroundColor: `${ui.primary}66`, color: ui.onPrimary },
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export default OtpVerifyScreen;
