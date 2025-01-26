# 🛠️ ProductsV2 Component Documentation

## Overview
The `ProductsV2` component is the main interface for managing products within the application. It integrates various subcomponents to provide a comprehensive and user-friendly experience for product management, including searching, importing, reordering, and editing products.

## Components

### ProductsV2
The main component that orchestrates the product management functionalities. It handles the state and interactions for opening modals and drawers related to product actions.

When a user selects a product type or selects a product to edit, the product drawer opens. This is handled inside a `useEffect` hook to ensure the drawer opens automatically based on the state.

### PageHeader
A header component that displays the title and description of the products page. It includes buttons for opening the import and reorder modals, providing quick access to these functionalities.

### PageHeaderRightContent
A subcomponent of `PageHeader` that contains action buttons for creating new products, importing products, and reordering products. It ensures that these actions are easily accessible from the header.

### ProductTypesPopover
A subcomponent of `PageHeaderRightContent` that displays a popover with different product types. It allows users to select the type of product they want to create.

The `isProductTypePopoverOpen` state in `useProductPageStore` is used to manage the visibility of the product type selection popover. Since there are two places to open the product type selection modal (the button in the page header and the add new product button in the product table empty state), this variable ensures that only one instance of the popover is open at a time.

### ProductTypeCard
A subcomponent of `ProductTypesPopover` that represents an individual product type. It includes an icon, title, and description for the product type, and allows users to select it.

### PageGrid
A layout component that structures the page into different sections, including the header, actions, and content areas. It ensures a consistent and organized layout for the product management interface.

### ProductTable
A table component that displays the list of products. It supports searching, infinite scrolling, and various actions for each product, making it easy to manage and interact with the product data.

### ImportProductModal
A modal component that allows users to import products using a CSV file. It includes a link to download a sample template and handles file uploads, simplifying the process of adding multiple products at once.

### ProductReorderModal
A modal component that enables users to reorder products by dragging and dropping them. It fetches the list of products and displays them in a sortable list, allowing for easy reorganization.

### ProductDrawer
A drawer component that allows users to view and edit product details. It fetches the product data and displays a form for editing the product, providing a seamless editing experience.

### useModalHandlers
A custom hook that provides handlers for opening and closing the import product modal, reorder product modal, and product form drawer. It centralizes the modal state management.

### useProductPageStore
A Zustand store that manages the state of the product page, including the selected product type and the ID of the product being edited. It ensures consistent state management across the product management interface.

The `isProductTypePopoverOpen` state is used to manage the visibility of the product type selection popover, ensuring that only one instance of the popover is open at a time.

## Conclusion
The `ProductsV2` component and its subcomponents provide a robust and flexible interface for managing products. By understanding the purpose and functionality of each component, developers can easily extend and customize the product management features to fit their needs.
