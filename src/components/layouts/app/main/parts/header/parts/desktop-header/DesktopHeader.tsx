import { Box, Flex, HStack, PopoverBody, VStack } from '@chakra-ui/react'
import AppPopoverOnHover from 'components/common/PopoverMenu/PopOverOnHover'
import AppTypography from 'components/common/typography/AppTypography'
import HeaderDashboardLoggedin from 'components/layouts/app/dashboard/parts/header/parts/loged/HeaderDashboardLoggedin'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { Link } from 'react-router-dom'
import Droplinked from '../droplinked/Droplinked'

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

function DesktopHeader({ products_menu, toggleAuthModal }: Props) {
    const { shop } = useAppStore()

    return (
        <>
            <HStack spacing={{ base: "20px", md: "32px", lg: "48px" }}>
                <Droplinked />

                <HStack color="#FFF" spacing={{ base: "10px", sm: "20px", md: "48px" }} alignItems="center">
                    <AppPopoverOnHover
                        nodes={{
                            trigger: {
                                children: (
                                    <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }}>
                                        Products
                                    </AppTypography>
                                ),
                            },
                            content: {
                                children: (
                                    <PopoverBody display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" alignSelf={"stretch"} gap="36px">
                                        <VStack alignSelf={"stretch"} spacing={"36px"} width={"full"} alignItems={"flex-start"}>
                                            {products_menu.map((menu_item) => (
                                                <VStack width={"100%"} key={menu_item?.label} spacing={"12px"} align={"stretch"}>
                                                    <AppTypography color={"white"} fontSize={"16px"} fontWeight={"600"}>
                                                        {menu_item?.label}
                                                    </AppTypography>
                                                    <Flex width={"100%"} flexWrap={"wrap"} justifyContent={"flex-start"} gap={"16px"}>
                                                        {menu_item?.links?.map((link) => (
                                                            <Link key={link.label} to={link.href}>
                                                                <Flex alignItems={"flex-start"} gap={4} width={"300px"}>
                                                                    <Box flexShrink={0} backgroundColor={"#F2F2F2"} padding={"12px"} rounded={"8px"}>
                                                                        {link.icon}
                                                                    </Box>
                                                                    <VStack display={"flex"} alignItems={"flex-start"}>
                                                                        <AppTypography fontSize={"16px"} color={"white"} fontWeight={"500"}>
                                                                            {link.label}
                                                                        </AppTypography>
                                                                        <AppTypography fontSize={"14px"} color={"white"} fontWeight={"400"} opacity={"0.5"}>
                                                                            {link.description}
                                                                        </AppTypography>
                                                                    </VStack>
                                                                </Flex>
                                                            </Link>
                                                        ))}
                                                    </Flex>
                                                </VStack>
                                            ))}
                                        </VStack>
                                    </PopoverBody>
                                ),
                                props: {
                                    width: "100vw",
                                    marginTop: { sm: "4px", md: "8px", lg: "12px", xl: "16px" },
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "80px",
                                    border: "none",
                                    borderRadius: 0,
                                    padding: { base: "12px 16px", sm: "12px 36px", md: "16px 64px", lg: "20px 128px", xl: "24px 156px", "2xl": "192px" },
                                    backgroundColor: "#1C1C1C",
                                }
                            }
                        }}
                    />
                    <Link to="/plans">
                        <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }}>
                            Pricing
                        </AppTypography>
                    </Link>
                    <Link to="/about">
                        <AppTypography color="#878787" fontSize={{ base: "12px", sm: "14px", md: "16px" }} fontWeight={600} transition={"0.2s"} _hover={{ color: "#fff" }} whiteSpace={"nowrap"}>
                            About Us
                        </AppTypography>
                    </Link>
                </HStack>
            </HStack>
            <Box>
                {shop ? (
                    <HeaderDashboardLoggedin />
                ) : (
                    <AppTypography
                        borderRadius="8px"
                        cursor="pointer"
                        onClick={toggleAuthModal}
                        color="#C2C2C2"
                        border="2px solid #292929"
                        padding={{ base: "6px 13px", lg: "6px 23px" }}
                        fontSize="12px"
                    >
                        Sign In
                    </AppTypography>
                )}
            </Box>
        </>
    )
}

export default DesktopHeader