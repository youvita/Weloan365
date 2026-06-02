import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const BACK_ICON_URL = '/assets/icons/Back%20Icon.png';

const LoginScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const [phone, setPhone] = useState('093333333');
  const [pin, setPin] = useState('');
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;
  const isSample2 = variant === 'sample-2';
  const isSample3 = variant === 'sample-3';

  // Digits-only, max 6 chars. Replaces both the regex strip and the maxLength
  // attr — works on every browser even when the user pastes a longer string.
  const setPinSafe = (raw: string) => setPin(raw.replace(/[^0-9]/g, '').slice(0, 6));
  const canSubmit = phone.length > 0 && pin.length === 6;
  const submit = () => {
    if (canSubmit) onNavigate?.(SCREEN_IDS.OTP_VERIFY);
  };
  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
  };
  // Shared input props for every PIN field across the three sample layouts.
  const pinInputProps = {
    inputMode: 'numeric' as const,
    pattern: '[0-9]*',
    maxLength: 6,
    autoComplete: 'one-time-code' as const,
  };

  const header = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        pt: 2,
        pb: 1.5,
      }}
    >
      <IconButton size="small" onClick={() => onNavigate?.(SCREEN_IDS.ONBOARDING)} aria-label="back">
        <Box
          component="img"
          src={BACK_ICON_URL}
          alt="back"
          sx={{ width: 22, height: 22, objectFit: 'contain' }}
        />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          backgroundColor: '#FFFFFF',
          borderRadius: 999,
          px: 1,
          py: 0.5,
          boxShadow: '0px 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Box component="img" src="/assets/flags/en.svg" alt="EN" sx={{ width: 22, height: 16, borderRadius: 0.5 }} />
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>EN</Typography>
      </Box>
    </Box>
  );

  const forgotLink = (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: ui.primary, cursor: 'pointer' }}>
        Forgot PIN?
      </Typography>
    </Box>
  );

  const cta = (
    <Box sx={{ px: 2, pb: 2.5 }}>
      <Button
        fullWidth
        variant="contained"
        disabled={!canSubmit}
        onClick={submit}
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
        Sign in
      </Button>
      <Typography sx={{ textAlign: 'center', fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mt: 1.5 }}>
        New here?{' '}
        <Box
          component="span"
          onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
          sx={{ color: ui.primary, fontWeight: 700, cursor: 'pointer' }}
        >
          Create an account
        </Box>
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
      {header}
      <Box sx={{ px: 2 }}>
        <Typography
          sx={{
            fontSize: isSample3 ? 26 : isSample2 ? 22 : 24,
            fontWeight: isSample3 ? 800 : 700,
            color: '#1A1A1A',
            mb: 0.5,
            textAlign: isSample3 ? 'center' : 'left',
            letterSpacing: isSample2 ? -0.5 : 0,
          }}
        >
          Welcome back
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: DESIGN_TOKENS.colors.text_secondary,
            mb: 2.5,
            textAlign: isSample3 ? 'center' : 'left',
          }}
        >
          Sign in to continue your loan journey.
        </Typography>

        {/* Sample 2: underlined fields */}
        {isSample2 ? (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5, mb: 0.5 }}>
                PHONE NUMBER
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, borderBottom: '1px solid #1A1A1A' }}>
                <Box component="img" src="/assets/flags/kh.svg" alt="" sx={{ width: 22, height: 22, borderRadius: '50%' }} />
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>+855</Typography>
                <Box sx={{ width: 1, height: 18, backgroundColor: DESIGN_TOKENS.colors.border_light }} />
                <TextField
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 15, fontWeight: 600, color: '#1A1A1A', p: 0 },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5, mb: 0.5 }}>
                PIN
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 1, borderBottom: '1px solid #1A1A1A' }}>
                <TextField
                  fullWidth
                  value={pin}
                  onChange={(e) => setPinSafe(e.target.value)}
                  onKeyDown={submitOnEnter}
                  type="password"
                  placeholder="Enter your 6-digit PIN"
                  variant="standard"
                  inputProps={pinInputProps}
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 15, fontWeight: 600, color: '#1A1A1A', p: 0 },
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
                6 digits, never share this with anyone.
              </Typography>
            </Box>
            {forgotLink}
          </Box>
        ) : isSample3 ? (
          // Sample 3: pill rows in floating card
          <Box
            sx={{
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card + 4}px`,
              p: 2,
              boxShadow: ui.cardShadow,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.5,
                py: 1.25,
                mb: 1.25,
                backgroundColor: `${ui.primary}0D`,
                borderRadius: 999,
              }}
            >
              <Box component="img" src="/assets/flags/kh.svg" alt="" sx={{ width: 28, height: 28, borderRadius: '50%' }} />
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: ui.primary }}>+855</Typography>
              <Box sx={{ width: 1, height: 18, backgroundColor: `${ui.primary}33` }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 10, color: DESIGN_TOKENS.colors.text_secondary }}>Phone</Typography>
                <TextField
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 14, fontWeight: 700, color: '#1A1A1A', p: 0 },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.5,
                py: 1.25,
                backgroundColor: `${ui.primary}0D`,
                borderRadius: 999,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 10, color: DESIGN_TOKENS.colors.text_secondary }}>PIN</Typography>
                <TextField
                  fullWidth
                  value={pin}
                  onChange={(e) => setPinSafe(e.target.value)}
                  onKeyDown={submitOnEnter}
                  type="password"
                  placeholder="6 digits"
                  variant="standard"
                  inputProps={pinInputProps}
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 14, fontWeight: 700, color: '#1A1A1A', p: 0 },
                  }}
                />
              </Box>
            </Box>
            {forgotLink}
          </Box>
        ) : (
          // Sample 1 (default): card-based stacked fields
          <>
            <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, mb: 0.5 }}>
              Phone Number
            </Typography>
            <Box
              sx={{
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.25,
                py: 1.25,
                mb: 1.5,
                boxShadow: ui.cardShadow,
              }}
            >
              <Box component="img" src="/assets/flags/kh.svg" alt="" sx={{ width: 28, height: 28, borderRadius: '50%' }} />
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>+855</Typography>
              <Box sx={{ width: 1, height: 20, backgroundColor: DESIGN_TOKENS.colors.border_light }} />
              <TextField
                fullWidth
                sx={{ flex: 1, minWidth: 0 }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 15, fontWeight: 700, color: '#1A1A1A', p: 0 },
                }}
              />
            </Box>
            <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, mb: 0.5 }}>
              PIN
            </Typography>
            <Box
              sx={{
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                px: 1.5,
                py: 1.25,
                boxShadow: ui.cardShadow,
              }}
            >
              <TextField
                fullWidth
                value={pin}
                onChange={(e) => setPinSafe(e.target.value)}
                onKeyDown={submitOnEnter}
                type="password"
                placeholder="Enter your 6-digit PIN"
                variant="standard"
                inputProps={pinInputProps}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 15, fontWeight: 700, color: '#1A1A1A', p: 0 },
                }}
              />
            </Box>
            <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
              6 digits, never share this with anyone.
            </Typography>
            {forgotLink}
          </>
        )}
      </Box>

      <Box sx={{ flex: 1 }} />
      {cta}
    </Box>
  );
};

export default LoginScreen;
