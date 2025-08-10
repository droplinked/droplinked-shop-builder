import { Flex } from '@chakra-ui/react'
import { EditLg } from 'assets/icons/Action/Edit/EditLg'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React from 'react'

function ShippingList() {
    return (
        <Flex direction='column' gap={4}>
            <InteractiveText
                to='/analytics/shipping-management'
                justifyContent="center"
                gap={2}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={8}
                padding="12px 16px"
                fontSize={16}
            >
                <EditLg color='currentColor' />
                New Shipping Profile
            </InteractiveText>
        </Flex>
    )
}

export default ShippingList
