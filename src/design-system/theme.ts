import { createTheme } from '@mui/material/styles';
import { DESIGN_TOKENS } from './tokens';

export const theme = createTheme({
  palette: {
    primary: {
      main: DESIGN_TOKENS.colors.primary_blue,
      dark: DESIGN_TOKENS.colors.primary_blue_hover,
    },
    background: {
      default: DESIGN_TOKENS.colors.background_light,
      paper: DESIGN_TOKENS.colors.background_white,
    },
    text: {
      primary: DESIGN_TOKENS.colors.text_primary,
      secondary: DESIGN_TOKENS.colors.text_secondary,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});
