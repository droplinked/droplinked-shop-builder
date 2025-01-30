# DatePicker Component 📅

The `DatePicker` component is a comprehensive date range picker with optional footer and control buttons.

## Props

- `value (Date | [Date, Date])`: The selected date range value.
- `onChange (function)`: Callback function when the date range changes.
- `onCalendarClose (function)`: Callback function when the calendar closes.
- `tempValue (Date | [Date, Date])`: Temporary date range value.
- `setTempValue (function)`: Function to set the temporary date range value.
- `showFooter (boolean)`: Whether to show the footer.
- `showControls (boolean)`: Whether to show control buttons.

## Description

The `DatePicker` component integrates a date range picker with additional features like a footer to display the selected date range and control buttons to confirm or discard changes.

## Example

```tsx
<DatePicker
  value={[new Date('2023-01-01'), new Date('2023-12-31')]}
  setTempValue={(value) => console.log('Temp value set', value)}
  onCalendarClose ={() => console.log("close calendar")}
  tempValue={[new Date('2023-06-01'), new Date('2023-06-30')]}
  onChange={(value) => console.log(value)}
  showFooter={true}
  showControls={true}
/>
```
