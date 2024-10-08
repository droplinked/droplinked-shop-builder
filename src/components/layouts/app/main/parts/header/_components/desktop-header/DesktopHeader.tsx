import { Flex, HStack, PopoverBody, SimpleGrid } from '@chakra-ui/react'
import AppPopoverOnHover from 'components/common/PopoverMenu/PopOverOnHover'
import AppTypography from 'components/common/typography/AppTypography'
import HeaderDashboardLoggedin from 'components/layouts/app/dashboard/parts/header/parts/loged/HeaderDashboardLoggedin'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItems } from '../../types/types'
import Droplinked from '../droplinked/Droplinked'
import HeaderIconContainer from '../icon-container/HeaderIconContainer'
import SignInButton from '../sign-in-button/SignInButton'

export default function DesktopHeader({ headerMenuItems }: MenuItems) {
    const { shop } = useAppStore()

    return (
        <>
            <HStack spacing={{ base: '20px', md: '32px', lg: '48px' }}>
                <Droplinked />
                <NavigationMenu headerMenuItems={headerMenuItems} />
            </HStack>
            {shop ? <HeaderDashboardLoggedin /> : <SignInButton />}
        </>
    )
}

function NavigationMenu({ headerMenuItems }) {
    return (
        <HStack color="#FFF" spacing={{ base: '10px', sm: '20px', md: '48px' }} alignItems="center">
            <HeaderMenu headerMenuItems={headerMenuItems} />
            <NavLink to="/plans" label="Pricing" />
            <NavLink to="/about" label="About Us" />
        </HStack>
    )
}

function HeaderMenu({ headerMenuItems }) {
    return (
        <AppPopoverOnHover
            nodes={{
                trigger: {
                    children: (
                        <AppTypography
                            color="#878787"
                            fontSize={{ base: '12px', sm: '14px', md: '16px' }}
                            fontWeight={600}
                            transition="0.2s"
                            _hover={{ color: '#fff' }}
                        >
                            Products
                        </AppTypography>
                    )
                },
                content: {
                    children: ({ onClose }) => (
                        <PopoverBody display="flex" flexDirection="column">
                            <Flex direction="column" gap={9}>
                                {headerMenuItems.map((menuItem) => (
                                    <MenuSection key={menuItem?.label} onClose={onClose} menuItem={menuItem} />
                                ))}
                            </Flex>
                        </PopoverBody>
                    ),
                    props: {
                        width: '100vw',
                        border: 'none',
                        paddingBlock: { base: 4, md: 6 },
                        paddingInline: { base: 4, md: 9, lg: "60px", xl: "72px" },
                        backgroundColor: '#141414',
                        overflowY: 'auto'
                    }
                }
            }}
        />
    )
}

function MenuSection({ menuItem, onClose }) {
    return (
        <Flex direction="column" gap={4}>
            <AppTypography fontSize={16} fontWeight={700} color="white">{menuItem.label}</AppTypography>
            <SimpleGrid columns={{ base: 3, xl: 4 }} gap={6}>
                {menuItem.links.map((link) => (
                    <Link key={link.label} to={link.href}>
                        <Flex alignItems="flex-start" gap={4} onClick={onClose}>
                            <HeaderIconContainer>{link.icon}</HeaderIconContainer>
                            <Flex direction="column">
                                <AppTypography fontSize={16} fontWeight={500} color="white">{link.label}</AppTypography>
                                <AppTypography fontSize={14} color="white" opacity={0.5}>{link.description}</AppTypography>
                            </Flex>
                        </Flex>
                    </Link>
                ))}
            </SimpleGrid>
        </Flex>
    )
}

function NavLink({ to, label }) {
    return (
        <Link to={to}>
            <AppTypography
                color="#878787"
                fontSize={{ base: '12px', sm: '14px', md: '16px' }}
                fontWeight={600}
                transition="0.2s"
                _hover={{ color: '#fff' }}
            >
                {label}
            </AppTypography>
        </Link>
    )
}