# 📱 Mobile Date Range Picker Documentation

## Overview
The Mobile Date Range Picker is a responsive component designed for selecting date ranges on mobile devices. It provides a drawer-based interface with tabs for filters and date selection.

## 🧩 Component Structure

### MobileDateRangePicker

This is the main component that manages the state and renders the drawer with tabs for date range selection.

#### Props
- `isOpen: boolean` - Controls the visibility of the drawer.
- `onClose: () => void` - Function to close the drawer.
- `value: Value` - The current date range value.
- `tempValue: Value` - A temporary date range value used for intermediate selections.
- `onChange: (value: Value) => void` - Function to update the date range value.
- `setTempValue: (value: Value) => void` - Function to update the temporary date range value.

#### Usage
```tsx
<MobileDateRangePicker
  isOpen={isOpen}
  onClose={onClose}
  value={value}
  tempValue={tempValue}
  onChange={onChange}
  setTempValue={setTempValue}
/>
```

### TabsList

This component renders the list of tabs in the drawer.

#### Props
- `tabs: { title: string; content: React.ReactNode }[]` - An array of tab objects containing the title and content for each tab.

#### Usage
```tsx
<TabsList tabs={tabs} />
```

### FiltersTab

This component renders the filters tab content.

#### Props
- `setTempValue: (value: Value) => void` - Function to update the temporary date range value.

#### Usage
```tsx
<FiltersTab setTempValue={setTempValue} />
```

### DatePickerTab

This component renders the date picker tab content.

#### Props
- `value: Value` - The current date range value.
- `onChange: (value: Value) => void` - Function to update the date range value.

#### Usage
```tsx
<DatePickerTab value={value} onChange={onChange} />
```

## 🛠️ Helper Components

### ControlButtons

This component renders the control buttons (e.g., Apply, Cancel) at the bottom of the drawer.

#### Props
- `value: Value` - The current date range value.
- `tempValue: Value` - A temporary date range value used for intermediate selections.
- `onChange: (value: Value) => void` - Function to update the date range value.
- `setTempValue: (value: Value) => void` - Function to update the temporary date range value.
- `onClose: () => void` - Function to close the drawer.

#### Usage
```tsx
<ControlButtons
  value={value}
  tempValue={tempValue}
  onChange={onChange}
  setTempValue={setTempValue}
  onClose={onClose}
/>
```

### DateRangeFooter

This component renders the footer content in the drawer.

#### Props
- `value: Value` - The current date range value.

#### Usage
```tsx
<DateRangeFooter value={tempValue} />
```

## 📚 Example

Here is an example of how to use the `MobileDateRangePicker` component in a parent component:

```tsx
import React, { useState } from 'react';
import AppDateRangePicker from './AppDateRangePicker';

const ParentComponent = () => {
  const [value, setValue] = useState<Value>([new Date(), new Date()]);

  return (
    <AppDateRangePicker
      value={value}
      onChange={setValue}
    />
  );
};

export default ParentComponent;
