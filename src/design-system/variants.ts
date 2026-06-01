import { DESIGN_TOKENS } from './tokens';

export type UiStyleId = 'classic' | 'modern' | 'playful';

export interface UiStyleTokens {
  id: UiStyleId;
  name: string;
  tagline: string;
  description: string;
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

export const UI_STYLES: Record<UiStyleId, UiStyleTokens> = {
  classic: {
    id: 'classic',
    name: 'Sample 1',
    tagline: 'Trusted banking blue',
    description:
      'Professional, conservative look with NongHyup blue. Clean cards on a neutral background — best for users who expect a traditional bank feel.',
    primary: DESIGN_TOKENS.colors.primary_blue,
    primaryHover: DESIGN_TOKENS.colors.primary_blue_hover,
    onPrimary: '#FFFFFF',
    mobileBg: '#F2F3F5',
    cardBg: '#FFFFFF',
    cardShadow: '0px 1px 3px rgba(0,0,0,0.05)',
    radius: { card: 12, button: 12, sheet: 16 },
    frame: { color: '#111111', radius: 32, padding: 10 },
    swatches: ['#0052CC', '#FFFFFF', '#F2F3F5'],
  },
  modern: {
    id: 'modern',
    name: 'Sample 2',
    tagline: 'Sleek minimalist',
    description:
      'Dark charcoal accents with sharp corners and flat surfaces. High-contrast and editorial — designed for users who prefer a minimal fintech feel.',
    primary: '#111827',
    primaryHover: '#1F2937',
    onPrimary: '#FFFFFF',
    mobileBg: '#FFFFFF',
    cardBg: '#F4F5F7',
    cardShadow: 'none',
    radius: { card: 4, button: 6, sheet: 8 },
    frame: { color: '#0B0B0B', radius: 26, padding: 8, accentBar: '#111827' },
    swatches: ['#111827', '#FFFFFF', '#F4F5F7'],
  },
  playful: {
    id: 'playful',
    name: 'Sample 3',
    tagline: 'Warm and friendly',
    description:
      'Vibrant orange accent with deeply rounded corners and soft shadows. Inviting and approachable — geared toward first-time borrowers and younger users.',
    primary: '#F97316',
    primaryHover: '#EA580C',
    onPrimary: '#FFFFFF',
    mobileBg: '#FFF7ED',
    cardBg: '#FFFFFF',
    cardShadow: '0px 6px 18px rgba(249, 115, 22, 0.18)',
    radius: { card: 22, button: 22, sheet: 28 },
    frame: { color: '#3F2A14', radius: 40, padding: 12, accentBar: '#F97316' },
    swatches: ['#F97316', '#FFF7ED', '#FFFFFF'],
  },
};

export const UI_STYLE_IDS: UiStyleId[] = ['classic', 'modern', 'playful'];

export const DEFAULT_UI_STYLE: UiStyleId = 'classic';

export const getUiStyle = (id: string | null | undefined): UiStyleTokens =>
  (id && UI_STYLES[id as UiStyleId]) || UI_STYLES[DEFAULT_UI_STYLE];
