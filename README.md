# webext-theme-engine

> Dynamic CSS variable theming for Chrome extensions — 5 built-in presets, auto dark mode, save/restore, and fully customizable themes for Manifest V3.

[![npm version](https://img.shields.io/npm/v/webext-theme-engine)](https://npmjs.com/package/webext-theme-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-theme-engine?style=social)](https://github.com/theluckystrike/webext-theme-engine)

Part of the [Zovo](https://zovo.one) developer tools family.

## Why webext-theme-engine?

Building a theming system from scratch is painful. This library gives you:

- 🎨 **5 Built-in Presets** — Light, dark, midnight, ocean, and forest themes ready to use
- 🌙 **Auto Dark Mode** — Automatically switches based on system preferences
- 💾 **Persistent Storage** — Save and restore user theme selections
- 🎯 **CSS Variables** — Easy to customize via standard CSS
- ⚡ **Zero Dependencies** — Lightweight and fast
- 🔄 **Reactive** — Listens for system color scheme changes in real-time

## Install

```bash
npm install webext-theme-engine
```

## Quick Start

### Basic Usage

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// Apply a preset theme
engine.apply(ThemePresets.dark);
```

### Auto Dark Mode

Automatically switch between light and dark based on user preference:

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// Automatically apply light or dark based on system preference
engine.applyAuto(ThemePresets.light, ThemePresets.dark);
```

The theme will automatically update when the user changes their system color scheme.

### Save & Restore

Persist the user's theme choice:

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// Apply theme and save to storage
await engine.apply(ThemePresets.midnight);
await engine.save();

// Later, restore the saved theme
await engine.restore();
```

## Usage with CSS

The theme engine applies CSS custom properties to the root element:

```css
/* Your extension's styles.css */
:root {
    /* Default values as fallback */
    --color-primary: #3B82F6;
    --color-background: #FFFFFF;
    --color-text: #111827;
    --border-radius: 8px;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Use in your styles */
.button {
    background: var(--color-primary);
    border-radius: var(--border-radius);
    font-family: var(--font-family);
}

.card {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}
```

## API Reference

### ThemeEngine

```typescript
import { ThemeEngine, ThemePresets, Theme } from 'webext-theme-engine';
```

#### Constructor

```typescript
new ThemeEngine(storageKey?: string)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `storageKey` | `string` | `__ext_theme__` | Custom key for storing theme in chrome.storage.local |

#### Methods

##### `apply(theme: Theme, root?: HTMLElement): void`

Apply a theme by setting CSS custom properties on the root element.

```typescript
engine.apply(ThemePresets.dark);
engine.apply(ThemePresets.light, document.getElementById('custom-root'));
```

##### `applyAuto(light: Theme, dark: Theme, root?: HTMLElement): void`

Automatically apply light or dark theme based on system preference. Also listens for system color scheme changes.

```typescript
engine.applyAuto(ThemePresets.light, ThemePresets.dark);
```

##### `save(theme?: Theme): Promise<void>`

Save a theme to chrome.storage.local. If no theme is provided, saves the current theme.

```typescript
// Save current theme
await engine.save();

// Save a specific theme
await engine.save(ThemePresets.ocean);
```

##### `load(): Promise<Theme | null>`

Load the saved theme from storage.

```typescript
const saved = await engine.load();
if (saved) {
    engine.apply(saved);
}
```

##### `restore(root?: HTMLElement): Promise<boolean>`

Load and apply the saved theme. Returns `true` if a theme was restored, `false` if no saved theme exists.

```typescript
const restored = await engine.restore();
if (!restored) {
    // No saved theme, apply default
    engine.apply(ThemePresets.light);
}
```

##### `static prefersDark(): boolean`

Check if the user prefers dark mode.

```typescript
if (ThemeEngine.prefersDark()) {
    engine.apply(ThemePresets.dark);
}
```

#### Properties

##### `currentTheme: Theme | null`

Get the currently applied theme.

```typescript
console.log(engine.currentTheme.name); // "dark"
```

### ThemePresets

Ready-to-use theme presets.

```typescript
import { ThemePresets } from 'webext-theme-engine';
```

#### Available Presets

| Preset | Description |
|--------|-------------|
| `ThemePresets.light` | Clean white theme with blue accents |
| `ThemePresets.dark` | Dark theme with soft grays |
| `ThemePresets.midnight` | Deep purple/violet dark theme |
| `ThemePresets.ocean` | Blue/teal dark theme |
| `ThemePresets.forest` | Green dark theme with natural tones |

#### Methods

##### `getAll(): Theme[]`

Get all available presets as an array.

```typescript
const allThemes = ThemePresets.getAll();
// [light, dark, midnight, ocean, forest]
```

### Theme Interface

Custom theme definition:

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

#### Creating Custom Themes

```typescript
import { ThemeEngine, Theme } from 'webext-theme-engine';

const customTheme: Theme = {
    name: 'custom',
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
    fontFamily: '"Inter", sans-serif'
};

const engine = new ThemeEngine();
engine.apply(customTheme);
```

## Complete Example

Here's a complete example for a popup that supports theme switching:

```typescript
// popup.ts
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';

const engine = new ThemeEngine();

// Initialize: restore saved theme or use system preference
async function init() {
    const restored = await engine.restore();
    if (!restored) {
        engine.applyAuto(ThemePresets.light, ThemePresets.dark);
    }
    
    // Set up theme selector
    document.getElementById('theme-select')?.addEventListener('change', async (e) => {
        const themeName = (e.target as HTMLSelectElement).value;
        const theme = ThemePresets.getAll().find(t => t.name === themeName);
        if (theme) {
            engine.apply(theme);
            await engine.save();
        }
    });
}

init();
```

```html
<!-- popup.html -->
<select id="theme-select">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="midnight">Midnight</option>
    <option value="ocean">Ocean</option>
    <option value="forest">Forest</option>
</select>
```

## Permissions

This library uses `chrome.storage.local` for persisting theme preferences. Add this to your manifest:

```json
{
    "permissions": [
        "storage"
    ]
}
```

## Browser Support

- Chrome 88+ (Manifest V3)
- Edge 88+
- Other Chromium-based browsers

## License

MIT License — [Zovo](https://zovo.one)

---

Built by [Zovo](https://zovo.one) — Developer tools for Chrome extensions
