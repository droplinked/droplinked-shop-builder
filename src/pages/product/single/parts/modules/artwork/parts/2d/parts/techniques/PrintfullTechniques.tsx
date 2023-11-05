import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import artwork2dContext from '../../context'

function PrintfullTechniques() {
  const { setStates } = useContext(artwork2dContext)
  const { store: { state: { product_printful } } } = useContext(productContext)

  return (
    <VStack align="stretch" spacing="10px">
      {product_printful ? product_printful.techniques.map((el, key) => (
        <Flex key={key} gap="10px" justifyContent="center" border="1px solid #444" color="#FFF" borderRadius="5px" onClick={() => setStates("technique", el.key)} alignItems="center" cursor="pointer" padding="10px">
          <AppTypography size="14px">{el.display_name}</AppTypography>
          {el.is_default && <AppTypography size="12px" color="#888">(default)</AppTypography>}
        </Flex>
      )) : null}
    </VStack>
  )
}

export default PrintfullTechniques