# 📚 Collections Component

The `Collections` component is responsible for displaying and managing collections within the application. It provides functionalities to create new collections, reorder existing ones, and search through the collections.

## 🛠️ Component Structure

### 🧩 Internal State

- `searchTerm` (string): Stores the current search term for filtering collections.

### 🖱️ Event Handlers

- `handleOpenCreateCollectionModal`: Opens the modal to create a new collection.
- `setSearchTerm`: Updates the search term state.

### 🧩 Components Used

- `CollectionGrid`: Custom grid component for displaying collections.
- `CollectionCreate`: Modal component for creating a new collection.
- `CollectionReorderModal`: Modal component for reordering collections.

## 📝 Notes

- The component uses the `useDisclosure` hook from `@chakra-ui/react` to manage the visibility of modals.
- The `useCollections` hook is used to fetch and manage the collections data.
- The `useCheckPermission` hook is used to check user permissions before allowing certain actions.
- The `CollectionGrid` component is used to display the collections in a tabular format with search and action buttons.
- The `CollectionCreate` and `CollectionReorderModal` components are used for creating and reordering collections, respectively.
- The `TableV2` component is used within `CollectionGrid` for rendering the collections table.

This component provides a comprehensive interface for managing collections, including creating new collections, reordering them, and searching through existing collections.