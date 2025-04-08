# AI Assistant Components Documentation 🤖

## Overview
This documentation covers the AI Assistant feature components used in the shop builder's onboarding process.

## Components Structure 🏗️

```
AiAssistant/
├── mobile/
│   ├── AiAssistantButton.tsx    # Main entry component
│   ├── BusinessDrawer.tsx       # Business information collector
│   ├── GenerationDrawer.tsx     # AI generation interface
│   ├── PlansDrawer.tsx         # Subscription plans
│   ├── PlanFeatures.tsx        # Plan features list
│   └── TabsList.tsx            # Tabs navigation
```

## Components Details 📝

### AiAssistantButton 🎯
- **Purpose**: Main entry point for the AI assistant feature
- **State Management**:
  - Manages step navigation (0-3)
  - Handles AI generation data
- **Flow**:
  1. Plans selection
  2. Payment
  3. Business information
  4. AI Generation

### PlansDrawer 💰
- **Purpose**: Displays available subscription plans
- **Features**:
  - Plan selection
  - Pro plan features list
  - Responsive design for mobile/desktop
- **Props**:
  - `isOpen`: boolean
  - `onClose`: () => void
  - `onNextStep`: () => void
  - `onPrevStep`: () => void

### BusinessDrawer 💼
- **Purpose**: Collects business information for AI generation
- **Features**:
  - Business description input
  - Category selection
  - Responsive layout
- **Props**:
  - `isOpen`: boolean
  - `onClose`: () => void
  - `onNextStep`: () => void
  - `generateWithAiData`: GenerateWithAiData
  - `setGenerateWithAiData`: (data: GenerateWithAiData) => void

### GenerationDrawer 🎨
- **Purpose**: Handles AI generation interface
- **Features**:
  - Tabbed interface (Prompt/Result)
  - Generation controls
  - Result preview
- **Props**: Same as BusinessDrawer

### TabsList 📑
- **Purpose**: Reusable tabs component
- **Features**:
  - Custom styling
  - Disabled state support
- **Props**:
  - `tabs`: Array<{title: string, content: any, isDisabled?: boolean}>

### PlanFeatures ✨
- **Purpose**: Displays features list for plans
- **Features**:
  - Checkmark icons
  - Responsive text
- **Props**:
  - `features`: string[]

## Types 📋

```typescript
interface GenerateWithAiData {
    businessDescribe: string;
    businessCategory: string;
}
```

## Usage Example 💡

```tsx
import AiAssistantButton from './mobile/AiAssistantButton'

function ShopBuilder() {
    return (
        <div>
            <AiAssistantButton />
        </div>
    )
}
```

## Styling Notes 🎨
- Uses Chakra UI components
- Dark theme with custom backgrounds
- Responsive design with mobile-first approach
- Custom drawer implementations

## Dependencies 📦
- @chakra-ui/react
- React
- Custom icons from assets
- Custom components (Button, Drawer, etc.)

## Best Practices 🚀
1. Always handle loading states
2. Implement proper error handling
3. Use responsive design patterns
4. Follow the step flow sequence
5. Maintain state consistency

## Notes for Developers 📌
- Component state is managed at AiAssistantButton level
- Drawer components use a common styling pattern
- TabsList is reusable across different contexts
- Use MediaQuery hooks for responsive behavior
