import { SCREEN_IDS, ScreenConfig } from '../../types';
import HomeScreen from './index';
import { HOME_MARKDOWN, HOME_VARIANT_NOTES } from './spec.md';
import { HOME_ASSETS } from './assets';

export const homeConfig: ScreenConfig = {
  id: SCREEN_IDS.HOME,
  title: 'Home Screen',
  subtitle: 'New customer landing',
  group: 'New User Sign Up',
  status: 'ready',
  component: HomeScreen,
  markdown: HOME_MARKDOWN,
  variantNotes: HOME_VARIANT_NOTES,
  assets: HOME_ASSETS,
  next: SCREEN_IDS.ONBOARDING,
  flowLabel: 'Start',
};
