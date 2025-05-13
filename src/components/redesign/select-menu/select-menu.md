# 🔽 SelectMenu Component Documentation

## 📝 Overview

The `SelectMenu` is a responsive, versatile dropdown component that provides a consistent user experience across both desktop and mobile devices. It automatically switches between a dropdown menu for desktop and a bottom drawer for mobile screens.

## ✨ Features

- 📱 Responsive design (desktop dropdown, mobile drawer)
- ✅ Support for single or multiple selection
- ☑️ Optional checkboxes for selection visualization
- 📄 Support for description text for menu items
- 🎨 Consistent styling with the application design system
- 🧩 Customizable placeholder text and icons

## 🛠️ Installation

The `SelectMenu` component is part of the redesign components and can be imported directly from the select-menu folder:

```tsx
import SelectMenu from "components/redesign/select-menu/SelectMenu";
```

## 📋 Usage

### Basic Usage

```tsx
import SelectMenu from "components/redesign/select-menu/SelectMenu";

function MyComponent() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  
  return (
    <SelectMenu 
      items={options} 
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select an option"
    />
  );
}
```

### Multiple Selection

```tsx
import SelectMenu from "components/redesign/select-menu/SelectMenu";

function MyMultiSelectComponent() {
  const [selectedValues, setSelectedValues] = React.useState([]);
  
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  
  return (
    <SelectMenu 
      items={options} 
      value={selectedValues}
      onChange={setSelectedValues}
      placeholder="Select options"
      multiple={true}
      showCheckbox={true}
    />
  );
}
```

### With Descriptions

```tsx
import SelectMenu from "components/redesign/select-menu/SelectMenu";

function MyComponentWithDescriptions() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const options = [
    { 
      label: "Digital Product", 
      value: "digital", 
      labelDescription: "Non-physical items" 
    },
    { 
      label: "Physical Product", 
      value: "physical", 
      labelDescription: "Tangible items" 
    },
  ];
  
  return (
    <SelectMenu 
      items={options} 
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="Select product type"
    />
  );
}
```

## 📊 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `SelectItem[]` | Required | Array of select options |
| showCheckbox | `boolean` | `false` | Whether to show checkboxes next to options |
| multiple | `boolean` | `false` | Whether multiple selection is allowed |
| value | `string \| string[] \| null` | `null` or `[]` | Currently selected value(s) |
| onChange | `function` | - | Callback when selection changes |
| placeholder | `string` | `"Select"` | Text to show when no selection |
| mobileModeIcon | `React.ReactNode` | - | Custom icon for mobile mode |
| showSelectedAsPlaceholder | `boolean` | - | Show selected item as placeholder |

### SelectItem Interface

```typescript
interface SelectItem {
  label: string;            // Display text for this option
  labelDescription?: string; // Optional description text
  value: string | boolean;   // Value for this option
}
```

## 🖥️ Component Architecture

The `SelectMenu` component is composed of several subcomponents:

1. **Main Component**: `SelectMenu` - Determines whether to use desktop or mobile view
2. **Desktop Components**:
   - `SelectMenuDesktop` - Main desktop dropdown implementation
   - `SelectMenuItem` - Individual option in desktop dropdown
3. **Mobile Components**:
   - `SelectMenuMobile` - Drawer-based mobile implementation
   - `MobileMenuItem` - Individual option in mobile drawer
   - `MobileModeButton` - Button that opens the mobile drawer

## 🎨 Styling

The component uses a consistent style system defined in the `styles.ts` file:
- Border radius of `8px` for consistent rounded corners
- Dark mode-friendly color scheme
- Hover states for interactive elements
- Green accent color (`#2BCFA1`) for selected items

## 🔄 Selection Logic

The component handles selection differently depending on the `multiple` prop:

- **Single selection** (`multiple=false`):  
  Only one item can be selected. Selecting an item replaces any previous selection.

- **Multiple selection** (`multiple=true`):  
  Multiple items can be selected. Selections are toggled on/off.

## 📱 Responsive Behavior

- **Desktop** (> 768px): Shows a traditional dropdown menu
- **Mobile** (≤ 768px): Uses a bottom drawer that slides up

## 🧠 Advanced Customization

### Custom Mobile Mode Icon

```tsx
import { PhoneIcon } from '@chakra-ui/icons';

<SelectMenu
  items={options}
  value={selectedValue}
  onChange={setSelectedValue}
  mobileModeIcon={<PhoneIcon color="white" />}
/>
```

### Best Practices

- Always provide meaningful labels for accessibility
- Use consistent placeholder text across similar select menus
- Consider adding aria labels for improved accessibility