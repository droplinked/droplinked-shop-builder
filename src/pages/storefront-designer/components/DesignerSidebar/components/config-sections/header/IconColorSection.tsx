import { Box, Flex, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext } from 'react';
import { SketchPicker } from 'react-color';

const IconColorSection: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { methods: { dispatch }, state: {shop: { shopDesign: { iconHeaderColor }}}} = useContext(designerContext);
  const color = iconHeaderColor || '#FFFFFF';

  const handleChange = ({ hex }) => {
    if (hex) dispatch({ type: 'updateShop', params: { shopDesign: { iconHeaderColor: hex } } });
  };

  const colorSwatch = (
    <Flex gap="10px" alignItems="center">
      <Box width="20px" height="20px" backgroundColor={color} borderRadius="4px" />
      <AppTypography fontSize="14px" color="text.white">
        {color}
      </AppTypography>
    </Flex>
  );

  return (
    <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
      <PopoverTrigger>
        <Flex
          w="100%"
          h="auto"
          position="relative"
          padding="10px 20px"
          borderRadius="8px"
          border="1px solid"
          borderColor="neutral.gray.800"
          cursor="pointer"
          transition="border-color 0.1s ease-out"
          _hover={{ borderColor: 'neutral.gray.700' }}
          _focus={{ outline: 'none' }}
          onClick={onToggle}
        >
          {colorSwatch}
        </Flex>
      </PopoverTrigger>

      <PopoverContent
        w="auto"
        p={0}
        border="none"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        borderRadius="8px"
        zIndex={9999}
        bg="transparent"
        _focus={{ outline: 'none', boxShadow: 'none' }}
      >
        <SketchPicker
          color={color}
          onChange={handleChange}
          disableAlpha
          styles={{
            default: {
              picker: {
                backgroundColor: '#1A1A1A'
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconColorSection;
