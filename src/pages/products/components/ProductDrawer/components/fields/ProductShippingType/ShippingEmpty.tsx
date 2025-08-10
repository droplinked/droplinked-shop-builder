import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { InformationMd } from 'assets/icons/Sign/Information/InformationMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React from 'react'

function ShippingEmpty() {
    return (
        <Flex
            padding={4}
            gap={2}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
        >
            <InformationMd color='#fff' />

            <Box fontSize={14}>
                <Heading
                    as="h4"
                    fontSize={14}
                    color="text.white"
                    lineHeight="20px"
                >
                    No Shipping Profiles
                </Heading>

                <Text marginTop={1} color="text.subtext.placeholder.dark">Set up a shipping profile to get started.</Text>

                <InteractiveText
                    to='/analytics/shipping-management'
                    width="fit-content"
                    marginTop={4}
                    border="1px solid"
                    borderColor="neutral.gray.800"
                    borderRadius={8}
                    padding="10px 14px"
                >
                    <PlusMd color='currentColor' />
                    New Shipping Profile
                </InteractiveText>
            </Box>
        </Flex>
    )
}

export default ShippingEmpty
