# 📜 Droplinked Shop Builder Technical Documentation

## 1. ✨ Project Overview
Droplinked Shop Builder is a comprehensive platform for creating online stores, integrated with **Web3** and **blockchain** technologies. It supports selling physical, digital, and print-on-demand (POD) products, featuring modern capabilities like token-gating, NFTs, and an affiliate system.

This platform enables merchants to create their online presence with a focus on Web3 capabilities while maintaining the ease of use of traditional e-commerce platforms. The system supports multiple blockchains, various payment methods, and an extensive affiliate marketing system.

---

## 2. 🛠️ Technologies Used

### 2.1. Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **Languages**: TypeScript & JavaScript
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: 
  - [Zustand](https://zustand-demo.pmnd.rs/) for global state
  - [React Query](https://react-query.tanstack.com/) for server data
- **UI**: 
  - [Chakra UI](https://chakra-ui.com/) as the design system
  - SCSS for custom styling
- **Forms**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for validation
- **Visual Features**:
  - [react-slick](https://react-slick.neostack.com/) for sliders
  - [chart.js](https://www.chartjs.org/) for charts
  - [Framer Motion](https://www.framer.com/motion/) for animations

### 2.2. Blockchain & Web3
- **Library**: [droplinked-web3 (v2.2.4)](https://github.com/droplinked)
- **Multi-Chain Support**: 
  - Polygon
  - SKALE
  - Casper
  - Ethereum
  - And more networks via our abstraction layer

### 2.3. Dev Tools
- **Build Tool**: React Scripts with [react-app-rewired](https://github.com/timarney/react-app-rewired)
- **Package Manager**: npm
- **Bundler**: Custom Webpack configuration
- **CSS Preprocessor**: SASS
- **Code Analysis**: [ts-prune](https://github.com/nadeesha/ts-prune) for detecting unused exports

---

## 3. 🏗️ Project Architecture

### 3.1. Folder Structure
```
src/
├── assets/            # 📁 Static files (fonts, images, icons, styles, logos, samples)
├── components/        # 🧩 Reusable React components
│   ├── common/        # ⚙️ Base components
│   ├── form/          # 📝 Form components
│   ├── layouts/       # 🖼️ Layout components
│   ├── modals/        # 📤 Modal components
│   ├── redesign/      # 🔄 Redesigned/new components
│   ├── ui/            # 🪄 UI primitives/widgets
├── constants/         # 🔢 Primitive values, enums, mappings (not UI data)
├── context/           # 🌐 React context providers
├── data/              # 📊 Structured UI data (menus, plans, links, etc.)
├── hooks/             # 🎣 Custom React hooks
├── hoc/               # 🏗️ Higher-order components (HOCs)
├── layouts/           # 🖼️ Page/layout wrappers
├── lib/               # 📚 Library code (API, i18n, axios config, etc.)
├── locales/           # 🌍 i18n translation files (JSON, organized by feature)
├── pages/             # 📄 Page components, organized by feature or route
├── routes/            # 🛤️ Routing configuration (e.g., routes.tsx)
├── services/          # 🔌 API service modules (feature-based subfolders)
├── stores/            # 🗃️ State management stores (e.g., Zustand)
├── types/             # 📝 TypeScript type definitions and interfaces
├── utils/             # 🔧 Utility/helper functions and related tests
├── index.js           # 🚪 App entry point
├── App.tsx            # 🏠 Main App component
├── theme.js           # 🎨 Theme configuration
├── setupTests.ts      # 🧪 Test setup
├── service-worker.js  # 🛰️ Service worker
├── serviceWorkerRegistration.js # 🛰️ Service worker registration
```

### 3.2. App Architecture
A modular, component-based architecture:
- **Presentation Layer**: React components with Chakra UI
- **State Layer**: Zustand for global state & React Query for server state
- **Service Layer**: REST APIs & blockchain integrations
- **Routing Layer**: React Router for navigation and route protection

### 3.3. Data Flow
The application follows a unidirectional data flow pattern:
1. User interactions trigger events
2. Events update state via Zustand stores or React Query mutations
3. State changes propagate to components through hooks
4. Components re-render with the updated state

---

## 4. 🧩 Core Modules

### 4.1. Authentication (🔐)
- User registration and login
- Email verification flow
- JWT-based authentication
- Social login integrations

### 4.2. Dashboard (📊)
- Sales analytics with customizable date ranges
- Product performance metrics
- Order management with filtering options
- User activity tracking and analytics

### 4.3. Products (🛍️)
- Multi-type product management:
  - Physical products with inventory tracking
  - Digital products with secure delivery
  - Print-on-demand with design customization
- Variant management
- Bulk upload/edit capabilities
- SEO optimization tools

### 4.4. Store Design (🎨)
- Theme customization
- Layout builder
- Color scheme management
- Typography settings
- Mobile responsiveness controls

### 4.5. Affiliate System (🤝)
- Affiliate recruitment and management
- Commission structure configuration
- Performance tracking
- Payment processing for affiliates
- Automatic commission calculation

### 4.6. Blockchain Features (⛓️)
- Token-gating for exclusive content
- NFT integration for digital ownership
- Mint-to-Merch capabilities
- Multi-chain support for maximum compatibility

---

## 5. 🌐 APIs & Integrations

### 5.1. Internal API
- REST-based architecture
- JWT authentication for secure requests
- Rate limiting for security

### 5.2. External Integrations
- **Payment Processing**:
  - [Stripe](https://stripe.com/) for fiat payments
  - Cryptocurrency payment gateways
  
- **Analytics**:
  - [Google Analytics](https://analytics.google.com/) for user behavior tracking
  - Custom event tracking

- **Blockchain Networks**:
  - Polygon for lower gas fees
  - SKALE for scalability
  - Casper for enterprise solutions
  - Other EVM-compatible networks

### 5.3. Third-party Services
- Email delivery services
- Cloud storage for product images
- CDN for optimized content delivery

---

## 6. 🛤️ Routing

### 6.1. Public Routes
- Landing page
- Product listings
- About us
- Contact
- Authentication pages

### 6.2. Protected Routes
- Dashboard
- Store management
- Order processing
- Customer management
- Settings

---

## 7. 🚀 Development & Deployment

### 7.1. Development Environment
- Local development server with hot reloading
- Environment variable management
- Mock API for offline development

### 7.2. CI/CD Pipeline
- GitLab CI/CD integration
- Automated testing before deployment
- Deployment to AWS S3 buckets
- CloudFront distribution for global CDN

### 7.3. Setup & Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Analyze bundle size
npm run analyze

# Find unused exports
npm run find-deadcode

# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Debug tests
npm run test:debug
```

### 7.4. Environment Variables
- **Don't commit ENV Files!**
- Message your team lead to receive related files.

---

## 8. 🔒 Security

### 8.1. Authentication Security
- JWT token management with refresh capability
- Secure storage of credentials
- Protection against CSRF and XSS attacks

### 8.2. Authorization
- Permission checking at component level
- API endpoint protection

### 8.3. Data Protection
- HTTPS for all communications
- Sensitive data encryption
- Compliance with data protection regulations

---

## 9. ⛓️ Blockchain Features

### 9.1. Token-Gating
- Restrict content/product access to token holders
- Support for various token standards (ERC-20, ERC-721, ERC-1155)
- Cross-chain token verification

### 9.2. Mint-to-Merch
- Convert NFTs into physical merchandise
- On-demand production integration
- Ownership verification

### 9.3. Product Registry
- On-chain product verification
- Ownership tracking and transfers
- Transparent supply chain

### 9.4. Multi-Chain Support
- Unified interface for multiple blockchains
- Chain-specific optimizations
- Seamless wallet connections

---

## 10. 📋 Prerequisites

### 10.1. System Requirements
- Node.js LTS (v16+)
- npm v7+
- Modern web browser for development
- GitHub account for contribution

### 10.2. Recommended Tools
- VS Code with Typescript default prettier
- React Developer Tools browser extension
- MetaMask for blockchain interaction testing

---

## 11. ⚠️ Challenges & Solutions

### 11.1. Multi-Chain Support
**Challenge**: Supporting multiple blockchain networks with different APIs and standards.
**Solution**: Implemented droplinked-web3 as an abstraction layer that provides a unified interface across chains.

### 11.2. Performance Optimization
**Challenge**: Managing large datasets and complex state.
**Solution**: 
- Implemented React Query for efficient data fetching and caching
- Code splitting to reduce initial bundle size
- Virtualization for long lists
- Memoization of expensive computations

### 11.3. Compatibility
**Challenge**: Supporting older browsers while using modern JavaScript features.
**Solution**:
- Custom polyfill strategy based on browserslist configuration
- Progressive enhancement approach
- Feature detection for critical browser capabilities

### 11.4. State Management
**Challenge**: Coordinating complex application state across components.
**Solution**: 
- Zustand for global UI state
- React Query for server state
- Context for localized component trees
- Clear separation between UI and data concerns

---

## 12. 📚 Documentation Resources

### 12.1. Code Documentation
- **TSDoc** comments on TypeScript interfaces, types, and functions
- Individual component documentation in `/docs/components/`
- Hook documentation in `/docs/hooks/`
- **Important**: All comments in the codebase should be preserved when using AI tools for code generation or refactoring

### 12.2. API Documentation
- API reference in https://apiv3dev.droplinked.com/api-doc/#/

### 12.3. Development Guidelines
- Contribution guide in `/docs/CONTRIBUTING.md`
- Coding standards in `/docs/CODE_STANDARDS.md`
- Testing guide in `/docs/TESTING.md`

---

## 13. 👨‍💻 For Developers

### 13.1. Contribution Guidelines
Before contributing to this project, please read our [contribution guidelines](/docs/CONTRIBUTING.md). All pull requests should follow the established coding standards and include appropriate tests.

### 13.2. Code Documentation Standards
- **Components**: Use concise JSDoc/TSDoc comments that describe the component's purpose.
- **Hooks**: Each custom hook should have dedicated documentation in the `/docs/hooks/` directory.
- **TypeScript**: All types, interfaces, and functions should include TSDoc comments.

### 13.3. Comment Preservation Policy
**IMPORTANT**: Under no circumstances should comments be deleted when using AI tools like code generators or refactoring assistants. Comments contain crucial context and documentation that helps maintain the codebase's understandability.

### 13.4. Available Documentation
- Comprehensive documentation is available in the `/docs` folder
- Component examples and interactive documentation will be available in Storybook (coming soon)

---

## 14. 📝 License
This project is licensed under the [MIT License](LICENSE.md) - see the license file for details.

---