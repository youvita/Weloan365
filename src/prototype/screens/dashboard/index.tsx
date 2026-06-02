import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Apps, Home as HomeIcon, Inventory2Outlined } from '@mui/icons-material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { ScreenComponentProps } from '../../types';

const QUICK_ACTIONS = [
  { label: 'Browse Loan', icon: '/assets/icons/ico_browse_loan.svg' },
  { label: 'Calculator', icon: '/assets/icons/ico_calculator.svg' },
  { label: 'Consult', icon: '/assets/icons/ico_consult.svg' },
];

const ACTIVITY: Array<{ title: string; amount: string; date: string; positive: boolean }> = [
  { title: 'Loan disbursement', amount: '+$2,000.00', date: '14 Mar 2026', positive: true },
  { title: 'Monthly payment', amount: '-$93.42', date: '14 Apr 2026', positive: false },
  { title: 'Monthly payment', amount: '-$93.42', date: '14 May 2026', positive: false },
];

const PROGRESS_RATIO = 3 / 24;

const DashboardScreen: React.FC<ScreenComponentProps> = () => {
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;
  const isSample2 = variant === 'sample-2';
  const isSample3 = variant === 'sample-3';

  const greeting = (
    <>
      <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, opacity: isSample3 ? 0.85 : 1, color: isSample3 ? ui.onPrimary : DESIGN_TOKENS.colors.text_tertiary }}>
        WELCOME BACK
      </Typography>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: isSample3 ? ui.onPrimary : '#1A1A1A', mt: 0.25 }}>
        Hi, Sopheak
      </Typography>
    </>
  );

  const avatar = (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: isSample3 ? ui.onPrimary : `${ui.primary}1A`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: ui.primary }}>S</Typography>
    </Box>
  );

  const notificationBell = (
    <IconButton size="small" aria-label="notifications">
      <Box
        component="img"
        src="/assets/icons/ico_notification.png"
        alt="notifications"
        sx={{ width: 24, height: 24, objectFit: 'contain', filter: isSample3 ? 'brightness(0) invert(1)' : 'none' }}
      />
    </IconButton>
  );

  const header = isSample3 ? (
    <Box sx={{ px: 2, pt: 2.5 }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${ui.primary} 0%, ${ui.primaryHover} 100%)`,
          borderRadius: `${ui.radius.card + 8}px`,
          p: 2.5,
          color: ui.onPrimary,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {notificationBell}
          {avatar}
        </Box>
        {greeting}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 2.5, pb: 1 }}>
      <Box>{greeting}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        {notificationBell}
        {avatar}
      </Box>
    </Box>
  );

  const progressBar = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <Box sx={{ flex: 1, height: 6, borderRadius: 999, backgroundColor: '#D0D3D7', overflow: 'hidden' }}>
        <Box
          sx={{
            width: `${PROGRESS_RATIO * 100}%`,
            height: '100%',
            borderRadius: 999,
            backgroundColor: ui.primary,
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary, whiteSpace: 'nowrap' }}>
        3 of 24
      </Typography>
    </Box>
  );

  const nextPaymentRow = (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.25 }}>
      <Box>
        <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>Next payment</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>$93.42</Typography>
        <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>due 14 Jun 2026</Typography>
      </Box>
      {isSample2 ? (
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: ui.primary, cursor: 'pointer' }}>Pay →</Typography>
      ) : (
        <Box
          sx={{
            backgroundColor: ui.primary,
            color: ui.onPrimary,
            borderRadius: 999,
            px: 1.5,
            py: 0.75,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Pay now
        </Box>
      )}
    </Box>
  );

  const activeLoanCard = (
    <Box sx={{ px: 2, mt: isSample3 ? 1.5 : 1.5 }}>
      <Box
        sx={{
          backgroundColor: ui.cardBg,
          borderRadius: `${ui.radius.card}px`,
          p: 2,
          boxShadow: isSample2 ? 'none' : ui.cardShadow,
          border: isSample2 ? `1px solid ${DESIGN_TOKENS.colors.border_light}` : 'none',
        }}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: DESIGN_TOKENS.colors.text_tertiary }}>
          ACTIVE LOAN
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', mt: 0.5 }}>Micro Loan</Typography>
        {progressBar}
        {nextPaymentRow}
      </Box>
    </Box>
  );

  const quickActions = (
    <Box sx={{ px: 2, mt: 2 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: DESIGN_TOKENS.colors.text_tertiary, mb: 1 }}>
        QUICK ACTIONS
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {QUICK_ACTIONS.map((a) => (
          <Box
            key={a.label}
            sx={{
              flex: 1,
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card}px`,
              py: 1.25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: isSample2 ? 'none' : ui.cardShadow,
              border: isSample2 ? `1px solid ${DESIGN_TOKENS.colors.border_light}` : 'none',
            }}
          >
            {isSample3 ? (
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
                <Box component="img" src={a.icon} alt="" sx={{ width: 20, height: 20 }} />
              </Box>
            ) : (
              <Box component="img" src={a.icon} alt="" sx={{ width: 22, height: 22 }} />
            )}
            <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#1A1A1A' }}>{a.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const activityList = (
    <Box sx={{ px: 2, mt: 2, mb: 8 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: DESIGN_TOKENS.colors.text_tertiary, mb: 1 }}>
        RECENT ACTIVITY
      </Typography>
      {isSample2 ? (
        <Box
          sx={{
            border: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
            borderRadius: `${ui.radius.card}px`,
            backgroundColor: ui.cardBg,
          }}
        >
          {ACTIVITY.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 1.5,
                py: 1.25,
                borderTop: i === 0 ? 'none' : `1px solid ${DESIGN_TOKENS.colors.border_light}`,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{row.title}</Typography>
                <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>{row.date}</Typography>
              </Box>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: row.positive ? '#2F6F3A' : '#1A1A1A' }}>
                {row.amount}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        ACTIVITY.map((row, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.25,
              borderTop: i === 0 ? 'none' : `1px solid ${DESIGN_TOKENS.colors.border_light}`,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{row.title}</Typography>
              <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>{row.date}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: row.positive ? '#2F6F3A' : '#1A1A1A' }}>
              {row.amount}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column', pb: '64px' }}>
      {header}
      {activeLoanCard}
      {quickActions}
      {activityList}

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

export default DashboardScreen;
