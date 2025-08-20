import { Box, Link as ChakraLink, Flex, Grid, Heading } from '@chakra-ui/react'
import IframeAwareLink from 'components/redesign/iframe-aware-link/IframeAwareLink'
import getPublicMegaMenuItems from 'data/publicMegaMenuItems'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function NavigationLinks() {
    const { t } = useLocaleResources('layout/PublicLayout')

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
        { label: t('publicHeaderLinks.affiliate'), href: '/affiliate/products' },
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
    const { isRTL } = useLocaleResources('common')

    // For external links, always use ChakraLink with target="_blank"
    if (isExternal) {
        return (
            <ChakraLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                position="relative"
                transition="0.3s ease-in-out"
                _hover={{
                    '& > span': {
                        color: 'text.white',
                        transform: isRTL ? 'translateX(-8px)' : 'translateX(8px)'
                    },
                    '& > .border': { opacity: 1 }
                }}
            >
                <Box
                    className="border"
                    position="absolute"
                    top={0}
                    left={isRTL ? 'unset' : 0}
                    right={isRTL ? 0 : 'unset'}
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

    // For internal links, use IframeAwareLink
    return (
        <IframeAwareLink
            to={href}
            chakraProps={{
                position: "relative",
                transition: "0.3s ease-in-out",
                _hover: {
                    '& > span': {
                        color: 'text.white',
                        transform: isRTL ? 'translateX(-8px)' : 'translateX(8px)'
                    },
                    '& > .border': { opacity: 1 }
                }
            }}
        >
            <Box
                className="border"
                position="absolute"
                top={0}
                left={isRTL ? 'unset' : 0}
                right={isRTL ? 0 : 'unset'}
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
        </IframeAwareLink>
    )
}