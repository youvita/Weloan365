import { UiStyleId } from '../design-system/variants';
import { ScreenConfig, ScreenId } from './types';
import { homeConfig } from './screens/home/config';
import { onboardingConfig } from './screens/onboarding/config';
import { createAccountConfig } from './screens/create-account/config';

export const SCREENS: ScreenConfig[] = [homeConfig, onboardingConfig, createAccountConfig];

export const getScreen = (id: string): ScreenConfig | undefined =>
  SCREENS.find((s) => s.id === id);

export const getScreenAssets = (id: ScreenId): ScreenConfig['assets'] =>
  getScreen(id)?.assets ?? [];

export const getScreenMarkdown = (screen: ScreenConfig, styleId: UiStyleId): string => {
  const note = screen.variantNotes?.[styleId];
  if (!note) return screen.markdown;
  return `${screen.markdown.trimEnd()}\n\n---\n\n${note.trimEnd()}\n`;
};

export const SCREEN_GROUPS = Array.from(
  SCREENS.reduce((acc, s) => {
    if (!acc.has(s.group)) acc.set(s.group, []);
    acc.get(s.group)!.push(s);
    return acc;
  }, new Map<string, ScreenConfig[]>()).entries(),
).map(([group, items]) => ({ group, items }));

export const USER_GROUPS = ['New User Sign Up', 'Existing User', 'Admin'];
