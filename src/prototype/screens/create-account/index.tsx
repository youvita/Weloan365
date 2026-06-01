import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { DESIGN_TOKENS } from '../../../design-system/tokens';
import { useSettings } from '../../../app/providers/SettingsProvider';
import { SCREEN_IDS, ScreenComponentProps } from '../../types';

const BACK_ICON_URL = '/assets/icons/Back%20Icon.png';

const CreateAccountScreen: React.FC<ScreenComponentProps> = ({ onNavigate }) => {
  const [country, setCountry] = useState('Cambodia');
  const [phone, setPhone] = useState('093333333');
  const { uiTokens: ui, uiStyleId } = useSettings();
  const variant = uiStyleId;

  const isSample2 = variant === 'sample-2';
  const isSample3 = variant === 'sample-3';

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: ui.mobileBg, display: 'flex', flexDirection: 'column' }}>
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

      {/* Progress indicator — bar (sample-1) / numbered dots (sample-2) / pill (sample-3) */}
      {isSample2 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, mt: 0.5, mb: 2.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5 }}>
            STEP 1 OF 3
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
            {[true, false, false].map((active, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: 2,
                  backgroundColor: active ? '#1A1A1A' : DESIGN_TOKENS.colors.border_light,
                }}
              />
            ))}
          </Box>
        </Box>
      ) : isSample3 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, px: 2, mt: 0.5, mb: 2.5 }}>
          {[1, 2, 3].map((n) => {
            const active = n === 1;
            return (
              <Box
                key={n}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: active ? ui.primary : `${ui.primary}1F`,
                  color: active ? ui.onPrimary : ui.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {n}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 0.75, px: 2, mt: 0.5, mb: 2 }}>
          {[true, false, false].map((active, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                backgroundColor: active ? ui.primary : '#D0D3D7',
              }}
            />
          ))}
        </Box>
      )}

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
          Create your account
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: DESIGN_TOKENS.colors.text_secondary,
            mb: 2.5,
            textAlign: isSample3 ? 'center' : 'left',
          }}
        >
          We'll send a verification code to your number.
        </Typography>

        {/* Sample 2: minimal underline inputs in a single stacked column */}
        {isSample2 ? (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5, mb: 0.5 }}>
                COUNTRY
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 1, borderBottom: '1px solid #1A1A1A' }}>
                <Box
                  component="img"
                  src="/assets/flags/kh.svg"
                  alt="Cambodia"
                  sx={{ width: 22, height: 22, borderRadius: '50%' }}
                />
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disableUnderline
                    IconComponent={() => null}
                    sx={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', '& .MuiSelect-select': { p: 0 } }}
                  >
                    <MenuItem value="Cambodia">Cambodia</MenuItem>
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
                <KeyboardArrowDown sx={{ fontSize: 20, color: '#1A1A1A' }} />
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5, mb: 0.5 }}>
                PHONE NUMBER
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1, borderBottom: '1px solid #1A1A1A' }}>
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
          </Box>
        ) : isSample3 ? (
          // Sample 3: pill-shaped inputs in floating card
          <Box
            sx={{
              backgroundColor: ui.cardBg,
              borderRadius: `${ui.radius.card + 4}px`,
              p: 2,
              boxShadow: ui.cardShadow,
              mb: 3,
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
              <Box
                component="img"
                src="/assets/flags/kh.svg"
                alt="Cambodia"
                sx={{ width: 28, height: 28, borderRadius: '50%' }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 10, color: DESIGN_TOKENS.colors.text_secondary }}>Country</Typography>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disableUnderline
                    IconComponent={() => null}
                    sx={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', '& .MuiSelect-select': { p: 0 } }}
                  >
                    <MenuItem value="Cambodia">Cambodia</MenuItem>
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <KeyboardArrowDown sx={{ fontSize: 20, color: ui.primary }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 1.25,
                backgroundColor: `${ui.primary}0D`,
                borderRadius: 999,
              }}
            >
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
          </Box>
        ) : (
          // Sample 1 — default
          <>
            <Box
              sx={{
                backgroundColor: ui.cardBg,
                borderRadius: `${ui.radius.card}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.25,
                py: 1,
                mb: 1.25,
                boxShadow: ui.cardShadow,
              }}
            >
              <Box
                component="img"
                src="/assets/flags/kh.svg"
                alt="Cambodia"
                sx={{ width: 32, height: 32, borderRadius: '50%' }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>Country</Typography>
                <FormControl variant="standard" fullWidth>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disableUnderline
                    IconComponent={() => null}
                    sx={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', '& .MuiSelect-select': { p: 0 } }}
                  >
                    <MenuItem value="Cambodia">Cambodia</MenuItem>
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <KeyboardArrowDown sx={{ fontSize: 22, color: '#6F7479' }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1.25, mb: 3 }}>
              <Box
                sx={{
                  backgroundColor: ui.cardBg,
                  borderRadius: `${ui.radius.card}px`,
                  px: 1.5,
                  py: 1,
                  width: 86,
                  boxShadow: ui.cardShadow,
                }}
              >
                <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>
                  Code <Box component="span" sx={{ color: '#E00025' }}>*</Box>
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>+855</Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: ui.cardBg,
                  borderRadius: `${ui.radius.card}px`,
                  px: 1.5,
                  py: 1,
                  boxShadow: ui.cardShadow,
                }}
              >
                <Typography sx={{ fontSize: 11, color: DESIGN_TOKENS.colors.text_secondary }}>
                  Phone Number <Box component="span" sx={{ color: '#E00025' }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
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
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ px: 2, pb: 2.5 }}>
        <Button
          fullWidth
          variant="contained"
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
          }}
        >
          {isSample3 ? 'Send my code →' : 'Send code'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAccountScreen;
