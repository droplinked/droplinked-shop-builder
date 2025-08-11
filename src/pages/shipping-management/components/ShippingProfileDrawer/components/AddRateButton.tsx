import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import React from 'react'
import ShippingRateDrawer from '../../ShippingRateDrawer/ShippingRateDrawer'

interface Props {
    zoneIndex: number
}

function AddRateButton({ zoneIndex }: Props) {
    const rateModal = useDisclosure()

    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                padding={4}
                fontSize={14}
                color="text.link"
            >
                <Box>
                    <Text fontWeight={500}>Add New Rate</Text>
                    <Text color="text.subtext.placeholder.dark">Add options and rates for this zone.</Text>
                </Box>

                <button type='button' onClick={rateModal.onOpen}>
                    <PlusMd color='currentColor' />
                </button>
            </Flex>

            {rateModal.isOpen && <ShippingRateDrawer {...rateModal} zoneIndex={zoneIndex} />}
        </>
    )
}

export default AddRateButton