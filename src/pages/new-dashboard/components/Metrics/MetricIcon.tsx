import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React, { ReactNode } from 'react'
import IconWrapper from '../IconWrapper'

interface MetricIconProps {
    icon: ReactNode
}

function MetricIcon({ icon }: MetricIconProps) {
    return (
        <Flex justifyContent="space-between">
            <IconWrapper icon={icon} />
            <Box sx={{ "svg path": { stroke: "#7B7B7B" } }}>
                <AppIcons.ExternalArrow />
            </Box>
        </Flex>
    )
}

export default MetricIcon