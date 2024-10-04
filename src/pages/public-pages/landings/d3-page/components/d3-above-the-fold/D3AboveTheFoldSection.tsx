import { Flex, Grid } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import D3Heading from "../common/D3Heading";
import D3Modal from "../d3-modal/D3Modal";
import Logos from "./Logos";

export default function D3AboveTheFoldSection() {
    return (
        <Grid
            minHeight="600px"
            height="100dvh"
            placeContent="center"
            bgImg="https://upload-file-droplinked.s3.amazonaws.com/db0b798ebd29ca8f2bb07e202b38b02f7b024f5d9b98c16c9019d6ebcf0086d6.png"
            bgSize="cover"
            bgPos="center"
        >
            <Flex
                maxWidth={{ base: "100%", md: "518px", lg: "572px", xl: "636px" }}
                direction="column"
                alignItems="center"
                gap={{ base: 10, lg: 12 }}
                paddingInline={{ base: 8, md: 4 }}
            >
                <D3Heading as="h1" fontSize={{ base: 28, md: 48, lg: 56, xl: 64 }}>
                    droplinked & D3
                </D3Heading>
                <Logos />
                <AppTypography textAlign="center" fontSize={{ base: 14, md: 20 }} color="white">Unlock 6 months of the Pro Plan absolutely free! Redeem the exclusive offer today.</AppTypography>
                <D3Modal />
            </Flex>
        </Grid>
    );
}
