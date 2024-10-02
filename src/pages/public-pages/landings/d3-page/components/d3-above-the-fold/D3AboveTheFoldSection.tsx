import { Flex, Grid } from "@chakra-ui/react";
import React from "react";
import D3Heading from "../common/D3Heading";
import D3Paragraph from "../common/D3Paragraph";
import D3Modal from "../d3-modal/D3Modal";
import Logos from "./Logos";

export default function D3AboveTheFoldSection() {
    return (
        <Grid
            minHeight={"550px"}
            height={"100dvh"}
            placeContent={"center"}
            bgImg={"https://upload-file-droplinked.s3.amazonaws.com/db0b798ebd29ca8f2bb07e202b38b02f7b024f5d9b98c16c9019d6ebcf0086d6.png"}
            bgSize={"cover"}
            bgPos={"center"}
        >
            <Flex direction={"column"} gap={8} textAlign={"center"} paddingInline={{ base: 8, md: 0 }}>
                <D3Heading as={"h1"} fontSize={{ base: 28, md: 36, lg: 48 }}>
                    droplinked & D3
                </D3Heading>
                <Logos />
                <D3Paragraph>Redeem the exclusive offer for a 6 month pro plan with a D3 domain on droplinked.</D3Paragraph>
                <D3Modal />
            </Flex>
        </Grid>
    );
}
