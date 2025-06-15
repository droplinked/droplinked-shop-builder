import { Box, Flex, Text } from '@chakra-ui/react'
import { Layer1Md } from 'assets/icons/System/Layer1/Layer1Md'
import publicHeaderLinks from 'data/publicHeaderLinks'
import React, { useEffect, useState } from 'react'
import QuickLinks from '../QuickLinks/QuickLinks'
import { NavItem } from './NavItem'
import PlatformSubmenu from './PlatformSubmenu'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: Props) {
    const [isPlatformSubmenuOpen, setIsPlatformSubmenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            <Box
                position="fixed"
                top="72px"
                right={isOpen ? "0" : "-100%"}
                bottom={0}
                width="100%"
                padding={{ base: 4, md: 5 }}
                transition="0.4s"
                backgroundColor="neutral.websiteBackground"
                zIndex={10}
            >
                <Text paddingInline={3} fontSize={12} color="text.subtext.placeholder.dark">
                    Platform
                </Text>

                <Flex marginTop={3} direction="column" gap={2}>
                    <NavItem
                        icon={<Layer1Md color='#fff' />}
                        label="Platform"
                        onClick={() => setIsPlatformSubmenuOpen(true)}
                    />

                    {publicHeaderLinks.map(link => (
                        <NavItem
                            key={link.href}
                            icon={link.icon}
                            label={link.label}
                            to={link.href}
                            onClick={onClose}
                        />
                    ))}
                </Flex>

                <QuickLinks position="absolute" inset={0} top="unset" />
            </Box>

            <PlatformSubmenu
                isOpen={isPlatformSubmenuOpen}
                onClose={() => setIsPlatformSubmenuOpen(false)}
            />
        </>
    )
}