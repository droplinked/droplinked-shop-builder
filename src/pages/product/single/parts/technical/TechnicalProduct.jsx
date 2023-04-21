import React from 'react'
import { ComponentTitle, ComponentWrapper } from 'pages/prodcut-pages/ProductPages-style'
import { VStack } from '@chakra-ui/react'
import Collection from './parts/Collection'
import Shipping from './parts/shipping'

function TechnicalProduct() {
    return (
        <ComponentWrapper>
            <VStack spacing={10} align={"center"}>
                <ComponentTitle width={"100%"}>Technical information</ComponentTitle>
                <Collection />
                <Shipping />
            </VStack>
        </ComponentWrapper>
    )
}

export default TechnicalProduct