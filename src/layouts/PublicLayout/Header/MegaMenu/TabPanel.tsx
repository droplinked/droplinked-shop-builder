import { Grid, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import PlatformLink from '../PlatformLink'

interface TabPanelProps {
    links: Array<{
        label: string
        href: string
        description?: string
    }>
    onCloseAll: () => void
}

export default function TabPanel({ links, onCloseAll }: TabPanelProps) {
    const gridColumns = useBreakpointValue({ lg: 2, '2xl': 3 })

    return (
        <Grid
            flex={1}
            templateColumns={`repeat(${gridColumns}, 1fr)`}
            gap={4}
            padding={{ xl: 4, "2xl": 6 }}
            bgColor="neutral.background"
        >
            {links.map((link) => (
                <PlatformLink
                    key={link.label}
                    link={link}
                    onCloseAll={onCloseAll}
                />
            ))}
        </Grid>
    )
} 