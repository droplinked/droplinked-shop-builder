# 🔢 OTP Field Component

## Overview
A customizable OTP (One-Time Password) input field component built with ChakraUI.

## 🔍 Component Details
- **Component Name**: `OtpField`
- **Location**: `src/pages/onboarding/components/email-confirmation/OtpField.tsx`
- **Type**: React Functional Component

## 📋 Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| value | `string` | Current OTP value |
| onChange | `(value: string) => void` | Callback for OTP changes |
| state | `"default" \| "error" \| "success"` | Visual state of the input |
| isLoading | `boolean` | Loading state of the field |

## 🎨 Visual States
1. **Default**
   - Border: `#292929`
   - Focus Border: `#fff`
   - Hover Border: `#616161`
   - Color: `#fff`
   - Background: `transparent`

2. **Error**
   - Border: `#FF2244`
   - Focus Border: `#FF2244`
   - Color: `#FF2244`
   - Background: `rgba(255, 34, 68, 0.05)`

3. **Success**
   - Border: `#2BCFA1`
   - Focus Border: `#2BCFA1`
   - Color: `#2BCFA1`
   - Background: `rgba(43, 207, 161, 0.10)`

## 📱 Responsive Design
- Base (Mobile):
  - Field Size: 48x48px
  - Margin Top: 0px
  - Margin Bottom: 48px
  - Gap: 4

- MD (Desktop):
  - Field Size: 64x64px
  - Margin Top: 38px
  - Margin Bottom: 80px
  - Gap: 6

## 💡 Example Usage
```tsx
<OtpField
  value={otpValue}
  onChange={handleOtpChange}
  state="default"
  isLoading={false}
/>
```

## ⚙️ Features
- 6-digit OTP input
- Customizable visual states
- Loading state support
- Responsive design
- Keyboard navigation
- Placeholder support
- Individual field styling
- Focus management

## 🎯 Implementation Notes
- Uses ChakraUI's PinInput component
- Automatically focuses next field on input
- Supports paste functionality
- Maintains consistent styling across states
- Handles disabled state during loading
