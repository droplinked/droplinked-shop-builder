import { Link as ChakraLink, Flex, FlexProps, Text, useBreakpointValue } from '@chakra-ui/react'
import { DocumentMd } from 'assets/icons/Action/Document/DocumentMd'
import { ChatMd } from 'assets/icons/System/Chat/ChatMd'
import { PlayMd } from 'assets/icons/System/Play/PlayMd'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function QuickLinks(props: FlexProps) {
    const navigate = useNavigate()
    const layout = useBreakpointValue({ base: 'mobile', md: 'tablet', xl: 'desktop' })

    const LINK_ITEMS = [
        { icon: <PlayMd color='#b1b1b1' />, label: 'Video Tutorials', href: '/video-tutorials' },
        { icon: <ChatMd color='#b1b1b1' />, label: 'Contact Support', href: '/contact-support' },
        { icon: <DocumentMd color='#b1b1b1' />, label: 'Documentation', href: '/documentation' }
    ].filter(item => {
        if (layout === 'tablet') return ['Video Tutorials', 'Contact Support'].includes(item.label)
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
                <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">Ready to get started?</Text>
                <Text as="button" fontSize={14} fontWeight={500} color="text.white" onClick={handleSignUpClick}>Sign up for free</Text>
            </Flex>

            <DotSeparatedList
                gap={3}
                sx={{ '.dot-separator': { bgColor: 'label.primary' } }}
            >
                {LINK_ITEMS.map(({ icon, label, href }) => (
                    <ChakraLink
                        key={href}
                        as={Link}
                        to={href}
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
                ))}
            </DotSeparatedList>
        </Flex>
    )
}

export default QuickLinks