# webext-theme-engine

[![CI](https://github.com/theluckystrike/webext-theme-engine/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-theme-engine/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-theme-engine)](https://github.com/theluckystrike/webext-theme-engine/commits/main)

Dynamic CSS variable theming engine for Chrome extensions. Ship beautiful, customizable themes with zero dependencies — built for Manifest V3.

## Features

- **5 Built-in Presets** — Light, Dark, Midnight, Ocean, Forest
- **Auto Dark Mode** — Automatically detect and match system color scheme
- **Persistent Storage** — Save and restore user preferences via `chrome.storage.local`
- **Custom Themes** — Full control over colors, typography, and border radius
- **Zero Dependencies** — Lightweight and fast
- **TypeScript Ready** — Full type definitions included

## Installation

```bash
npm install webext-theme-engine
```

Or with yarn:

```bash
yarn add webext-theme-engine
```

## Quick Start

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// Apply a preset
engine.apply(ThemePresets.dark);

// Or auto-switch between light and dark based on system preference
engine.applyAuto(ThemePresets.light, ThemePresets.dark);
```

The `applyAuto` method listens for real-time changes to the system color scheme and switches themes automatically.

## Usage Examples

### Save and Restore Themes

```typescript
const engine = new ThemeEngine();

// Apply and persist a theme
engine.apply(ThemePresets.midnight);
await engine.save();

// On next extension load, restore the saved theme
const restored = await engine.restore();
if (!restored) {
  engine.apply(ThemePresets.light);
}
```

### Custom Themes

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

### CSS Usage

Each color key maps to a CSS custom property on the root element:

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

A `data-theme` attribute is placed on the root element with the theme name (e.g., `data-theme="dark"`).

## API Reference

### Exports

| Export | Type | Description |
|--------|------|-------------|
| `ThemeEngine` | Class | Main engine for applying, saving, and restoring themes |
| `ThemePresets` | Class | Five built-in theme presets |
| `Theme` | Type | Shape of a theme object |

### ThemeEngine

#### Constructor

```typescript
new ThemeEngine(storageKey?: string)
```

- `storageKey` — Defaults to `"__ext_theme__"`. This is the key used in `chrome.storage.local`.

#### Methods

##### `apply(theme: Theme, root?: HTMLElement): void`

Sets CSS custom properties on the root element (defaults to `document.documentElement`). Sets a `data-theme` attribute with the theme name.

##### `applyAuto(light: Theme, dark: Theme, root?: HTMLElement): void`

Applies the light or dark theme based on the system color scheme. Registers a `matchMedia` listener so the theme updates when the user changes their preference.

##### `save(theme?: Theme): Promise<void>`

Saves a theme to `chrome.storage.local`. If no theme is passed, saves the currently applied theme.

##### `load(): Promise<Theme | null>`

Loads the saved theme from storage. Returns `null` if nothing is saved.

##### `restore(root?: HTMLElement): Promise<boolean>`

Loads and applies the saved theme in one call. Returns `true` if a theme was restored, `false` otherwise.

##### `static prefersDark(): boolean`

Returns `true` when the system color scheme is set to dark.

#### Properties

##### `currentTheme: Theme | null`

The theme most recently passed to `apply` or `applyAuto`. Read-only getter.

### Theme

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

### ThemePresets

| Preset | Description |
|--------|-------------|
| `ThemePresets.light` | Clean white theme with blue accents |
| `ThemePresets.dark` | Dark theme with soft grays |
| `ThemePresets.midnight` | Deep violet dark theme |
| `ThemePresets.ocean` | Blue and teal dark theme |
| `ThemePresets.forest` | Green dark theme with natural tones |
| `ThemePresets.getAll()` | Returns all five presets as a Theme array |

## Manifest Permissions

The `save`, `load`, and `restore` methods use `chrome.storage.local`. Add storage to your manifest:

```json
{
  "permissions": ["storage"]
}
```

## Project Structure

```
webext-theme-engine/
├── src/
│   ├── engine.ts        # ThemeEngine class implementation
│   ├── presets.ts       # Built-in theme presets
│   ├── index.ts         # Public exports
│   └── engine.test.ts  # Unit tests
├── package.json
├── tsconfig.json
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## Browser Support

Chrome 88+ and other Chromium browsers running Manifest V3.

## License

MIT. See [LICENSE](LICENSE) file.

## About

webext-theme-engine is built and maintained by [theluckystrike](https://github.com/theluckystrike) as part of the extension tooling at [zovo.one](https://zovo.one), a studio focused on open-source Chrome extension development.

https://github.com/theluckystrike/webext-theme-engine

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
