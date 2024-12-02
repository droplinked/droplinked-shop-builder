# 📊 Table Component Documentation

Welcome to the Table component documentation! This guide will help you understand how to use the Table component in your project. Let's get started! 🚀

## 📦 Importing the Component

First, you need to import the Table component into your file:

```tsx
import Table from 'path/to/Table';
```

## 🛠️ Props

Here are the props you can pass to the Table component:

- **columns**: An array of column definitions.
- **data**: An array of data objects.
- **renderActions**: A function to render custom actions for each row.
- **enableSorting**: A boolean to enable or disable sorting.
- **sorting**: The current sorting state.
- **setSorting**: A function to update the sorting state.
- **isLoading**: A boolean to show a loading state.
- **emptyView**: A ReactNode to display when there is no data.
- **footerContent**: A ReactNode to display in the footer.
- **infiniteScroll**: An object to enable infinite scrolling.

## 📝 Example Usage

Here's an example of how to use the Table component:

```tsx
import React, { useState } from 'react';
import Table from 'path/to/Table';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<MyDataType>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  // Add more columns as needed
];

const data: MyDataType[] = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Smith', age: 34 },
  // Add more data as needed
];

const MyTableComponent = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Table
      columns={columns}
      data={data}
      enableSorting={true}
      sorting={sorting}
      setSorting={setSorting}
      isLoading={false}
      emptyView={<div>No data available</div>}
      footerContent={<div>Footer content here</div>}
      infiniteScroll={{
        dataLength: data.length,
        hasMore: true,
        next: () => {
          // Fetch more data here
        },
        isFetchingNextPage: false,
      }}
    />
  );
};

export default MyTableComponent;
```

## 🔄 Infinite Scrolling

To enable infinite scrolling, pass the `infiniteScroll` prop with the following properties:

- **dataLength**: The length of the current data.
- **hasMore**: A boolean indicating if there are more items to load.
- **next**: A function to fetch the next set of data.
- **isFetchingNextPage**: A boolean indicating if the next page is being fetched.

## 🎨 Custom Actions

You can render custom actions for each row by passing the `renderActions` prop:

```tsx
const renderActions = (row) => (
  <button onClick={() => alert(`Clicked on ${row.name}`)}>Click Me</button>
);

<Table
  columns={columns}
  data={data}
  renderActions={renderActions}
/>
```

That's it! You're all set to use the Table component in your project. Happy coding! 😊