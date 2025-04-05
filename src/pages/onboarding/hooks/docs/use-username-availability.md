# 🔍 useUsernameAvailability Hook

## Overview
Custom hook for checking username availability in real-time.

## 📝 Parameters
```typescript
interface UseUsernameAvailabilityProps {
    username: string;      // Username to check
    onSuccess?: (isAvailable: boolean) => void;  // Optional success callback
    onError?: () => void; // Optional error callback
}
```

## 🔄 Returns
```typescript
{
    data: boolean;        // true if username is available
    isLoading: boolean;   // loading state
    isError: boolean;     // error state
}
```

## 💡 Usage Example
```typescript
const MyComponent = () => {
    const { data: isAvailable, isLoading } = useUsernameAvailability({
        username: "testuser",
        onSuccess: (available) => console.log(`Username is ${available ? 'available' : 'taken'}`),
    });
    
    return isLoading ? <Loading /> : <div>{isAvailable ? 'Available!' : 'Taken!'}</div>;
}
```

## ⚠️ Dependencies
- react-query
- useAppToast (internal hook)
