import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

export default function AccessWarning() {
    return (
        <Flex gap={2} bg={"#FFD9511A"} border={"1px solid #FFD951"} borderRadius={"8px"} p={4} mt={4}>
            <AppIcons.SystemWarning />
            <Flex flexDirection={"column"}>
                <AppTypography color={"#fff"} fontWeight={700}>
                    Access Warning
                </AppTypography>
                <AppTypography color={"#fff"}>
                    The following user will have access to all sections of the account. Invite with caution!
                </AppTypography>
            </Flex>
        </Flex>
    )
}
