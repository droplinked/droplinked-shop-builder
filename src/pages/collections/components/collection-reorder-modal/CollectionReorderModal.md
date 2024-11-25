Documentation for the `CollectionReorderModal` component.

# 📚 CollectionReorderModal Component

The `CollectionReorderModal` component is a modal that allows users to reorder and change the visibility of collections. It uses drag-and-drop functionality to rearrange collections and a switch to toggle their visibility.

## 🛠️ Component Structure

### 📋 Props

- `isOpen` (boolean): Determines if the modal is open.
- `close` (function): Function to close the modal.

### 🧩 Internal State

- `collections` (array): Stores the list of collections.
- `isLoading` (boolean): Indicates if the collections are being loaded.

### 🔄 Lifecycle Methods

- `useEffect`: Fetches collections when the component mounts.

### 🖱️ Event Handlers

- `handleDragEnd`: Handles the end of a drag event to reorder collections.

### 🧩 Components Used

- `AppTypography`: Custom typography component.
- `SortableCollection`: Component representing a sortable collection item.
- `AppModal`: Custom modal component.
- `ModalHeaderData`: Component for the modal header.
- `AppIcons`: Custom icons.

## 📝 Notes

- Ensure that the `getAllCollectionsService` and `reorderCollectionsService` APIs are correctly implemented and handle errors gracefully.
- The drag-and-drop functionality is powered by the `@dnd-kit` library.
- The modal styling and layout are managed using `@chakra-ui/react`.