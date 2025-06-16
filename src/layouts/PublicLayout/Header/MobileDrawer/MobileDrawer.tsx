import { Flex, Text } from '@chakra-ui/react'
import { Layer1Md } from 'assets/icons/System/Layer1/Layer1Md'
import publicHeaderLinks from 'data/publicHeaderLinks'
import React, { useEffect, useState } from 'react'
import QuickLinks from '../QuickLinks/QuickLinks'
import { NavItem } from './NavItem'
import PlatformSubmenu from './PlatformSubmenu/PlatformSubmenu'
import SlideDrawer from './SlideDrawer'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: Props) {
    const [isPlatformSubmenuOpen, setIsPlatformSubmenuOpen] = useState(false)

    // Close platform submenu when drawer is closed
    useEffect(() => {
        if (!isOpen) setIsPlatformSubmenuOpen(false)
    }, [isOpen])

    const handleCloseAll = () => {
        setIsPlatformSubmenuOpen(false)
        onClose()
    }

    return (
        <>
            <SlideDrawer
                isOpen={isOpen}
                top="72px"
                width="100%"
                padding={{ base: 4, md: 5 }}
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
            </SlideDrawer>

            <PlatformSubmenu
                isOpen={isPlatformSubmenuOpen}
                onClose={() => setIsPlatformSubmenuOpen(false)}
                onCloseAll={handleCloseAll}
            />
        </>
    )
}