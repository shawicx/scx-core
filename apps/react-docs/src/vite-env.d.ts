/// <reference types="vite/client" />

interface ImportMetaEnv {
  glob: (pattern: string, options?: { eager?: boolean }) => Record<string, () => Promise<any>>;
  globEager: (pattern: string) => Record<string, any>;
}

interface ImportMeta extends ImportMetaEnv {
  readonly env: ImportMetaEnv;
}

declare module '@scxfe/react-ui/src/card/demos/CardBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/card/demos/CardWithMode.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/card/demos/CardCustom.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/caption/demos/CaptionBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/caption/demos/CaptionWithText.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/gradient-border/demos/GradientBorderBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/gradient-border/demos/GradientBorderWithPlacement.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/a-map/demos/AMapBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/a-map/demos/AMapWithMarker.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-ui/src/a-map/demos/AMapCustom.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useCounter/demos/useCounterBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useCounter/demos/useCounterAdvanced.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useToggle/demos/useToggleBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useToggle/demos/useToggleAdvanced.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useLocalStorage/demos/useLocalStorageBasic.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}

declare module '@scxfe/react-hooks/src/useLocalStorage/demos/useLocalStorageAdvanced.demo' {
  import { ComponentType } from 'react';
  const demo: ComponentType;
  export default demo;
}
