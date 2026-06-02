import { SCREEN_IDS, ScreenConfig } from '../../types';
import LoginScreen from './index';
import { LOGIN_MARKDOWN, LOGIN_VARIANT_NOTES } from './spec.md';
import { LOGIN_ASSETS } from './assets';

export const loginConfig: ScreenConfig = {
  id: SCREEN_IDS.LOGIN,
  title: 'Sign In',
  subtitle: 'Returning user',
  flow: 'Existing User',
  component: LoginScreen,
  markdown: LOGIN_MARKDOWN,
  variantNotes: LOGIN_VARIANT_NOTES,
  assets: LOGIN_ASSETS,
  next: SCREEN_IDS.OTP_VERIFY,
  flowLabel: 'Sign in',
};
