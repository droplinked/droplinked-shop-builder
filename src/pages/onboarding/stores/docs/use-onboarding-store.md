# 🏪 Onboarding Store Documentation

## 📚 Overview
This store manages the onboarding flow state for new users setting up their shop using Zustand state management.

## 🏗️ Initial State
### Store Setup Initial Values
```typescript
{
    logo: 'default-logo-url',
    hero_section: '',
    shop_url: '',
    name: '',
    description: ''
}
```

### Complete Initial State
```typescript
{
    currentStep: 'SIGN_IN',
    storeSetup: initialStoreSetup,
    storeSetupErrors: {},
    credentials: {
        email: '',
        password: ''
    }
}
```

## 🚶‍♂️ Onboarding Steps
The onboarding process follows this sequence:
1. 🔑 SIGN_IN
2. ✍️ SIGN_UP
3. ✉️ EMAIL_CONFIRMATION
4. 🏪 STORE_DETAILS
5. 💳 PAYMENT_DETAILS
6. 📋 PLAN_SELECTION
7. ✨ YOU_ARE_ALL_SET

## 🛠️ Available Actions

### Navigation Actions
- `nextStep()` - Advance to the next step in the onboarding process
- `prevStep()` - Go back to the previous step
- `resetOnboarding()` - Reset the entire onboarding state to initial values

### State Management
- `updateOnboardingState(field, value)` - Update any state field
- `setError(field, message)` - Set an error message for a specific field
- `clearErrors()` - Clear all error messages

## 💾 Persistence
The store uses Zustand's persist middleware to save state in localStorage under the key 'onboarding-storage'.

## 🔍 Usage Example
```typescript
import useOnboardingStore from './useOnboardingStore'

// Access store state
const currentStep = useOnboardingStore(state => state.currentStep)
const storeSetup = useOnboardingStore(state => state.storeSetup)

// Use actions
const { nextStep, updateOnboardingState } = useOnboardingStore()

// Update store data
updateOnboardingState('storeSetup', {
    ...storeSetup,
    name: 'My Awesome Store'
})

// Navigate steps
nextStep()
```

## 🚨 Error Handling
The store includes a dedicated error state object (`storeSetupErrors`) for form validation and error messages.

## 📝 Notes
- Always clear errors when moving between steps
- The store URL is automatically removed from browser history during navigation
- All form data persists through page refreshes
