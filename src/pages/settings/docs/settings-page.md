# SettingsPage Component Documentation 🛠️

## Overview 📝
The SettingsPage component is a comprehensive settings management interface that allows users to customize platform preferences and shop configurations.

## Key Features 🌟
- Form-based settings management
- Real-time validation
- Automatic state management
- Toast notifications for feedback
- Drawer for saving changes

## Component Structure 🏗️

### Imports 📦
```tsx
import { Form, Formik } from 'formik'
import PageGrid from 'components/redesign/page-grid/PageGrid'
// ... other imports
```

### State Management 💾
Uses `useAppStore` hook for:
- Shop data management
- User data access
- Shop updates
- Data fetching

### Form Handling 📋
- Uses Formik for form management
- Implements custom validation schema
- Handles submission with error handling
- Supports pre-purchase data fetch toggle

### Key Functions 🔧

#### handleSubmit
```tsx
const handleSubmit = async (values, submitProps) => {
    // Handles form submission
    // Updates shop settings
    // Shows success/error notifications
}
```

## Usage Example 💻
```tsx
<SettingsPage />
```

## Props ⚙️
This component doesn't accept any props as it's a self-contained page component.

## Notes 📌
- Ensure the app store is properly initialized
- Component requires authentication
- Settings changes are persisted to the backend

## Error Handling 🚨
- Displays toast notifications for success/failure
- Handles API errors gracefully
- Maintains form state during errors

## Best Practices 👌
1. Use the provided validation schema
2. Handle loading states appropriately
3. Test settings changes before production
4. Monitor form submission performance
