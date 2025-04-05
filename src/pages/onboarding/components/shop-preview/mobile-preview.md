# 📱 Mobile Shop Preview Components

## Overview
Mobile-specific components for the shop preview functionality in the onboarding process.

## Components

### 🎯 MobilePreviewDrawer
The main container component that handles the bottom drawer functionality.
- Uses Chakra UI's Drawer component
- Manages drawer state with `useDisclosure` hook
- Contains MobilePreview content

```tsx
<MobilePreviewDrawer />
```

### 📱 MobilePreview
Main content component for mobile view.
- Displays shop banner, bar, and products in a mobile-friendly layout
- Components included:
  - ShopBanner
  - ShopBar
  - ProductPlaceholder

```tsx
<MobilePreview />
```

### 🔘 MobileDrawerButton
Button component that triggers the mobile drawer.
- Fixed position at bottom of screen
- Custom styling with upward chevron
- Used as the entry point for mobile preview

```tsx
<MobileDrawerButton onOpen={handleOpen} />
```

## Common Components Used

### 🖼️ ShopBanner
- Displays hero section image or fallback content
- Responsive height: 250px on mobile
- Shows logo or default Drop3 icon when no hero image

### 🏪 ShopBar
- Shows shop logo and name
- Includes placeholder header icons
- Responsive layout adjustments for mobile view

### 📦 ProductPlaceholder
- Grid layout for product items
- Responsive grid: 2 columns on mobile
- Shows placeholder products with skeleton loading style

## Usage Example

```tsx
import MobilePreviewDrawer from './MobilePreviewDrawer'

function YourComponent() {
  return <MobilePreviewDrawer />
}
```

## 🔧 Technical Notes
- Uses Chakra UI components extensively
- Responsive design with mobile-first approach
- Works with useOnboardingStore for data management
- All components are positioned relatively for proper stacking
