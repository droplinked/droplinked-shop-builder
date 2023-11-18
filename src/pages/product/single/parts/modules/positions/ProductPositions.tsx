import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import React, { useCallback, useContext } from "react";
import { productContext } from "pages/product/single/context";
import AppTypography from "components/common/typography/AppTypography";

interface IProps {
  update(element: string): void;
  state: Array<string>;
  positions: Array<string>;
}

function ProductPositions() {
  const { state: { m2m_positions, m2m_positions_options }, methods: { updateState } } = useContext(productContext)

  const click = useCallback((isActive: any, element: any) => {
    updateState('m2m_positions', isActive ? m2m_positions.filter((item: any) => item?.placement !== element?.placement) : [...m2m_positions, element])
  }, [m2m_positions])

  return (
    <VStack align="stretch" spacing="16px">
      <AppTypography size='14px'>Customers Position Options</AppTypography>
      <Flex gap={3}>
        {m2m_positions_options.map((el: any, key: number) => {
          const isActive = m2m_positions.find((pos: any) => pos?.placement === el?.placement)
          return (
            <Box key={key} backgroundColor="#1C1C1C" padding="8px 16px" onClick={() => click(isActive, el)} cursor="pointer" borderRadius="8px" border={`2px solid ${isActive ? '#2BCFA1' : 'transparent'}`}>
              <AppTypography size="14px">{el?.placement}</AppTypography>
            </Box>
          )
        })}
      </Flex >
    </VStack>
  );
}

export default ProductPositions;
