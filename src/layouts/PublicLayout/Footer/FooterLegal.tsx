import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import React from 'react'
import { Link } from 'react-router-dom'
import { appVersion } from 'utils/app/variable'

const LEGAL_LINKS = [
    { to: '/terms', label: 'Cookies' },
    { to: '/terms', label: 'Privacy & Data Collection' },
    { to: '/privacy', label: 'Terms of service' }
] as const

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
                {LEGAL_LINKS.map(({ to, label }) => (
                    <ChakraLink key={label} as={Link} to={to}>
                        {label}
                    </ChakraLink>
                ))}
            </DotSeparatedList>
        </Flex>
    )
}

export default FooterLegal