import { Box, Flex, Grid, Heading, useBreakpointValue } from '@chakra-ui/react'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string
    link?: { text: string, href: string }
}

function Section({ title, link, children }: Props) {
    const columns = useBreakpointValue({ base: 1, md: 2, xl: 3, "3xl": 4 })

    return (
        <Box>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                gap={6}
                marginBottom={4}
            >
                <Heading as="h2" fontSize={{ base: 18, xl: 20 }} color="text.white">
                    {title}
                </Heading>
                {link && (
                    <InteractiveText to={link.href} hasExternalIcon>
                        {link.text}
                    </InteractiveText>
                )}
            </Flex>
            <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={{ base: 4, "2xl": 6 }}>
                {children}
            </Grid>
        </Box>
    )
}

export default Section 