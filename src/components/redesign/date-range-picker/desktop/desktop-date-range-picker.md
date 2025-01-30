# DesktopDateRangePicker Component 🗓️

The `DesktopDateRangePicker` component is a date range picker designed for desktop interfaces. It uses Chakra UI's `Popover` component to display a date picker in a popover.

## Props 📋

- `isOpen` (boolean): Controls whether the popover is open.
- `onClose` (function): Function to call when the popover is closed.
- `onOpen` (function): Function to call when the popover is opened.
- `value` (Value): The currently selected date or date range.
- `tempValue` (Value): A temporary value used for intermediate selections.
- `setTempValue` (function): Function to update the temporary value.
- `onChange` (function): Function to call when the date or date range changes.

## Subcomponents 🧩

### DateInput Component 📝

The `DateInput` component is used to display the selected date or date range. It triggers the opening of the date picker popover when clicked.

### DatePicker Component 📅

The `DatePicker` component is responsible for rendering the calendar interface. It allows users to select a date or date range.

### SideControls Component 🎛️

The `SideControls` component provides additional controls for the date picker, such as buttons to clear the selection or apply the selected date range.

## Usage Example 🚀

```tsx
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import AppDateRangePicker from "./AppDateRangePicker";

const Example = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Box>
      <AppDateRangePicker value={value} onChange={setValue} />
    </Box>
  );
};

export default Example;
```

This example demonstrates how to use the `AppDateRangePicker` component, which internally uses the `DesktopDateRangePicker` for desktop interfaces.
