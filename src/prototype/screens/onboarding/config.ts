import { SCREEN_IDS, ScreenConfig } from '../../types';
import OnboardingScreen from './index';
import { ONBOARDING_MARKDOWN, ONBOARDING_VARIANT_NOTES } from './spec.md';
import { ONBOARDING_ASSETS } from './assets';

export const onboardingConfig: ScreenConfig = {
  id: SCREEN_IDS.ONBOARDING,
  title: 'Onboarding',
  subtitle: 'Fast loan approvals',
  flow: 'New User Sign Up',
  component: OnboardingScreen,
  markdown: ONBOARDING_MARKDOWN,
  variantNotes: ONBOARDING_VARIANT_NOTES,
  assets: ONBOARDING_ASSETS,
  next: SCREEN_IDS.CREATE_ACCOUNT,
  flowLabel: 'Next',
};
