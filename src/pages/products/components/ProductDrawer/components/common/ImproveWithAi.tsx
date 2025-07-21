import { Box, ChakraProps, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
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
    const { t } = useLocaleResources('products');
    const { onOpen, isOpen, onClose } = useDisclosure();

    const items = [
        {
            icon: <AppIcons.Light />,
            title: t('ImproveWithAi.styles.casual'),
        },
        {
            icon: <AppIcons.Smile />,
            title: t('ImproveWithAi.styles.friendly')
        },
        {
            icon: <AppIcons.Case />,
            title: t('ImproveWithAi.styles.professional')
        },
        {
            icon: <AppIcons.Rocket />,
            title: t('ImproveWithAi.styles.inspirational')
        },
        {
            icon: <Box sx={{ path: { stroke: "#fff" } }}><AppIcons.MedalStarOutline /></Box>,
            title: t('ImproveWithAi.styles.luxury')
        },
        {
            icon: <AppIcons.Robot />,
            title: t('ImproveWithAi.styles.techSavvy')
        },
    ]

    const buttons = [
        {
            title: t('ImproveWithAi.actions.revert'),
            icon: <AppIcons.Refresh2 />,
            color: "#fff",
            onClick: handleRevert
        },
        {
            title: t('ImproveWithAi.actions.tryAgain'),
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
                            {!isImproveLoading && t('ImproveWithAi.button')}
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
