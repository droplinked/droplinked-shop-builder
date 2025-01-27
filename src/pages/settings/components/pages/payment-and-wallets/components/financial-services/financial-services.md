# Financial Services Components Documentation 💰

## Overview
This documentation covers the Financial Services section of the settings page, which handles payment provider integrations and management.

## Component Structure 🏗️
```
FinancialServices/
├─ FinancialServices.tsx (Main container)
├─ components/
   ├─ PaymentProviderList.tsx
   └─ PaymentProviderCard.tsx
```

## FinancialServices Component 🎯
The main container component that renders the financial services section.

**Key Features:**
- Displays section title and description
- Houses the payment provider list
- Includes section divider for visual separation

## PaymentProviderList Component 📋
A dynamic list component that manages payment provider integrations.

**Key Features:**
- Responsive flex layout
- Supports multiple payment providers
- Handles provider state management via Formik
- Built-in toggle functionality for enabling/disabling providers

**Available Providers:**
- Stripe 💳
- Coinbase Commerce 🪙

## PaymentProviderCard Component 🎴
Individual cards for each payment provider with toggle functionality.

**Props:**
- `title`: Provider name
- `buttonText`: CTA text
- `onToggle`: Toggle handler
- `type`: Provider type identifier
- `link`: External link to provider
- `tooltip`: Helper text
- `icon`: Provider icon component

**Features:**
- Toggle switch for activation/deactivation
- External link integration
- Tooltip for additional information
- Responsive design
- Consistent styling with theme

## Usage Example 💻
```tsx
<FinancialServices>
  <PaymentProviderList>
    <PaymentProviderCard 
      title="Stripe"
      type="stripe"
      // ... other props
    />
  </PaymentProviderList>
</FinancialServices>
```

## State Management 🔄
The component uses Formik for form state management. Payment methods are stored in the following format:
```typescript
interface PaymentMethod {
  type: string;  // 'STRIPE' | 'COINBASE'
  isActive: boolean;
}
```

## Styling Notes 🎨
- Uses Chakra UI components for consistent styling
- Responsive design with mobile-first approach
- Dark theme compatible
- Border colors use `#282828` for consistency
