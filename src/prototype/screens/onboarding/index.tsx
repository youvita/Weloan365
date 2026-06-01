import React, { useEffect, useState } from 'react';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const ONBOARDING_SLIDES = [
  { src: '/assets/banners/1.png', label: 'Apply in minutes' },
  { src: '/assets/banners/2.png', label: 'Funds within 24 hours' },
  { src: '/assets/illustrations/illustration_empty.png', label: 'No paperwork hassle' },
];

const OnboardingScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, []);

  // --- Modern: full-bleed editorial hero ---
  if (variant === 'modern') {
    return (
      <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 280, overflow: 'hidden' }}>
          <Box
            component="img"
            src={ONBOARDING_SLIDES[currentSlide].src}
            alt={ONBOARDING_SLIDES[currentSlide].label}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              pt: 2.5,
              pb: 1.5,
            }}
          >
            <Box
              component="img"
              src="/assets/logos/header_logo2.png"
              alt="NongHyup"
              sx={{ height: 22, width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                borderRadius: 0.5,
                px: 1,
                py: 0.5,
              }}
            >
              <Box component="img" src="/assets/flags/en.svg" alt="EN" sx={{ width: 18, height: 14 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>EN</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              right: 16,
              display: 'flex',
              gap: 0.5,
            }}
          >
            {[0, 1, 2].map((dot) => (
              <Box
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                sx={{
                  flex: 1,
                  height: 2,
                  backgroundColor: dot === currentSlide ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ px: 2.5, mt: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              color: ui.primary,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Get started
          </Typography>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: -0.5 }}>
            Fast loan approvals.
          </Typography>
          <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mt: 1, mb: 2.5 }}>
            Apply for a loan in minutes and receive funds within 24 hours. No paperwork hassle.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
              sx={{
                flex: 1,
                backgroundColor: ui.primary,
                color: ui.onPrimary,
                height: 48,
                borderRadius: `${ui.radius.button}px`,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': { backgroundColor: ui.primaryHover },
              }}
            >
              Mobile sign-in
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                color: '#1A1A1A',
                borderColor: DESIGN_TOKENS.colors.border_light,
                height: 48,
                borderRadius: `${ui.radius.button}px`,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              QR sign-in
            </Button>
          </Box>

          <Typography sx={{ textAlign: 'center', fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mt: 2.5 }}>
            New here?{' '}
            <MuiLink
              onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
              sx={{
                color: ui.primary,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Create an account
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    );
  }

  // --- Playful: rounded sheet with colored hero disc ---
  if (variant === 'playful') {
    return (
      <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            pt: 2.5,
            pb: 1.5,
          }}
        >
          <Box
            component="img"
            src="/assets/logos/header_logo2.png"
            alt="NongHyup"
            sx={{ height: 24, width: 'auto' }}
          />
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box
            sx={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              backgroundColor: `${ui.primary}1F`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.5,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: ui.cardShadow,
              }}
            >
              <Box
                component="img"
                src={ONBOARDING_SLIDES[currentSlide].src}
                alt={ONBOARDING_SLIDES[currentSlide].label}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 2 }}>
          {[0, 1, 2].map((dot) => (
            <Box
              key={dot}
              onClick={() => setCurrentSlide(dot)}
              sx={{
                width: dot === currentSlide ? 22 : 7,
                height: 7,
                borderRadius: 999,
                backgroundColor: dot === currentSlide ? ui.primary : `${ui.primary}40`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt: 2.5,
            backgroundColor: ui.cardBg,
            borderTopLeftRadius: `${ui.radius.sheet}px`,
            borderTopRightRadius: `${ui.radius.sheet}px`,
            px: 2.5,
            pt: 3,
            pb: 2,
            flex: 1,
            boxShadow: '0px -8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', textAlign: 'center', mb: 1 }}>
            Fast loan approvals
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: DESIGN_TOKENS.colors.text_secondary,
              textAlign: 'center',
              mb: 2.5,
              maxWidth: 280,
              mx: 'auto',
            }}
          >
            Apply in minutes, get funded within 24 hours. No paperwork hassle.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
            startIcon={
              <Box
                component="img"
                src="/assets/icons/ico_device.svg"
                alt=""
                sx={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }}
              />
            }
            sx={{
              backgroundColor: ui.primary,
              color: ui.onPrimary,
              height: 54,
              borderRadius: 999,
              mb: 1.25,
              fontSize: 15,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: ui.cardShadow,
              '&:hover': { backgroundColor: ui.primaryHover },
            }}
          >
            Sign in with Mobile Number
          </Button>

          <Button
            fullWidth
            variant="text"
            startIcon={
              <Box component="img" src="/assets/icons/ico_qrcode.svg" alt="" sx={{ width: 18, height: 18 }} />
            }
            sx={{
              color: '#1A1A1A',
              height: 48,
              borderRadius: 999,
              mb: 1,
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Sign in with QR
          </Button>

          <Typography sx={{ textAlign: 'center', fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary, mt: 1 }}>
            New here?{' '}
            <MuiLink
              onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
              sx={{
                color: ui.primary,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Create an account
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    );
  }

  // --- Classic (default) — original layout ---
  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          pt: 2.5,
          pb: 1.5,
        }}
      >
        <Box
          component="img"
          src="/assets/logos/header_logo2.png"
          alt="NongHyup Finance (Cambodia) Plc"
          sx={{ height: 24, width: 'auto' }}
        />
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

      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            backgroundColor: ui.cardBg,
            borderRadius: `${ui.radius.card}px`,
            height: 180,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: ui.cardShadow,
          }}
        >
          <Box
            component="img"
            src={ONBOARDING_SLIDES[currentSlide].src}
            alt={ONBOARDING_SLIDES[currentSlide].label}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1.5 }}>
          {[0, 1, 2].map((dot) => (
            <Box
              key={dot}
              onClick={() => setCurrentSlide(dot)}
              sx={{
                width: dot === currentSlide ? 16 : 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: dot === currentSlide ? '#1A1A1A' : '#D0D3D7',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ px: 2, mt: 3 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', mb: 1 }}>
          Fast loan approvals
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: DESIGN_TOKENS.colors.text_secondary,
            textAlign: 'center',
            mb: 3,
            maxWidth: 280,
            mx: 'auto',
          }}
        >
          Apply for a loan in minutes and receive funds within 24 hours. No paperwork hassle.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
          startIcon={
            <Box
              component="img"
              src="/assets/icons/ico_device.svg"
              alt=""
              sx={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }}
            />
          }
          sx={{
            backgroundColor: ui.primary,
            color: ui.onPrimary,
            height: 48,
            borderRadius: `${ui.radius.button}px`,
            mb: 1.25,
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { backgroundColor: ui.primaryHover },
          }}
        >
          Sign in with Mobile Number
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box component="img" src="/assets/icons/ico_qrcode.svg" alt="" sx={{ width: 18, height: 18 }} />
          }
          sx={{
            backgroundColor: ui.cardBg,
            color: '#1A1A1A',
            height: 48,
            borderRadius: `${ui.radius.button}px`,
            border: '1px solid transparent',
            mb: 2,
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: ui.cardShadow,
            '&:hover': { backgroundColor: '#F9F9F9', border: '1px solid transparent' },
          }}
        >
          Sign in with QR
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1, mb: 1.5 }}>
          <Box sx={{ flex: 1, height: 1, backgroundColor: '#D0D3D7' }} />
          <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_tertiary }}>Or</Typography>
          <Box sx={{ flex: 1, height: 1, backgroundColor: '#D0D3D7' }} />
        </Box>

        <Typography sx={{ textAlign: 'center', fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary }}>
          New here?{' '}
          <MuiLink
            onClick={() => onNavigate?.(SCREEN_IDS.CREATE_ACCOUNT)}
            sx={{
              color: ui.primary,
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Create an account
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default OnboardingScreen;
