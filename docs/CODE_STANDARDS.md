# Code Standards for Droplinked Shop Builder

This document outlines the coding standards and practices to maintain consistency throughout the Droplinked Shop Builder codebase.

## General Principles

- **Readability**: Code should be written with clarity and readability as primary concerns.
- **Maintainability**: Structure code to be easily maintained and extended.
- **Performance**: Consider performance implications, especially for UI components.
- **Documentation**: All code should be appropriately documented.

## React Component Standards

### Component Structure

- Use functional components with hooks
- Organize imports logically:
  1. React and framework imports
  2. Third-party libraries
  3. Shared components, hooks, and utilities
  4. Local components and styles
- Keep components focused on a single responsibility
- Extract complex logic to custom hooks

### Component Documentation

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

## TypeScript Standards

### Type Definitions

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

### Best Practices

- Use type narrowing instead of type assertions when possible
- Leverage TypeScript's structural typing
- Use generics for reusable components and functions
- Apply strict null checking

## Custom Hook Standards

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

## CSS/SCSS Standards

- Use BEM naming convention for class names
- Prefer component-scoped styles (CSS modules or styled components)
- Maintain a consistent color palette using variables
- Design for mobile-first, then enhance for larger screens

## Testing Standards

- Write tests for all new features
- Aim for significant test coverage
- Test component behavior, not implementation details
- Use appropriate testing patterns (unit, integration, snapshot)

## Comment Preservation Policy

**All comments in the codebase must be preserved** when modifying code, including when using AI-assisted tools for code generation or refactoring. Comments contain essential context and documentation.
