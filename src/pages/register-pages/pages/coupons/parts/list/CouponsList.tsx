import { VStack } from '@chakra-ui/react'
import React from 'react'
import CouponsListContent from './parts/content/CouponsListContent'
import CouponsListHead from './parts/head/CouponsListHead'

function CouponsList() {
    return (
        <VStack align="stretch" spacing="20px">
            <CouponsListHead />
            <CouponsListContent />
        </VStack>
    )
}

export default CouponsList