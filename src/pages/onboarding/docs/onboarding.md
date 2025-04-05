# 🎯 Onboarding Component Documentation

## 📚 Overview
The Onboarding component manages the entire onboarding flow UI, handling responsive layouts and step navigation for new users setting up their shop.

## 🔧 Dependencies
- @chakra-ui/react - For responsive breakpoints
- useOnboardingStore - For state management

## 📱 Responsive Layouts
Three layout components handle different screen sizes:
- 📱 MobileLayout (base)
- 📲 TabletLayout (md)
- 💻 DesktopLayout (lg)

## 🚶‍♂️ Step Components

### Authentication Steps
1. 🔑 SignInForm
   - Entry point for existing users
   - Triggered by `?entry=signin` URL parameter

2. ✍️ SignUpForm
   - New user registration
   - Triggered by `?entry=signup` URL parameter

3. ✉️ EmailConfirmation
   - Email verification step

### Setup Steps
4. 🏪 ShopSetupForm
   - Basic store information
   - Paired with ShopPreview

5. 💳 PaymentSetup
   - Payment configuration
   - Paired with PaymentFeatures

6. 📋 SubscriptionPlans
   - Plan selection
   - Paired with SubscriptionPlansDisplay

7. ✨ CompletionSection
   - Onboarding completion

## 🎨 Layout Structure
Each step consists of:
- leftContent: Main form/content
- rightContent: Supplementary display (except completion)

## 🔄 Navigation
- Auto-scroll to top on step change
- Back/Next navigation between steps
- URL parameter handling for entry points

## 💡 Usage Example
```typescript
import Onboarding from './Onboarding'

function App() {
    return <Onboarding />
}
```

## 🚨 Important Notes
- Steps with authentication (`SIGN_IN`, `SIGN_UP`, `EMAIL_CONFIRMATION`) have special layout handling
- Right content is optional (null for completion step)
- Smooth scrolling enabled for step transitions
- URL parameters control initial entry point
