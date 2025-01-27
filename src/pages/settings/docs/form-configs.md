# Settings Form Configuration Documentation 📝

## Overview 🎯
This document explains the form configuration used in the Settings page, including the validation schema and initial values setup.

## Interface Structure 🏗️

### ISettings Interface
```typescript
interface ISettings {
    name: string;                 // Shop name
    email: string;               // User email
    pre_purchase_data_fetch: string; // Pre-purchase data configuration
    isAgeRestricted: boolean;    // Age restriction flag
    currencyAbbreviation: string; // Shop currency
    paymentMethods: {...}[];      // Available payment methods
    paymentWallets: {...}[];      // Payment wallet configurations
    loginMethods: {...}[];        // Available login methods
}
```

## Validation Schema ✅

The form uses Yup for validation with the following rules:

- **name**: Required field for shop name
- **email**: Required, must be a valid email format
- **pre_purchase_data_fetch**: Optional string
- **isAgeRestricted**: Optional boolean
- **currencyAbbreviation**: Required currency selection
- **paymentMethods**: Optional array of payment configurations
- **paymentWallets**: Optional array of wallet configurations
- **loginMethods**: Optional array of login method configurations

## Initial Values Helper 🚀

The `getSettingsPageInitValues` function merges shop and user data:

```typescript
getSettingsPageInitValues(shopData, userData) => {
    // Returns an object with default values from shop and user data
    // Falls back to empty/null values if data is missing
}
```

## Usage Example 💡

```typescript
import { getSettingsPageInitValues, settingsPageSchema } from './formConfigs';

// In your form component:
<Formik
    initialValues={getSettingsPageInitValues(shop, user)}
    validationSchema={settingsPageSchema}
    onSubmit={handleSubmit}
>
    {/* Form content */}
</Formik>
```

## Tips 💪
- Always validate the form data against the schema before submission
- Use TypeScript for better type checking with the ISettings interface
- Initialize missing values with appropriate defaults using getSettingsPageInitValues

## Common Issues & Solutions 🔧

1. **Missing Currency**: 
   - Ensure currency is selected, it's a required field
   - Default: `null`

2. **Payment Methods**:
   - Optional array but each item must have type and isActive
   - Default: `[]`

3. **Email Validation**:
   - Must be a valid email format
   - Required field with helpful error message
