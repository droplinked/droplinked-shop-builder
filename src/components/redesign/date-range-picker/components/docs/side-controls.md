# SideControls Component 📅

The `SideControls` component provides quick date range selection options for the Date Range Picker.

## Props

- `setTempValue (function)`: A function to set the temporary date range value.

## Usage

```tsx
import SideControls from './SideControls';

<SideControls setTempValue={setTempValue} />
```

## Description

The `SideControls` component renders a list of predefined date range options such as "Today", "This Week", "Last Week", etc. When a user clicks on any of these options, the corresponding date range is set using the `setTempValue` function.

## Example

```tsx
<SideControls setTempValue={(value) => console.log(value)} />
```
