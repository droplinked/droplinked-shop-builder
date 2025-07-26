import { Link as ChakraLink, Flex, FlexProps, Text, useBreakpointValue } from '@chakra-ui/react'
import { DocumentMd } from 'assets/icons/Action/Document/DocumentMd'
import { ChatMd } from 'assets/icons/System/Chat/ChatMd'
import { PlayMd } from 'assets/icons/System/Play/PlayMd'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function QuickLinks(props: FlexProps) {
    const navigate = useNavigate()
    const layout = useBreakpointValue({ base: 'mobile', md: 'tablet', xl: 'desktop' })
    const { t } = useLocaleResources('layout/PublicLayout')

    const LINK_ITEMS = [
        { icon: <PlayMd color='#b1b1b1' />, label: t('Header.QuickLinks.videoTutorials'), href: 'https://www.youtube.com/@droplinked-fj6nt', isExternal: true },
        { icon: <ChatMd color='#b1b1b1' />, label: t('Header.QuickLinks.contactSupport'), href: '/contact-us', isExternal: false },
        { icon: <DocumentMd color='#b1b1b1' />, label: t('Header.QuickLinks.documentation'), href: 'https://droplinked.gitbook.io/droplinked-store-front-help-center', isExternal: true }
    ].filter(item => {
        if (layout === 'tablet') return [t('Header.QuickLinks.videoTutorials'), t('Header.QuickLinks.contactSupport')].includes(item.label)
        if (layout === 'desktop') return true
        return false
    })

    const handleSignUpClick = () => navigate(AUTH_ROUTES.SIGN_UP)

    return (
        <Flex
            height={{ base: '52px', md: '68px' }}
            justifyContent="space-between"
            alignItems="center"
            gap={6}
            paddingInline={{ base: 4, md: 8, xl: 7, '2xl': 9 }}
            backgroundImage="https://upload-file-droplinked.s3.amazonaws.com/c72699ca5fc9e8336db9f6196a791790142870ec2f3bdaf4c1890f989cf7d3b8.png"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            {...props}
        >
            <Flex alignItems="center" gap={2}>
                <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">{t('readyToGetStarted')}</Text>
                <Text as="button" fontSize={14} fontWeight={500} color="text.white" onClick={handleSignUpClick}>{t('signUpForFree')}</Text>
            </Flex>

            <DotSeparatedList
                gap={3}
                sx={{ '.dot-separator': { bgColor: 'label.primary' } }}
            >
                {LINK_ITEMS.map(({ icon, label, href, isExternal }) => {
                    const linkProps = isExternal
                        ? { href, target: '_blank', rel: 'noopener noreferrer' }
                        : { as: Link, to: href }

                    return (
                        <ChakraLink
                            key={href}
                            {...linkProps}
                            display="flex"
                            alignItems="center"
                            gap="6px"
                            color="text.subtext.placeholder.light"
                            opacity={0.8}
                            transition="0.3s ease-in-out"
                            _hover={{
                                opacity: 1,
                                color: 'text.white',
                                '& > svg': { color: '#fff' }
                            }}
                            _active={{
                                opacity: 1,
                                color: 'text.white',
                                '& > svg': { color: '#fff' }
                            }}
                        >
                            {icon}
                            <Text as="span" fontSize={14}>{label}</Text>
                        </ChakraLink>
                    )
                })}
            </DotSeparatedList>
        </Flex>
    )
}

export default QuickLinks