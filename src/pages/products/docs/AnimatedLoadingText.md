# 🌟 AnimatedLoadingText Component Documentation

A customizable loading text component with a shimmering animation effect.

## 🎯 Purpose
This component creates a loading text placeholder with an animated shimmer effect that can move either horizontally or vertically. It's perfect for content loading states and skeleton screens.

## 🧩 Components Structure

### AnimatedLoadingText
The main component that orchestrates the loading text animation.

### StyledComponents
- `AnimatedTextContainer`: Wrapper component with blur effect
- `TextContent`: Text component with animated gradient overlay

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string \| number \| readonly string[]` | "Lorem ipsum..." | The text to display |
| `fontSize` | `TextProps["fontSize"]` | - | Font size of the text |
| `fontWeight` | `TextProps["fontWeight"]` | - | Font weight of the text |
| `color` | `TextProps["color"]` | "#fff" | Text color |
| `isVertical` | `boolean` | `false` | Direction of animation |

Also supports all Chakra UI's `FlexProps` ✨

## 🚀 Usage Example

```tsx
import AnimatedLoadingText from './AnimatedLoadingText';

function MyComponent() {
  return (
    <AnimatedLoadingText 
      text="Loading..."
      fontSize="lg"
      fontWeight="bold"
      color="white"
      isVertical={false}
    />
  );
}
```

## ✨ Features
- Customizable text content
- Configurable animation direction (horizontal/vertical)
- Blur effect for enhanced loading state appearance
- Smooth gradient animation
- Fully responsive
- Compatible with Chakra UI theme system

## 🎨 Styling
The component uses a combination of styled-components and Chakra UI for styling:
- Blur effect with 5px radius
- Gradient overlay with configurable direction
- Infinite animation with smooth transitions
