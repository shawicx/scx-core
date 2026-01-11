# Spec: Vue UI Component Demos

## ADDED Requirements

### Requirement: Card Component Demos

The system SHALL provide comprehensive demo files for the Vue Card component to demonstrate its usage patterns.

#### Scenario: Basic Card demo demonstrates default rendering

- **GIVEN** a CardBasic.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Card component should display with default props
- **AND** the demo should show the basic usage pattern

#### Scenario: Card with actions demo demonstrates interactive usage

- **GIVEN** a CardWithActions.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Card component should display with action buttons
- **AND** the demo should show how to handle user interactions

#### Scenario: Custom Card demo demonstrates styling capabilities

- **GIVEN** a CardCustom.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Card component should display with custom styles
- **AND** the demo should show how to customize the Card appearance

### Requirement: Counter Component Demos

The system SHALL provide comprehensive demo files for the Vue Counter component to demonstrate its usage patterns.

#### Scenario: Basic Counter demo demonstrates default rendering

- **GIVEN** a CounterBasic.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Counter component should display with default props
- **AND** the demo should show the basic usage pattern

#### Scenario: Counter with min/max demo demonstrates range constraints

- **GIVEN** a CounterWithMinMax.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Counter component should enforce min and max values
- **AND** the demo should show how to configure range constraints

#### Scenario: Custom Counter demo demonstrates styling capabilities

- **GIVEN** a CounterCustom.demo.vue file exists in packages/vue-ui/components/demos/
- **WHEN** the demo is rendered in vue-docs
- **THEN** the Counter component should display with custom styles
- **AND** the demo should show how to customize the Counter appearance

### Requirement: Vue UI Demo Integration

The system SHALL integrate all Vue UI component demos into the vue-docs application with proper metadata extraction.

#### Scenario: Card demos are registered and discoverable

- **GIVEN** Card demo files exist in packages/vue-ui/components/demos/
- **WHEN** vue-docs application starts
- **THEN** all Card demos should be registered in the registry
- **AND** the Card component page should display all demos
- **AND** API metadata should be automatically extracted

#### Scenario: Counter demos are registered and discoverable

- **GIVEN** Counter demo files exist in packages/vue-ui/components/demos/
- **WHEN** vue-docs application starts
- **THEN** all Counter demos should be registered in the registry
- **AND** the Counter component page should display all demos
- **AND** API metadata should be automatically extracted
