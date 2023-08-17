import { Box, Flex } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import artwork2dContext from '../../../../context'
import Artwork2dSkuModel from './model'

function Artwork2dSku() {
    const { state: { sku } } = useContext(productContext)
    const { color, setStates } = useContext(artwork2dContext)
    const { options } = Artwork2dSkuModel

    return (
        <>
            {options(sku).length ? (
                <Flex gap="10px" flexWrap="wrap">
                    {options(sku).map((el, key) => (
                        <Box
                            width="32px"
                            height="32px"
                            cursor="pointer"
                            key={key}
                            border={`2px solid ${color === el?.value ? "#FFF" : 'transparent'}`}
                            onClick={() => setStates(prev => ({ ...prev, color: el?.value }))}
                            backgroundColor={el?.value}
                            borderRadius="100%"
                        >
                        </Box>
                    ))}
                </Flex>
            ) : null}
        </>
    )
}

export default Artwork2dSku