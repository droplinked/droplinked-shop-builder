import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import React from 'react'
import { Link } from 'react-router-dom'
import { appVersion } from 'utils/app/variable'

function FooterLegal() {
    const currentYear = new Date().getFullYear()

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={4}
            padding={{ base: 4, md: "unset" }}
            fontSize={14}
            color="text.subtext.placeholder.dark"
        >
            <DotSeparatedList>
                <Text>© {currentYear} All Rights Reserved</Text>
                <Text>{appVersion}</Text>
            </DotSeparatedList>

            <DotSeparatedList>
                <ChakraLink as={Link} to="/terms">Cookies</ChakraLink>
                <ChakraLink as={Link} to="/terms">Privacy & Data Collection</ChakraLink>
                <ChakraLink as={Link} to="/privacy">Terms of service</ChakraLink>
            </DotSeparatedList>
        </Flex>
    )
}

export default FooterLegal