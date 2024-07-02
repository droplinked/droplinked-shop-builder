import { Box, Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React from 'react'
import CouponsCreate from '../list/parts/head/parts/modal/create/CouponsCreate'
import classes from './style.module.scss'

function CouponsEmpty() {
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOpenCreateCouponModal = () => {
        if (!checkPermissionAndShowToast("coupon_creation")) return
        onOpen()
    }

    return (
        <>
            <AppCard>
                <VStack align="stretch" spacing="25px" color="#C2C2C2">
                    <Box textAlign="center"><AppTypography fontSize='18px'>Offer exclusive Gift Cards and Credits to Your Customers!</AppTypography></Box>
                    <HStack justifyContent="center" className={classes.icons} spacing="30px">
                        <AppIcons.DiscountSetting />
                        <AppIcons.GiftSetting />
                    </HStack>
                    <Flex justifyContent="center">
                        <BasicButton onClick={handleOpenCreateCouponModal}>Create Coupon</BasicButton>
                    </Flex>
                </VStack>
            </AppCard>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
        </>
    )
}

export default CouponsEmpty