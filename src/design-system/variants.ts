import { DESIGN_TOKENS } from './tokens';

export type UiStyleId = 'sample-1' | 'sample-2' | 'sample-3';

export interface UiStyleTokens {
  id: UiStyleId;
  name: string;
  primary: string;
  primaryHover: string;
  onPrimary: string;
  mobileBg: string;
  cardBg: string;
  cardShadow: string;
  radius: { card: number; button: number; sheet: number };
  frame: {
    color: string;
    radius: number;
    padding: number;
    accentBar?: string;
  };
  swatches: string[];
}

const BASE_STYLE_TOKENS: Omit<UiStyleTokens, 'id' | 'name'> = {
  primary: DESIGN_TOKENS.colors.primary_blue,
  primaryHover: DESIGN_TOKENS.colors.primary_blue_hover,
  onPrimary: '#FFFFFF',
  mobileBg: '#F2F3F5',
  cardBg: '#FFFFFF',
  cardShadow: '0px 1px 3px rgba(0,0,0,0.05)',
  radius: { card: 12, button: 12, sheet: 16 },
  frame: { color: '#111111', radius: 32, padding: 10 },
  swatches: [DESIGN_TOKENS.colors.primary_blue, '#FFFFFF', '#F2F3F5'],
};

export const UI_STYLES: Record<UiStyleId, UiStyleTokens> = {
  'sample-1': { id: 'sample-1', name: 'Sample 1', ...BASE_STYLE_TOKENS },
  'sample-2': { id: 'sample-2', name: 'Sample 2', ...BASE_STYLE_TOKENS },
  'sample-3': { id: 'sample-3', name: 'Sample 3', ...BASE_STYLE_TOKENS },
};

export const UI_STYLE_IDS: UiStyleId[] = ['sample-1', 'sample-2', 'sample-3'];

export const DEFAULT_UI_STYLE: UiStyleId = 'sample-1';

export const getUiStyle = (id: string | null | undefined): UiStyleTokens =>
  (id && UI_STYLES[id as UiStyleId]) || UI_STYLES[DEFAULT_UI_STYLE];
