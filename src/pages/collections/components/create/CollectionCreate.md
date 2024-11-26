# CollectionCreate Component

The `CollectionCreate` component is responsible for rendering a form to create or edit a collection. It uses Formik for form handling and validation.

## Props

- `close`: Function to close the modal.
- `open`: Boolean to control the modal's visibility.
- `collection`: Optional collection object to edit an existing collection.

## Child Components

### ModalWrapper

Wraps the modal content and provides a consistent layout and styling.

#### Props

- `collection`: Optional collection object.
- `isOpen`: Boolean to control the modal's visibility.
- `onClose`: Function to close the modal.
- `children`: React nodes to be rendered inside the modal.

### AppInput

Custom input component used for form fields.

### ImageUploader

Handles image upload and preview for the collection cover image.

#### Props

- `errors`: Formik errors object.
- `values`: Formik values object.
- `setFieldValue`: Formik function to set field values.

### ModalButtons

Renders the action buttons for the modal (Create/Edit and Cancel/Discard).

#### Props

- `collection`: Optional collection object.
- `createService`: Mutation result for creating a collection.
- `updateService`: Mutation result for updating a collection.
