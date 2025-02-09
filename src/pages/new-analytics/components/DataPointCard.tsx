import { Box, Text } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
    icon: ReactNode
    title: string
}

function DataPointCard({ icon, title, children }: Props) {
    return (
        <Box padding={6}>
            <IconWrapper icon={icon} />

            <Text marginTop={6} fontSize={14} color="#FFF">{title}</Text>

            {/* Content */}
            <Box marginTop={2}>{children}</Box>
        </Box>
    )
}

export default DataPointCard