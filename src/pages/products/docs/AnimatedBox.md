# AnimatedBox Component 🎨

A reusable animated container component that adds a beautiful gradient border animation effect to its children.

## Features ✨

- Smooth gradient border animation
- Customizable through Chakra UI props
- Responsive design
- Blur effect for enhanced visual appeal

## Usage 🚀

```tsx
import AnimatedBox from './components/common/AnimatedBox'

// Basic usage
<AnimatedBox>
  <YourContent />
</AnimatedBox>

// With custom flex props
<AnimatedBox 
  flexProps={{
    padding: "2px",
    background: "transparent"
  }}
>
  <YourContent />
</AnimatedBox>
```

## Props 📝

| Prop | Type | Description |
|------|------|-------------|
| children | React.ReactNode | Content to be wrapped by the animated container |
| flexProps | ChakraProps | Optional Chakra UI props for customizing the container |

## Example 💡

###  Form Input with Animation

```tsx
<AnimatedBox flexProps={{ PADDINGS_AND_STYLES_BASED_ON_YOUR_NEEDS }}>
  <Input placeholder="Enter text..." />
</AnimatedBox>
```

## Animation Details 🌈

The component features:
- Gradient border with colors: #2BCFA1, #179EF8, #FFD951, #9C4EFF
- 5-second linear animation cycle
- Smooth background position transition
- Blur effect for enhanced visual appeal

## Best Practices 🎯

1. Use for highlighting important UI elements
2. Perfect for loading states and interactive components
3. Combine with loading states for enhanced user feedback
4. Keep content padding consistent for best visual results

## See Also 🔗

Check out these real implementation examples:
- ProductDescription.tsx - Rich text editor with animated container
- Input.tsx - Form input component with animated states
