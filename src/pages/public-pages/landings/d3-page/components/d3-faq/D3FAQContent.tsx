import { Flex } from '@chakra-ui/react'
import React from 'react'
import D3Badge from '../common/D3Badge'
import D3Heading from '../common/D3Heading'
import D3Paragraph from '../common/D3Paragraph'

function D3FAQContent() {
    return (
        <Flex direction={"column"}>
            <D3Badge alignSelf={"start"}>Lorem ipsum</D3Badge>
            <D3Heading marginTop={6}>Web3 Technology Support</D3Heading>
            <D3Paragraph marginTop={1}>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis faucibus maximus conubia viverra porttitor ridiculus. Sapien gravida velit adipiscing turpis ad aliquam elementum ut. Metus odio inceptos velit vel sodales vivamus tempor. Per consequat ipsum ultrices.
            </D3Paragraph>
        </Flex>
    )
}

export default D3FAQContent