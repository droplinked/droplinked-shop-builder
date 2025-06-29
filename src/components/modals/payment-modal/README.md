# Payment Modal System

A flexible payment modal component that can be used across different pages and scenarios in the application.

## Features

- **Flexible Success Handling**: Custom success callbacks for different use cases
- **Custom Success Messages**: Tailored messages for different contexts
- **Responsive Design**: Automatically switches between modal and drawer based on screen size
- **Reusable**: Can be used in onboarding, subscription plans, product creation, and more

## Basic Usage

```tsx
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import { PlanType } from 'pages/onboarding/types/onboarding';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("BUSINESS");

  const handlePaymentSuccess = () => {
    // Your custom success logic here
    console.log('Payment successful!');
  };

  return (
    <PaymentModal
      plan={selectedPlan}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSuccess={handlePaymentSuccess}
      successMessage="Payment successful! Your subscription has been activated."
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | `PlanType` | Yes | The subscription plan type |
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback when modal is closed |
| `onSuccess` | `() => void` | No | Custom success callback |
| `successMessage` | `string` | No | Custom success message |

## Use Cases

### 1. Onboarding Flow
Stay on the same page and update onboarding state:

```tsx
const handlePaymentSuccess = () => {
  updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET');
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage="Payment successful! Your subscription has been activated and you're all set!"
/>
```

### 2. Subscription Plans Page
Redirect to dashboard after payment:

```tsx
const navigate = useNavigate();

const handlePaymentSuccess = () => {
  navigate('/dashboard');
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage="Payment successful! Redirecting to your dashboard..."
/>
```

### 3. Create Product Page
Stay on page and refresh data:

```tsx
const handlePaymentSuccess = () => {
  refetchProducts();
  showSuccessMessage('Product created successfully!');
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage="Payment successful! Your product has been created."
/>
```

### 4. Settings Page
Update subscription information:

```tsx
const handlePaymentSuccess = () => {
  refetchSubscriptionData();
  updateSubscriptionDisplay();
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage="Payment successful! Your subscription has been updated."
/>
```

### 5. Multiple Actions
Perform multiple actions after payment:

```tsx
const handlePaymentSuccess = () => {
  setSubscriptionActive(true);
  refetchUserData();
  showCustomNotification('Welcome to the premium plan!');
  trackEvent('subscription_purchased', { plan: selectedPlan });
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage="Welcome to the premium plan! Your account has been upgraded."
/>
```

### 6. Conditional Actions
Different actions based on context:

```tsx
const handlePaymentSuccess = () => {
  switch (userContext) {
    case 'onboarding':
      updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET');
      break;
    case 'upgrade':
      showUpgradeBenefits();
      break;
    case 'renewal':
      refetchSubscriptionData();
      break;
    default:
      navigate('/dashboard');
  }
};

<PaymentModal
  plan={selectedPlan}
  isOpen={isOpen}
  onClose={onClose}
  onSuccess={handlePaymentSuccess}
  successMessage={`Payment successful! ${userContext === 'onboarding' ? 'Welcome aboard!' : 'Your subscription has been updated.'}`}
/>
```

## Default Behavior

If no `onSuccess` callback is provided, the modal will use the default onboarding behavior:

```tsx
// Default behavior in PaymentForm.tsx
if (onSuccess) {
  onSuccess();
} else {
  // Default behavior for onboarding flow
  updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET');
}
```

## Component Structure

```
PaymentModal/
├── PaymentModal.tsx          # Main component
├── layout/
│   ├── BaseModal.tsx         # Desktop modal
│   ├── PaymentDrawer.tsx     # Mobile drawer
│   └── PaymentContent.tsx    # Content wrapper
├── components/
│   ├── PaymentForm.tsx       # Payment form logic
│   └── BillingInfo.tsx       # Billing information
└── examples/
    └── PaymentModalUsageExamples.tsx  # Usage examples
```

## Best Practices

1. **Always provide meaningful success messages** that match the user's context
2. **Use the onSuccess callback** for page-specific logic instead of modifying the PaymentForm
3. **Keep success handlers focused** on a single responsibility
4. **Handle errors gracefully** in your success callbacks
5. **Consider user experience** - redirect when appropriate, stay on page when refreshing data makes sense

## Migration Guide

If you're updating from the old payment modal:

1. **Add onSuccess callback** to handle post-payment logic
2. **Add successMessage** for better user feedback
3. **Remove any hardcoded logic** from PaymentForm
4. **Test all payment flows** to ensure they work as expected

## Examples

See `examples/PaymentModalUsageExamples.tsx` for comprehensive usage examples covering all scenarios. 