import React from 'react'
import { ComponentTitle } from 'pages/prodcut-pages/ProductPages-style'
import { VStack } from '@chakra-ui/react'
import Collection from './parts/Collection'
import Shipping from './parts/shipping'
import AppCard from 'components/shared/card/AppCard'

function TechnicalProduct() {
    return (
        <AppCard mini>
            <VStack spacing={10} align={"center"}>
                <ComponentTitle width={"100%"}>Technical information</ComponentTitle>
                <Collection />
                <Shipping />
            </VStack>
        </AppCard>
    )
}

export default TechnicalProduct