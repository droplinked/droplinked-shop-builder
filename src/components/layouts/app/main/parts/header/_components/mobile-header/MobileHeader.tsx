import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItems } from '../../types/types'
import Droplinked from '../droplinked/Droplinked'
import HeaderIconContainer from '../icon-container/HeaderIconContainer'
import MainMenu from './MainMenu'
import MenuToggle from './menu-toggle/MenuToggle'

export default function MobileHeader({ headerMenuItems }: MenuItems) {
    const navigate = useNavigate()
    const [menuVisibility, setMenuVisibility] = useState({ menu: false, subMenu: false })

    const updateMenuVisibility = (key, value) => setMenuVisibility(prev => ({ ...prev, [key]: value }))
    const toggleMenus = () => setMenuVisibility({ menu: !menuVisibility.menu, subMenu: false })
    const handleNavigation = (href) => {
        setMenuVisibility({ menu: false, subMenu: false })
        navigate(href)
    }

    return (
        <>
            <MenuToggle toggleMenus={toggleMenus} isMenuActive={menuVisibility.menu || menuVisibility.subMenu} />

            <MainMenu
                isVisible={menuVisibility.menu}
                onSubMenuClick={() => updateMenuVisibility('subMenu', true)}
            />

            <SubMenu
                isVisible={menuVisibility.subMenu}
                headerMenuItems={headerMenuItems}
                onBackClick={() => updateMenuVisibility('subMenu', false)}
                onNavigate={handleNavigation}
            />

            <Droplinked />
        </>
    )
}

function SubMenu({ isVisible, headerMenuItems, onBackClick, onNavigate }) {
    return (
        <Flex
            width="100%"
            position="fixed"
            right={isVisible ? "0" : "-100%"}
            top="56px"
            bottom={0}
            flexDirection="column"
            gap={{ base: 8, md: 9 }}
            paddingBlock={9}
            paddingInline={{ base: 4, md: 9, lg: "60px", xl: "72px" }}
            bgColor="#1C1C1C"
            transition="0.4s"
            zIndex={11}
            overflowY={"auto"}
        >
            <BackButton onBackClick={onBackClick} />

            <Flex direction="column" gap={{ base: 8, md: 9 }}>
                {headerMenuItems.map(menuItem => (
                    <SubMenuSection key={menuItem.label} menuItem={menuItem} onNavigate={onNavigate} />
                ))}
            </Flex>
        </Flex>
    )
}

function SubMenuSection({ menuItem, onNavigate }) {
    return (
        <Flex direction="column" gap={4}>
            <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={700} color="white">{menuItem.label}</AppTypography>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
                {menuItem.links.map(link => (
                    <LandingPageLink key={link.label} link={link} onNavigate={onNavigate} />
                ))}
            </SimpleGrid>
        </Flex>
    )
}

function LandingPageLink({ link, onNavigate }) {
    return (
        <Flex gap={{ base: 3, md: 4 }} onClick={() => onNavigate(link.href)}>
            <HeaderIconContainer>{link.icon}</HeaderIconContainer>
            <Flex direction="column">
                <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={500} color="white">{link.label}</AppTypography>
                <AppTypography fontSize={{ base: 12, md: 14 }} color="white" opacity="0.5">{link.description}</AppTypography>
            </Flex>
        </Flex>
    )
}

function BackButton({ onBackClick }) {
    return (
        <Flex as="button" alignItems="center" gap={2} onClick={onBackClick}>
            <AppIcons.BackArrow />
            <Box as="span" fontSize={14} color="#fff">Back</Box>
        </Flex>
    )
}