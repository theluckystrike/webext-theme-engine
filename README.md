# webext-theme-engine — Dynamic Themes for Chrome Extensions
> **Built by [Zovo](https://zovo.one)**

CSS variable theming — 5 presets (light/dark/midnight/ocean/forest), auto dark mode, save/restore, customizable. `npm i webext-theme-engine`

```typescript
import { ThemeEngine, ThemePresets } from 'webext-theme-engine';
const engine = new ThemeEngine();
engine.applyAuto(ThemePresets.light, ThemePresets.dark);
```
MIT License
