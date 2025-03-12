import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import GeneratedLogo from '../components/GeneratedLogo'
import GeneratedCover from '../components/GeneratedCover'
import GeneratedUrls from '../components/GeneratedUrls'
import GeneratedNames from '../components/GeneratedNames'

export default function GeneratedContents() {
    const fakeContent = [
        'https://upload-file-droplinked.s3.amazonaws.com/3bfc19a5cdaba194e58ebe9ed3c682cb466e32f8001d5e829ddb3fbff71172a6.png',
        'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png',
        'https://upload-file-droplinked.s3.amazonaws.com/ab8e8761210e3f9e4cebe58ed643556e7b102d5afb2ef8b9bf3acbacdceb7dac.jpg',
    ]
    const fakeItems = [
        'samiShop', "testShop", "LuxryShop"
    ]

    return (
        <Box
            backgroundColor={{ base: "transparent", lg: "#141414" }}
            height="800px"
            borderLeft={{ base: "none", lg: "1px solid #292929" }}
            p={{ base: 4, md: 9, lg: "48px" }}
            overflow="auto"
        >
            <Flex flexDirection="column" gap={9}>
                <GeneratedLogo logos={fakeContent} />
                <GeneratedCover covers={fakeContent} />
                <GeneratedUrls urls={fakeItems} />
                <GeneratedNames names={fakeItems} />
            </Flex>
        </Box>
    )
}
