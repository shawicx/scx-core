# react-ui-demos Specification

## Purpose

TBD - created by archiving change add-component-demos. Update Purpose after archive.

## Requirements

### Requirement: Card Component Demos

The system SHALL provide comprehensive demo files for the React Card component to demonstrate its usage patterns.

#### Scenario: Basic Card demo demonstrates default rendering

- **GIVEN** a CardBasic.demo.tsx file exists in packages/react-ui/src/card/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the Card component should display with default props
- **AND** the demo should show the basic usage pattern

#### Scenario: Card with mode demo demonstrates different modes

- **GIVEN** a CardWithMode.demo.tsx file exists in packages/react-ui/src/card/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the Card component should display in different modes (DEFAULT, GRADIENT_BORDER)
- **AND** the demo should show how to switch between modes

#### Scenario: Custom Card demo demonstrates styling capabilities

- **GIVEN** a CardCustom.demo.tsx file exists in packages/react-ui/src/card/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the Card component should display with custom styles
- **AND** the demo should show how to customize the Card appearance

### Requirement: Caption Component Demos

The system SHALL provide comprehensive demo files for the React Caption component to demonstrate its usage patterns.

#### Scenario: Basic Caption demo demonstrates default rendering

- **GIVEN** a CaptionBasic.demo.tsx file exists in packages/react-ui/src/caption/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the Caption component should display with default props
- **AND** the demo should show the basic usage pattern

#### Scenario: Caption with text demo demonstrates text content

- **GIVEN** a CaptionWithText.demo.tsx file exists in packages/react-ui/src/caption/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the Caption component should display with text content
- **AND** the demo should show how to use Caption with different text

### Requirement: GradientBorder Component Demos

The system SHALL provide comprehensive demo files for the React GradientBorder component to demonstrate its usage patterns.

#### Scenario: Basic GradientBorder demo demonstrates default rendering

- **GIVEN** a GradientBorderBasic.demo.tsx file exists in packages/react-ui/src/gradient-border/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the GradientBorder component should display with default props
- **AND** the demo should show the basic usage pattern

#### Scenario: GradientBorder with placement demo demonstrates different placements

- **GIVEN** a GradientBorderWithPlacement.demo.tsx file exists in packages/react-ui/src/gradient-border/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the GradientBorder component should display with different placements
- **AND** the demo should show how to configure placement options

### Requirement: AMap Component Demos

The system SHALL provide comprehensive demo files for the React AMap component to demonstrate its usage patterns.

#### Scenario: Basic AMap demo demonstrates default rendering

- **GIVEN** an AMapBasic.demo.tsx file exists in packages/react-ui/src/a-map/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the AMap component should display with default props
- **AND** the demo should show the basic usage pattern
- **AND** the map should load successfully with default center

#### Scenario: AMap with marker demo demonstrates marker usage

- **GIVEN** an AMapWithMarker.demo.tsx file exists in packages/react-ui/src/a-map/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the AMap component should display with markers
- **AND** the demo should show how to add markers to the map

#### Scenario: Custom AMap demo demonstrates configuration capabilities

- **GIVEN** an AMapCustom.demo.tsx file exists in packages/react-ui/src/a-map/demos/
- **WHEN** demo is rendered in react-docs
- **THEN** the AMap component should display with custom configuration
- **AND** the demo should show how to customize map settings (zoom, center, etc.)

### Requirement: React UI Demo Integration

The system SHALL integrate all React UI component demos into the react-docs application with proper metadata extraction.

#### Scenario: Card demos are registered and discoverable

- **GIVEN** Card demo files exist in packages/react-ui/src/card/demos/
- **WHEN** react-docs application starts
- **THEN** all Card demos should be registered in the registry
- **AND** the Card component page should display all demos
- **AND** API metadata (Props, Events) should be automatically extracted

#### Scenario: Caption demos are registered and discoverable

- **GIVEN** Caption demo files exist in packages/react-ui/src/caption/demos/
- **WHEN** react-docs application starts
- **THEN** all Caption demos should be registered in the registry
- **AND** the Caption component page should display all demos
- **AND** API metadata should be automatically extracted

#### Scenario: GradientBorder demos are registered and discoverable

- **GIVEN** GradientBorder demo files exist in packages/react-ui/src/gradient-border/demos/
- **WHEN** react-docs application starts
- **THEN** all GradientBorder demos should be registered in the registry
- **AND** the GradientBorder component page should display all demos
- **AND** API metadata should be automatically extracted

#### Scenario: AMap demos are registered and discoverable

- **GIVEN** AMap demo files exist in packages/react-ui/src/a-map/demos/
- **WHEN** react-docs application starts
- **THEN** all AMap demos should be registered in the registry
- **AND** the AMap component page should display all demos
- **AND** API metadata should be automatically extracted
