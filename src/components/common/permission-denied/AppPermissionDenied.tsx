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
            bgColor={"#8B0000"}
            color={"#FFA07A"}
        >
            <AppTypography textAlign={"center"} fontSize={20} fontWeight={700}>Permission Denied!</AppTypography>
        </Flex>
    )
}

export default AppPermissionDenied