import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import D3Paragraph from './common/D3Paragraph'
import D3Modal from './d3-modal/D3Modal'

export default function D3ProPlan() {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            gap={{ lg: 6 }}
            border="1px solid #333"
            borderRadius={24}
            overflow="hidden"
        >
            <Content />
            <Image
                maxWidth={{ base: "100%", lg: "50%" }}
                src="https://upload-file-droplinked.s3.amazonaws.com/cded84efaf4143699f3c30e14ee252f674184586a00a2c8085861125427b201d.png"
                objectFit="contain"
            />
        </Flex>
    )
}

function Content() {
    return (
        <Flex
            direction="column"
            alignItems="flex-start"
            gap={{ base: 4, md: 8 }}
            padding={{ base: 4, md: 8 }}
        >
            <Flex direction="column" gap={{ base: 1, xl: 2 }}>
                <AppTypography fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                    Free 6 Month Pro Plan
                </AppTypography>
                <D3Paragraph>Unlock 6 months of the Pro Plan absolutely free! Redeem the exclusive offer today.</D3Paragraph>
            </Flex>
            <D3Modal />
        </Flex>
    )
}