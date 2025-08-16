# Upgrade Plan Modal

A responsive modal component for handling plan upgrades with support for Pro, Premium, and Enterprise plans.

## Structure

```
upgrade-plan-modal/
├── components/           # UI components
├── constants/           # Shared constants
├── container/          # Modal and Drawer containers
├── hooks/              # Custom hooks
├── services/           # Business logic services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts            # Main exports
```

## Key Features

- **Responsive Design**: Automatically switches between modal (desktop) and drawer (mobile/tablet)
- **Plan Types**: Supports Pro, Premium, and Enterprise plans
- **Enterprise Form**: Dedicated form for enterprise inquiries
- **Billing Cycles**: Dynamic billing cycle selection for Pro/Premium plans
- **Payment Integration**: Integrated with payment modal for plan upgrades

## Usage

```tsx
import UpgradePlanModal from 'components/modals/upgrade-plan-modal';

<UpgradePlanModal
  isOpen={isOpen}
  onClose={onClose}
  initialActiveTab="pro" // optional
/>
```

## Architecture

- **Container Pattern**: Separates modal/drawer logic from business logic
- **Custom Hooks**: `useUpgradePlan` manages all state and business logic
- **Service Layer**: Plan-related operations are abstracted into services
- **Type Safety**: Comprehensive TypeScript types for all interfaces
- **Constants**: Centralized constants for maintainability

## Refactoring Improvements

1. **Removed duplicate directories** (`containers/` was empty)
2. **Centralized constants** in dedicated constants file
3. **Extracted business logic** into service layer
4. **Simplified hook** by removing redundant computations
5. **Improved type safety** with better TypeScript interfaces
6. **Consistent naming** across all components
7. **Removed code duplication** between modal and drawer
8. **Better separation of concerns** between UI and business logic