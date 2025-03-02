# 🎨 Icon System Documentation

## Overview
Our icon system provides a flexible and consistent way to use icons throughout the application. Icons are organized by categories and sizes for better maintainability and consistency.

## 📏 Size Variations
Each icon comes in three standard sizes:
- Small (Sm): 16x16px
- Medium (Md): 20x20px
- Large (Lg): 24x24px

## 🗂️ Icon Categories
Icons are organized in the following categories:
- System
- StyleDesigner
- SocialMedia
 - Colorless
 - Colored
- Sign
- Navigation 
- Items 
- Finance 
- Coding 
- Action

## 💻 Usage

### Basic Usage
```tsx
import { AffiliateSm, AffiliateMd, AffiliateLg } from '@/assets/icons/System/Affiliate';

// Small icon (16x16)
<AffiliateSm />

// Medium icon (20x20)
<AffiliateMd />

// Large icon (24x24)
<AffiliateLg />
```

### 🎨 Customization with Chakra UI
Icons can be customized using Chakra UI's Box component and sx prop:

```tsx
import { Box } from '@chakra-ui/react';
import { AffiliateMd } from '@/assets/icons/System/Affiliate';

// Customize the icon
<Box
  as={AffiliateMd}
  sx={{
    'svg': {
      width: '32px',  // Custom size
      height: '32px'
    },
    'path': {
      stroke: 'blue.500',  // Custom stroke color
      strokeWidth: '2px'   // Custom stroke width
    }
  }}
/>
```

## 🛠️ Customization Options

You can customize various SVG properties using the sx prop:
- `stroke`: Change the stroke color
- `fill`: Modify the fill color
- `strokeWidth`: Adjust stroke thickness
- `width/height`: Resize the icon
- `transition`: Add animations
- `transform`: Apply transformations

### Example with Multiple Customizations
```tsx
<Box
  as={AffiliateMd}
  sx={{
    'svg': {
      transition: 'all 0.2s',
      _hover: {
        transform: 'scale(1.2)'
      }
    },
    'path': {
      stroke: 'brand.500',
      strokeWidth: '1.5px'
    }
  }}
/>
```