import React, { useCallback, useContext } from 'react';
import { VStack, Flex } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import createSocialItems from './socialItems.model';
import { SocialDisplay } from './SocialDisplay';
import { SocialForm } from './SocialForm';


type SocialInputsProps = {
    activeSocialId: string;
    onUpdateActiveSocial: (value: string) => void;
  }; 

/**
 * Component for handling social inputs
 */
export const SocialInputs: React.FC<SocialInputsProps> = ({ activeSocialId, onUpdateActiveSocial }) => {
  const {
    methods: { dispatch },
    state: { shop }
  } = useContext(designerContext);

  const socialItems = createSocialItems(shop);

  const handleSave = useCallback(
    (key: string, value: string) => {
      const match = socialItems[key].pattern.exec(value);
      const processedValue = match ? match[1] : value;
      
      // First update the shop with the new value
      dispatch({
        type: 'updateShop',
        params: { [key]: processedValue }
      });
      
      // Keep the preview active if the user added a value
      // Only hide the preview if the user deleted the value
      const shouldHidePreview = !processedValue || processedValue.length === 0;
      
      dispatch({
        type: 'updateState',
        params: {
          socialPreview: shouldHidePreview ? {
            key: '',
            value: '',
            showPreview: false
          } : {
            key,
            value: processedValue,
            showPreview: true
          }
        }
      });
      
      onUpdateActiveSocial('');
    },
    [socialItems, dispatch, onUpdateActiveSocial]
  );

  const handleCancel = useCallback(() => {
    // Clear the social preview when canceling
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
    onUpdateActiveSocial('');
  }, [dispatch, onUpdateActiveSocial]);

  // Filter and display social links
  const visibleSocialItems = Object.entries(socialItems).filter(
    ([id]) => activeSocialId.includes(id) || shop[id]?.length
  );

  return (
    <VStack align="stretch">
      {visibleSocialItems.map(([id, socialItem]) => (
        <Flex 
          key={id} 
          borderRadius="8px" 
          padding="4px" 
          gap="8px" 
          alignItems="center"
        >
          {id !== activeSocialId ? (
            <SocialDisplay 
              socialId={id} 
              socialItem={socialItem} 
              onEdit={onUpdateActiveSocial} 
            />
          ) : (
            <SocialForm 
              socialId={id}
              socialItem={socialItem}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </Flex>
      ))}
    </VStack>
  );
}; 