import { Flex, Grid, useMediaQuery } from "@chakra-ui/react"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import MaxWidthWrapper from "pages/public-pages/homePage/components/common/MaxWidthWrapper"
import React from "react"
import BrandIdentity from "./BrandIdentity"
import FooterLegal from "./FooterLegal"
import NavigationLinks from "./NavigationLinks"
import SubscribeNewsletter from "./SubscribeNewsletter"

export default function Footer() {
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    return isMobile ? <MobileLayout /> : <DesktopLayout />
}

const MobileLayout = () => (
    <RuledGrid as="footer" columns={1} nested>
        <Flex flexDirection="column" gap={9} padding="24px 16px">
            <BrandIdentity />
            <NavigationLinks />
        </Flex>
        <SubscribeNewsletter />
        <FooterLegal />
    </RuledGrid>
)

const DesktopLayout = () => (
    <MaxWidthWrapper
        as="footer"
        display="flex"
        flexDirection="column"
        gap={{ md: 9, "xl": "48px" }}
        paddingBlock={{ md: 9, xl: "48px" }}
    >
        <Grid
            templateColumns={{ md: "1fr", xl: "1fr 1.3fr", "2xl": "1fr 1fr" }}
            gap={{ md: 9, "xl": 6 }}
        >
            <BrandIdentity />
            <NavigationLinks />
        </Grid>
        <SubscribeNewsletter />
        <FooterLegal />
    </MaxWidthWrapper>
)