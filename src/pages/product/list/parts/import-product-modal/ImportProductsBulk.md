# Import Products Bulk

This module allows users to import products in bulk using a CSV file. Below is an overview of the components and their usage.

## Components

### ImportProductModal

This is the main component that handles the import process.

- **Props:**
  - `isOpen`: Boolean to control the modal visibility.
  - `closeModal`: Function to close the modal.

- **State:**
  - `uploadedFile`: Stores the uploaded file.
  - `formdata`: FormData object to hold the file data.

- **Functions:**
  - `uploadPicture`: Handles the file upload process and shows appropriate toast messages.

### ImportProductModalBody

This component renders the body of the modal, including the file upload section.

- **Props:**
  - `file`: The uploaded file.
  - `onFileChange`: Function to handle file changes.

### ImportProductModalFooter

This component renders the footer of the modal with action buttons.

- **Props:**
  - `file`: The uploaded file.
  - `closeModal`: Function to close the modal.
  - `onClick`: Function to handle the upload action.
  - `isLoading`: Boolean to indicate loading state.

### FileUpload

This component handles the file upload UI and logic.

- **Props:**
  - `onFileChange`: Function to handle file changes.

### FilePreview

This component displays a preview of the uploaded file.

- **Props:**
  - `file`: The uploaded file.
  - `onFileChange`: Function to handle file changes.
