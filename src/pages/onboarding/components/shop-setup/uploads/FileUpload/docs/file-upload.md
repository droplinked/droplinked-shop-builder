# 📁 FileUpload Component Documentation

## Overview
The FileUpload component is a versatile file upload solution that supports drag-and-drop functionality, file preview, and loading states.

## 🧩 Main Components

### FileUpload
The main component that orchestrates the file upload functionality.

#### Props
- `onFileChange: (file: File | null) => void` - Callback when file is selected or removed
- `dropDescription?: string` - Custom description text
- `multiple?: boolean` - Allow multiple file uploads (default: false)
- `accept?: { [key: string]: string[] }` - Accepted file types
- `isLoading?: boolean` - Loading state flag
- `boxProps?: FlexProps` - Additional Chakra UI Flex props
- `icon?: ReactNode` - Custom upload icon
- `title?: ReactNode` - Custom title
- `value?: string` - Preview image URL

#### Example Usage
```tsx
<FileUpload
  onFileChange={(file) => handleFile(file)}
  accept={{ 'image/*': ['.jpg', '.png'] }}
  dropDescription="Supported formats: JPEG, PNG"
/>
```

### 🔄 LoadingState
Displays a loading spinner with "Uploading..." text.

#### Usage
```tsx
<LoadingState />
```

### 📝 DropMessage
Handles the display of drag-and-drop instructions and custom messages.

#### Props
- `isDragActive: boolean` - Indicates if file is being dragged over
- `title?: ReactNode` - Custom title element
- `dropDescription?: string` - Additional description text

### 🎛️ ControlButtons
Provides edit and delete actions for uploaded files.

#### Props
- `onEdit: (e: React.MouseEvent) => void` - Edit button click handler
- `onRemove: (e: React.MouseEvent) => void` - Remove button click handler

## 🎨 Styling
The component uses Chakra UI for styling with a dark theme:
- Background: `#1C1C1C`
- Border: `1px dashed #3C3C3C`
- Control buttons background: `#292929`
- Accent color: `#179EF8`

## 🚀 Features
- Drag and drop support
- File preview
- Loading state
- Edit/Remove controls
- Custom icons and messages
- Flexible styling through Chakra UI props

## ⚠️ Notes
- The component currently supports single file upload by default
- File preview is optimized for image files
- Uses react-dropzone for drag-and-drop functionality
