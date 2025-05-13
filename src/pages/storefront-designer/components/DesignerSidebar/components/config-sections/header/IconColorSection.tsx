import React, { useContext, useRef, useState } from "react";
import { Flex, Box, useOutsideClick } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { designerContext } from "pages/storefront-designer/context/designerContext";
import { SketchPicker } from "react-color";

const IconColorSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    methods: { dispatch },
    state: {
      shop: {
        shopDesign: { iconHeaderColor },
      },
    },
  } = useContext(designerContext);
  const color = iconHeaderColor || "#FFFFFF";
  const pickerRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: pickerRef, handler: () => setIsOpen(false) });

  const handleChange = ({ hex }) => {
    if (hex) dispatch({ type: "updateShop", params: { shopDesign: { iconHeaderColor: hex } } });
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
    <Flex
      w="100%"
      position="relative"
      padding="10px 20px"
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral.gray.800"
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {colorSwatch}

      {isOpen && (
        <Box
          position="absolute"
          zIndex="10"
          top="40px"
          left="0"
          ref={pickerRef}
          boxShadow="0 4px 12px rgba(0,0,0,0.25)"
          onClick={(e) => e.stopPropagation()}
        >
          <SketchPicker color={color} disableAlpha onChange={handleChange} />
        </Box>
      )}
    </Flex>
  );
};

export default IconColorSection;
