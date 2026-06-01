export const DESIGN_TOKENS = {
  colors: {
    primary_blue: '#0052CC',
    primary_blue_hover: '#003DA8',
    primary_blue_active: '#002A7A',
    text_primary: '#1A1A1A',
    text_secondary: '#666666',
    text_tertiary: '#999999',
    text_disabled: '#CCCCCC',
    background_white: '#FFFFFF',
    background_light: '#F5F5F5',
    background_light_gray: '#F0F0F0',
    border_light: '#E0E0E0',
    border_light_gray: '#D0D0D0',
    brand_logo_orange: '#FFA500',
    error_red: '#DC3545',
    success_green: '#28A745',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    '3xl': 32,
    '4xl': 40,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadow: {
    sm: '0px 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0px 2px 6px rgba(0, 0, 0, 0.10)',
    lg: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
} as const;

export const SIDEBAR_WIDTH = 240;
export const DEVICE_FRAME = {
  width: 320,
  height: 640,
  radius: 32,
};
