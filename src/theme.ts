export type ThemeOverride = 'light' | 'dark';

export function resolveThemeOverride(search: string): ThemeOverride | null {
  const value = new URLSearchParams(search).get('theme');
  return value === 'light' || value === 'dark' ? value : null;
}
