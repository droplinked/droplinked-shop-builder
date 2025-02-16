import { Box, ChakraProps, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import React from "react";

interface Props {
    handleSelectItem: (item: string) => void;
    handleTryAgain: () => void;
    handleRevert: () => void;
    isImproveLoading?: boolean;
    isLoaded?: boolean;
    isDisabled?: boolean;
    BoxStyles?: ChakraProps;
}

export default function ImproveWithAi({
    handleSelectItem,
    handleTryAgain,
    handleRevert,
    isImproveLoading,
    isDisabled,
    isLoaded,
    BoxStyles
}: Props) {
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

    const buttons = [
        {
            title: "Revert",
            icon: <AppIcons.Refresh2 />,
            color: "#fff",
            onClick: handleRevert
        },
        {
            title: "Try Again",
            icon: <AppIcons.Refresh />,
            color: "#2BCFA1",
            onClick: handleTryAgain
        }
    ]

    return (
        <Flex {...BoxStyles}>
            {isLoaded ? (
                <Flex width={"100%"} borderRadius={4} border={"1px solid #292929"} background={"#1c1c1c"}>
                    {buttons.map((item, index) => {
                        return (
                            <Flex
                                {...index === 0 && { borderRight: "1px solid #292929" }}
                                px={3} py={2}
                                alignItems={"center"} gap={1.5}
                                color={item.color}
                                cursor={"pointer"}
                                onClick={item.onClick}
                            >
                                {item.icon}
                                <AppTypography fontSize={12} fontWeight={500} width={"max-content"}>
                                    {item.title}
                                </AppTypography>
                            </Flex>
                        )
                    })}
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
                            isDisabled={isImproveLoading || isDisabled}
                            leftIcon={<AppIcons.MagicWind width={"16px"} height={"16px"} />}
                        >
                            {!isImproveLoading && "Improve With AI"}
                        </Button>
                    </MenuButton>
                    <MenuList zIndex={9999} borderRadius={8} background={"#1C1C1C"} border={"none"} p={3} minWidth={"150px"}>
                        {items.map((item, index) => {
                            return (
                                <MenuItem
                                    key={item.title}
                                    px={3} py={2}
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    background={"transparent"}
                                    color={"#fff"}
                                    fontSize={12} fontWeight={500}
                                    _hover={{ background: "#292929", borderRadius: 8 }}
                                    onClick={() => handleSelectItem(item.title)}
                                >
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
