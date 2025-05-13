import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { SocialItemsState } from './socialItems.model';


 type SocialDisplayProps = {
    socialId: string;
    socialItem: SocialItemsState[string];
    onEdit: (id: string) => void;
  };

/**
 * Component for displaying a social link
 */
export const SocialDisplay: React.FC<SocialDisplayProps> = ({ socialId, socialItem, onEdit }) => (
    <Flex 
      height="48px"
      padding="12px 16px"
      cursor="pointer"
      onClick={() => onEdit(socialId)}
      gap="8px"
      alignItems="center"
      width="100%"
      borderRadius="lg"
      border="1px solid"
      borderColor="neutral.gray.800"
      overflow="hidden"
    >
      <Box width="20px" height="20px" position="relative">
        {socialItem.icon}
      </Box>
      <Flex flex="1">
        <Text color="text.subtext.placeholder.dark" fontSize="16px" fontWeight="normal" lineHeight="normal">
          {socialItem.url}
        </Text>
        <Text color="white" fontSize="16px" fontWeight="medium" lineHeight="normal">
          {socialItem.value?.substring(0, 6)}
          {socialItem.value && socialItem.value.length > 7 && '...'}
        </Text>
      </Flex>
    </Flex>
); 