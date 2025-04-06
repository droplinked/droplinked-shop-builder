# Shop Setup Components Documentation 🏪

## ShopSetupForm 📝
Main component that handles the shop setup process. Contains all the form fields and validation logic.

### Features
- Form validation
- Shop creation API integration
- Responsive layout
- AI Assistant integration
- Shop preview

### Key Components

## UrlChooser 🔗
URL availability checker component for shop URLs.

### Features
- Real-time URL availability check
- Debounced API calls (1.5s)
- Visual feedback for availability
- Accepts only alphanumeric characters and hyphens
- Displays `dev.droplinked.io/` or `droplinked.io/` prefix based on environment

## NameField 📛
Shop name input component.

### Features
- Real-time validation
- Minimum 3 characters required
- Required field validation

## LogoUploader 🖼️
Shop logo upload component.

### Features
- Image upload functionality
- Preview with Avatar
- Change/Remove options
- Supports JPG, JPEG, PNG formats
- Default logo fallback

## CoverImage 🌄
Hero section image uploader component.

### Features
- Drag & drop support
- Image preview
- Supports JPG, JPEG, PNG formats
- Visual feedback during upload

## DescriptionField 📝
Shop description textarea component.

### Features
- Character count validation (150-160 characters)
- SEO-friendly description guidelines
- Tooltip with requirements
- Error messaging

## FieldWrapper 🎁
Utility component for consistent field styling.

### Features
- Standardized spacing
- Consistent title styling
- Flexbox layout

## Common Props & Types

### StoreSetup Interface
```typescript
interface StoreSetup {
  shop_url: string;
  name: string;
  description: string;
  logo: string;
  hero_section: string;
}
```

### Error States
```typescript
interface StoreSetupErrors {
  shop_url?: string;
  name?: string;
  description?: string;
}
```

## 🔧 Technical Notes

### State Management
- Uses `useOnboardingStore` for form state
- Uses `useAppStore` for global app state

### API Integration
- Real-time username availability check
- Image upload handling
- Shop creation mutation

### Validation Rules
- URL: alphanumeric + hyphens only
- Name: min 3 characters
- Description: 150-160 characters
- Images: JPG, JPEG, PNG formats

### Mobile Considerations
- Responsive layout changes at 1024px breakpoint
- Mobile-specific AI Assistant button
- Conditional shop preview rendering

## 🚀 Usage Example

```tsx
import ShopSetupForm from '../components/shop-setup/ShopSetupForm'

function OnboardingPage() {
  const handleNext = () => {
    // Handle navigation to next step
  }

  return <ShopSetupForm onNext={handleNext} />
}
```

## 🎯 Tips
1. Always handle image upload errors
2. Validate URLs before submission
3. Consider SEO requirements for descriptions
4. Test mobile responsiveness
5. Handle network errors gracefully