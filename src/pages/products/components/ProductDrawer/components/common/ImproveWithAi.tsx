import { Box, ChakraProps, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import React from "react";
import { MagicwandSm } from 'assets/icons/AI/MagicWand/MagicwandSm';

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
                <Flex width={"100%"} borderRadius={4} border={"1px solid"} borderColor="neutral.gray.800" background={"neutral.gray.1000"}>
                    {buttons.map((item, index) => {
                        return (
                            <Flex
                                {...index === 0 && { borderRight: "1px solid", borderColor:"neutral.gray.800"}}
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
                        <AppButton
                            variant="secondary"
                            size="sm"
                            color={'main.primary'}
                            bg={"neutral.gray.1000"}
                            borderColor={"neutral.gray.800"}
                            isDisabled={isImproveLoading || isDisabled}
                            leftIcon={<MagicwandSm/>}
                        >
                            {!isImproveLoading && "Improve With AI"}
                        </AppButton>
                    </MenuButton>
                    <MenuList zIndex={9999} borderRadius={8} background={"neutral.gray.1000"} border={"none"} p={3} minWidth={"150px"}>
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
                                    _hover={{ background: "neutral.gray.800", borderRadius: 8 }}
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
