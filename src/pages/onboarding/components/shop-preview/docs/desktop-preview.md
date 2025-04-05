# 🖥️ Desktop Shop Preview Components

## Overview
Desktop-specific components for the shop preview functionality in the onboarding process.

## Components

### 🎨 DesktopPreview
Main container component for desktop view.
- Includes TopBar, ShopBanner, ShopBar, and ProductPlaceholder
- Features gradient overlay at bottom
- Wrapped in RightSectionWrapper

```tsx
<DesktopPreview />
```

### 🔝 TopBar
Browser-style navigation bar component.
- Chrome-style dots
- Navigation arrows
- Address bar with lock icon
- Action buttons (download, plus, copy)

```tsx
<TopBar />
```

## Sub-Components

### 🔴 ChromeDots
- Red, yellow, and green dots mimicking browser window controls
- Used in TopBar component

### ⬅️ NavigationButtons
- Forward and back arrows
- Visible only on desktop (xl breakpoint)

### 🔧 ActionButtons
- Download, Plus, and Copy actions
- Right-aligned in TopBar

## Common Components Used

### 🖼️ ShopBanner
- Displays hero section image or fallback content
- Responsive height: 400px on desktop
- Enhanced visual presentation for larger screens

### 🏪 ShopBar
- Horizontal layout on desktop
- Shop logo and name with better spacing
- Header icons in a row

### 📦 ProductPlaceholder
- Responsive grid layout
- Up to 5 columns on desktop
- Consistent spacing and alignment

## Usage Example

```tsx
import DesktopPreview from './DesktopPreview'

function YourComponent() {
  return <DesktopPreview />
}
```

## 🔧 Technical Notes
- Uses Chakra UI's responsive design system
- Breakpoints defined for xl (1024px+)
- Gradient overlay for visual appeal
- Integration with useOnboardingStore for data
- Uses RightSectionWrapper for consistent layout

## 🎯 Props & Types
All components are designed to work with the onboarding store data:
```typescript
interface StoreSetup {
  shop_url: string
  name: string
  logo: string
  hero_section: string
}
```
