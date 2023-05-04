import { VStack } from '@chakra-ui/react'
import React from 'react'
import ShopsContainer from './parts/container/ShopsContainer'

function ShopsList() {
    return (
        <VStack align={"stretch"}>
            {[1, 1, 1, 1, 1].map((el, key) => <ShopsContainer key={key} />)}
        </VStack>
    )
}

export default ShopsList