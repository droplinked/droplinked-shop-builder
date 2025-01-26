# 🛠️ ProductDrawer Component Documentation

## Overview
The `ProductDrawer` component is a drawer that allows users to view and edit product details. It is composed of several subcomponents that handle different parts of the drawer's functionality.

## Components

### ProductDrawer
The main component that manages the state and rendering of the drawer. It fetches the product data and displays the `ProductForm` for editing the product.

### ProductDrawerLayout
A layout component that provides the structure for the drawer. It ensures the drawer is displayed correctly with appropriate styling and behavior.

### ProductForm
A form component that allows users to edit product details. It integrates with Formik for form state management and validation. It also handles form submission and modal interactions.

### ProductDrawerHeader
A subcomponent of `ProductForm` that displays the header of the drawer, including the title and description of the product being edited.

### FormContent
A subcomponent of `ProductForm` that contains the main content of the form, including input fields for product details.

### ProductDrawerFooter
A subcomponent of `ProductForm` that displays the footer of the drawer, including action buttons for saving or canceling the form.

### DropInfoModal
A modal component that displays information about the product drop. It is shown after a successful product record.

### CircleRecordModal
A modal component that handles the recording of products on the blockchain. It is shown conditionally based on the selected chain and other criteria.

### useProductSubmission
A custom hook that handles the form submission logic for the `ProductForm`. It manages the state and interactions for saving and recording products.

### useCurrencyConverter
A custom hook that provides functions for converting and formatting prices based on the shop's currency settings.

### useInvalidateProductsQuery
A custom hook that invalidates the products query in React Query, ensuring the product list is refreshed after changes.

## Conclusion
The `ProductDrawer` component and its subcomponents provide a flexible and reusable way to manage product details in a drawer interface. By understanding the purpose and functionality of each component, developers can easily integrate and customize the drawer to fit their needs.
