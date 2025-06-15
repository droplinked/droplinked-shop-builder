import { Flex, FlexProps, Text, useBreakpointValue } from '@chakra-ui/react'
import { DocumentMd } from 'assets/icons/Action/Document/DocumentMd'
import { ChatMd } from 'assets/icons/System/Chat/ChatMd'
import { PlayMd } from 'assets/icons/System/Play/PlayMd'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButton from './ActionButton'
import LinkItem from './LinkItem'

function QuickLinks(props: FlexProps) {
    const navigate = useNavigate()
    const { isMobile, isTablet } = useBreakpointValue({
        base: { isMobile: true, isTablet: false },
        md: { isMobile: false, isTablet: true },
        xl: { isMobile: false, isTablet: false }
    })

    const handleSignUpClick = () => navigate(AUTH_ROUTES.SIGN_UP)

    return (
        <Flex
            height={{ base: '52px', md: '68px' }}
            justifyContent="space-between"
            alignItems="center"
            gap={6}
            background="linear-gradient(90deg, rgba(46, 105, 77, 1) 0%, rgba(43, 207, 161, 1) 47.5%, rgba(43, 207, 161, 1) 52.5%, rgba(46, 105, 77, 1) 100%)"
            paddingInline={{ base: 4, md: 8, xl: 7, '2xl': 9 }}
            {...props}
        >
            <Flex alignItems="center" gap={2}>
                <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">Ready to get started?</Text>
                <ActionButton label="Sign up for free" color="text.white" onClick={handleSignUpClick} />
            </Flex>

            {!isMobile && (
                <DotSeparatedList gap={3} sx={{ '.dot-separator': { bgColor: 'label.primary' } }}>
                    <LinkItem
                        icon={<PlayMd color='#fff' />}
                        button={
                            <ActionButton
                                label="Video Tutorials"
                                color="text.white"
                                onClick={handleSignUpClick}
                            />
                        }
                    />
                    <LinkItem
                        icon={<ChatMd color='#b1b1b1' />}
                        button={
                            <ActionButton
                                label="Contact Support"
                                fontWeight={400}
                                color="text.subtext.placeholder.light"
                                onClick={handleSignUpClick}
                            />
                        }
                    />
                    {!isTablet && (
                        <LinkItem
                            icon={<DocumentMd color='#b1b1b1' />}
                            button={
                                <ActionButton
                                    label="Documentation"
                                    fontWeight={400}
                                    color="text.subtext.placeholder.light"
                                    onClick={handleSignUpClick}
                                />
                            }
                        />
                    )}
                </DotSeparatedList>
            )}
        </Flex>
    )
}

export default QuickLinks