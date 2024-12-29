# Settings Page Components 🛠️

## Overview 📝
The Settings page is a nested routing structure that includes several configuration sections. The main component `SettingsPageWrapper` serves as the parent container and uses Chakra UI components for styling.

## Component Structure 🏗️
```
SettingsPageWrapper
├── PageGrid
├── TabsContainer
└── Outlet (Renders child routes)
    ├── General
    ├── Privacy and Security
    ├── Payments and Wallets
    ├── Credits and Coupons
    └── User Management
```

## Routing Structure 🔄
Settings pages are nested under the `/analytics/account-settings/*` route:
```
/analytics/account-settings/general
/analytics/account-settings/privacy-and-security
/analytics/account-settings/payments-and-wallets
/analytics/account-settings/credits-and-coupons
/analytics/account-settings/user-management
```

## Components Details 🔍

### SettingsPageWrapper
- Main container component using PageGrid layout
- Renders the header, tabs navigation, and child routes
- Uses React Router's `Outlet` for rendering child components

### TabsContainer
- Handles tab navigation using Chakra UI Tabs
- Uses React Router's `useNavigate` and `useLocation` for navigation
- Styled with custom border and color schemes
- Active tab is highlighted with bottom border

## Usage Example 💡
```tsx
<Route path="account-settings" element={<SettingsPageWrapper />}>
    <Route path="general" element={<General />} />
    <Route path="privacy-and-security" element={<PrivacyAndSecurity />} />
    // ... other routes
</Route>
```

## Notes 📌
- Uses Chakra UI for consistent styling
- Responsive design ready
- Follows atomic design principles
- Easy to extend with new settings pages
