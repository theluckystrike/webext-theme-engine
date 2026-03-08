<div align="center">

# webext-theme-engine

Dynamic theme engine for Chrome extensions. CSS variables, presets, custom themes, dark/light mode, and user-configurable color schemes.

[![npm version](https://img.shields.io/npm/v/webext-theme-engine)](https://www.npmjs.com/package/webext-theme-engine)
[![npm downloads](https://img.shields.io/npm/dm/webext-theme-engine)](https://www.npmjs.com/package/webext-theme-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/webext-theme-engine)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **CSS variable system** -- theme your extension with `var(--color-primary)`
- **Built-in presets** -- light, dark, and system-auto themes
- **Custom themes** -- users can create and save their own color schemes
- **Dark/light toggle** -- automatic or manual mode switching
- **Storage sync** -- persist theme preference across devices
- **Framework-agnostic** -- works with React, Vue, Svelte, or vanilla JS

## Installation

```bash
npm install webext-theme-engine
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add webext-theme-engine
# or
yarn add webext-theme-engine
```

</details>

## Quick Start

```typescript
import { ThemeEngine } from "webext-theme-engine";

const theme = new ThemeEngine({
  presets: {
    light: { primary: "#3b82f6", background: "#ffffff", text: "#1f2937" },
    dark: { primary: "#60a5fa", background: "#111827", text: "#f9fafb" },
  },
  default: "system",
});

await theme.apply("dark");
await theme.toggle();  // switch between light/dark
```

## API

| Method | Description |
|--------|-------------|
| `new ThemeEngine(config)` | Initialize with theme presets |
| `apply(name)` | Apply a theme by name |
| `toggle()` | Toggle between light and dark |
| `getCurrent()` | Get the active theme name |
| `createTheme(name, colors)` | Create a custom theme |
| `deleteTheme(name)` | Remove a custom theme |
| `onChanged(callback)` | Listen for theme changes |



## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>
