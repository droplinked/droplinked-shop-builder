import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from "react"

interface Props {
    hasRightSection: boolean
    children: React.ReactNode
}

function OnboardingPageContainer({ hasRightSection, children }: Props) {
    return (
        <Grid
            templateColumns={hasRightSection ? '1fr 1fr' : '1fr'}
            minHeight="100vh"
            bg="gray.50"
            gap={8}
            p={8}
        >
            {hasRightSection ?
                <>
                    <GridItem>
                        <Box maxW="container.sm" mx="auto">
                            {children[0]} {/* Header */}
                            {children[1]} {/* Left content */}
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Box maxW="container.sm" mx="auto">
                            {children[2]} {/* Right content */}
                        </Box>
                    </GridItem>
                </>
                :
                <GridItem>
                    <Box maxW="container.md" mx="auto">
                        {children}
                    </Box>
                </GridItem>
            }
        </Grid>
    )
}

export default OnboardingPageContainer 