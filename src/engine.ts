/**
 * Theme Engine — Dynamic CSS variable theming for extensions
 */
export interface Theme {
    name: string;
    colors: { primary: string; secondary: string; background: string; surface: string; text: string; textSecondary: string; border: string; accent: string; error?: string; success?: string; };
    borderRadius?: string; fontFamily?: string; fontSize?: string;
}

export class ThemeEngine {
    private current: Theme | null = null;
    private storageKey: string;

    constructor(storageKey: string = '__ext_theme__') { this.storageKey = storageKey; }

    /** Apply a theme via CSS variables */
    apply(theme: Theme, root: HTMLElement = document.documentElement): void {
        this.current = theme;
        Object.entries(theme.colors).forEach(([key, value]) => { root.style.setProperty(`--color-${key}`, value); });
        if (theme.borderRadius) root.style.setProperty('--border-radius', theme.borderRadius);
        if (theme.fontFamily) root.style.setProperty('--font-family', theme.fontFamily);
        if (theme.fontSize) root.style.setProperty('--font-size', theme.fontSize);
        root.setAttribute('data-theme', theme.name);
    }

    /** Save current theme */
    async save(theme?: Theme): Promise<void> { await chrome.storage.local.set({ [this.storageKey]: theme || this.current }); }

    /** Load saved theme */
    async load(): Promise<Theme | null> {
        const result = await chrome.storage.local.get(this.storageKey);
        return result[this.storageKey] || null;
    }

    /** Load and apply saved theme */
    async restore(root?: HTMLElement): Promise<boolean> {
        const theme = await this.load();
        if (theme) { this.apply(theme, root); return true; }
        return false;
    }

    /** Auto-detect system dark mode */
    static prefersDark(): boolean { return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches; }

    /** Apply based on system preference */
    applyAuto(light: Theme, dark: Theme, root?: HTMLElement): void {
        this.apply(ThemeEngine.prefersDark() ? dark : light, root);
        if (typeof matchMedia !== 'undefined') {
            matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => { this.apply(e.matches ? dark : light, root); });
        }
    }

    get currentTheme(): Theme | null { return this.current; }
}
