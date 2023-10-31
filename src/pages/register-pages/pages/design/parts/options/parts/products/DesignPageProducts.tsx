import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import ProductSwitch from './parts/switch/ProductSwitch'

function DesignPageProducts() {
    return (
        <DesignPageCard title='Products Listing'>
            <VStack align="stretch" spacing="24px">
                <ProductSwitch />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageProducts