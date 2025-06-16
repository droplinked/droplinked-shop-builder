import { Box, Link as ChakraLink, Flex, Grid, Heading } from '@chakra-ui/react'
import publicMegaMenuItems from 'data/publicMegaMenuItems'
import React from 'react'
import { Link, useLocation } from "react-router-dom"

const SUPPORT_LINKS = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Brand Assets', href: '/brand-assets' },
    { label: 'Developer Kit', href: '/developer-kit', isExternal: true },
    { label: 'Help Center', href: '/help-center', isExternal: true }
] as const

const COMPANY_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Affiliate', href: '/affiliate' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' }
] as const

function NavigationLinks() {
    const location = useLocation()

    const mainNavigationItems = publicMegaMenuItems.slice(0, 2)
    const navigationLinks = [
        ...mainNavigationItems,
        { label: 'Support', links: SUPPORT_LINKS },
        { label: 'Company', links: COMPANY_LINKS }
    ]

    return (
        <Grid templateColumns="repeat(4, auto)" gap={8}>
            {navigationLinks.map((group) => (
                <Flex key={group.label} flexDirection="column" gap={4}>
                    <Heading as="h3" fontSize={14} fontWeight={500} color="text.white">
                        {group.label}
                    </Heading>

                    {group.links.map((link) => {
                        const { isExternal, href, label } = link
                        const isActive = location.pathname === href

                        const LinkComponent = isExternal ? ChakraLink : Link
                        const linkProps = isExternal ? { href, target: '_blank' } : { to: href }

                        return (
                            <ChakraLink
                                key={label}
                                as={LinkComponent}
                                {...linkProps}
                                position="relative"
                                transition="all 0.3s ease-in-out"
                                _hover={{
                                    '& > span': { color: 'text.white', transform: 'translateX(8px)' },
                                    '& > .border': { opacity: 1 }
                                }}
                            >
                                <Box
                                    className="border"
                                    position="absolute"
                                    left={0}
                                    top={0}
                                    width="2px"
                                    height="100%"
                                    borderRadius={2}
                                    bg="neutral.white"
                                    opacity={isActive ? 1 : 0}
                                    transition="opacity 0.3s ease-in-out"
                                />
                                <Box
                                    as="span"
                                    display="inline-block"
                                    fontSize={14}
                                    fontWeight={isActive ? 500 : 400}
                                    color={isActive ? 'text.white' : 'text.subtext.placeholder.dark'}
                                    transition="transform 0.3s ease-in-out"
                                    transform={isActive ? 'translateX(8px)' : 'none'}
                                >
                                    {label}
                                </Box>
                            </ChakraLink>
                        )
                    })}
                </Flex>
            ))}
        </Grid>
    )
}

export default NavigationLinks