import { Box, Grid, GridItem, Image, useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import TypographyText from 'pages/public-pages/landings/_shared/components/SectionContainer/TypographyText'
import React from 'react'
import NewsletterForm from './NewsletterForm'
import NewsletterHeader from './NewsletterHeader'
import SubscribeNow from './SubscribeNow'

const containerStyles = {
    border: "1px solid",
    borderColor: "neutral.gray.900",
    borderRadius: { md: 16, xl: 24 }
}

export default function SubscribeNewsletter() {
    const layout = useBreakpointValue({ base: 'mobile', md: 'tablet', xl: 'desktop' })
    const { isRTL } = useLocaleResources("layout/PublicLayout")

    if (layout === "mobile") return (
        <Box padding={4}>
            <NewsletterHeader />
            <NewsletterForm />
        </Box>
    )

    if (layout === "tablet") {
        return (
            <Box>
                <TypographyText svg={<SubscribeNow />} />
                <Box padding={4} {...containerStyles}>
                    <NewsletterHeader />
                    <NewsletterForm />
                </Box>
            </Box>
        )
    }

    return (
        <Box>
            <TypographyText svg={<SubscribeNow />} mb="-4px" />
            <Grid
                templateColumns="1fr 1fr"
                alignItems="center"
                overflow="hidden"
                {...containerStyles}
            >
                <GridItem padding={8}>
                    <NewsletterHeader />
                    <NewsletterForm />
                </GridItem>
                <Image
                    objectFit="contain"
                    src={
                        isRTL
                            ? 'https://upload-file-droplinked.s3.amazonaws.com/7be47c1e7be185e4e92ea08e70003621fd5e1f4e181867315ed4c7e93d1d800e.png'
                            : 'https://upload-file-droplinked.s3.amazonaws.com/58b695b2dabf3d3ca2090feea5890f51722cb03479214d2f7ca8288120f3f552.png'
                    }
                />
            </Grid>
        </Box>
    )
}