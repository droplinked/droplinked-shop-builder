# Partner Landing Pages

A modular, configurable landing page system for different partner integrations with lazy loading optimization and React Context-based state management.

## 🏗️ Architecture Overview

This system provides dynamic, partner-specific landing pages that are:
- **Template-driven** - Easy to add new partners using predefined templates
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
│   ├── templates.ts             # Template definitions
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
- `base` - Base network creators (no trial)
- `gaia` - Gaia network creators (no trial)

## ⚙️ Template System

### Available Templates

1. **STANDARD** - Regular partners with claim functionality
   - Shows partners section
   - Shows claim now section
   - Shows Pro Plan card
   - Requires wallet verification
   - Supports custom sections

2. **CREATOR_FOCUSED** - Creator-focused partners without claim
   - No partners section
   - No claim now section
   - No Pro Plan card
   - No wallet verification
   - **Automatically includes SignUpCta section**
   - Supports custom sections

### Template Configuration

```typescript
interface PartnerTemplate {
  sections: string[];
  showPartners: boolean;
  showClaimNow: boolean;
  showProPlanCard: boolean;
  buttonAction: 'claim' | 'get-started';
  requiresWalletVerification: boolean;
  allowCustomSections: boolean;
}
```

## 🎯 Section System

### Default Section Order by Template

#### STANDARD Template
1. **Partners** - Marquee section showing partner logos
2. **[Custom Sections]** - Partner-specific sections (injected here)
3. **Set of Perks** - Benefits and features
4. **Modular Stack** - Technology stack display
5. **Join Community** - Community engagement section
6. **Claim Now** - Call-to-action section

#### CREATOR_FOCUSED Template
1. **[Custom Sections]** - Partner-specific sections (injected here)
2. **Set of Perks** - Benefits and features
3. **Modular Stack** - Technology stack display
4. **Join Community** - Community engagement section
5. **SignUp CTA** - **Automatically included** signup call-to-action

### Custom Sections

Partner-specific sections are automatically inserted at specified positions:

```typescript
customSections: [
  { id: 'custom-features', component: <CustomFeatures />, position: 1 },
  { id: 'special-offer', component: <SpecialOffer />, position: 4 }
]
```

**Note**: For `CREATOR_FOCUSED` template, the `SignUpCta` section is automatically included at the end, so you don't need to add it manually.

## 🔧 Context System

### PartnerLandingContext

Provides template-based data throughout the component tree:

```tsx
import { usePartnerLanding } from './context/PartnerLandingContext';

const MyComponent = () => {
  const { 
    partnerConfig, 
    partnerId, 
    partnerName, 
    trialMonths, 
    hero,
    template,
    showPartners,
    showClaimNow,
    showProPlanCard,
    buttonAction,
    requiresWalletVerification,
    isPartner 
  } = usePartnerLanding();
  
  // Use template-based data
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
- `template` - Current template type
- `showPartners` - Whether to show partners section
- `showClaimNow` - Whether to show claim now section
- `showProPlanCard` - Whether to show Pro Plan card
- `buttonAction` - Button action type
- `requiresWalletVerification` - Whether wallet verification is needed
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
  const { partnerName, trialMonths, showProPlanCard } = usePartnerLanding();
  
  return (
    <div className={className}>
      <h2>{partnerName} Special Offer</h2>
      {showProPlanCard && <p>{trialMonths} months free trial</p>}
    </div>
  );
};

export default MyComponent;
```

### Template-Based Conditional Rendering

```tsx
// components/PartnerFeatures.tsx
import React from 'react';
import { usePartnerLanding } from '../context/PartnerLandingContext';

const PartnerFeatures: React.FC = () => {
  const { template, showPartners, showClaimNow } = usePartnerLanding();
  
  return (
    <div>
      {showPartners && <PartnersSection />}
      <PerksSection />
      <ModularStackSection />
      <JoinCommunitySection />
      {showClaimNow && <ClaimNowSection />}
    </div>
  );
};
```

## 🚀 Performance Optimizations

### Lazy Loading

All sections are automatically lazy-loaded using the `LazyLoad` component in `PartnerLayout.tsx`:

```tsx
{sections.map((section, index) => (
  <LazyLoad key={`section-${index}`}>
    {section}
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
  it('provides correct template data', () => {
    const { result } = renderHook(() => usePartnerLanding(), {
      wrapper: PartnerLandingProvider,
      initialProps: { partnerConfig: mockConfig }
    });
    
    expect(result.current.template).toBe('STANDARD');
    expect(result.current.showPartners).toBe(true);
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
**Version:** 2.0.0 - Template-Based System 