[![CI](https://github.com/theluckystrike/webext-theme-engine/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-theme-engine/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-theme-engine)](https://www.npmjs.com/package/@theluckystrike/webext-theme-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-theme-engine

Dynamic CSS variable theming for Chrome extensions. Ships with five built-in presets, automatic dark mode detection, persistent storage through chrome.storage.local, and full support for custom themes. Zero dependencies, built for Manifest V3.

INSTALL

```bash
npm install webext-theme-engine
```

QUICK START

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// apply a preset
engine.apply(ThemePresets.dark);

// or auto-switch between light and dark based on system preference
engine.applyAuto(ThemePresets.light, ThemePresets.dark);
```

The applyAuto method also listens for real-time changes to the system color scheme and switches themes automatically.

SAVE AND RESTORE

```typescript
const engine = new ThemeEngine();

// apply and persist
engine.apply(ThemePresets.midnight);
await engine.save();

// on next load, restore the saved theme
const restored = await engine.restore();
if (!restored) {
    engine.apply(ThemePresets.light);
}
```

CUSTOM THEMES

```typescript
import { ThemeEngine, Theme } from 'webext-theme-engine';

const myTheme: Theme = {
    name: 'neon',
    colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#1A1A2E',
        surface: '#16213E',
        text: '#FFFFFF',
        textSecondary: '#A0A0A0',
        border: '#2D2D44',
        accent: '#FFE66D',
        error: '#FF5252',
        success: '#69F0AE'
    },
    borderRadius: '12px',
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px'
};

const engine = new ThemeEngine();
engine.apply(myTheme);
```

Each color key maps to a CSS custom property on the root element. For example, primary becomes --color-primary, textSecondary becomes --color-textSecondary, and so on. The engine also sets --border-radius, --font-family, and --font-size when those fields are present. A data-theme attribute is placed on the root element with the theme name.

CSS USAGE

```css
.button {
    background: var(--color-primary);
    color: var(--color-text);
    border-radius: var(--border-radius);
    font-family: var(--font-family);
}

.card {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}
```

API REFERENCE

Exports from webext-theme-engine:

    ThemeEngine    class    main engine for applying, saving, and restoring themes
    ThemePresets   class    five built-in theme presets
    Theme          type     shape of a theme object

ThemeEngine

Constructor

    new ThemeEngine(storageKey?: string)

    storageKey defaults to "__ext_theme__". This is the key used in chrome.storage.local.

Methods

    apply(theme: Theme, root?: HTMLElement): void
        Sets CSS custom properties on the root element (defaults to document.documentElement).
        Sets a data-theme attribute with the theme name.

    applyAuto(light: Theme, dark: Theme, root?: HTMLElement): void
        Applies the light or dark theme based on the system color scheme.
        Registers a matchMedia listener so the theme updates when the user changes their preference.

    save(theme?: Theme): Promise<void>
        Saves a theme to chrome.storage.local. If no theme is passed, saves the currently applied theme.

    load(): Promise<Theme | null>
        Loads the saved theme from storage. Returns null if nothing is saved.

    restore(root?: HTMLElement): Promise<boolean>
        Loads and applies the saved theme in one call. Returns true if a theme was restored, false otherwise.

    static prefersDark(): boolean
        Returns true when the system color scheme is set to dark.

Properties

    currentTheme: Theme | null
        The theme most recently passed to apply or applyAuto. Read-only getter.

Theme

```typescript
interface Theme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        border: string;
        accent: string;
        error?: string;
        success?: string;
    };
    borderRadius?: string;
    fontFamily?: string;
    fontSize?: string;
}
```

ThemePresets

    ThemePresets.light       clean white theme with blue accents
    ThemePresets.dark        dark theme with soft grays
    ThemePresets.midnight    deep violet dark theme
    ThemePresets.ocean       blue and teal dark theme
    ThemePresets.forest      green dark theme with natural tones
    ThemePresets.getAll()    returns all five presets as a Theme array

MANIFEST PERMISSIONS

The save, load, and restore methods use chrome.storage.local. Add storage to your manifest:

```json
{
    "permissions": ["storage"]
}
```

BROWSER SUPPORT

Chrome 88+ and other Chromium browsers running Manifest V3.

LICENSE

MIT. See LICENSE file.

ABOUT

webext-theme-engine is built and maintained by theluckystrike as part of the extension tooling at zovo.one, a studio focused on open-source Chrome extension development.

https://github.com/theluckystrike/webext-theme-engine

---
Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)

## License

MIT
