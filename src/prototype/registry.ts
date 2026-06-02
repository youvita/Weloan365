import { UiStyleId } from '../design-system/variants';
import { ScreenConfig, ScreenId } from './types';
import { homeConfig } from './screens/home/config';
import { onboardingConfig } from './screens/onboarding/config';
import { createAccountConfig } from './screens/create-account/config';
import { loanSummaryConfig } from './screens/loan-summary/config';
import { loginConfig } from './screens/login/config';
import { otpVerifyConfig } from './screens/otp-verify/config';
import { dashboardConfig } from './screens/dashboard/config';

export const SCREENS: ScreenConfig[] = [
  homeConfig,
  onboardingConfig,
  createAccountConfig,
  loginConfig,
  otpVerifyConfig,
  dashboardConfig,
  loanSummaryConfig,
];

export const getScreen = (id: string): ScreenConfig | undefined =>
  SCREENS.find((s) => s.id === id);

export const getScreenAssets = (id: ScreenId): ScreenConfig['assets'] =>
  getScreen(id)?.assets ?? [];

export const getScreenMarkdown = (screen: ScreenConfig, styleId: UiStyleId): string => {
  const note = screen.variantNotes?.[styleId];
  if (!note) return screen.markdown;
  return `${screen.markdown.trimEnd()}\n\n---\n\n${note.trimEnd()}\n`;
};

export const SCREEN_FLOWS = Array.from(
  SCREENS.reduce((acc, s) => {
    if (!acc.has(s.flow)) acc.set(s.flow, []);
    acc.get(s.flow)!.push(s);
    return acc;
  }, new Map<string, ScreenConfig[]>()).entries(),
).map(([flow, items]) => ({ flow, items }));

export const USER_FLOWS = ['New User Sign Up', 'Existing User', 'Admin'];
