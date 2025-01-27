# Validation Handlers Documentation 🛡️

This documentation covers the validation handlers used in the settings page of the Droplinked Shop Builder.

## Overview 📝

The validation system ensures that users provide valid settings configuration before saving. It consists of three main validation checks:
- Payment wallet percentage validation
- Payment methods validation
- Login methods validation

## Main Validation Handler 🔍

```typescript
handleValidations({ values, showToast })
```

The main validation handler performs all checks sequentially and returns `true` only if all validations pass.

### Parameters
- `values`: Settings configuration object (ISettings)
- `showToast`: Function to display notification messages

## Individual Validators ✨

### 1. Percentage Validator 💰
```typescript
handleValidatePercentage({ values, showToast })
```
- Ensures the total percentage across destination addresses doesn't exceed 100%
- Checks both SOL and EVM wallets
- Returns `false` if any wallet's total percentage > 100
- Shows an error toast with the specific wallet type (Solana/EVM)

### 2. Payment Methods Validator 💳
```typescript
handleValidatePaymentMethods({ values, showToast })
```
- Verifies that at least one payment method is active
- Returns `false` if no payment methods are selected
- Shows an error toast prompting user to select a payment method

### 3. Login Methods Validator 🔐
```typescript
handleValidateLoginMethods({ values, showToast })
```
- Ensures at least one login method is activated
- Returns `false` if no login methods are selected
- Shows an error toast prompting user to select a login method

## Usage Example 💡

```typescript
const result = handleValidations({
  values: settingsConfig,
  showToast: toastFunction
});

if (result) {
  // Proceed with saving settings
} else {
  // Validation failed, check toast messages
}
```

## Error Messages 🚨

All validation errors are displayed using toast notifications with:
- Error type indicator
- Descriptive message
- 5-second auto-close duration
