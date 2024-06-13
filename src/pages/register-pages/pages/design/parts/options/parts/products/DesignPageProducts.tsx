import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import ProductSwitch from './parts/switch/ProductSwitch'
import CollectionsSwitch from './parts/switch/CollectionsSwitch'

function DesignPageProducts() {
    return (
        <DesignPageCard title='Displayed text' section='products'>
            <VStack align="stretch" spacing="24px">
                <ProductSwitch />
                <CollectionsSwitch />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageProducts