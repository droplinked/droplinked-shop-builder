import { Box, Flex, Text, useOutsideClick } from '@chakra-ui/react';
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd';
import AppInput from 'components/redesign/input/AppInput';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { SocialItemsState } from './socialItems.model';
import { designerContext } from 'pages/storefront-designer/context/designerContext';

type SocialFormProps = {
    socialId: string;
    socialItem: SocialItemsState[string];
    onSave: (key: string, value: string) => void;
    onCancel: () => void;
  };

/**
 * Component for editing a social link
 */
export const SocialForm: React.FC<SocialFormProps> = ({ socialId, socialItem, onSave, onCancel }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const originalValue = socialItem.value || '';
  const [inputValue, setInputValue] = useState<string>(originalValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  
  // Get context for dispatching preview updates
  const { methods: { dispatch } } = useContext(designerContext);

  // Update preview whenever input value changes
  useEffect(() => {
    // Only show preview if the value has changed from original
    if (inputValue !== originalValue) {
      dispatch({
        type: 'updateState',
        params: {
          socialPreview: {
            key: socialId,
            value: inputValue,
            showPreview: true
          }
        }
      });
    }
    // Clear preview if we return to original value
    else if (originalValue === inputValue && isDirty) {
      dispatch({
        type: 'updateState',
        params: {
          socialPreview: {
            key: '',
            value: '',
            showPreview: false
          }
        }
      });
    }
  }, [inputValue, socialId, originalValue, isDirty, dispatch]);

  // Clear preview on unmount
  useEffect(() => {
    return () => {
      dispatch({
        type: 'updateState',
        params: {
          socialPreview: {
            key: '',
            value: '',
            showPreview: false
          }
        }
      });
    };
  }, [dispatch]);

  // Handle outside click to save the form
  useOutsideClick({
    ref: formRef,
    handler: () => {
      if (isDirty && inputValue) {
        // Only save if value has changed and is not empty
        onSave(socialId, inputValue);
      } else if (!inputValue && socialItem.value) {
        // If input becomes empty but there was a previous value, just cancel
        onCancel();
      } else {
        onCancel();
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsDirty(newValue !== originalValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      onSave(socialId, inputValue);
    }
  };

  const handleDelete = () => {
    // Empty string will remove the social link
    setInputValue('');
    setIsDirty(true);
    onSave(socialId, '');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Flex
        ref={formRef}
        height="48px"
        padding="12px 16px"
        borderRadius="lg"
        border="1px solid"
        borderColor="neutral.gray.800"
        alignItems="center"
        gap="8px"
        overflow="hidden"
        width="100%"
      >
        <Box width="20px" height="20px" position="relative">
          {socialItem.icon}
        </Box>
        <Flex flex="1" alignItems="center">
          <Text color="neutral.gray.800" fontSize="16px" fontWeight="normal" lineHeight="normal">
            {socialItem.url}
          </Text>
          <Box flex="1">
            <AppInput
              inputProps={{
                name: socialId,
                value: inputValue,
                onChange: handleInputChange,
                placeholder: socialId !== 'webURL' ? 'username' : 'domain',
                color: "white",
                fontSize: "16px",
                fontWeight: "medium",
                background: "transparent",
                border: "none",
                width: "100%"
              }}
              inputContainerProps={{
                width: "100%",
                padding: "0",
                border: "none",
              }}
              inputGroupProps={{
                width: "100%"
              }}
            />
          </Box>
        </Flex>
        <Box
          as="button"
          type="button"
          width="20px" 
          height="20px"
          position="relative"
          cursor="pointer"
          onClick={handleDelete}
          display="flex"
          alignItems="center"
          justifyContent="center"
          aria-label="Delete social link"
        >
          <TrashMd color='#FF2244' />
        </Box>
      </Flex>
    </form>
  );
}; 