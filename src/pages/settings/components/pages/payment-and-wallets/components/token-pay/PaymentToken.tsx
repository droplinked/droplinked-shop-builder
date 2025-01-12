import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { ReactElement } from 'react'

interface Props {
    icon: ReactElement
    title: string
    onClick: () => void
}

export default function PaymentToken({ icon, title, onClick }: Props) {
    return (
        <Flex width={"100%"} border={"1px solid #292929"} bg={"#141414"} borderRadius={"8px"} p={4} justifyContent={"space-between"} alignItems={"center"}>
            <Flex width={"100%"} alignItems={"center"} gap={4}>
                <Box sx={{ svg: { width: "24px", height: "24px" } }} p={3} bg={"#1C1C1C"} border={"1px solid #292929"} borderRadius={"8px"}>
                    {icon}
                </Box>
                <AppTypography color={"#fff"} fontSize={16} fontWeight={500} width={"100%"}>
                    {title}
                </AppTypography>
            </Flex>
            <AppIcons.RedTrash style={{ marginRight: "16px", width: "24px", height: "24px", cursor: "pointer" }} />
        </Flex>
    )
}
