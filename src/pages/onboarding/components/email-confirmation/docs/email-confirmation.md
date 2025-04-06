# 📧 Email Confirmation Component

## Overview
The Email Confirmation component handles the verification process of user emails during onboarding.

## 🔍 Component Details
- **Component Name**: `EmailConfirmation`
- **Location**: `src/pages/onboarding/components/email-confirmation/EmailConfirmation.tsx`
- **Type**: React Functional Component

## 📋 Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| onBack | `() => void` | Callback function to handle navigation to previous step |

## 🎯 Features
- Email verification using OTP (One-Time Password)
- Resend code functionality
- Loading states for verification and resend actions
- Back navigation option
- Input state management (default/error/success)

## 🪝 Custom Hook Usage
Uses `useEmailVerification` hook which provides:
- `otp`: Current OTP value
- `inputState`: Current input state
- `onOtpChange`: OTP change handler
- `verifyEmail`: Email verification function
- `resendCode`: Code resend function
- `verifyLoading`: Verification loading state
- `resendLoading`: Resend loading state
- `loginLoading`: Login loading state

## 💡 Example Usage
```tsx
<EmailConfirmation onBack={() => navigate(-1)} />
```

## 🔄 Component Flow
1. User receives email with verification code
2. User enters 6-digit code in OTP field
3. System verifies the code
4. On success: Proceeds to next step
5. On failure: Shows error state
6. User can request new code or go back to change email

## 🎨 UI Components Used
- ChakraUI components (Box, Flex, Spinner, Text)
- Custom Button component
- OtpField component
- InteractiveText component
- OnboardingStepHeader component
