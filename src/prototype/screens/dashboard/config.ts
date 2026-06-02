import { SCREEN_IDS, ScreenConfig } from '../../types';
import DashboardScreen from './index';
import { DASHBOARD_MARKDOWN, DASHBOARD_VARIANT_NOTES } from './spec.md';
import { DASHBOARD_ASSETS } from './assets';

export const dashboardConfig: ScreenConfig = {
  id: SCREEN_IDS.DASHBOARD,
  title: 'Dashboard',
  subtitle: 'Returning user landing',
  flow: 'Existing User',
  component: DashboardScreen,
  markdown: DASHBOARD_MARKDOWN,
  variantNotes: DASHBOARD_VARIANT_NOTES,
  assets: DASHBOARD_ASSETS,
  next: SCREEN_IDS.LOAN_SUMMARY,
  flowLabel: 'Review',
};
