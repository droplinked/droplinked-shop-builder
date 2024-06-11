import { Flex } from '@chakra-ui/react'
import React from 'react'
import AppTypography from '../typography/AppTypography'

function AppPermissionDenied() {
    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            gap={8}
            borderRadius={8}
            padding={4}
            bgColor={"red.300"}
            color={"red.900"}
        >
            <AppTypography textAlign={"center"} fontSize={28} fontWeight={700}>Permission Denied!</AppTypography>
            <AppTypography width={"80%"} textAlign={"center"} fontSize={16}>
                Sorry, you don't have access to this section. To unlock it, please upgrade to a plan that includes this feature. Visit the plans page to explore your options. If you believe you should have access, please contact support for assistance.
            </AppTypography>
        </Flex>
    )
}

export default AppPermissionDenied