import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_UI_STYLE, UI_STYLES, UiStyleId, UiStyleTokens, getUiStyle } from '../../design-system/variants';

const DEV_MODE_STORAGE_KEY = 'weloan365.devMode';
const UI_STYLE_STORAGE_KEY = 'weloan365.uiStyle';

interface SettingsContextValue {
  devMode: boolean;
  setDevMode: (value: boolean) => void;
  uiStyleId: UiStyleId;
  setUiStyleId: (value: UiStyleId) => void;
  uiTokens: UiStyleTokens;
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

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devMode, setDevModeState] = useState<boolean>(() => readStoredBool(DEV_MODE_STORAGE_KEY, false));
  const [uiStyleId, setUiStyleIdState] = useState<UiStyleId>(() => readStoredStyle());

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

  const setDevMode = useCallback((value: boolean) => setDevModeState(value), []);
  const setUiStyleId = useCallback((value: UiStyleId) => setUiStyleIdState(value), []);

  const value = useMemo<SettingsContextValue>(
    () => ({ devMode, setDevMode, uiStyleId, setUiStyleId, uiTokens: getUiStyle(uiStyleId) }),
    [devMode, setDevMode, uiStyleId, setUiStyleId]
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
