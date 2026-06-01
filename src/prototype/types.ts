import { ComponentType } from 'react';
import { UiStyleId } from '../design-system/variants';

// Stable, URL-safe identifier for a prototype screen.
// Adding a screen requires adding the literal here — every consumer is then
// compile-time-checked. Used in the URL (/screen/:id), spec filenames, the
// dev-mode panel, and localStorage keys.
export type ScreenId = 'home' | 'onboarding' | 'create-account';

export const SCREEN_IDS = {
  HOME: 'home',
  ONBOARDING: 'onboarding',
  CREATE_ACCOUNT: 'create-account',
} as const satisfies Record<string, ScreenId>;

export type ScreenStatus = 'ready' | 'in-review' | 'draft';

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
  group: string;
  status: ScreenStatus;
  component: ComponentType<ScreenComponentProps>;
  markdown: string;
  variantNotes?: Record<UiStyleId, string>;
  assets: ScreenAsset[];
  next?: ScreenId;
  flowLabel?: string;
}
