# 🔐 useLogin Hook

## Overview
Manages user authentication and post-login navigation based on user status.

## 🔄 Returns
```typescript
{
    authenticateUser: Function;  // Core authentication function
    finalizeLogin: Function;     // Handles post-login logic
    onLoginSubmit: Function;     // Form submission handler
    loading: boolean;            // Authentication loading state
}
```

## 🚦 User Status Flow
- `NEW` → Redirects to email confirmation
- `VERIFIED`/`PROFILE_COMPLETED` → Redirects to store details
- `SHOP_INFO_COMPLETED`/`IMS_TYPE_COMPLETED`/`ACTIVE` → Redirects to dashboard

## 💡 Usage Example
```typescript
const LoginComponent = () => {
    const { onLoginSubmit, loading } = useLogin();
    
    const handleSubmit = (formData) => {
        onLoginSubmit({
            email: formData.email,
            password: formData.password
        });
    };
    
    return <form onSubmit={handleSubmit}>{/* form content */}</form>;
}
```

## ⚠️ Dependencies
- useAppToast
- useCustomNavigate
- useAppStore
- useOnboardingStore
