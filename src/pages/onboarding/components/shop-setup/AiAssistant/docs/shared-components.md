# AI Assistant Components Documentation 🤖

This document provides detailed information about the AI Assistant components used in the shop setup process.

## Table of Contents 📑
- [PromptInputs](#promptinputs-)
- [BusinessCategory](#businesscategory-)
- [Generated Components](#generated-components-)
  - [GeneratedContentWrapper](#generatedcontentwrapper-)
  - [GeneratedLogo](#generatedlogo-)
  - [GeneratedCover](#generatedcover-)
  - [GeneratedUrls](#generatedurls-)
  - [GeneratedNames](#generatednames-)
- [Image Components](#image-components-)
  - [ImageSlider](#imageslider-)
  - [ImageSkeleton](#imageskeleton-)
- [Plan Components](#plan-components-)
  - [PlanList](#planlist-)
  - [PlansItems](#plansitems-)
- [Utility Components](#utility-components-)
  - [ExpandableInfo](#expandableinfo-)
  - [Item](#item-)
  - [LogosSkeleton](#logosskeleton-)
  - [SelectableItemsSkeleton](#SelectableItemsSkeleton-)

## Components Details 🔍

### PromptInputs 📝
**Purpose**: Handles user input for AI generation
**Props**:
- `generateWithAiData`: GenerateWithAiData
- `handleChange`: (key: string, value: string | boolean) => void

**Usage Example**:
```tsx
<PromptInputs 
  generateWithAiData={data}
  handleChange={(key, value) => handleInputChange(key, value)}
/>
```

### BusinessCategory 🏢
**Purpose**: Category selection component for business type
**Props**:
- `generateWithAiData`: GenerateWithAiData
- `onChange`: (key: string, value: string) => void

### GeneratedContentWrapper 🎁
**Purpose**: Wrapper component for all generated content
**Props**:
- `children`: React.ReactNode
- `onRetry`: () => void
- `isLoading`: boolean
- `title`: string

### ImageSlider 🖼️
**Purpose**: Handles image carousel functionality
**Props**:
- `images`: string[]
- `onChange`: (currentImage: string) => void
- `isLoading`: boolean

**Features**:
- Previous/Next navigation
- Dot indicators
- Smooth transitions
- Loading state handling

### PlanList 💰
**Purpose**: Displays available subscription plans
**Props**:
- `selectedPlan`: string
- `setSelectedPlan`: (value: string) => void

### ExpandableInfo ℹ️
**Purpose**: Collapsible information section
**Props**:
- `icon`: ReactNode
- `title`: string
- `description`: string
- `children`: ReactNode

**Features**:
- Responsive design
- Smooth animations
- Custom styling for mobile/desktop

### Skeleton Components 💀
We have several skeleton components for loading states:
- `ImageSkeleton`
- `LogosSkeleton`
- `SelectableItemsSkeleton`

**Usage**: Display during data fetching operations

### Generated Content Components 🎨
All generated content components (`GeneratedLogo`, `GeneratedCover`, `GeneratedUrls`, `GeneratedNames`) share similar props:
```typescript
interface Props {
    businessCategory: string
    businessDescribe: string
}
```

**Common Features**:
- API integration with React Query
- Error handling
- Loading states
- Auto-selection of first item
- Retry functionality

## Best Practices 👌

1. Always handle loading states
2. Implement error boundaries
3. Use proper TypeScript types
4. Follow the component composition pattern
5. Maintain consistent styling with Chakra UI

## API Integration 🔌

Components use React Query for data fetching:
```typescript
const { isFetching, data, refetch } = useQuery({
    queryFn: () => apiFunction({ category, prompt }),
    queryKey: ["uniqueKey"],
    enabled: !!requiredData,
    // ... other options
});
```

## Styling Guidelines 🎨

- Uses Chakra UI for consistent styling
- Responsive design with base/md/lg breakpoints
- Color scheme follows brand guidelines
- Consistent spacing using the gap prop

## Error Handling ⚠️

All components implement error handling through:
- useAppToast hook for notifications
- Error boundaries for component failures
- Fallback UI for error states

## State Management 📊

Components use:
- Local state with useState
- Global state with useOnboardingStore
- React Query for server state

## Testing 🧪

To test components:
1. Test user interactions
2. Verify loading states
3. Check error handling
4. Validate responsive behavior
5. Ensure accessibility standards

## Contributing 🤝

When adding new components:
1. Follow existing patterns
2. Add proper documentation
3. Include TypeScript types
4. Implement error handling
5. Add loading states
6. Consider accessibility
