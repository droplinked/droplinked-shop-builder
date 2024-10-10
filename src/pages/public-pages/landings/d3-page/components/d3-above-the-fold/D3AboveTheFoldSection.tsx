import { Flex, Grid, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import D3Heading from "../common/D3Heading";
import D3Modal from "../d3-modal/D3Modal";
import Logos from "./Logos";

export default function D3AboveTheFoldSection() {
    return (
        <Grid
            pos="relative"
            minHeight="600px"
            height="100dvh"
            placeContent="center"
            bgImg="https://upload-file-droplinked.s3.amazonaws.com/b982940b80e90c56f277848bf50e1bfb3cb1414dfd89271924bce098d7427043.png"
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
                <D3Heading as="h1" fontSize={{ base: 28, md: 48, lg: 56, xl: 64 }}>droplinked & D3</D3Heading>
                <Logos />
                <AppTypography textAlign="center" fontFamily={"Inter"} fontSize={{ base: 14, md: 20 }} color="white">
                    Unlock 6 months of the Pro Plan absolutely free!<br />
                    Redeem the exclusive offer today.
                </AppTypography>
                <D3Modal />
            </Flex>

            <Image
                position="absolute"
                bottom={0}
                src="https://upload-file-droplinked.s3.amazonaws.com/2cd66491a6f9b72875d21b0d723f5737002a186562a3fabab0eb9b3b3ce0e1ed.png"
            />
        </Grid>
    );
}
