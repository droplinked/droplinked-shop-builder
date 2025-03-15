import { Box, Grid } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export default function ProductCardsWrapper({ children }: PropsWithChildren) {
    return (
        <Grid
            as="section"
            templateColumns={{
                base: "1fr auto 1fr",
                xl: "repeat(3, auto)"
            }}
            gap={{ base: 4, "2xl": 6 }}
            role="region"
            aria-label="Product Types"
            marginRight={{ base: 0, xl: "-25rem" }}
            marginBlock={{ base: 4, xl: 0 }}
        >
            <Box
                display={{ base: "block", xl: "none" }}
                backgroundImage="url(https://upload-file-droplinked.s3.amazonaws.com/46eb8d954e320bb98c7745d886ca473ead90afbe006da7070b1762ca59caf8ec.png)"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition="right"
                w="100%"
                h="100%"
                alignSelf="start"
            />

            <Grid
                templateColumns={{ xl: "repeat(3, auto)" }}
                gap={{ base: 4, xl: 0 }}
            >
                {children}
            </Grid>

            <Box
                display={{ base: "block", xl: "none" }}
                backgroundImage="url(https://upload-file-droplinked.s3.amazonaws.com/46eb8d954e320bb98c7745d886ca473ead90afbe006da7070b1762ca59caf8ec.png)"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition="left"
                w="100%"
                h="100%"
                alignSelf="start"
            />
        </Grid>
    )
}
