import { ComponentType } from 'react';
import { UiStyleId } from '../design-system/variants';

// Stable, URL-safe identifier for a prototype screen.
// Adding a screen requires adding the literal here — every consumer is then
// compile-time-checked. Used in the URL (/screen/:id), spec filenames, the
// dev-mode panel, and localStorage keys.
export type ScreenId =
  | 'home'
  | 'onboarding'
  | 'create-account'
  | 'loan-summary'
  | 'login'
  | 'otp-verify'
  | 'dashboard';

export const SCREEN_IDS = {
  HOME: 'home',
  ONBOARDING: 'onboarding',
  CREATE_ACCOUNT: 'create-account',
  LOAN_SUMMARY: 'loan-summary',
  LOGIN: 'login',
  OTP_VERIFY: 'otp-verify',
  DASHBOARD: 'dashboard',
} as const satisfies Record<string, ScreenId>;

export interface ScreenComponentProps {
  onNavigate?: (screenId: ScreenId) => void;
}

export interface ScreenAsset {
  filename: string;
  url: string;
  category: 'icons' | 'illustrations' | 'logos' | 'flags' | 'banners';
}

export interface ScreenConfig {
  id: ScreenId;
  title: string;
  subtitle: string;
  flow: string;
  component: ComponentType<ScreenComponentProps>;
  markdown: string;
  variantNotes?: Record<UiStyleId, string>;
  assets: ScreenAsset[];
  next?: ScreenId;
  flowLabel?: string;
}
