import { Box, HStack, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import CouponsCreateContext from '../../context'
import classes from './style.module.scss'

function CouponsCreateHome() {
    const { updateState } = useContext(CouponsCreateContext)

    const data = [
        {
            title: 'Discount',
            description: 'Create discount coupon code',
            icon: <AppIcons.DiscountSetting className={classes.icon} />,
            value: "DISCOUNT"
        },
        {
            title: 'Credit',
            description: 'Create credit coupon code',
            icon: <AppIcons.GiftSetting className={classes.icon} />,
            value: "CREDIT"
        }
    ]

    return (
        <VStack align="stretch" spacing="10px">
            {data.map((el, key: number) => (
                <HStack spacing="13px" backgroundColor="#141414" onClick={() => updateState('type', el.value)} cursor="pointer" padding="20px" key={key}>
                    <Box>{el.icon}</Box>
                    <VStack align="stretch" spacing={1}>
                        <AppTypography size='16px' color="#C2C2C2" weight='bolder'>{el.title}</AppTypography>
                        <AppTypography size='12px' color="#808080">{el.description}</AppTypography>
                    </VStack>
                </HStack>
            ))}
        </VStack>
    )
}

export default CouponsCreateHome