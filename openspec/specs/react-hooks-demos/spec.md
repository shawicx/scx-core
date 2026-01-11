# react-hooks-demos Specification

## Purpose

TBD - created by archiving change add-component-demos. Update Purpose after archive.

## Requirements

### Requirement: React useCounter Implementation

The system SHALL provide a React version of the useCounter hook with the same API as the Vue version.

#### Scenario: useCounter hook provides counter functionality

- **GIVEN** the React useCounter hook exists in packages/react-hooks/src/useCounter/
- **WHEN** the hook is imported and used
- **THEN** it should support the same parameters as Vue version (initialValue, min, max)
- **AND** it should return the same values (count, increment, decrement, reset)
- **AND** the hook should be exported from packages/react-hooks/src/index.ts

#### Scenario: useCounter demos demonstrate React usage

- **GIVEN** useCounter demo files exist in packages/react-hooks/src/useCounter/demos/
- **WHEN** demos are rendered in react-docs
- **THEN** demos should demonstrate the hook usage in React
- **AND** demos should match Vue demo functionality
- **AND** demos should be registered in the registry

### Requirement: React useToggle Implementation

The system SHALL provide a React version of the useToggle hook with the same API as the Vue version.

#### Scenario: useToggle hook provides toggle functionality

- **GIVEN** the React useToggle hook exists in packages/react-hooks/src/useToggle/
- **WHEN** the hook is imported and used
- **THEN** it should support the same parameters as Vue version (defaultValue)
- **AND** it should return the same values (value, toggle)
- **AND** the hook should be exported from packages/react-hooks/src/index.ts

#### Scenario: useToggle demos demonstrate React usage

- **GIVEN** useToggle demo files exist in packages/react-hooks/src/useToggle/demos/
- **WHEN** demos are rendered in react-docs
- **THEN** demos should demonstrate the hook usage in React
- **AND** demos should match Vue demo functionality
- **AND** demos should be registered in the registry

### Requirement: React useLocalStorage Implementation

The system SHALL provide a React version of the useLocalStorage hook with the same API as the Vue version.

#### Scenario: useLocalStorage hook provides localStorage functionality

- **GIVEN** the React useLocalStorage hook exists in packages/react-hooks/src/useLocalStorage/
- **WHEN** the hook is imported and used
- **THEN** it should support the same parameters as Vue version (key, defaultValue, serializer)
- **AND** it should return the same values (value, setValue)
- **AND** the hook should be exported from packages/react-hooks/src/index.ts

#### Scenario: useLocalStorage demos demonstrate React usage

- **GIVEN** useLocalStorage demo files exist in packages/react-hooks/src/useLocalStorage/demos/
- **WHEN** demos are rendered in react-docs
- **THEN** demos should demonstrate the hook usage in React
- **AND** demos should match Vue demo functionality
- **AND** demos should be registered in the registry

### Requirement: React Hooks Demo Integration

The system SHALL integrate all React Hooks demos into the react-docs application with proper metadata extraction.

#### Scenario: React Hooks demos are registered and discoverable

- **GIVEN** React Hooks demo files exist in their respective directories
- **WHEN** react-docs application starts
- **THEN** all Hooks demos should be registered in the registry
- **AND** the Hooks documentation pages should display all demos
- **AND** API metadata (parameters, return values) should be automatically extracted

#### Scenario: Hooks API metadata displays parameters and return values

- **GIVEN** any React Hook demo file
- **WHEN** the demo is rendered in the documentation
- **THEN** the API table should display all hook parameters with types
- **AND** the API table should display all return values with types
- **AND** the metadata should be consistent with Vue hooks
