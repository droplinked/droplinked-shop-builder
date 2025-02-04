import { Box, ChakraProps, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import React from "react";

interface Props {
    handleSelectItem?: (item: string) => void;
    isLoading?: boolean;
    isLoaded?: boolean;
    isDisabled?: boolean;
    BoxStyles?: ChakraProps;
    handleTryAgain?: () => void;
    handleRevert?: () => void;
}

export default function ImproveWithAi({ handleSelectItem, isLoading, isLoaded, BoxStyles, handleTryAgain, handleRevert, isDisabled }: Props) {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const items = [
        {
            icon: <AppIcons.Light />,
            title: "Casual",
        },
        {
            icon: <AppIcons.Smile />,
            title: "Friendly"
        },
        {
            icon: <AppIcons.Case />,
            title: "Professional"
        },
        {
            icon: <AppIcons.Rocket />,
            title: "Inspirational"
        },
        {
            icon: <Box sx={{ path: { stroke: "#fff" } }}><AppIcons.MedalStarOutline /></Box>,
            title: "Luxury"
        },
        {
            icon: <AppIcons.Robot />,
            title: "Tech_Savvy"
        },
    ]

    return (
        <Flex {...BoxStyles}>
            {isLoaded ? (
                <Flex width={"100%"} borderRadius={4} border={"1px solid #292929"} background={"#1c1c1c"}>
                    <Flex px={3} py={2} alignItems={"center"} color={"#fff"} gap={1.5} cursor={"pointer"} onClick={handleRevert}>
                        <AppIcons.Refresh2 />
                        <AppTypography fontSize={12} fontWeight={500}>
                            Revert
                        </AppTypography>
                    </Flex>
                    <Flex px={3} py={2} alignItems={"center"} color={"#2BCFA1"} borderLeft={"1px solid #292929"} gap={1.5} cursor={"pointer"} onClick={handleTryAgain}>
                        <AppIcons.Refresh />
                        <AppTypography fontSize={12} fontWeight={500}>
                            Try Again
                        </AppTypography>
                    </Flex>
                </Flex>
            ) : (
                <Menu isOpen={isOpen} onClose={onClose} placement="end" isLazy>
                    <MenuButton type="button" disabled={isDisabled} cursor={isDisabled ? "not-allowed" : "pointer"} onClick={onOpen}>
                        <Button
                            variant="secondary"
                            border={"1px solid #292929"}
                            borderRadius={"4px"}
                            paddingInline={3}
                            background={"#1c1c1c"}
                            fontSize={12}
                            fontWeight={500}
                            color={"#2bcfa1"}
                            isDisabled={isLoading || isDisabled}
                            leftIcon={<AppIcons.MagicWind width={"16px"} height={"16px"} />}
                        >
                            {!isLoading && "Improve With AI"}
                        </Button>
                    </MenuButton>
                    <MenuList zIndex={9999} borderRadius={8} background={"#1C1C1C"} border={"none"} p={3} minWidth={"150px"}>
                        {items.map((item, index) => {
                            return (
                                <MenuItem display={"flex"} alignItems={"center"} gap={1} background={"transparent"} color={"#fff"} px={3} py={2} fontSize={12} fontWeight={500} _hover={{ background: "#292929", borderRadius: 8 }} key={item.title} onClick={() => handleSelectItem(item.title)}>
                                    {item.icon}
                                    {item.title}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            )}
        </Flex>
    );
}
