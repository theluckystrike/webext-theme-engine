import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeEngine, ThemePresets } from './index';

// Mock chrome API
const chromeMock = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
};
(global as any).chrome = chromeMock;

describe('ThemeEngine', () => {
  let engine: ThemeEngine;
  let root: HTMLElement;

  beforeEach(() => {
    engine = new ThemeEngine('test-key');
    root = document.createElement('div');
    vi.clearAllMocks();
  });

  it('should apply theme colors', () => {
    const theme = ThemePresets.light;
    engine.apply(theme, root);
    expect(root.style.getPropertyValue('--color-primary')).toBe(theme.colors.primary);
    expect(root.getAttribute('data-theme')).toBe(theme.name);
  });

  it('should apply border radius and font', () => {
    const theme = ThemePresets.light;
    engine.apply(theme, root);
    expect(root.style.getPropertyValue('--border-radius')).toBe(theme.borderRadius);
  });

  it('should save theme to storage', async () => {
    const theme = ThemePresets.dark;
    await engine.save(theme);
    expect(chromeMock.storage.local.set).toHaveBeenCalledWith({ 'test-key': theme });
  });

  it('should load theme from storage', async () => {
    const theme = ThemePresets.midnight;
    chromeMock.storage.local.get.mockResolvedValue({ 'test-key': theme });
    const loaded = await engine.load();
    expect(loaded).toEqual(theme);
  });

  it('should restore theme', async () => {
    const theme = ThemePresets.ocean;
    chromeMock.storage.local.get.mockResolvedValue({ 'test-key': theme });
    const restored = await engine.restore(root);
    expect(restored).toBe(true);
    expect(root.getAttribute('data-theme')).toBe(theme.name);
  });

  it('should handle missing theme on restore', async () => {
    chromeMock.storage.local.get.mockResolvedValue({});
    const restored = await engine.restore(root);
    expect(restored).toBe(false);
  });

  it('should check prefersDark', () => {
    // Mock matchMedia
    (global as any).matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(ThemeEngine.prefersDark()).toBe(true);
  });
});

describe('ThemePresets', () => {
  it('should have light theme', () => {
    expect(ThemePresets.light.name).toBe('light');
  });

  it('should have dark theme', () => {
    expect(ThemePresets.dark.name).toBe('dark');
  });

  it('should have midnight theme', () => {
    expect(ThemePresets.midnight.name).toBe('midnight');
  });

  it('should return all presets', () => {
    const all = ThemePresets.getAll();
    expect(all.length).toBe(5);
    expect(all.map(t => t.name)).toContain('ocean');
    expect(all.map(t => t.name)).toContain('forest');
  });
});
