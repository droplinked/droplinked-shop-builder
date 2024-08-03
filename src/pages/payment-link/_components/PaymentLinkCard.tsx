import { Divider, Flex, FlexProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren, FlexProps {
    title: string
}

function PaymentLinkCard({ title, children, ...props }: Props) {
    return (
        <Flex direction={"column"} gap={6} paddingBlock={6} paddingInline={9} borderRadius={8} bgColor={"#222222"} {...props}>
            <AppTypography fontSize={20} fontWeight={600} color={"#fff"}>{title}</AppTypography>
            <Divider borderColor={"#3C3C3C"} />
            {children}
        </Flex>
    )
}

export default PaymentLinkCard