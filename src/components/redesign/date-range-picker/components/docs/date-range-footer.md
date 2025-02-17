# DateRangeFooter Component 📆

The `DateRangeFooter` component displays the selected date range in a formatted manner.

## Props

- `value (Date | [Date, Date])`: The selected date range value.

## Usage

```tsx
import DateRangeFooter from './DateRangeFooter';

<DateRangeFooter value={[new Date(), new Date()]} />
```

## Description

The `DateRangeFooter` component takes a date range value and formats it to display the start and end dates. It is typically used as a footer in the Date Range Picker to show the currently selected date range.

## Example

```tsx
<DateRangeFooter value={[new Date('2023-01-01'), new Date('2023-12-31')]} />
```
