# preview-container Specification

## Purpose

TBD - created by archiving change add-preview-container-packages. Update Purpose after archive.

## Requirements

### Requirement: Preview Component

The system SHALL provide a Preview component that renders components in a unified, styled container for documentation purposes.

#### Scenario: Display component with title and description

- **WHEN** a user adds a Preview component with title and description props
- **THEN** the container displays the title and description in a header section
- **AND** the header has a background color of #fafafa with a bottom border

#### Scenario: Configure container width

- **WHEN** a user specifies width prop as 'full' | 'container' | 'narrow'
- **THEN** the container applies the corresponding width constraint
- **AND** default width is 'container' (max-width: 1200px, margin: 0 auto)

#### Scenario: Configure background color

- **WHEN** a user specifies background prop as 'white' | 'gray' | 'transparent'
- **THEN** the content area uses the specified background color
- **AND** default background is 'white'

#### Scenario: Add border to container

- **WHEN** a user sets bordered prop to true
- **THEN** the content area displays a 1px solid #e8e8e8 border
- **AND** default bordered is false

### Requirement: Code Block Component

The system SHALL provide a CodeBlock component that displays code examples with syntax highlighting and copy functionality.

#### Scenario: Display code with line numbers

- **WHEN** a user sets showLineNumbers prop to true
- **THEN** the code block displays line numbers on the left side
- **AND** line numbers use monospace font with light gray color

#### Scenario: Copy code to clipboard

- **WHEN** a user clicks the copy button
- **THEN** the code content is copied to the clipboard
- **AND** the button shows "✓ 已复制" feedback for 2 seconds
- **AND** the button text reverts to "复制" after feedback

#### Scenario: Display code block title

- **WHEN** a user provides a title prop
- **THEN** the code block header displays the title
- **AND** the title is positioned on the left side of the header

#### Scenario: Configure code language

- **WHEN** a user specifies language prop as 'tsx' | 'ts' | 'vue' | 'javascript'
- **THEN** the code block applies syntax highlighting for the specified language
- **AND** default language is 'typescript'

### Requirement: Preview Container Component

The system SHALL provide a PreviewContainer component that combines Preview and CodeBlock for convenient demo display.

#### Scenario: Display preview and code vertically

- **WHEN** a user does not specify layout prop or sets it to 'vertical'
- **THEN** the Preview component is displayed above the CodeBlock component
- **AND** there is a 16px margin between preview and code

#### Scenario: Display preview and code horizontally

- **WHEN** a user sets layout prop to 'horizontal'
- **THEN** the Preview component is displayed on the left side
- **AND** the CodeBlock component is displayed on the right side
- **AND** both components share equal height

#### Scenario: Toggle code display

- **WHEN** a user sets showCode prop to false
- **THEN** only the Preview component is rendered
- **AND** the CodeBlock component is hidden
- **AND** default showCode is true

#### Scenario: Inherit Preview props

- **WHEN** a user provides Preview-specific props (title, description, width, background, bordered)
- **THEN** these props are passed through to the Preview component
- **AND** the Preview component renders with the specified configuration

### Requirement: Responsive Design

The system SHALL ensure preview containers and code blocks are responsive across different screen sizes.

#### Scenario: Desktop display (1920x1080)

- **WHEN** viewing on desktop screen
- **THEN** container uses full width or container width as specified
- **AND** layout uses vertical or horizontal as specified
- **AND** code block scrolls horizontally if code exceeds width

#### Scenario: Tablet display (768x1024)

- **WHEN** viewing on tablet screen
- **THEN** container uses full width on smaller screens
- **AND** horizontal layout automatically switches to vertical
- **AND** font sizes and spacing are adjusted appropriately

#### Scenario: Mobile display (375x667)

- **WHEN** viewing on mobile screen
- **THEN** container uses full width (100%)
- **AND** horizontal layout forces to vertical
- **AND** copy button is accessible with sufficient touch target size (minimum 44x44px)
- **AND** code block content scrolls horizontally if needed

### Requirement: Cross-Browser Compatibility

The system SHALL ensure preview containers and code blocks work consistently across modern browsers.

#### Scenario: Chrome compatibility

- **WHEN** viewing in Chrome latest version
- **THEN** all components render correctly
- **AND** copy to clipboard functionality works
- **AND** scroll behavior is smooth

#### Scenario: Firefox compatibility

- **WHEN** viewing in Firefox latest version
- **THEN** all components render correctly
- **AND** copy to clipboard functionality works
- **AND** scroll behavior is smooth

#### Scenario: Safari compatibility

- **WHEN** viewing in Safari latest version
- **THEN** all components render correctly
- **AND** copy to clipboard functionality works
- **AND** scroll behavior is smooth

#### Scenario: Edge compatibility

- **WHEN** viewing in Edge latest version
- **THEN** all components render correctly
- **AND** copy to clipboard functionality works
- **AND** scroll behavior is smooth

### Requirement: Package Structure

The system SHALL provide separate packages for React and Vue preview container components.

#### Scenario: React package exports

- **WHEN** importing from @scxfe/docs-preview-react
- **THEN** Preview, CodeBlock, and PreviewContainer components are exported
- **AND** components have TypeScript type definitions
- **AND** package builds successfully with tsup

#### Scenario: Vue package exports

- **WHEN** importing from @scxfe/docs-preview-vue
- **THEN** Preview, CodeBlock, and PreviewContainer components are exported
- **AND** components have TypeScript type definitions
- **AND** package builds successfully with vite
