import React from 'react';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import {
  Apps,
  ArrowForward,
  Calculate,
  Home as HomeIcon,
  Inventory2Outlined,
  PhoneInTalk,
  Storefront,
} from '@mui/icons-material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const PRODUCTS = [
  {
    label: 'Micro Loan',
    size: 'Up to $100 – $3,000',
    term: '≤ 48 mo',
    rate: '1.2%',
    recommended: true,
    gradient: 'linear-gradient(135deg, #6FA86B 0%, #2F6F3A 100%)',
  },
  {
    label: 'Small Business Loan',
    size: 'Up to $30,000',
    term: '≤ 96 mo',
    rate: '1.2%',
    recommended: false,
    gradient: 'linear-gradient(135deg, #C9A36B 0%, #6B4423 100%)',
  },
];

const HomeScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;

  return (
    <Box
      sx={{
        minHeight: '100%',
        backgroundColor: ui.mobileBg,
        display: 'flex',
        flexDirection: 'column',
        pb: '64px',
      }}
    >
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" aria-label="messages">
            <Badge
              badgeContent={2}
              color="error"
              overlap="circular"
              sx={{ '& .MuiBadge-badge': { fontSize: 9, height: 16, minWidth: 16 } }}
            >
              <Box
                component="img"
                src="/assets/icons/Ico_message.png"
                alt="messages"
                sx={{ width: 22, height: 22, objectFit: 'contain' }}
              />
            </Badge>
          </IconButton>
          <IconButton size="small" aria-label="notifications">
            <Box
              component="img"
              src="/assets/icons/ico_notification.png"
              alt="notifications"
              sx={{ width: 24, height: 24, objectFit: 'contain' }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Quick Sign Up — variant-aware hero */}
      {variant === 'playful' ? (
        <Box sx={{ px: 2 }}>
          <Box
            onClick={() => onNavigate?.(SCREEN_IDS.ONBOARDING)}
            sx={{
              background: `linear-gradient(135deg, ${ui.primary} 0%, ${ui.primaryHover} 100%)`,
              borderRadius: `${ui.radius.card + 4}px`,
              p: 2,
              color: ui.onPrimary,
              cursor: 'pointer',
              boxShadow: ui.cardShadow,
            }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 0.5 }}>
              NEW HERE?
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, mt: 0.5 }}>
              Apply in 2 minutes
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.9, mt: 0.5 }}>
              Sign up, scan ID, get a decision.
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.5,
                py: 0.75,
                backgroundColor: ui.onPrimary,
                color: ui.primary,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Start now <ArrowForward sx={{ fontSize: 14 }} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ px: 2 }}>
          <Box
            onClick={() => onNavigate?.(SCREEN_IDS.ONBOARDING)}
            sx={{
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card}px`,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              boxShadow: ui.cardShadow,
              border: variant === 'modern' ? `1px solid ${DESIGN_TOKENS.colors.border_light}` : 'none',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: `${Math.max(ui.radius.card - 4, 6)}px`,
                backgroundColor: variant === 'modern' ? '#F4F5F7' : `${ui.primary}1A`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Box component="img" src="/assets/icons/ico_id_card.svg" alt="" sx={{ width: 24, height: 24 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>
                Quick Sign Up
              </Typography>
              <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.25 }}>
                Sign up to apply loan faster
              </Typography>
            </Box>
            {variant === 'modern' ? (
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: ui.primary, pr: 0.5 }}>
                Sign up →
              </Typography>
            ) : (
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: `${Math.max(ui.radius.button - 4, 6)}px`,
                  backgroundColor: ui.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowForward sx={{ fontSize: 18, color: ui.onPrimary }} />
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Action tiles */}
      {variant === 'playful' ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            px: 2,
            mt: 1.5,
          }}
        >
          {[
            { icon: <Inventory2Outlined sx={{ fontSize: 24, color: ui.primary }} />, label: 'Browse Loan' },
            { icon: <Calculate sx={{ fontSize: 24, color: ui.primary }} />, label: 'Calculator' },
            { icon: <PhoneInTalk sx={{ fontSize: 24, color: ui.primary }} />, label: 'Consult' },
          ].map((t) => (
            <Box
              key={t.label}
              sx={{
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                py: 1.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                boxShadow: ui.cardShadow,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: `${ui.primary}1A`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {t.icon}
              </Box>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#1A1A1A' }}>{t.label}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, px: 2, mt: 1.25 }}>
          {[
            { icon: <Inventory2Outlined sx={{ fontSize: 22, color: '#1A1A1A' }} />, label: 'Browse Loan' },
            { icon: <Calculate sx={{ fontSize: 22, color: '#1A1A1A' }} />, label: 'Calculator' },
            { icon: <PhoneInTalk sx={{ fontSize: 22, color: '#1A1A1A' }} />, label: 'Consult' },
          ].map((t) => (
            <Box
              key={t.label}
              sx={{
                flex: 1,
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                py: 1.25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                boxShadow: ui.cardShadow,
                border: variant === 'modern' ? `1px solid ${DESIGN_TOKENS.colors.border_light}` : 'none',
              }}
            >
              {t.icon}
              <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#1A1A1A' }}>{t.label}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', px: 2, mt: 2.25 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: DESIGN_TOKENS.colors.text_tertiary,
            letterSpacing: 0.5,
          }}
        >
          POPULAR LOAN PRODUCTS
        </Typography>
        <Typography
          component="a"
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: ui.primary,
            cursor: 'pointer',
          }}
        >
          See all
        </Typography>
      </Box>

      {/* Products — carousel (classic) / list (modern) / hero (playful) */}
      {variant === 'modern' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2, mt: 1 }}>
          {PRODUCTS.map((p) => (
            <Box
              key={p.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: ui.cardBg,
                border: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
                borderRadius: `${ui.radius.card}px`,
                px: 1.5,
                py: 1.25,
                gap: 1.5,
              }}
            >
              <Storefront sx={{ fontSize: 22, color: ui.primary }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{p.label}</Typography>
                  {p.recommended && (
                    <Box
                      sx={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        px: 0.75,
                        py: 0.1,
                        color: ui.primary,
                        border: `1px solid ${ui.primary}`,
                      }}
                    >
                      RECOMMENDED
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.25 }}>
                  {p.size} · {p.term}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', letterSpacing: -0.5 }}>
                {p.rate}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : variant === 'playful' ? (
        <Box sx={{ px: 2, mt: 1 }}>
          {(() => {
            const p = PRODUCTS[0];
            return (
              <Box
                sx={{
                  backgroundColor: ui.cardBg,
                  borderRadius: `${ui.radius.card}px`,
                  overflow: 'hidden',
                  boxShadow: ui.cardShadow,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 140,
                    background: p.gradient,
                    color: '#FFFFFF',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  {p.recommended && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: ui.primary,
                        color: ui.onPrimary,
                        fontSize: 10,
                        fontWeight: 700,
                        px: 1,
                        py: 0.25,
                        borderRadius: 999,
                      }}
                    >
                      Recommended
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                      <Typography sx={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{p.label}</Typography>
                      <Typography sx={{ fontSize: 11, opacity: 0.9, mt: 0.5 }}>{p.size}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5 }}>RATE</Typography>
                      <Typography sx={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{p.rate}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1.25,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary }}>
                    Term · {p.term}
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      backgroundColor: ui.primary,
                      color: ui.onPrimary,
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    Apply →
                  </Box>
                </Box>
              </Box>
            );
          })()}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', px: 2, mt: 1, pb: 0.5 }}>
          {PRODUCTS.map((p) => (
            <Box
              key={p.label}
              sx={{
                flex: '0 0 78%',
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                overflow: 'hidden',
                boxShadow: ui.cardShadow,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 1 }}>
                <Storefront sx={{ fontSize: 18, color: '#1A1A1A' }} />
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{p.label}</Typography>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  height: 130,
                  background: p.gradient,
                  color: '#FFFFFF',
                  p: 1.25,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                {p.recommended && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      color: '#FFFFFF',
                      fontSize: 10,
                      fontWeight: 600,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 0.5,
                    }}
                  >
                    Recommended
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography sx={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5 }}>LOAN SIZE</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5 }}>{p.size}</Typography>
                    <Typography sx={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5 }}>TERM</Typography>
                    <Typography sx={{ fontSize: 11, fontWeight: 600 }}>{p.term}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5 }}>INTEREST RATE</Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{p.rate}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: DESIGN_TOKENS.colors.text_tertiary,
          letterSpacing: 0.5,
          px: 2,
          mt: 2.25,
          mb: 1,
        }}
      >
        NEWS &amp; PROMOTIONS
      </Typography>

      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            height: 110,
            backgroundColor: ui.cardBg,
            borderRadius: `${ui.radius.card}px`,
            overflow: 'hidden',
            boxShadow: ui.cardShadow,
          }}
        >
          <Box
            component="img"
            src="/assets/banners/1.png"
            alt="Promotion banner"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
          {[true, false, false].map((active, i) => (
            <Box
              key={i}
              sx={{
                width: active ? 16 : 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: active ? '#1A1A1A' : '#D0D3D7',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: '#FFFFFF',
          borderTop: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {[
          { icon: <HomeIcon sx={{ fontSize: 22 }} />, label: 'Home', active: true },
          { icon: <Inventory2Outlined sx={{ fontSize: 22 }} />, label: 'Products', active: false },
          { icon: <Apps sx={{ fontSize: 22 }} />, label: 'More', active: false },
        ].map((nav) => (
          <Box
            key={nav.label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.25,
              color: nav.active ? ui.primary : '#6F7479',
            }}
          >
            {nav.icon}
            <Typography sx={{ fontSize: 10, fontWeight: nav.active ? 600 : 500 }}>{nav.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomeScreen;
