# 🚀 Droplinked Shop Builder Testing Guide 🧪

Welcome to the testing documentation for the Droplinked Shop Builder project! This guide will help you understand how to write and run tests effectively in our codebase.

## 📋 Table of Contents

- [Testing Framework Overview](#testing-framework-overview)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Structure](#test-structure)
- [Mock Guidelines](#mock-guidelines)
- [Visual Elements Testing](#visual-elements-testing)
- [Common Testing Scenarios](#common-testing-scenarios)
- [Debugging Tests](#debugging-tests)
- [Best Practices](#best-practices)

## 🛠️ Testing Framework Overview

Our project uses:
- **Jest** (v29.7.0): Main testing framework
- **Testing Library**: For testing React components
  - @testing-library/react (v16.3.0)
  - @testing-library/jest-dom (v6.6.3)
  - @testing-library/user-event (v14.6.1)
- **JSDOM**: Browser-like environment for Node.js
- **Custom polyfills**: For browser APIs not available in JSDOM

## 🏃‍♀️ Running Tests

We have several npm scripts available for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Debug tests
npm run test:debug
```

## ✍️ Writing Tests

### 📄 File Naming and Location

Place your test files either:
1. In the `src/__tests__` directory, mirroring the file structure of the source code
2. Adjacent to the code they're testing with `.test.ts` or `.spec.ts` suffix

Example:
- Source file: `src/utils/helpers/regexUtils.ts`
- Test file: `src/__tests__/regexUtils.test.ts` or `src/utils/helpers/regexUtils.test.ts`

### 🔍 Test Structure

We follow the AAA (Arrange-Act-Assert) pattern:

```typescript
test('should validate email correctly', () => {
  // Arrange
  const validEmail = 'user@example.com';
  
  // Act
  const isValid = validateEmail(validEmail);
  
  // Assert
  expect(isValid).toBe(true);
});
```

## 🎭 Mock Guidelines

### Global Mocks

Our `setupTests.ts` already includes common mocks:
- `window.matchMedia`
- `IntersectionObserver`

### Creating Mocks

Mock dependencies using Jest's mocking features:

```typescript
// Mocking a module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mocking a function
const showToastMock = jest.fn();

// Reset mocks between tests
beforeEach(() => {
  showToastMock.mockClear();
});
```

## 🖼️ Visual Elements Testing

For components with visual elements:

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
});
```

## 🧩 Common Testing Scenarios

### Testing React Hooks

Use `@testing-library/react-hooks`:

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### Testing API Calls

Mock axios and test the function that uses it:

```typescript
import { getOrderService } from './services';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('getOrderService calls correct endpoint', async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: { id: 123 } });
  
  await getOrderService({ orderID: 123 });
  
  expect(mockedAxios.get).toHaveBeenCalledWith('order/single/123');
});
```

### Testing Form Validation

```typescript
import { handleValidations } from './validationHandlers';

test('validates form correctly', () => {
  const showToastMock = jest.fn();
  const formValues = {
    name: 'Test Shop',
    email: 'test@example.com',
    // Add other required form fields
  };
  
  const result = handleValidations({ 
    values: formValues, 
    showToast: showToastMock 
  });
  
  expect(result).toBe(true);
  expect(showToastMock).not.toHaveBeenCalled();
});
```

## 🐛 Debugging Tests

Use the debug script to troubleshoot complex tests:

```bash
npm run test:debug
```

This will start the tests in debug mode. You can then open Chrome's DevTools for Node.js by navigating to `chrome://inspect` and clicking on "Open dedicated DevTools for Node".

## ✅ Best Practices

1. **Test behavior, not implementation**: Focus on what your code does, not how it does it.
2. **Keep tests isolated**: Each test should run independently of others.
3. **Use meaningful assertions**: Clear error messages help identify issues faster.
4. **Test edge cases**: Include tests for boundary conditions and error handling.
5. **Mock external dependencies**: Don't rely on external services in unit tests.
6. **Keep tests fast**: Slow tests discourage frequent testing.
7. **Test coverage**: Aim for good coverage, but prioritize critical paths over 100% coverage.

### 💡 Example: Testing a Complex Component

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });
  
  test('shows validation errors for empty fields', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  test('submits form with valid data', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password123'
    });
  });
});
```

Happy testing! 🎉 If you have questions about testing specific components or functionality, please reach out to the frontend development team.