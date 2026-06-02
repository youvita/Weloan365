import { SCREEN_IDS, ScreenConfig } from '../../types';
import OtpVerifyScreen from './index';
import { OTP_VERIFY_MARKDOWN, OTP_VERIFY_VARIANT_NOTES } from './spec.md';
import { OTP_VERIFY_ASSETS } from './assets';

export const otpVerifyConfig: ScreenConfig = {
  id: SCREEN_IDS.OTP_VERIFY,
  title: 'Verify Code',
  subtitle: '6-digit OTP',
  flow: 'Existing User',
  component: OtpVerifyScreen,
  markdown: OTP_VERIFY_MARKDOWN,
  variantNotes: OTP_VERIFY_VARIANT_NOTES,
  assets: OTP_VERIFY_ASSETS,
  next: SCREEN_IDS.DASHBOARD,
  flowLabel: 'Verify',
};
