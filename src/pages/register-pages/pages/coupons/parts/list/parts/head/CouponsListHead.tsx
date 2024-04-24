import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import CouponsCreate from './parts/modal/create/CouponsCreate'
import RechargeModel from './parts/modal/recharge/RechargeModel'

function CouponsListHead() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const rechargeModel = useDisclosure()
    const { shop } = useAppStore()

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center">
                <VStack align="stretch" spacing="12px">
                    <AppTypography color="#C2C2C2" fontSize="12px">Your Credit</AppTypography>
                    <HStack alignItems="center">
                        <AppTypography color="#FFF" fontWeight="bold" fontSize="18px">${shop?.credit?.toFixed(2)} USD</AppTypography>
                    </HStack>
                </VStack>
                <Flex gap="10px">
                    <BasicButton sizes="medium" variant='outline' onClick={rechargeModel.onOpen}>Recharge Credit</BasicButton>
                    <BasicButton sizes="medium" onClick={onOpen}>Create Coupon</BasicButton>
                </Flex>
            </Flex>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
            {rechargeModel.isOpen && <RechargeModel close={rechargeModel.onClose} open={rechargeModel.isOpen} />}
        </>
    )
}

export default CouponsListHead