import { ChakraProps, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { RocketSm } from "assets/icons/Action/Rocket/RocketSm";
import { MagicwandSm } from 'assets/icons/AI/MagicWand/MagicwandSm';
import { RobotSm } from "assets/icons/AI/Robot/RobotSm";
import { HappyfaceSm } from "assets/icons/Sign/HappyFace/HappyfaceSm";
import { Light2Sm } from "assets/icons/System/Light2/Light2Sm";
import { MedalstarSm } from "assets/icons/System/MedalStar/MedalstarSm";
import { SuitcaseSm } from "assets/icons/System/SuitCase/SuitcaseSm";
import AppTypography from "components/common/typography/AppTypography";
import AppButton from "components/redesign/button/AppButton";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";
import { Refresh2Sm } from "assets/icons/Action/Refresh2/Refresh2Sm";
import { Refresh1Sm } from "assets/icons/Action/Refresh1/Refresh1Sm";

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
            icon: <Light2Sm />,
            title: t('ImproveWithAi.styles.casual'),
        },
        {
            icon: <HappyfaceSm />,
            title: t('ImproveWithAi.styles.friendly')
        },
        {
            icon: <SuitcaseSm />,
            title: t('ImproveWithAi.styles.professional')
        },
        {
            icon: <RocketSm />,
            title: t('ImproveWithAi.styles.inspirational')
        },
        {
            icon: <MedalstarSm />,
            title: t('ImproveWithAi.styles.luxury')
        },
        {
            icon: <RobotSm />,
            title: t('ImproveWithAi.styles.techSavvy')
        },
    ]

    const buttons = [
        {
            title: t('ImproveWithAi.actions.revert'),
            icon: <Refresh2Sm />,
            color: "#fff",
            onClick: handleRevert
        },
        {
            title: t('ImproveWithAi.actions.tryAgain'),
            icon: <Refresh1Sm color="#2BCFA1"/>,
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
