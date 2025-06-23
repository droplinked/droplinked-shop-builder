import { Grid, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import PlatformLink from '../PlatformLink'

interface Props {
    links: Array<{
        label: string
        href: string
        description?: string
    }>
    onNavigate: () => void
}

function TabPanel({ links, onNavigate }: Props) {
    const gridColumns = useBreakpointValue({ lg: 2, '2xl': 3 })

    return (
        <Grid
            flex={1}
            templateColumns={`repeat(${gridColumns}, 1fr)`}
            gap={4}
            padding={{ xl: 4, "2xl": 6 }}
            bgColor="neutral.background"
            alignContent="start"
        >
            {links.map((link) => (
                <PlatformLink
                    key={link.label}
                    link={link}
                    onNavigate={onNavigate}
                />
            ))}
        </Grid>
    )
}

export default TabPanel