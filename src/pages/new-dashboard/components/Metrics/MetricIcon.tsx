import { Center, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import AppIcons from 'assest/icon/Appicons'

interface MetricIconProps {
    icon: React.ReactNode
}

function MetricIcon({ icon }: MetricIconProps) {
    return (
        <Flex justifyContent="space-between">
            <Center
                width={12}
                height={12}
                border="1px solid #292929"
                borderRadius={8}
                bg="#1C1C1C"
                sx={{ svg: { width: 6, height: 6 } }}
            >
                {icon}
            </Center>
            <Box sx={{ "svg path": { stroke: "#7B7B7B" } }}>
                <AppIcons.ExternalArrow />
            </Box>
        </Flex>
    )
}

export default MetricIcon