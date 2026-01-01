# @scxfe/docs-core

Documentation runtime core for SCX component libraries.

## Overview

This package provides the framework-agnostic core functionality for the SCX documentation system. It handles:

- Component registration and metadata management
- Demo component registration and loading
- API metadata extraction and caching
- Page structure organization

## Key Features

- **Framework Agnostic**: Can be used by both React and Vue applications
- **Component Registry**: Central management of component documentation
- **Demo Management**: Register and load demo components dynamically
- **API Metadata**: Extract and cache component API information
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Usage

```typescript
import { DocsRegistry } from '@scxfe/docs-core';

// Create registry instance
const registry = new DocsRegistry();

// Register a component with its documentation
registry.registerComponent({
  name: 'Button',
  meta: {
    name: 'Button',
    props: [],
    events: [],
    slots: [],
  },
  demos: [
    {
      title: 'Basic Button',
      description: 'A basic button example',
      component: () => import('./demos/ButtonBasic.vue'),
    },
  ],
});

// Get component metadata
const meta = await registry.getComponentMeta('Button');

// Get demo components
const demos = registry.getComponentDemos('Button');
```

## Architecture

This package implements the "protocol layer" of the documentation system, providing:

- **Types**: Core interfaces and type definitions
- **Registries**: Management classes for demos and API data
- **Core**: Unified documentation registry

## Dependencies

- `@scxfe/doc-schema`: Shared schema definitions

## License

MIT
