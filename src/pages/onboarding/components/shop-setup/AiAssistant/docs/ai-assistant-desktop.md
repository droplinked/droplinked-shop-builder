# AI Assistant Documentation 🤖

## Overview
The AI Assistant is a comprehensive tool that helps users customize their shop using AI capabilities. It consists of multiple components arranged in a step-by-step modal flow.

## Components Structure 📦

### AiAssistant (Main Component) 🎯
- **Location**: `desktop/AiAssistant.tsx`
- **Purpose**: Main container component that manages the AI assistant flow
- **Features**:
  - Fixed position bottom-right corner
  - Step management (0-3)
  - Data management for AI generation
  - Modal flow control

### Modal Components 🪟

#### 1. PlansModal
- **Location**: `desktop/PlansModal.tsx`
- **Purpose**: Displays available subscription plans
- **Key Features**:
  - Split view design with image
  - Plan selection functionality
  - Responsive grid layout
- **Props**:
  ```typescript
  {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
  }
  ```

#### 2. BusinessModal
- **Location**: `desktop/BusinessModal.tsx`
- **Purpose**: Collects business information for AI generation
- **Key Features**:
  - Business description input
  - Category selection
  - Form validation
- **Props**:
  ```typescript
  {
    isOpen: boolean
    onClose: () => void
    onNextStep: () => void
    onPrevStep: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
  }
  ```

#### 3. GenerationModal
- **Location**: `desktop/GenerationModal.tsx`
- **Purpose**: Shows AI generation interface and results
- **Key Features**:
  - Split view layout
  - Prompt inputs
  - Generated content display
- **Props**:
  ```typescript
  {
    isOpen: boolean
    onClose: () => void
    generateWithAiData: GenerateWithAiData
    setGenerateWithAiData: (data: GenerateWithAiData) => void
  }
  ```

### Footer Components 👣

#### 1. PlansModalFooter
- **Location**: `desktop/PlansModalFooter.tsx`
- **Purpose**: Footer actions for plans modal
- **Features**:
  - Dynamic button text based on plan
  - Disabled state management
- **Props**:
  ```typescript
  {
    onNextStep: () => void
    onClose: () => void
    selectedPlan: string
  }
  ```

#### 2. BusinessModalFooter
- **Location**: `desktop/BusinessModalFooter.tsx`
- **Purpose**: Footer actions for business modal
- **Features**:
  - Form validation
  - Action buttons
- **Props**:
  ```typescript
  {
    onNextStep: () => void
    onClose: () => void
    generateWithAiData: GenerateWithAiData
  }
  ```

## Data Types 📝

### GenerateWithAiData
```typescript
interface GenerateWithAiData {
    businessDescribe: string
    businessCategory: string
}
```

## Usage Flow 🔄

1. User clicks "Try AI Assistant"
2. Plans selection (step 0)
3. Payment processing (step 1)
4. Business information input (step 2)
5. AI generation interface (step 3)

## Styling 🎨
- Uses Chakra UI components
- Dark theme with accent colors
- Responsive design (desktop-first)
- Custom modal layouts with split views

## Best Practices 💡
1. Always handle loading states
2. Validate inputs before proceeding
3. Provide clear feedback to users
4. Handle errors gracefully
5. Maintain consistent styling

## Common Props Pattern 🔧
Most modals follow this pattern:
```typescript
{
  isOpen: boolean      // Modal visibility
  onClose: () => void  // Close handler
  onNextStep?: () => void  // Navigation
  onPrevStep?: () => void  // Navigation
}
```

## Dependencies 📚
- @chakra-ui/react
- React
- Custom button components
- Custom modal components
- Custom icon components

## Notes for Developers ✏️
- Modal states are managed in the parent AiAssistant component
- Use the GenerateWithAiData type for consistency
- Follow the existing styling patterns
- Maintain the modal flow sequence
- Test responsive behavior
