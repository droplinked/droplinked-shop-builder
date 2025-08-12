import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import React from 'react'
import ShippingRateDrawer from '../../ShippingRateDrawer/ShippingRateDrawer'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    zoneIndex: number
}

function AddRateButton({ zoneIndex }: Props) {
    const { t } = useLocaleResources("shipping-management")
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
                    <Text fontWeight={500}>{t('AddRateButton.title')}</Text>
                    <Text color="text.subtext.placeholder.dark">{t('AddRateButton.description')}</Text>
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