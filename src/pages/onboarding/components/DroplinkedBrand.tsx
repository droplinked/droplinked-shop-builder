import { Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import React from 'react'

function DroplinkedBrand() {
    return (
        <Flex alignItems="center" gap={3}>
            <Drop3 color='#2BCFA1' width='36px' height='36px' />
            <DroplinkedTypography color='#2BCFA1' width='143px' height='27px' />
        </Flex>
    )
}

export default DroplinkedBrand