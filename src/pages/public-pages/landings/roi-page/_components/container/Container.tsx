import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function Container({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Flex
            width={"100%"}
            direction={"column"}
            gap={6}
            borderRadius={8}
            padding={6}
            bgColor={"#fff"}
        >
            <AppTypography fontSize={20} fontWeight={600} color={"#000"}>{title}</AppTypography>
            <Flex direction={"column"} gap={4}>
                {children}
            </Flex>
        </Flex>
    )
}

export default Container