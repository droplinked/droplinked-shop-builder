# 📅 AppDateRangePicker Documentation

A fully customized date range picker component with responsive design, supporting both mobile and desktop views.

## 🎯 Features

- Responsive design with dedicated mobile and desktop layouts
- Temporary state management for date selection
- Controlled component pattern
- Custom date input display

## 🧩 Component Structure

```
AppDateRangePicker
├── DateInput
├── DesktopDateRangePicker
└── MobileDateRangePicker
```

## 📚 Component Details

### 1. AppDateRangePicker
The root component handling responsive switching and state management.

**Props:**
- `value: Value` - Selected date range ([ValuePiece, ValuePiece] | ValuePiece)
- `onChange: (value: Value) => void` - Change handler
- `...rest` - Additional DateRangePickerProps

**State Management:**
```typescript
type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

const [tempValue, setTempValue] = useState<Value>(value);
const { isOpen, onClose, onOpen } = useDisclosure();
```

**Responsive Behavior:**
```typescript
const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
```

### 2. DateInput
Custom input component for displaying selected dates.

**Props:**
- `value: Value` - Current date range
- `onClick: () => void` - Click handler for opening picker

### 3. DesktopDateRangePicker
Desktop-specific implementation with expanded layout.

**Props:**
- `value: Value` - Selected date range
- `onChange: (value: Value) => void` - Change handler
- `isOpen: boolean` - Visibility state
- `onClose: () => void` - Close handler

### 4. MobileDateRangePicker
Mobile-optimized implementation with touch-friendly interface.

**Props:**
- `value: Value` - Selected date range
- `onChange: (value: Value) => void` - Change handler
- `isOpen: boolean` - Visibility state
- `onClose: () => void` - Close handler

## 🎨 Styling Dependencies

```typescript
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
```

## 📖 Usage Example

```tsx
import AppDateRangePicker from './components/redesign/date-range-picker/AppDateRangePicker';

function MyComponent() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);

  return (
    <AppDateRangePicker
      value={dateRange}
      onChange={setDateRange}
    />
  );
}
```

## 🔄 State Management

1. **Temporary Value Management:**
   ```typescript
   useEffect(() => {
     if (!isOpen) {
       setTempValue(value);
     }
   }, [isOpen]);
   ```
   - Resets temporary value when picker closes
   - Ensures synchronization with parent component

2. **Responsive Display:**
   - Uses Chakra UI's useMediaQuery hook
   - Automatically switches between mobile/desktop views
   - Breakpoint set at 768px