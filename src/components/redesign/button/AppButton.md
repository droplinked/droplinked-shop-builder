# AppButton Component

A flexible, styled button component built on top of Chakra UI's Button component. This component provides consistent styling across the application with support for multiple variants, sizes, and icon placements.

## Features

- **Multiple Variants**: normal, filled, outlined, secondary
- **Multiple Sizes**: sm (small), md (medium), lg (large)
- **Icon Support**: Left and right icon placement
- **Accessibility**: Inherits all accessibility features from Chakra UI Button
- **State Management**: Visual feedback for hover, active, and disabled states
- **Theme Integration**: Uses theme tokens for consistent styling

## Installation

This component is part of the internal component library and doesn't require separate installation.

## Usage

```tsx
import AppButton from 'components/redesign/button/AppButton';
import { Icon } from '@chakra-ui/icons';

// Basic usage
<AppButton>Click me</AppButton>

// With variant and size
<AppButton variant="outlined" size="lg">Large Outlined Button</AppButton>

// With icons
<AppButton 
  variant="filled" 
  iconLeft={<Icon as={ArrowBackIcon} />}
  iconRight={<Icon as={ArrowForwardIcon} />}
>
  Navigate
</Button>

// Disabled state
<AppButton isDisabled>Disabled Button</AppButton>
```

## Props

The AppButton component accepts all props from Chakra UI's Button component plus the following additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'normal' \| 'filled' \| 'outlined' \| 'secondary'` | `'filled'` | Visual style variant of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `iconLeft` | `ReactElement \| null` | `null` | Icon component to display on the left side |
| `iconRight` | `ReactElement \| null` | `null` | Icon component to display on the right side |

## Variants

### Normal
A transparent button that is useful for low-emphasis actions or in dense UIs.

### Filled
The default button style with a solid background color. Used for primary actions.

### Outlined
A button with a border and transparent background. Used for secondary actions.

### Secondary
An alternative filled style with different colors. Used for alternate primary actions.

## Sizes

### Small (sm)
- Height: 32px
- Font Size: 14px
- Line Height: 16px
- Border Radius: 4px

### Medium (md)
- Height: 40px
- Font Size: 14px
- Line Height: 20px
- Border Radius: 8px

### Large (lg)
- Height: 48px
- Font Size: 16px
- Line Height: 24px
- Border Radius: 8px

## Design and Styling

The button styling follows the CSS box model principle for organization:
1. Positioning and layout properties
2. Box model properties (dimensions, padding, margin, border)
3. Visual properties (background)
4. Typography properties (color, font)

Styling is maintained in a separate `ButtonStyles.ts` file for better organization and maintainability.

## Accessibility

The component inherits all accessibility features from the Chakra UI Button component, including:
- Keyboard navigation
- ARIA attributes
- Focus management

## Examples

### Basic Buttons in Different Variants

```tsx
<>
  <AppButton variant="normal">Normal</AppButton>
  <AppButton variant="filled">Filled</AppButton>
  <AppButton variant="outlined">Outlined</AppButton>
  <AppButton variant="secondary">Secondary</AppButton>
</>
```

### Buttons in Different Sizes

```tsx
<>
  <AppButton size="sm">Small</AppButton>
  <AppButton size="md">Medium</AppButton>
  <AppButton size="lg">Large</AppButton>
</>
```

### Buttons with Icons

```tsx
<>
  <AppButton iconLeft={<SearchIcon />}>Search</Button>
  <AppButton iconRight={<ArrowForwardIcon />}>Next</Button>
  <AppButton iconLeft={<EmailIcon />} iconRight={<ExternalLinkIcon />}>SendEmail</Button>
</>
```

### Disabled Buttons

```tsx
<>
  <AppButton variant="normal" isDisabled>Normal</AppButton>
  <AppButton variant="filled" isDisabled>Filled</AppButton>
  <AppButton variant="outlined" isDisabled>Outlined</AppButton>
  <AppButton variant="secondary" isDisabled>Secondary</AppButton>
</>
```

## Best Practices

1. Use the appropriate variant based on the importance of the action:
   - `filled` or `secondary` for primary actions
   - `outlined` for secondary actions
   - `normal` for tertiary actions

2. Maintain consistent sizing across similar UI elements:
   - `lg` for page-level primary actions
   - `md` for most interface actions
   - `sm` for compact UIs or button groups

3. Use clear, concise button text that describes the action

4. Add icons only when they enhance understanding of the action

## Code Architecture

The AppButton component is structured with clear separation of concerns:

- `AppButton.tsx`: The main component implementation
- `AppButtonStyles.ts`: Style configurations organized by variants and sizes
- Interface `AppButtonProps` defines the component's props

## Maintenance Notes

When modifying the Button component:

1. Keep style changes in the separate `AppButtonStyles.ts` file
2. Maintain CSS box model property ordering in the component
3. Update documentation if adding new variants or sizes
4. Ensure all states (default, hover, active, disabled) are styled for new variants