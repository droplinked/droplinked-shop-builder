import { Box, Link as ChakraLink, Flex, Grid, Heading } from '@chakra-ui/react'
import getPublicMegaMenuItems from 'data/publicMegaMenuItems'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from "react-router-dom"

export default function NavigationLinks() {
    const { t } = useLocaleResources('common')
    const publicMegaMenuItems = getPublicMegaMenuItems(t)
    
    const SUPPORT_LINKS = [
        { label: t('contactUs'), href: '/contact-us' },
        { label: t('brandAssets'), href: 'https://drive.google.com/file/d/1b5cggMs0D94Dl2e92-JIP_NPAMK2pjrr/view?usp=sharing', isExternal: true },
        { label: t('developerKit'), href: 'https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-tools', isExternal: true },
        { label: t('helpCenter'), href: 'https://droplinked.gitbook.io/droplinked-store-front-help-center', isExternal: true }
    ] as const

    const COMPANY_LINKS = [
        { label: t('home'), href: '/' },
        { label: t('publicHeaderLinks.pricing'), href: '/plans' },
        { label: t('publicHeaderLinks.affiliate'), href: '/affiliate' },
        { label: t('publicHeaderLinks.blog'), href: '/blogs' },
        { label: t('publicHeaderLinks.about'), href: '/about' }
    ] as const
    
    const navigationLinks = [
        ...publicMegaMenuItems.slice(0, 2),
        { label: t('support'), links: SUPPORT_LINKS },
        { label: t('company'), links: COMPANY_LINKS }
    ]

    return (
        <Grid templateColumns={{ base: 'repeat(2, auto)', md: 'repeat(4, auto)' }} gap={8}>
            {navigationLinks.map((group) => <NavigationGroup key={group.label} {...group} />)}
        </Grid>
    )
}

function NavigationGroup({ label, links }) {
    return (
        <Flex flexDirection="column" gap={4}>
            <Heading as="h3" fontSize={14} fontWeight={500} color="text.white">
                {label}
            </Heading>
            {links.map((link) => <NavigationLink key={link.label} {...link} />)}
        </Flex>
    )
}

function NavigationLink({ label, href, isExternal }) {
    const LinkComponent = isExternal ? ChakraLink : Link
    const linkProps = isExternal ? { href, target: '_blank' } : { to: href }

    return (
        <ChakraLink
            as={LinkComponent}
            {...linkProps}
            position="relative"
            transition="0.3s ease-in-out"
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
                opacity={0}
                transition="opacity 0.3s ease-in-out"
            />
            <Box
                as="span"
                display="inline-block"
                fontSize={14}
                fontWeight={400}
                color='text.subtext.placeholder.dark'
                transition="transform 0.3s ease-in-out"
            >
                {label}
            </Box>
        </ChakraLink>
    )
}