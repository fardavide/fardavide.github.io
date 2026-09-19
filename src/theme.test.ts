import { describe, expect, it } from 'vitest';
import { resolveThemeOverride } from './theme';

describe('resolveThemeOverride', () => {
  it('should return light when the theme query is light', () => {
    expect(resolveThemeOverride('?theme=light')).toBe('light');
  });

  it('should return dark when the theme query is dark', () => {
    expect(resolveThemeOverride('?theme=dark')).toBe('dark');
  });

  it('should return null when there is no theme query', () => {
    expect(resolveThemeOverride('')).toBeNull();
  });

  it('should return null when the theme query is not a known theme', () => {
    expect(resolveThemeOverride('?theme=system')).toBeNull();
  });
});
