# 📏 Code Standards for Droplinked Shop Builder

This document outlines the coding standards and practices to maintain consistency throughout the Droplinked Shop Builder codebase.

## 🎯 General Principles

- **📖 Readability**: Code should be written with clarity and readability as primary concerns.
- **🔧 Maintainability**: Structure code to be easily maintained and extended.
- **⚡ Performance**: Consider performance implications, especially for UI components.
- **📝 Documentation**: All code should be appropriately documented.

## ⚛️ React Component Standards

### 🧩 Component Structure

- Use functional components with hooks
- Organize imports logically:
  1. React and framework imports
  2. Third-party libraries
  3. Shared components, hooks, and utilities
  4. Local components and styles
- Keep components focused on a single responsibility
- Extract complex logic to custom hooks

### 👀 Readability Guidelines

- **Avoid semicolons** when possible
- **String props** should be written directly without curly braces: `prop="value"` instead of `prop={"value"}`

```tsx
// Good ✅
<Button variant="primary" size="md" onClick={handleClick}>
  Submit
</Button>

// Avoid ⚠️
<Button variant={"primary"} size={"md"} onClick={handleClick}>
  Submit
</Button>
```

- **Component names** should clearly reflect their functionality
- **Avoid prop drilling** by using context or custom hooks for deeply nested props

```tsx
// Avoid prop drilling
const App = () => {
  const user = { name: "John", role: "admin" };
  
  return <MainLayout user={user} />
}

const MainLayout = ({ user }) => {
  return <Sidebar user={user} />
}

const Sidebar = ({ user }) => {
  return <UserInfo user={user} />
}

// Better approach using context
const UserContext = createContext();

const App = () => {
  const user = { name: "John", role: "admin" };
  
  return (
    <UserContext.Provider value={user}>
      <MainLayout />
    </UserContext.Provider>
  )
}

const UserInfo = () => {
  const user = useContext(UserContext);
  return <div>{user.name}</div>
}
```

- **Props destructuring** should follow this pattern:

```tsx
// Good ✅
function UserCard({ name, email, role }: UserCardProps) {
  // ...
}

// Avoid ⚠️
function UserCard({ name, email, role }: { 
  name: string;
  email: string; 
  role: string;
}) {
  // ...
}
```

- **Code organization** within components should follow this order:
  1. React hooks (useState, useEffect, etc.)
  2. Custom hooks (useAppStore, useToast, etc.)
  3. Variables and state derivations
  4. Functions and handlers
  
```tsx
function ProductCard({ product }) {
  // 1. React hooks
  const [isExpanded, setIsExpanded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
  // 2. Custom hooks
  const { addToCart } = useCart()
  const { showToast } = useAppToast()
  
  // 3. Variables and derived values
  const isInStock = product.inventory > 0
  const discountPercent = Math.round((product.originalPrice - product.price) / product.originalPrice * 100)
  
  // 4. Functions and handlers
  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast({ type: "success", message: "Added to cart" })
  }
  
  // Empty line before return
  return (
    <Card>
      {/* Component JSX */}
    </Card>
  )
}
```

- **Always include an empty line before the return statement** for visual separation

- **Keep components under 100 lines** of code. Extract parts into smaller components if they grow larger

- **Move complex logic out of JSX** into separate functions or components

```tsx
// Avoid ⚠️
return (
  <div>
    {items.map(item => {
      if (item.type === 'featured') {
        return (
          <Card key={item.id}>
            <CardHeader>
              <h3>{item.title}</h3>
              {item.isNew && <Badge>New</Badge>}
            </CardHeader>
            <CardBody>
              <p>{item.description}</p>
              {item.discountPercentage > 0 && (
                <PriceTag original={item.price} discount={item.discountPercentage} />
              )}
            </CardBody>
          </Card>
        )
      } else {
        return <SimpleCard key={item.id} item={item} />
      }
    })}
  </div>
)

// Better ✅
const renderItem = (item) => {
  if (item.type === 'featured') {
    return <FeaturedCard key={item.id} item={item} />
  }
  return <SimpleCard key={item.id} item={item} />
}

return (
  <div>
    {items.map(renderItem)}
  </div>
)
```

### 📚 Component Documentation

```tsx
/**
 * Displays a user profile card with avatar, name and action buttons
 * 
 * @param user - User object with profile information
 * @param isEditable - Whether the profile can be edited by the current user
 * @param onEdit - Callback function when the edit button is clicked
 */
function UserProfileCard({ user, isEditable, onEdit }: UserProfileCardProps) {
  // Component implementation
}
```

## 🧰 TypeScript Standards

### 📋 Type Definitions

- Use explicit types rather than `any` wherever possible
- Define interfaces for object structures
- Use type aliases for complex types
- Use TSDoc to document types and interfaces

```typescript
/**
 * Represents a user in the system
 * @interface User
 */
interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** Date when the user was created */
  createdAt: Date;
}
```

### ✅ Best Practices

- Use type narrowing instead of type assertions when possible
- Leverage TypeScript's structural typing
- Use generics for reusable components and functions
- Apply strict null checking

## 🪝 Custom Hook Standards

- Begin all custom hook names with `use`
- Document parameters and return values thoroughly
- Include usage examples in documentation
- Handle edge cases and error states consistently

```typescript
/**
 * Hook to manage pagination state and logic
 * 
 * @param initialPage - Starting page number (default: 1)
 * @param itemsPerPage - Number of items to display per page
 * @param totalItems - Total number of items in the dataset
 * @returns Pagination state and control functions
 */
function usePagination(initialPage = 1, itemsPerPage = 10, totalItems = 0) {
  // Hook implementation
}
```

## 🎨 CSS/SCSS Standards

- Use BEM naming convention for class names
- Prefer component-scoped styles (CSS modules or styled components)
- Maintain a consistent color palette using variables
- Design for mobile-first, then enhance for larger screens

## 🧪 Testing Standards

- Write tests for all new features
- Aim for significant test coverage
- Test component behavior, not implementation details
- Use appropriate testing patterns (unit, integration, snapshot)

## 💬 Comment Preservation Policy

**All comments in the codebase must be preserved** when modifying code, including when using AI-assisted tools for code generation or refactoring. Comments contain essential context and documentation.
