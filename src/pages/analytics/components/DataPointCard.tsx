import { Box, Skeleton, Text } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
    icon: ReactNode
    title: string
    isLoading: boolean
}

function DataPointCard({ icon, title, isLoading, children }: Props) {
    return (
        <Box padding={{ base: 4, xl: 6 }}>
            <IconWrapper icon={icon} />

            <Text marginTop={{ base: 4, md: 6 }} fontSize={14} color="text.white">{title}</Text>

            {/* Content */}
            <Skeleton marginTop={{ base: 1, md: 2 }} isLoaded={!isLoading}>
                {children}
            </Skeleton>
        </Box>
    )
}

export default DataPointCard