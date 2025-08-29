# 🔐 useLogin Hook

## Overview
Manages user authentication and post-login navigation based on user status. Features clean separation of concerns with dedicated functions for validation, navigation, and success handling.

## 🔄 Returns
```typescript
{
    authenticateUser: Function;      // Core authentication function
    handleLoginSuccess: Function;    // Handles successful login response
    handleLoginSubmit: Function;     // Form submission handler
    loading: boolean;               // Authentication loading state
}
```

## 🚦 User Status Flow
- `NEW` → Redirects to email confirmation
- `VERIFIED`/`PROFILE_COMPLETED` → Redirects to store details  
- `SHOP_INFO_COMPLETED`/`ACTIVE` → Redirects to dashboard (protected by AuthGuard)

## 💡 Usage Example
```typescript
const LoginComponent = () => {
    const { handleLoginSubmit, loading } = useLogin();
    
    const handleSubmit = (formData) => {
        handleLoginSubmit({
            email: formData.email,
            password: formData.password
        });
    };
    
    return <form onSubmit={handleSubmit}>{/* form content */}</form>;
}
```

## 🔧 Key Functions
- **`handleUserValidation`** - Validates user account status and type
- **`navigateBasedOnUserStatus`** - Routes user to appropriate onboarding step
- **`handleLoginSuccess`** - Processes successful authentication response
- **`handleLoginSubmit`** - Handles form submission and API calls

## ⚠️ Dependencies
- useAppToast
- useCustomNavigate  
- useAppStore
- useOnboardingStore
