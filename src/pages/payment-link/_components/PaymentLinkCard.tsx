import { Divider, Flex, FlexProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren, FlexProps {
    title: string
}

function PaymentLinkCard({ title, children, ...props }: Props) {
    return (
        <Flex direction={"column"} gap={6} paddingBlock={{ base: 3, md: 6 }} paddingInline={{ base: 6, md: 9 }} borderRadius={8} bgColor={"neutral.gray.900"} {...props}>
            <AppTypography fontSize={20} fontWeight={600} color={"#fff"}>{title}</AppTypography>
            <Divider borderColor={"neutral.gray.700"} />
            {children}
        </Flex>
    )
}

export default PaymentLinkCard