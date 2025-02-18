# DateInput Component 🗓️

The `DateInput` component displays the selected date range in an input-like format.

## Props

- `selectedDate (Date | [Date, Date])`: The selected date range value.
- `onClick (function)`: Callback function when the input is clicked.

## Usage

```tsx
import DateInput from './DateInput';

<DateInput selectedDate={[new Date(), new Date()]} onClick={() => console.log('Clicked')} />
```

## Description

The `DateInput` component shows the selected date range in a user-friendly format. It triggers the `onClick` callback when the user clicks on the input, typically to open the date picker.

## Example

```tsx
<DateInput
  selectedDate={[new Date('2023-01-01'), new Date('2023-12-31')]}
  onClick={() => console.log('Input clicked')}
/>
```
