# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCX Core is a monorepo containing utility libraries and component packages for React and Vue development. The project is organized as a multi-package repository using pnpm workspaces and Turbo for build orchestration.

### Package Structure

- **@scxfe/util**: Core utility library with browser tools, data structures, date formatting, and common helper functions
- **@scxfe/react-hooks**: React hooks library
- **@scxfe/react-ui**: React UI components library (depends on @scxfe/util and ahooks)
- **@scxfe/vue-hooks**: Vue hooks library
- **@scxfe/vue-ui**: Vue UI components library (depends on @scxfe/util)
- **@scxfe/ts-config**: Shared TypeScript configuration

### Technology Stack

- **Package Manager**: pnpm (v10.15.0+)
- **Build System**: Turbo for monorepo orchestration
- **Bundling**: Rollup (util, react-ui), Vite (vue-ui), tsup (hooks packages)
- **Documentation**: Dumi (Vite-based documentation generator)
- **Linting**: oxlint for JavaScript/TypeScript, stylelint for CSS/SCSS/Less
- **Formatting**: prettier with prettier-config-ali
- **Version Management**: Changesets for automated versioning and publishing

## Development Commands

### Common Development Tasks

```bash
# Install dependencies
pnpm install

# Start development server (runs turbo dev and dumi dev)
pnpm dev

# Build all packages
pnpm build

# Run linting across all packages
pnpm lint

# Fix linting issues across all packages
pnpm lint:fix

# Format code across all packages
pnpm format
```

### Individual Package Development

```bash
# Work in a specific package directory
cd packages/[package-name]

# Build specific package
pnpm build

# Lint specific package (from package directory)
pnpm lint

# Fix linting in specific package
pnpm lint:fix
```

### Documentation

```bash
# Build documentation
pnpm build:docs

# Development with documentation
pnpm dev  # Starts both dev server and dumi
```

## Build System Architecture

The project uses Turbo for orchestrating builds across the monorepo:

- **Dependencies**: Each package's build task `dependsOn` the builds of upstream packages
- **Caching**: Turbo provides intelligent caching for build artifacts
- **Concurrent Execution**: Independent packages build in parallel

### Build Configurations

- **Rollup**: Used for @scxfe/util and @scxfe/react-ui with shared base config in `build-configs/rollup.config.base.js`
- **Vite**: Used for @scxfe/vue-ui with base config in `build-configs/vite.config.base.js`
- **tsup**: Used for @scxfe/react-hooks and @scxfe/vue-hooks with shared base config in `build-configs/tsup.config.base.js`

## Code Quality and Standards

### Linting Rules

- **oxlint**: Fast JavaScript/TypeScript linter with configuration in `oxlint.json`
- **stylelint**: CSS/SCSS/Less style linting with stylelint-config-ali
- **prettier**: Code formatting with prettier-config-ali

### Git Hooks

- **pre-commit**: Runs lint-staged to format and lint staged files
- **commitlint**: Enforces conventional commit format using commitlint-config-ali

### Commit Convention

Uses conventional commits with allowed types:

- RELEASING
- feat
- fix
- docs
- style
- test
- refactor
- chore
- revert

## Package Dependencies

### Internal Dependencies

- UI packages (react-ui, vue-ui) depend on @scxfe/util
- All packages depend on @scxfe/ts-config for TypeScript configuration
- Dependencies managed via pnpm workspaces with `workspace:^` notation

### External Dependencies

Notable external dependencies:

- @scxfe/util: axios for HTTP requests
- @scxfe/react-ui: ahooks for React hooks
- Vue packages: Vue 3.4.21+ runtime
- React packages: React 18.2.0+

## Release Process

Uses Changesets for version management:

```bash
# Add a changeset for changes
pnpm changeset add

# Version packages based on changesets
pnpm changeset version

# Build and publish packages
pnpm publish

# Full release process (build + version + publish + push)
pnpm release
```

## Testing

The project structure suggests testing should be implemented, but no test files or configurations were found in the current codebase. When adding tests, consider:

- Using Jest or Vitest for unit testing
- Testing library (React Testing Library/Vue Testing Utils) for component testing
- Adding test scripts to package.json files
- Configuring test environments in build configs

## Documentation Generation

Uses Dumi for generating documentation from code comments and markdown files. Documentation is generated as part of the `pnpm dev` command and can be built separately with `pnpm build:docs`.

## Browser Compatibility

- Node.js 22+ is required (specified in engines)
- Modern browser support expected (util package includes browser compatibility utilities)

## Package Publishing

All packages are configured for public npm publishing:

- Packages publish to `@scxfe` scope
- Version management handled by Changesets
- Build artifacts include `dist`, `lib`, and `umd` directories where applicable
