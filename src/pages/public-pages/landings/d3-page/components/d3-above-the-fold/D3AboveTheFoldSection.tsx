import { Flex, Grid } from '@chakra-ui/react'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'
import D3Heading from '../common/D3Heading'
import D3Paragraph from '../common/D3Paragraph'
import Logos from './Logos'

export default function D3AboveTheFoldSection() {
    return (
        <Grid
            height={"100dvh"}
            placeContent={"center"}
            bgImg={"https://upload-file-droplinked.s3.amazonaws.com/db0b798ebd29ca8f2bb07e202b38b02f7b024f5d9b98c16c9019d6ebcf0086d6.png"}
            bgSize={"cover"}
            bgPos={"center"}
        >
            <Flex direction={"column"} gap={8} textAlign={"center"}>
                <D3Heading as={"h1"} fontSize={48}>droplinked & D3</D3Heading>
                <Logos />
                <D3Paragraph>Redeem the exclusive offer for a 6 month pro plan with a D3 domain on droplinked.</D3Paragraph>
                <Button alignSelf={"center"} fontSize={14} fontWeight={500}>Claim Now</Button>
            </Flex>
        </Grid>
    )
}