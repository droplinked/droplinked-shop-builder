# ✉️ useEmailVerification Hook

## Overview
Manages email verification process including OTP handling and code resending.

## 🔄 Returns
```typescript
{
    otp: string;                    // Current OTP value
    inputState: 'default' | 'error' | 'success';  // OTP input state
    onOtpChange: (value: string) => void;         // OTP change handler
    verifyEmail: () => Promise<void>;             // Verify OTP function
    resendCode: () => void;                       // Resend OTP function
    verifyLoading: boolean;                       // Verification loading state
    resendLoading: boolean;                       // Resend loading state
    loginLoading: boolean;                        // Login loading state
}
```

## 💡 Usage Example
```typescript
const VerificationComponent = () => {
    const {
        otp,
        inputState,
        onOtpChange,
        verifyEmail,
        resendCode,
        verifyLoading
    } = useEmailVerification();
    
    return (
        <div>
            <OtpInput
                value={otp}
                onChange={onOtpChange}
                state={inputState}
            />
            <button onClick={verifyEmail} disabled={verifyLoading}>
                Verify
            </button>
            <button onClick={resendCode}>Resend Code</button>
        </div>
    );
}
```

## 🔄 State Flow
1. User enters OTP
2. On verification:
   - Success: Updates input state → Logs in user
   - Error: Shows error state
3. On resend:
   - Resets OTP and input state
   - Sends new verification code

## ⚠️ Dependencies
- react-query
- useAppToast
- useLogin
- useOnboardingStore
