# Contributing to Droplinked Shop Builder

We love your input! We want to make contributing to Droplinked Shop Builder as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repository and create your branch from `dev`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Submit your pull request!

### Coding Style

- We DON'T use ESLint and Prettier to maintain code quality.
- All TypeScript code must include appropriate TSDoc comments.
- Components should include concise, descriptive comments.
- Follow the existing patterns in the codebase for consistency.

## Documentation Guidelines

### Component Documentation

- Keep inline component comments brief and focused on purpose
- Use JSDoc/TSDoc format for component props and return values
- For complex components, create a separate `.md` file in `/docs/components/`

### Hook Documentation

- Each custom hook should have a corresponding Markdown file in `/docs/hooks/`
- Follow the template at `/docs/templates/hook-template.md`
- Document parameters, return values, and provide usage examples

### TypeScript Documentation

- Use TSDoc for all public interfaces, types, and functions
- Document parameters, return types, and include examples where helpful
- Mark internal/private items appropriately

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
