# ControlButtons Component 🎛️

The `ControlButtons` component provides buttons to confirm or discard the selected date range.

## Props

- `value (Date | [Date, Date])`: The current date range value.
- `tempValue (Date | [Date, Date])`: The temporary date range value.
- `onClose (function)`: Callback function when the control buttons are closed.
- `onChange (function)`: Callback function when the date range changes.
- `setTempValue (function)`: Function to set the temporary date range value.

## Usage

```tsx
import ControlButtons from './ControlButtons';

<ControlButtons
  value={[new Date(), new Date()]}
  tempValue={[new Date(), new Date()]}
  onClose={() => console.log('Closed')}
  onChange={(value) => console.log(value)}
  setTempValue={(value) => console.log(value)}
/>
```

## Description

The `ControlButtons` component renders "Discard" and "Confirm" buttons to manage the selected date range. The "Discard" button reverts to the original date range, while the "Confirm" button applies the temporary date range.

## Example

```tsx
<ControlButtons
  value={[new Date('2023-01-01'), new Date('2023-12-31')]}
  tempValue={[new Date('2023-06-01'), new Date('2023-06-30')]}
  onClose={() => console.log('Closed')}
  onChange={(value) => console.log('Confirmed', value)}
  setTempValue={(value) => console.log('Temp value set', value)}
/>
```
