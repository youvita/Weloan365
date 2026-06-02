import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Check, Storefront } from '@mui/icons-material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const BACK_ICON_URL = '/assets/icons/Back%20Icon.png';
const ARROW_FORWARD_URL = '/assets/icons/ico_arrow_forward.svg';

const BREAKDOWN_ROWS: Array<{ label: string; value: string; emphasis?: boolean }> = [
  { label: 'Loan amount', value: '$2,000.00' },
  { label: 'Term', value: '24 months' },
  { label: 'Interest rate', value: '1.2% / month' },
  { label: 'Total interest', value: '$242.05' },
  { label: 'Total payable', value: '$2,242.05', emphasis: true },
];

const LoanSummaryScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;
  const [agreed, setAgreed] = useState(true);

  const back = (
    <IconButton size="small" onClick={() => onNavigate?.(SCREEN_IDS.DASHBOARD)} aria-label="back">
      <Box
        component="img"
        src={BACK_ICON_URL}
        alt="back"
        sx={{ width: 22, height: 22, objectFit: 'contain' }}
      />
    </IconButton>
  );

  const checkbox = (
    <Box
      onClick={() => setAgreed((p) => !p)}
      role="checkbox"
      aria-checked={agreed}
      tabIndex={0}
      sx={{
        width: 20,
        height: 20,
        borderRadius: 1,
        border: agreed ? 'none' : `1px solid #C7CACE`,
        backgroundColor: agreed ? ui.primary : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        mt: 0.25,
      }}
    >
      {agreed && <Check sx={{ fontSize: 14, color: ui.onPrimary }} />}
    </Box>
  );

  const agreementText = (
    <Typography sx={{ fontSize: 12, color: '#1A1A1A', lineHeight: 1.4 }}>
      I have read and agree to the{' '}
      <Box component="span" sx={{ color: ui.primary, fontWeight: 600 }}>
        loan agreement
      </Box>
      , the{' '}
      <Box component="span" sx={{ color: ui.primary, fontWeight: 600 }}>
        privacy policy
      </Box>
      , and the{' '}
      <Box component="span" sx={{ color: ui.primary, fontWeight: 600 }}>
        disclosure statement
      </Box>
      .
    </Typography>
  );

  // ---------- Sample 2 — list-led, editorial ----------
  if (variant === 'sample-2') {
    return (
      <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ px: 2, pt: 2 }}>
          {back}
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', mt: 0.5, letterSpacing: -0.3 }}>
            Review your loan
          </Typography>
          <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
            Confirm the terms before we submit your application
          </Typography>

          {/* Product inline */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2.5 }}>
            <Storefront sx={{ fontSize: 14, color: ui.primary }} />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>Micro Loan</Typography>
          </Box>

          {/* Summary block — no card */}
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5, mt: 0.5 }}>
            MONTHLY PAYMENT
          </Typography>
          <Typography sx={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1, mt: 0.25 }}>
            $93.42
          </Typography>
          <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
            / month for 24 months
          </Typography>

          {/* Breakdown — underlined table */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 3 }}>
            <Box
              component="img"
              src="/assets/icons/ico_calculator.svg"
              alt=""
              sx={{ width: 16, height: 16, filter: 'brightness(0)' }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', letterSpacing: 0.5 }}>
              BREAKDOWN
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            {BREAKDOWN_ROWS.map((row, i) => (
              <Box
                key={row.label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1.25,
                  borderBottom: row.emphasis ? 'none' : `1px solid ${DESIGN_TOKENS.colors.border_light}`,
                  borderTop: row.emphasis ? `2px solid #1A1A1A` : 'none',
                  mt: row.emphasis ? 0.5 : 0,
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: row.emphasis ? 700 : 500, color: row.emphasis ? '#1A1A1A' : DESIGN_TOKENS.colors.text_secondary }}>
                  {row.label}
                </Typography>
                <Typography sx={{ fontSize: row.emphasis ? 14 : 13, fontWeight: row.emphasis ? 800 : 700, color: '#1A1A1A' }}>
                  {row.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Agreement — flat */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.25,
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
            }}
          >
            {checkbox}
            {agreementText}
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            disabled={!agreed}
            sx={{
              backgroundColor: ui.primary,
              color: ui.onPrimary,
              height: 52,
              borderRadius: `${ui.radius.button}px`,
              fontSize: 15,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { backgroundColor: ui.primaryHover },
              '&.Mui-disabled': { backgroundColor: `${ui.primary}66`, color: ui.onPrimary },
            }}
          >
            Confirm &amp; continue
          </Button>
          <Box sx={{ textAlign: 'center', mt: 1.25 }}>
            <Typography component="span" sx={{ fontSize: 13, fontWeight: 600, color: ui.primary, cursor: 'pointer' }}>
              Edit terms
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // ---------- Sample 3 — hero-led, action-driven ----------
  if (variant === 'sample-3') {
    return (
      <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ px: 2, pt: 2 }}>
          {back}
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', mt: 0.5 }}>
            Review your loan
          </Typography>
          <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
            Confirm the terms before we submit your application
          </Typography>
        </Box>

        {/* Hero summary card */}
        <Box sx={{ px: 2, mt: 2 }}>
          <Box
            sx={{
              position: 'relative',
              background: `linear-gradient(135deg, ${ui.primary} 0%, ${ui.primaryHover} 100%)`,
              borderRadius: `${ui.radius.card + 8}px`,
              p: 2.5,
              color: ui.onPrimary,
              boxShadow: ui.cardShadow,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 14,
                right: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: ui.onPrimary,
                color: ui.primary,
                borderRadius: 999,
                px: 1,
                py: 0.5,
              }}
            >
              <Storefront sx={{ fontSize: 14, color: ui.primary }} />
              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Micro Loan</Typography>
            </Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, opacity: 0.85 }}>
              MONTHLY PAYMENT
            </Typography>
            <Typography sx={{ fontSize: 36, fontWeight: 800, lineHeight: 1.05, mt: 0.5 }}>
              $93.42
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.9, mt: 0.5 }}>
              / month for 24 months
            </Typography>
          </Box>
        </Box>

        {/* Breakdown card with tint emphasis */}
        <Box sx={{ px: 2, mt: 1.75 }}>
          <Box
            sx={{
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card}px`,
              p: 1.75,
              boxShadow: ui.cardShadow,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', mb: 0.5 }}>
              Breakdown
            </Typography>
            {BREAKDOWN_ROWS.map((row) => (
              <Box
                key={row.label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 0.75,
                  px: row.emphasis ? 1.25 : 0,
                  mt: row.emphasis ? 0.75 : 0,
                  backgroundColor: row.emphasis ? `${ui.primary}1A` : 'transparent',
                  borderRadius: row.emphasis ? 1 : 0,
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: row.emphasis ? 700 : 500, color: row.emphasis ? '#1A1A1A' : DESIGN_TOKENS.colors.text_secondary }}>
                  {row.label}
                </Typography>
                <Typography sx={{ fontSize: row.emphasis ? 14 : 13, fontWeight: row.emphasis ? 800 : 700, color: '#1A1A1A' }}>
                  {row.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Agreement outlined card */}
        <Box sx={{ px: 2, mt: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.25,
              p: 1.5,
              border: `1px solid ${ui.primary}33`,
              borderRadius: `${ui.radius.card}px`,
            }}
          >
            {checkbox}
            {agreementText}
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            disabled={!agreed}
            endIcon={
              <Box
                component="img"
                src={ARROW_FORWARD_URL}
                alt=""
                sx={{
                  width: 18,
                  height: 18,
                  filter: 'brightness(0) invert(1)',
                  opacity: agreed ? 1 : 0.6,
                }}
              />
            }
            sx={{
              backgroundColor: ui.primary,
              color: ui.onPrimary,
              height: 56,
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: ui.cardShadow,
              '&:hover': { backgroundColor: ui.primaryHover },
              '&.Mui-disabled': { backgroundColor: `${ui.primary}66`, color: ui.onPrimary },
            }}
          >
            Confirm &amp; continue
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.25 }}>
            <Box
              sx={{
                px: 1.25,
                py: 0.75,
                borderRadius: 999,
                backgroundColor: `${ui.primary}1A`,
                color: ui.primary,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Edit terms
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // ---------- Sample 1 (default) — card-led baseline ----------
  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, pt: 2 }}>
        {back}
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', mt: 0.5 }}>
          Review your loan
        </Typography>
        <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
          Confirm the terms before we submit your application
        </Typography>
      </Box>

      {/* Summary card */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Box
          sx={{
            backgroundColor: ui.cardBg,
            borderRadius: `${ui.radius.card}px`,
            p: 2,
            boxShadow: ui.cardShadow,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5 }}>
              MONTHLY PAYMENT
            </Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.05, mt: 0.5 }}>
              $93.42
            </Typography>
            <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_secondary, mt: 0.5 }}>
              / month for 24 months
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: `${ui.primary}1A`,
              color: ui.primary,
              borderRadius: 999,
              px: 1,
              py: 0.5,
              flexShrink: 0,
            }}
          >
            <Storefront sx={{ fontSize: 14, color: ui.primary }} />
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Micro Loan</Typography>
          </Box>
        </Box>
      </Box>

      {/* Breakdown card */}
      <Box sx={{ px: 2, mt: 1.5 }}>
        <Box
          sx={{
            backgroundColor: ui.cardBg,
            borderRadius: `${ui.radius.card}px`,
            p: 2,
            boxShadow: ui.cardShadow,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', mb: 0.75 }}>
            Breakdown
          </Typography>
          {BREAKDOWN_ROWS.map((row) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0.75,
                borderTop: row.emphasis ? `1px solid ${DESIGN_TOKENS.colors.border_light}` : 'none',
                mt: row.emphasis ? 0.5 : 0,
                pt: row.emphasis ? 1.25 : 0.75,
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: row.emphasis ? 700 : 500, color: row.emphasis ? '#1A1A1A' : DESIGN_TOKENS.colors.text_secondary }}>
                {row.label}
              </Typography>
              <Typography sx={{ fontSize: row.emphasis ? 14 : 13, fontWeight: row.emphasis ? 800 : 700, color: '#1A1A1A' }}>
                {row.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Agreement row */}
      <Box sx={{ px: 2, mt: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
          {checkbox}
          {agreementText}
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!agreed}
          endIcon={
            <Box
              component="img"
              src={ARROW_FORWARD_URL}
              alt=""
              sx={{
                width: 18,
                height: 18,
                filter: 'brightness(0) invert(1)',
                opacity: agreed ? 1 : 0.6,
              }}
            />
          }
          sx={{
            backgroundColor: ui.primary,
            color: ui.onPrimary,
            height: 52,
            borderRadius: `${ui.radius.button}px`,
            fontSize: 15,
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { backgroundColor: ui.primaryHover },
            '&.Mui-disabled': { backgroundColor: `${ui.primary}66`, color: ui.onPrimary },
          }}
        >
          Confirm &amp; continue
        </Button>
        <Box sx={{ textAlign: 'center', mt: 1.25 }}>
          <Typography component="span" sx={{ fontSize: 13, fontWeight: 600, color: ui.primary, cursor: 'pointer' }}>
            Edit terms
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoanSummaryScreen;
