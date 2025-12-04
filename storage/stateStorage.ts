
import { AppType, TenantId, ScreenshotConfig, ExportConfig } from '../types';

export interface PersistedState {
  currentAppType: AppType;
  currentTenantId: TenantId;
  dataStore: Record<string, ScreenshotConfig[]>;
  activeScreenIndex: number;
  exportConfig: ExportConfig;
}

const STORAGE_KEY = 'vp_screenshot_builder_state_v1';

export const saveAppState = (state: PersistedState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save app state:', error);
  }
};

export const loadAppState = (): PersistedState | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as PersistedState;
  } catch (error) {
    console.error('Failed to load app state:', error);
    return null;
  }
};
