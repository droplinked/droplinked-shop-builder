import { Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function PrintfullTechniques() {
  const { store: { state: { product_printful } }, methods: { updateState } } = useContext(productContext)

  return (
    <VStack align="stretch" spacing="10px">
      {product_printful ? product_printful.techniques.map((el, key) => (
        <Flex key={key} gap="10px" justifyContent="center" border="1px solid #444" color="#FFF" borderRadius="5px" onClick={() => updateState("technique", el.key)} alignItems="center" cursor="pointer" padding="10px">
          <AppTypography fontSize="14px">{el.display_name}</AppTypography>
          {el.is_default && <AppTypography fontSize="12px" color="#888">(default)</AppTypography>}
        </Flex>
      )) : null}
    </VStack>
  )
}

export default PrintfullTechniques