# 📄 PageGrid Component Documentation

Welcome to the PageGrid component documentation! This guide will help you understand how to use the PageGrid component effectively in your project. Let's get started! 🚀

## Overview

The `PageGrid` component is a compound component that provides a structured layout for your pages. It consists of the following sub-components:

- `PageGrid.Root`
- `PageGrid.Header`
- `PageGrid.Actions`
- `PageGrid.Content`

## Usage

### 1. PageGrid.Root

The `PageGrid.Root` component is the root container for the PageGrid. It provides context for loading state.

#### Props

- `children` (React.ReactNode): The content to be rendered inside the root.
- `loading` (boolean, optional): The loading state.

#### Example

```tsx
<PageGrid.Root loading={true}>
  {/* Other components go here */}
</PageGrid.Root>
```

### 2. PageGrid.Header

The `PageGrid.Header` component is used to display the header section of the PageGrid.

#### Props

- `title` (string, optional): The title of the header.
- `description` (string, optional): The description of the header.
- `buttons` (IDataGridButtons['buttons'], optional): An array of button configurations.

#### Example

```tsx
<PageGrid.Header
  title="My Page Title"
  description="This is a description of the page."
  buttons={[{ caption: "Button 1", onClick: () => alert("Button 1 clicked!") }]}
/>
```

### 3. PageGrid.Actions

The `PageGrid.Actions` component is used to display action elements like search input and filters.

#### Props

- `search` (SearchInput, optional): Configuration for the search input.
- `filters` (Array<IFiltersDataGridItems>, optional): An array of filter configurations.

#### Example

```tsx
<PageGrid.Actions
  search={{ onChange: (e) => console.log(e.target.value), placeholder: "Search..." }}
  filters={[{ placeHolder: "Filter", onClick: (value) => console.log(value), filterItems: [{ title: "Option 1", value: "1" }] }]}
/>
```

### 4. PageGrid.Content

The `PageGrid.Content` component is used to display the main content of the PageGrid. It handles the loading state.

#### Props

- `children` (React.ReactNode): The content to be rendered inside the content area.
- `loading` (boolean, optional): The loading state.

#### Example

```tsx
<PageGrid.Content loading={false}>
  <div>Your main content goes here</div>
</PageGrid.Content>
```

## Putting It All Together

Here's an example of how to use all the components together:

```tsx
<PageGrid.Root loading={false}>
  <PageGrid.Header
    title="Dashboard"
    description="Overview of your activities"
    buttons={[{ caption: "Add New", onClick: () => alert("Add New clicked!") }]}
  />
  <PageGrid.Actions
    search={{ onChange: (e) => console.log(e.target.value), placeholder: "Search..." }}
    filters={[{ placeHolder: "Filter", onClick: (value) => console.log(value), filterItems: [{ title: "Option 1", value: "1" }] }]}
  />
  <PageGrid.Content loading={false}>
    <div>Your main content goes here</div>
  </PageGrid.Content>
</PageGrid.Root>
```

That's it! 🎉 You now know how to use the `PageGrid` component. If you have any questions, feel free to reach out. Happy coding! 💻