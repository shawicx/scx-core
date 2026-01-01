# @scxfe/doc-utils

Documentation utilities for SCX component libraries.

## Overview

This package provides comprehensive utility functions for processing documentation data, including:

- API extraction from React and Vue components
- Source code parsing and analysis
- Markdown processing and rendering
- File system operations and caching
- Framework-specific component analysis

## Key Features

- **Multi-framework Support**: Works with both React and Vue components
- **API Extraction**: Automatically extract component props, events, and slots
- **Code Parsing**: Analyze source code structure and dependencies
- **Markdown Processing**: Parse and render markdown with custom extensions
- **File Utilities**: Efficient file scanning, caching, and path operations

## Usage

### API Extraction

```typescript
import { VueComponentMetaExtractor, ReactComponentMetaExtractor } from '@scxfe/doc-utils';

// Vue component extraction
const vueExtractor = new VueComponentMetaExtractor();
const vueMeta = vueExtractor.extractFromSFC(vueSfcContent);

// React component extraction
const reactExtractor = new ReactComponentMetaExtractor();
const reactMeta = reactExtractor.extractFromSource(reactSource);
```

### Code Parsing

```typescript
import { CodeParser } from '@scxfe/doc-utils';

const parser = new CodeParser();
const result = parser.parse(sourceCode);

console.log(result.imports); // Import statements
console.log(result.exports); // Export statements
console.log(result.definitions); // Function/class definitions
```

### Markdown Processing

```typescript
import { MarkdownParser, MarkdownRenderer } from '@scxfe/doc-utils';

const parser = new MarkdownParser();
const parsed = parser.parse(markdownContent);

const renderer = new MarkdownRenderer();
const html = renderer.renderCodeBlocks(markdownContent);
```

### File Operations

```typescript
import { FileScanner, PathUtils } from '@scxfe/doc-utils';

const scanner = new FileScanner();
const componentFiles = scanner.findComponentFiles('./src');

const pathUtils = new PathUtils();
const isComponent = pathUtils.isComponentFile('Button.tsx');
```

## Architecture

The package is organized into several modules:

- **API Extractor**: Base classes for component metadata extraction
- **Code Parser**: Universal source code analysis
- **Markdown Utils**: Markdown parsing, rendering, and validation
- **Vue Utils**: Vue-specific component analysis and demo generation
- **React Utils**: React-specific component analysis and demo generation
- **File Utils**: File system operations and caching

## Dependencies

- `@scxfe/doc-schema`: Shared schema definitions
- `scxe`: SCX utility library

## License

MIT
