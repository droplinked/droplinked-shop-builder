import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import AppTypography from '../typography/AppTypography'

interface IProps {
    title: string
}

function AppEmptyPage({ title }: IProps) {
    return (
        <Flex justifyContent={"center"} width="100%" marginTop={8} marginBottom={5}>
            <Box>
                <AppTypography size='18px' color={"#777"}>{title}</AppTypography>
            </Box>
        </Flex>
    )
}

export default AppEmptyPage