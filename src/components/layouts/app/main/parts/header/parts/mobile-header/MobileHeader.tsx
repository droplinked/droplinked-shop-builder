import { Box, Flex, Grid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Droplinked from '../droplinked/Droplinked'
import MenuToggle from './parts/menu-toggle/MenuToggle'

interface Props {
    products_menu: {
        label: string;
        links: {
            label: string;
            description: string;
            icon: React.JSX.Element;
            href: string;
        }[]
    }[],
    toggleAuthModal: () => void
}

function MobileHeader({ products_menu, toggleAuthModal }: Props) {
    const navigate = useNavigate()
    const [menuVisibility, setMenuVisibility] = useState({ menu: false, subMenu: false })
    const updateMenuVisibility = <K extends keyof typeof menuVisibility>(key: K, value: typeof menuVisibility[K]) => setMenuVisibility({ ...menuVisibility, [key]: value })

    const toggleMenus = () => {
        if (menuVisibility.menu || menuVisibility.subMenu) {
            setMenuVisibility({ menu: false, subMenu: false })
            return
        }
        updateMenuVisibility("menu", true)
    }

    const handleNavigation = (href: string) => {
        setMenuVisibility({ menu: false, subMenu: false })
        navigate(href)
    }

    return (
        <>
            <MenuToggle toggleMenus={toggleMenus} isMenuActive={menuVisibility.menu || menuVisibility.subMenu} />

            {/* menu */}
            <Flex
                width={"100%"}
                position={"fixed"}
                top={"56px"}
                right={menuVisibility.menu ? "0" : "-100%"}
                bottom={0}
                flexDirection={"column"}
                justifyContent={"space-between"}
                padding={9}
                bgColor={"#1C1C1C"}
                transition={"0.4s"}
                zIndex={10}
            >
                <Flex direction={"column"} gap={9}>
                    <AppTypography color="#fff" fontSize={20} fontWeight={700} cursor={"pointer"} onClick={() => handleNavigation("/about")}>
                        About Us
                    </AppTypography>
                    <AppTypography color="#fff" fontSize={20} fontWeight={700} cursor={"pointer"} onClick={() => updateMenuVisibility("subMenu", true)}>
                        Products
                    </AppTypography>
                    <AppTypography color="#fff" fontSize={20} fontWeight={700} cursor={"pointer"} onClick={() => handleNavigation("/plans")}>
                        Pricing
                    </AppTypography>
                </Flex>
                <BasicButton variant='outline' onClick={toggleAuthModal}>Sign In</BasicButton>
            </Flex>

            {/* sub menu */}
            <Flex
                width={"100%"}
                position={"fixed"}
                right={menuVisibility.subMenu ? "0" : "-100%"}
                top={"56px"}
                bottom={0}
                flexDirection={"column"}
                gap={6}
                padding={9}
                bgColor={"#1C1C1C"}
                transition={"0.4s"}
                zIndex={11}
            >
                <Flex as="button" alignItems={"center"} gap={2} onClick={() => updateMenuVisibility("subMenu", false)}>
                    <AppIcons.BackArrow />
                    <Box as="span" fontSize={14} color={"#fff"}>Back</Box>
                </Flex>

                <Flex direction={"column"} gap={6}>
                    {products_menu.map(menuItem =>
                        <Flex key={menuItem.label} direction={"column"} gap={2}>
                            <AppTypography fontSize={14} fontWeight={700} color={"#fff"}>{menuItem.label}</AppTypography>
                            <Flex direction={"column"} gap={3}>
                                {
                                    menuItem.links.map(link =>
                                        <Flex alignItems={"center"} gap={3} onClick={() => handleNavigation(link.href)}>
                                            <Grid placeContent={"center"} width={"36px"} height={"36px"} backgroundColor={"#F2F2F2"} padding={"12px"} rounded={"8px"}>
                                                {link.icon}
                                            </Grid>
                                            <Flex direction={"column"}>
                                                <AppTypography fontSize={14} fontWeight={600} color={"#fff"}>{link.label}</AppTypography>
                                                <AppTypography fontSize={12} color={"#fff"} opacity={"0.5"}>{link.description}</AppTypography>
                                            </Flex>
                                        </Flex>
                                    )}
                            </Flex>

                        </Flex>
                    )}
                </Flex>
            </Flex>

            <Droplinked />
        </>
    )
}

export default MobileHeader