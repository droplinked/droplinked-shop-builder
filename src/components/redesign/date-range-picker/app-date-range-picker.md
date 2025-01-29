# 📅 AppDateRangePicker Documentation

A fully customized date range picker component with a modern dark theme design and preset date ranges.

## 🎯 Features

- Preset date range options (Today, This Week, Last Week, etc.)
- Custom date range selection
- Controlled component with value/onChange pattern
- Responsive design
- Custom date formatting
- Confirmation/Discard functionality

## 🧩 Component Structure

```
AppDateRangePicker
├── DateInput
├── SideControls
├── DateRangePicker (third-party)
├── DateRangeFooter
└── ControlButtons
```

## 📚 Main Components

### 1. AppDateRangePicker
The root component that orchestrates all functionality.

**Props:**
- `value: [Date | null, Date | null]` - Selected date range
- `onChange: (value: [Date | null, Date | null]) => void` - Change handler

### 2. DateInput
Displays the selected date range in a clickable input format.

**Props:**
- `selectedDate: [Date | null, Date | null]` - Current date range
- `onClick: () => void` - Click handler

### 3. SideControls
Quick selection panel for preset date ranges.

Available presets:
- Today
- This Week
- Last Week
- This Month
- Last Month
- This Year
- Last Year

### 4. DateRangeFooter
Displays the selected date range in MM/DD/YYYY format.

**Props:**
- `value: [Date | null, Date | null]` - Current date range

### 5. ControlButtons
Action buttons for confirming or discarding changes.

**Props:**
- `value` - Current value
- `tempValue` - Temporary selection
- `onChange` - Change handler
- `onClose` - Close handler
- `setTempValue` - Temporary value setter

## 🎨 Styling

The component uses a custom SCSS module for styling with the following key features:
- Dark theme (#1c1c1c background)
- Custom calendar navigation
- Hover and active states
- Range selection highlighting
- Custom typography (Inter font)

## 📖 Usage Example

```tsx
import AppDateRangePicker from './components/redesign/date-range-picker/AppDateRangePicker';

function MyComponent() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  return (
    <AppDateRangePicker
      value={dateRange}
      onChange={setDateRange}
    />
  );
}
```

## 🔧 Helper Functions

### getDateRange
Utility function to generate date ranges for preset options.

```typescript
getDateRange(type: string): [Date, Date]
```

Supported types:
- "Today"
- "This Week"
- "Last Week"
- "This Month"
- "Last Month"
- "This Year"
- "Last Year"

## 🎯 Best Practices

1. Always provide both value and onChange props
2. Handle null values appropriately
3. Use the component within a form context when needed
4. Consider timezone implications when working with dates

## ⚠️ Important Notes

4. Maintains temporary state while selecting dates
5. Automatically resets temporary state when closed