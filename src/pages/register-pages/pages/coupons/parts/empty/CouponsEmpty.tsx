import { Box, Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import CouponsCreate from '../parts/create/CouponsCreate'
import classes from './style.module.scss'

function CouponsEmpty() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <AppCard>
                <VStack align="stretch" spacing="25px" color="#C2C2C2">
                    <Box textAlign="center"><AppTypography size='18px'>Offer exclusive Gift Cards and Credit to Your Customers!</AppTypography></Box>
                    <HStack justifyContent="center" className={classes.icons} spacing="30px">
                        <AppIcons.discountSetting />
                        <AppIcons.giftSetting />
                    </HStack>
                    <Flex justifyContent="center">
                        <BasicButton onClick={onOpen}>Create Coupon</BasicButton>
                    </Flex>
                </VStack>
            </AppCard>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
        </>
    )
}

export default CouponsEmpty