# Partner Landing Pages

A modular, configurable landing page system for different partner integrations with lazy loading optimization and React Context-based state management.

## 🏗️ Architecture Overview

This system provides dynamic, partner-specific landing pages that are:
- **Configuration-driven** - Easy to add new partners
- **Performance optimized** - Lazy loading for all sections
- **Type-safe** - Comprehensive TypeScript definitions
- **Modular** - Reusable components and configurable sections
- **Consistent** - Standardized layout across all partners

## 📁 Folder Structure

```
partnerLandings/
├── README.md                    # This documentation
├── PartnerPage.tsx              # Main entry point component
├── config/                      # Configuration management
│   ├── types.ts                 # TypeScript type definitions
│   └── partners.tsx             # Partner configurations
├── context/                     # State management
│   ├── PartnerLandingContext.tsx    # Main context provider
│   └── WalletVerificationContext.tsx # Wallet verification context
├── layout/                      # Page structure components
│   ├── PartnerLayout.tsx        # Main layout wrapper
│   ├── PartnerHero.tsx          # Hero section component
│   └── SubtitleElements.tsx     # Subtitle rendering
├── components/                  # Reusable components
│   ├── ClaimNowButton.tsx       # CTA button component
│   ├── ClaimNow.tsx             # Claim section component
│   ├── ModularStack.tsx         # Modular stack display
│   ├── ProPlanCard.tsx          # Pro plan card component
│   ├── SetOfPerks.tsx           # Perks display component
│   ├── wallet-verification-modal/   # Wallet verification modal
│   └── partner-specific/        # Partner-specific components
│       ├── D3BentoGrids.tsx     # D3-specific features
│       └── UDTldFeatures.tsx    # Unstoppable Domains features
└── assets/                        # Visual assets
    ├── D3Border.tsx             # D3 border designs
    ├── UDBorder.tsx             # UD border designs
    ├── Features.tsx             # Feature displays
    ├── Perks.tsx                # Perks visualizations
    └── ...                      # Additional SVG components
```

## 🚀 Quick Start

### Using an Existing Partner Page

```tsx
import PartnerPage from './partnerLandings/PartnerPage';

// Render D3 partner page
<PartnerPage partnerId="d3" />

// Render Unstoppable Domains page
<PartnerPage partnerId="unstoppableDomains" />
```

### Available Partners

- `d3` - D3 partner landing page (6 months trial)
- `unstoppableDomains` - Unstoppable Domains (3 months trial)
- `polygon` - Polygon domain holders (3 months trial)
- `crossmint` - Crossmint members (3 months trial)

## ⚙️ Configuration System

### Partner Configuration Structure

```typescript
interface PartnerConfig {
  id: PartnerId;
  name: string;
  displayName: string;
  trialMonths: 3 | 6 | 12;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
  sections: Section[];
}
```

### Adding a New Partner

1. **Add partner ID to types** (`config/types.ts`):
   ```typescript
   export type PartnerId = 'd3' | 'unstoppableDomains' | 'polygon' | 'crossmint' | 'newPartner';
   ```

2. **Create partner-specific components** (`components/partner-specific/`):
   ```tsx
   // components/partner-specific/NewPartnerFeatures.tsx
   import React from 'react';
   
   const NewPartnerFeatures: React.FC = () => {
     return (
       <section className="new-partner-features">
         {/* Partner-specific content */}
       </section>
     );
   };
   
   export default NewPartnerFeatures;
   ```

3. **Add configuration** (`config/partners.tsx`):
   ```typescript
   import NewPartnerLogo from 'assets/brand-identity/NewPartner';
   import NewPartnerFeatures from '../components/partner-specific/NewPartnerFeatures';
   
   export const PARTNER_CONFIGS: Record<string, PartnerConfig> = {
     // ... existing partners
     newPartner: {
       id: 'newPartner',
       name: 'New Partner',
       displayName: 'New Partner',
       trialMonths: 3,
       logo: NewPartnerLogo,
       hero: {
         title: 'New Partner \n Members',
         subtitle: 'Unlock 3 months of the Pro Plan absolutely free!',
       },
       sections: buildSections([
         { id: 'new-partner-features', component: <NewPartnerFeatures /> }
       ])
     }
   };
   ```

4. **Add route** (in your routing configuration):
   ```tsx
   <Route path="/partner/newPartner" element={<PartnerPage partnerId="newPartner" />} />
   ```

## 🎯 Section System

### Default Section Order

1. **Partners** - Marquee section showing partner logos
2. **[Custom Sections]** - Partner-specific sections (injected here)
3. **Set of Perks** - Benefits and features
4. **Modular Stack** - Technology stack display
5. **Join Community** - Community engagement section
6. **Claim Now** - Call-to-action section

### Custom Sections

Partner-specific sections are automatically inserted after the partners section:

```typescript
sections: buildSections([
  { id: 'custom-features', component: <CustomFeatures /> },
  { id: 'special-offer', component: <SpecialOffer /> }
])
```

