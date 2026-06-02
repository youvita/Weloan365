import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_UI_STYLE, UI_STYLES, UiStyleId, UiStyleTokens, getUiStyle } from '../../design-system/variants';
import { SCREEN_FLOWS, USER_FLOWS } from '../../prototype/registry';

const DEV_MODE_STORAGE_KEY = 'weloan365.devMode';
const UI_STYLE_STORAGE_KEY = 'weloan365.uiStyle';
const FLOW_STORAGE_KEY = 'weloan365.selectedFlow';

interface SettingsContextValue {
  devMode: boolean;
  setDevMode: (value: boolean) => void;
  uiStyleId: UiStyleId;
  setUiStyleId: (value: UiStyleId) => void;
  uiTokens: UiStyleTokens;
  selectedFlow: string;
  setSelectedFlow: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const readStoredBool = (key: string, fallback: boolean): boolean => {
  if (typeof window === 'undefined') return fallback;
  const v = window.localStorage.getItem(key);
  if (v === null) return fallback;
  return v === 'true';
};

const readStoredStyle = (): UiStyleId => {
  if (typeof window === 'undefined') return DEFAULT_UI_STYLE;
  const v = window.localStorage.getItem(UI_STYLE_STORAGE_KEY);
  if (v && v in UI_STYLES) return v as UiStyleId;
  return DEFAULT_UI_STYLE;
};

// First flow (in USER_FLOWS canonical order) that actually has screens.
const defaultFlow = (): string => {
  const populated = new Set(SCREEN_FLOWS.map((f) => f.flow));
  return USER_FLOWS.find((name) => populated.has(name)) ?? SCREEN_FLOWS[0]?.flow ?? '';
};

const readStoredFlow = (): string => {
  if (typeof window === 'undefined') return defaultFlow();
  const v = window.localStorage.getItem(FLOW_STORAGE_KEY);
  if (v && SCREEN_FLOWS.some((f) => f.flow === v)) return v;
  return defaultFlow();
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devMode, setDevModeState] = useState<boolean>(() => readStoredBool(DEV_MODE_STORAGE_KEY, false));
  const [uiStyleId, setUiStyleIdState] = useState<UiStyleId>(() => readStoredStyle());
  const [selectedFlow, setSelectedFlowState] = useState<string>(() => readStoredFlow());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DEV_MODE_STORAGE_KEY, String(devMode));
    }
  }, [devMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(UI_STYLE_STORAGE_KEY, uiStyleId);
    }
  }, [uiStyleId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(FLOW_STORAGE_KEY, selectedFlow);
    }
  }, [selectedFlow]);

  const setDevMode = useCallback((value: boolean) => setDevModeState(value), []);
  const setUiStyleId = useCallback((value: UiStyleId) => setUiStyleIdState(value), []);
  const setSelectedFlow = useCallback((value: string) => setSelectedFlowState(value), []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      devMode,
      setDevMode,
      uiStyleId,
      setUiStyleId,
      uiTokens: getUiStyle(uiStyleId),
      selectedFlow,
      setSelectedFlow,
    }),
    [devMode, setDevMode, uiStyleId, setUiStyleId, selectedFlow, setSelectedFlow]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
};

export const useUiTokens = (): UiStyleTokens => useSettings().uiTokens;

export const StyleOverrideProvider: React.FC<{ styleId: UiStyleId; children: React.ReactNode }> = ({
  styleId,
  children,
}) => {
  const parent = useSettings();
  const value = useMemo<SettingsContextValue>(
    () => ({ ...parent, uiStyleId: styleId, uiTokens: getUiStyle(styleId) }),
    [parent, styleId]
  );
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
