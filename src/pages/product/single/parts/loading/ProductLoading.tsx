import { Flex } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import React, { useContext } from 'react'
import { productContext } from '../../context'

function ProductLoading() {
    const { sync } = useContext(productContext)

    return (
        <>
            {!sync ? (
                <Flex position="fixed" top="0" right="0" bottom="0" left="0" backgroundColor="rgba(72, 72, 72, 0.4)" backdropFilter="blur(20px)" zIndex="2" justifyContent="center" alignItems="center"><LoadingComponent /></Flex>
            ) : null}
        </>
    )
}

export default ProductLoading