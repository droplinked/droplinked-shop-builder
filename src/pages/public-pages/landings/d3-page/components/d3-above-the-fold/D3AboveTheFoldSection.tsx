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
            bgImg="https://upload-file-droplinked.s3.amazonaws.com/145845cc06183af4e2cc76892c744e6fe8e258c6b4e4905ad1d6102a10cf5ab9.png"
            bgSize="cover"
            bgPos="center"
        >
            <Flex
                maxWidth={{ base: "100%", md: "518px", lg: "572px", xl: "636px" }}
                direction="column"
                alignItems="center"
                gap={{ base: 10, lg: 12 }}
                paddingInline={{ base: 8, md: 4 }}
                sx={{ "p": { textAlign: "center", color: "white" } }}
            >
                <D3Heading as="h1" fontSize={{ base: 28, md: 48, lg: 56, xl: 64 }}>droplinked & D3</D3Heading>
                <Logos />
                <AppTypography fontSize={{ base: 14, md: 20 }}>
                    Unlock 6 months of the Pro Plan absolutely free!<br />
                    Redeem the exclusive offer today.
                </AppTypography>
                <Flex flexDirection="column" gap={4}>
                    <D3Modal />
                    <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={500}>$30 Value</AppTypography>
                </Flex>
            </Flex>

            <Image
                position="absolute"
                bottom={0}
                src="https://upload-file-droplinked.s3.amazonaws.com/961dc9e15e29cadb56eed323d25be4aec396882358b11bec70cba07e4e9e55b1.png"
            />
        </Grid>
    );
}
