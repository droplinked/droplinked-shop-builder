import { Box, Grid } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { PropsWithChildren } from 'react'

export default function ProductCardsWrapper({ children }: PropsWithChildren) {
    const { isRTL } = useLocaleResources('onboarding')

    return (
        <Grid
            as="section"
            role="region"
            aria-label="Product Types"
            templateColumns={{
                base: "1fr auto 1fr",
                xl: "repeat(3, auto)"
            }}
            gap={{ base: 4, "2xl": 0 }}
            marginBlock={{ base: 4, xl: 0 }}
            marginRight={isRTL ? "unset" : { base: 0, xl: "-25rem" }}
            marginLeft={isRTL ? { base: 0, xl: "-25rem" } : "unset"}
        >
            <BackgroundImageBox position={isRTL ? 'left' : 'right'} />

            <Grid
                templateColumns={{ xl: "repeat(3, auto)" }}
                gap={{ base: 4, "2xl": 6 }}
            >
                {children}
            </Grid>

            <BackgroundImageBox position={isRTL ? 'right' : 'left'} />
        </Grid>
    )
}

function BackgroundImageBox({ position }) {
    return (
        <Box
            display={{ base: "block", xl: "none" }}
            backgroundImage={`url('https://upload-file-droplinked.s3.amazonaws.com/46eb8d954e320bb98c7745d886ca473ead90afbe006da7070b1762ca59caf8ec.png')`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition={position}
            w="100%"
            h="100%"
            alignSelf="start"
        />
    )
}