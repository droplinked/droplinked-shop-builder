import { Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import PlatformLink from '../PlatformLink'

interface Props {
    selectedTab: any
    onNavigate: () => void
}

function TabPanel({ selectedTab, onNavigate }: Props) {
    const gridColumns = useBreakpointValue({ lg: 2, '2xl': 3 })

    return (
        <Flex
            flex={1}
            direction="column"
            gap={4}
            padding={{ xl: 4, "2xl": 6 }}
            bgColor="neutral.background"
        >
            <Text paddingInline={3} fontSize={12} color="text.subtext.placeholder.dark">
                {selectedTab.label}
            </Text>

            <Grid
                templateColumns={`repeat(${gridColumns}, 1fr)`}
                gap={4}
                alignContent="start"
            >
                {selectedTab.links.map((link) => (
                    <PlatformLink
                        key={link.label}
                        link={link}
                        onNavigate={onNavigate}
                    />
                ))}
            </Grid>
        </Flex>
    )
}

export default TabPanel