import { Flex, IconButton, Text } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd';
import AppImage from 'components/common/image/AppImage';
import FileUpload from 'components/redesign/file-upload/FileUpload';
import useAppToast from 'hooks/toast/useToast';
import useFileUpload from 'hooks/useFileUpload/useFileUpload';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useCallback, useContext, useState } from 'react';
import { getFileSizeInMB } from 'utils/helpers';

/**
 * Props for ImageUploadSection component
 */
interface ImageUploadSectionProps {
  fieldName: string; // The field name in the store context (e.g., 'logo', 'headerIcon')
  fieldPath?: string; // Optional nested path (e.g., 'shopDesign.faviconURL')
  altText?: string; // Alt text for the image
  imageUrl?: string; // Override for the image URL if not directly from context
}

/**
 * Image upload section component with preview and delete functionality
 */
function ImageUploadSection({ fieldName, fieldPath, altText, imageUrl: providedImageUrl }: ImageUploadSectionProps): React.ReactElement {
  const { methods: { dispatch }, state: { shop }} = useContext(designerContext);
  const { showToast } = useAppToast();

  // Get value from nested object path
  const getNestedValue = (obj: any, path: string) => {
    if (!path) return obj[fieldName];
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Get the image URL from context or provided prop
  const imageUrl = providedImageUrl || (fieldPath ? getNestedValue(shop, fieldPath) : (shop[fieldName as keyof typeof shop] as string));

  const [fileName, setFileName] = useState<string>('Image.png');
  const [fileSize, setFileSize] = useState<string>('2.34 MB');
  const { mutateAsync, isLoading } = useFileUpload();

  // Handle file upload
  const handleFileChange = useCallback(
    async (file: File) => {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const { original } = await mutateAsync(formData);

          // Update state based on field path structure
          if (fieldPath) {
            const [parent, child] = fieldPath.split('.');
            dispatch({
              type: 'updateShop',
              params: { [parent]: { [child]: original } }
            });
          } else {
            dispatch({ type: 'updateShop', params: { [fieldName]: original } });
          }

          setFileName(file.name);
          setFileSize(`${getFileSizeInMB(file)} MB`);
        } catch (error) {
          showToast({message:'Failed to upload image' , type:'error'})
        }
      }
    },
    [mutateAsync, dispatch, fieldName, fieldPath]
  );

  // Handle image removal
  const handleRemoveImage = useCallback(() => {
    if (fieldPath) {
      const [parent, child] = fieldPath.split('.');
      dispatch({
        type: 'updateShop',
        params: { [parent]: { [child]: '' } }
      });
    } else {
      dispatch({ type: 'updateShop', params: { [fieldName]: '' } });
    }
  }, [dispatch, fieldName, fieldPath]);

  return (
    <Flex width="100%" height="auto" display="flex" flexDirection="column" gap="3" overflow="hidden">
      <FileUpload
        onFileChange={handleFileChange}
        isLoading={isLoading}
        icon={<AppIcons.HeaderImage />}
        accept={{
          'image/jpeg': ['.jpeg', '.jpg'],
          'image/png': ['.png']
        }}
        text={{
          dragActiveText: 'Drop the image here...',
          footerText: 'JPG, JPEG, PNG (up to 5MB)'
        }}
        flexProps={{
          width: '100%',
          height: '150px',
          bgColor: 'neutral.gray.800'
        }}
      />

      {imageUrl && !isLoading && (
        <Flex
          width="100%"
          height="auto"
          display="flex"
          alignItems="center"
          gap="3"
          padding="12px 16px 12px 12px"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="neutral.gray.800"
        >
          <AppImage width="12" height="12" borderRadius="md" src={`${imageUrl}`} alt={altText || fieldName} />
          <Flex width="auto" height="auto" display="flex" flexDirection="column" flex="1" gap="1">
            <Text fontSize="sm" fontWeight="medium" color="white" noOfLines={1}>
              {fileName}
            </Text>
            <Text fontSize="xs" color="text.subtext.placeholder.dark">
              {fileSize}
            </Text>
          </Flex>
          <IconButton
            width="auto"
            height="auto"
            aria-label={`Remove ${altText || fieldName}`}
            icon={<TrashMd color="#FF2244" />}
            variant="ghost"
            borderRadius="lg"
            padding="2.5"
            onClick={handleRemoveImage}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default ImageUploadSection;
