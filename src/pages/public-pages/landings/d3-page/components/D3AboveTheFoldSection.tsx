import { Flex, Grid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'
import D3Heading from './common/D3Heading'

function D3AboveTheFoldSection() {
    return (
        <Grid
            height={"100dvh"}
            placeContent={"center"}
        >
            <Flex direction={"column"} gap={8} textAlign={"center"}>
                <D3Heading as={"h1"} fontSize={48}>droplinked & D3</D3Heading>
                <AppTypography fontSize={16} color={"#7B7B7B"}>Redeem the exclusive offer for a 6 month pro plan with a D3 domain on droplinked.</AppTypography>
                <Button alignSelf={"center"} fontSize={14} fontWeight={500}>Redeem the exclusive offer today</Button>
            </Flex>
        </Grid>
    )
}

export default D3AboveTheFoldSection