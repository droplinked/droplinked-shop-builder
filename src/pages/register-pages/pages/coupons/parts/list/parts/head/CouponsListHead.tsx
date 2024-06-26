import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore'
import React from 'react'
import CouponsCreate from './parts/modal/create/CouponsCreate'
import RechargeModel from './parts/modal/recharge/RechargeModel'

function CouponsListHead() {
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const rechargeModel = useDisclosure()
    const { shop } = useAppStore()

    const handleOpenCreateCouponModal = () => {
        if (!checkPermissionAndShowToast("coupon_creation")) return
        onOpen()
    }

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center">
                <VStack align="stretch" spacing="12px">
                    <AppTypography color="#C2C2C2" fontSize="12px">Your Credit</AppTypography>
                    <HStack alignItems="center">
                        <AppTypography color="#FFF" fontWeight="bold" fontSize="18px">${shop?.credit?.toFixed(2)} USD</AppTypography>
                    </HStack>
                    {shop && shop.name === "unstoppable" && <AppTypography color="#C2C2C2" fontSize="12px" >$200 monthly charge for enterprise support and design services</AppTypography>}
                </VStack>
                <Flex gap="10px">
                    <BasicButton sizes="medium" variant='outline' onClick={rechargeModel.onOpen}>Recharge Credit</BasicButton>
                    <BasicButton sizes="medium" onClick={handleOpenCreateCouponModal}>Create Coupon</BasicButton>
                </Flex>
            </Flex>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
            {rechargeModel.isOpen && <RechargeModel close={rechargeModel.onClose} open={rechargeModel.isOpen} />}
        </>
    )
}

export default CouponsListHead