import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import PlatformLink from './PlatformLink'

interface Props {
    section: any
    onCloseAll: () => void
}

function PlatformLinksSection({ section, onCloseAll }: Props) {
    return (
        <Flex flexDirection="column" gap={2}>
            <Text paddingInline={3} fontSize={12} color="text.subtext.placeholder.dark">{section.label}</Text>

            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                rowGap={2}
                columnGap={4}
            >
                {section.links.map(link => (
                    <PlatformLink key={link.label} link={link} onCloseAll={onCloseAll} />
                ))}
            </SimpleGrid>
        </Flex>
    )
}

export default PlatformLinksSection