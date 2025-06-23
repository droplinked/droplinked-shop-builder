import { Box, Grid, GridItem, Image, useBreakpointValue } from '@chakra-ui/react'
import TypographyText from 'pages/public-pages/redesign-landings/components/SectionContainer/TypographyText'
import React from 'react'
import NewsletterForm from './NewsletterForm'
import NewsletterHeader from './NewsletterHeader'

const containerStyles = {
    border: "1px solid",
    borderColor: "neutral.gray.900",
    borderRadius: { md: 16, xl: 24 }
}

export default function SubscribeNewsletter() {
    const layout = useBreakpointValue({ base: 'mobile', md: 'tablet', xl: 'desktop' })

    if (layout === "mobile") return (
        <Box padding={4}>
            <NewsletterHeader />
            <NewsletterForm />
        </Box>
    )

    if (layout === "tablet") {
        return (
            <Box>
                <TypographyText text="Subscribe Now" />
                <Box padding={4} {...containerStyles}>
                    <NewsletterHeader />
                    <NewsletterForm />
                </Box>
            </Box>
        )
    }

    return (
        <>
            <TypographyText text="Subscribe Now" />
            <Grid
                templateColumns="1fr 1fr"
                alignItems="center"
                {...containerStyles}
            >
                <GridItem padding={8}>
                    <NewsletterHeader />
                    <NewsletterForm />
                </GridItem>
                <Image
                    objectFit="contain"
                    src='https://upload-file-droplinked.s3.amazonaws.com/58b695b2dabf3d3ca2090feea5890f51722cb03479214d2f7ca8288120f3f552.png'
                />
            </Grid>
        </>
    )
}