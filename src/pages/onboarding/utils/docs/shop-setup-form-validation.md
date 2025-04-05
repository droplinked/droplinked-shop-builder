# Shop Setup Form Validation 🛠️

## Overview 📝
This utility provides validation for shop setup data during the onboarding process. It ensures all required fields meet the specified criteria.

## Interface 🔍

### `IValidateStoreData`
```typescript
interface IValidateStoreData {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
    setError?: (field: keyof OnboardingStates['storeSetupErrors'], message: string | undefined) => void
}
```

## Validation Rules ✅

### Shop URL Validation 🔗
- Required field
- Must contain only letters, numbers, and hyphens
- Pattern: `^[a-zA-Z0-9-]+$`

### Store Name Validation 🏪
- Required field
- Minimum length: 3 characters

### Description Validation 📑
- Optional field
- If provided:
  - Minimum length: 150 characters
  - Maximum length: 160 characters
  - Perfect for SEO optimization! 🎯

## Usage Example 💻

```typescript
const storeData = {
    logo: "path/to/logo.png",
    hero_section: "path/to/hero.jpg",
    shop_url: "my-awesome-shop",
    name: "Awesome Shop",
    description: "Welcome to my awesome shop where you can find the most amazing products. We specialize in providing high-quality items that will exceed your expectations."
};

const handleError = (field, message) => {
    console.log(`Error in ${field}: ${message}`);
};

const isValid = validateStoreData(storeData, handleError);
```

## Return Value 🔄
- Returns `boolean`
- `true`: All validations passed
- `false`: One or more validations failed

## Error Handling 🚨
Errors are handled through the `setError` callback function which receives:
- `field`: The field that failed validation
- `message`: The error message or `undefined` when validation passes

## Dependencies 🔗
- Requires `OnboardingStates` type from "../types/onboarding"
