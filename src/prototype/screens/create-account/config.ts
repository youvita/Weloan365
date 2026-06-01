import { SCREEN_IDS, ScreenConfig } from '../../types';
import CreateAccountScreen from './index';
import { CREATE_ACCOUNT_MARKDOWN, CREATE_ACCOUNT_VARIANT_NOTES } from './spec.md';
import { CREATE_ACCOUNT_ASSETS } from './assets';

export const createAccountConfig: ScreenConfig = {
  id: SCREEN_IDS.CREATE_ACCOUNT,
  title: 'Create Account',
  subtitle: 'Phone verification',
  group: 'New User Sign Up',
  status: 'ready',
  component: CreateAccountScreen,
  markdown: CREATE_ACCOUNT_MARKDOWN,
  variantNotes: CREATE_ACCOUNT_VARIANT_NOTES,
  assets: CREATE_ACCOUNT_ASSETS,
  flowLabel: 'Submit',
};
