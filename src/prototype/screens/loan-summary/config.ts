import { SCREEN_IDS, ScreenConfig } from '../../types';
import LoanSummaryScreen from './index';
import { LOAN_SUMMARY_MARKDOWN, LOAN_SUMMARY_VARIANT_NOTES } from './spec.md';
import { LOAN_SUMMARY_ASSETS } from './assets';

export const loanSummaryConfig: ScreenConfig = {
  id: SCREEN_IDS.LOAN_SUMMARY,
  title: 'Loan Summary',
  subtitle: 'Review your offer',
  flow: 'Existing User',
  component: LoanSummaryScreen,
  markdown: LOAN_SUMMARY_MARKDOWN,
  variantNotes: LOAN_SUMMARY_VARIANT_NOTES,
  assets: LOAN_SUMMARY_ASSETS,
  flowLabel: 'Confirm',
};
