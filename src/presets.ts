/**
 * Theme Presets — Ready-to-use color themes
 */
import { Theme } from './engine';

export class ThemePresets {
    static readonly light: Theme = { name: 'light', colors: { primary: '#3B82F6', secondary: '#6366F1', background: '#FFFFFF', surface: '#F9FAFB', text: '#111827', textSecondary: '#6B7280', border: '#E5E7EB', accent: '#F59E0B', error: '#EF4444', success: '#10B981' }, borderRadius: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' };
    static readonly dark: Theme = { name: 'dark', colors: { primary: '#60A5FA', secondary: '#818CF8', background: '#111827', surface: '#1F2937', text: '#F9FAFB', textSecondary: '#9CA3AF', border: '#374151', accent: '#FBBF24', error: '#F87171', success: '#34D399' }, borderRadius: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' };
    static readonly midnight: Theme = { name: 'midnight', colors: { primary: '#A78BFA', secondary: '#C084FC', background: '#0F0B1E', surface: '#1A1432', text: '#E2E8F0', textSecondary: '#94A3B8', border: '#2D2553', accent: '#F472B6', error: '#FB7185', success: '#4ADE80' }, borderRadius: '12px' };
    static readonly ocean: Theme = { name: 'ocean', colors: { primary: '#0EA5E9', secondary: '#06B6D4', background: '#0C1222', surface: '#162032', text: '#E2E8F0', textSecondary: '#94A3B8', border: '#1E3A5F', accent: '#38BDF8', error: '#F87171', success: '#2DD4BF' }, borderRadius: '10px' };
    static readonly forest: Theme = { name: 'forest', colors: { primary: '#22C55E', secondary: '#10B981', background: '#0A1F0D', surface: '#132B16', text: '#ECFDF5', textSecondary: '#86EFAC', border: '#1A3D1F', accent: '#A3E635', error: '#F87171', success: '#4ADE80' }, borderRadius: '6px' };

    static getAll(): Theme[] { return [this.light, this.dark, this.midnight, this.ocean, this.forest]; }
}