## 🔧 Context System

### PartnerLandingContext

Provides partner-specific data throughout the component tree:

```tsx
import { usePartnerLanding } from './context/PartnerLandingContext';

const MyComponent = () => {
  const { 
    partnerConfig, 
    partnerId, 
    partnerName, 
    trialMonths, 
    hero,
    isPartner 
  } = usePartnerLanding();
  
  // Use partner data
};
```

### Available Context Data

- `partnerConfig` - Complete partner configuration
- `partnerId` - Current partner identifier
- `partnerName` - Partner name
- `displayName` - Display name for UI
- `trialMonths` - Trial period duration
- `logo` - Partner logo component
- `hero` - Hero section content
- `isPartner(id)` - Utility function to check partner type

## 🎨 Component Development

### Creating Reusable Components

```tsx
// components/MyComponent.tsx
import React from 'react';
import { usePartnerLanding } from '../context/PartnerLandingContext';

interface MyComponentProps {
  className?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ className }) => {
  const { partnerName, trialMonths } = usePartnerLanding();
  
  return (
    <div className={className}>
      <h2>{partnerName} Special Offer</h2>
      <p>{trialMonths} months free trial</p>
    </div>
  );
};

export default MyComponent;
```

### Partner-Specific Components

```tsx
// components/partner-specific/PartnerFeatures.tsx
import React from 'react';
import { usePartnerLanding } from '../../context/PartnerLandingContext';

const PartnerFeatures: React.FC = () => {
  const { partnerId, isPartner } = usePartnerLanding();
  
  // Conditional rendering based on partner
  if (isPartner('d3')) {
    return <D3SpecificFeatures />;
  }
  
  if (isPartner('unstoppableDomains')) {
    return <UDSpecificFeatures />;
  }
  
  return <DefaultFeatures />;
};
```

## 🚀 Performance Optimizations

### Lazy Loading

All sections are automatically lazy-loaded using the `LazyLoad` component in `PartnerLayout.tsx`:

```tsx
{partnerConfig.sections.map((section) => (
  <LazyLoad key={section.id}>
    {section.component}
  </LazyLoad>
))}
```

### Best Practices

1. **Keep components lightweight** - Avoid heavy computations in render
2. **Use React.memo** for expensive components
3. **Optimize images and SVGs** - Use appropriate formats and sizes
4. **Implement proper loading states** - Provide feedback during lazy loading

## 🧪 Testing

### Component Testing

```tsx
// __tests__/PartnerPage.test.tsx
import { render, screen } from '@testing-library/react';
import PartnerPage from '../PartnerPage';

describe('PartnerPage', () => {
  it('renders D3 partner page correctly', () => {
    render(<PartnerPage partnerId="d3" />);
    expect(screen.getByText('Powering Agentic Commerce')).toBeInTheDocument();
  });
  
  it('redirects to 404 for invalid partner', () => {
    render(<PartnerPage partnerId="invalid" />);
    // Test redirect logic
  });
});
```

### Context Testing

```tsx
// __tests__/PartnerLandingContext.test.tsx
import { renderHook } from '@testing-library/react';
import { usePartnerLanding } from '../context/PartnerLandingContext';

describe('PartnerLandingContext', () => {
  it('provides correct partner data', () => {
    const { result } = renderHook(() => usePartnerLanding(), {
      wrapper: PartnerLandingProvider,
      initialProps: { partnerConfig: mockConfig }
    });
    
    expect(result.current.partnerId).toBe('d3');
  });
});
```

## 🔒 Security Considerations

1. **Input validation** - Validate partnerId before rendering
2. **Error boundaries** - Implement proper error handling
3. **Content Security Policy** - Ensure SVG components are safe
4. **Access control** - Verify user permissions for partner-specific features

## 📝 Development Guidelines

### Code Style

- Follow existing TypeScript patterns
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive JSDoc comments
- Follow the established naming conventions

### File Organization

- Keep partner-specific code in `partner-specific/` directory
- Use descriptive file names
- Group related components together
- Maintain clear separation of concerns

### Performance

- Monitor bundle size for new components
- Use React DevTools Profiler for performance analysis
- Implement proper memoization where needed
- Test lazy loading behavior

## 🐛 Troubleshooting

### Common Issues

1. **Partner not found** - Check `PARTNER_CONFIGS` and `PartnerId` type
2. **Context not available** - Ensure component is wrapped in `PartnerLandingProvider`
3. **Lazy loading issues** - Verify `LazyLoad` component implementation
4. **Type errors** - Check TypeScript definitions in `types.ts`

### Debug Tools

- React DevTools for context inspection
- Network tab for lazy loading verification
- Console for error messages
- TypeScript compiler for type checking

## 📚 Additional Resources

- [React Context Documentation](https://react.dev/reference/react/createContext)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Performance Best Practices](https://react.dev/learn/render-and-commit)

---
 
**Last Updated:** December 2024  
**Version:** 1.0.0 